import React, { useEffect, Fragment } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DataTable } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'

import {
  fetchRacers,
  fetchNextPage,
  fetchPrevPage,
  setNextPage,
  setPrevPage,
  setRacerId,
  fetchSingleRacer
} from '../redux/actions'

const DataTableApp = (props) => {
  useEffect(() => {
    const handleFetchRacers = async () =>
      props.fetchRacers(props.currentState.currentPage)
    handleFetchRacers()
  }, [])

  const handleSelectRacer = (driverId) => {
    props
      .fetchSingleRacer(driverId)
      .then((data) => props.navigation.push('Racer', { racer: data.racer }))
  }

  const handlePrevPage = async () => {
    await props.setPrevPage(props.currentState.currentPage)
    await props.fetchPrevPage(props.currentState.currentPage)
  }

  const handleNextPage = async () => {
    await props.setNextPage(props.currentState.currentPage)
    await props.fetchNextPage(props.currentState.currentPage)
  }

  const { currentState } = props
  return (
    <View style={styles.container}>
      {currentState.isFetching ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <Fragment>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Driver ID</DataTable.Title>
              <DataTable.Title>Full Name</DataTable.Title>
            </DataTable.Header>

            {currentState.racers.map((racer) => {
              return (
                <DataTable.Row key={racer.driverId}>
                  <DataTable.Cell>
                    <Text>{racer.driverId}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    onPress={() => handleSelectRacer(racer.driverId)}
                  >
                    <Text>{racer.givenName + ' ' + racer.familyName}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              )
            })}
          </DataTable>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={handlePrevPage}
              disabled={props.currentState.currentPage === 10}
            >
              <Text>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNextPage}>
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        </Fragment>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    height: '100%'
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
    paddingVertical: 30
  },

  spinnerContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => ({ currentState: state })
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchRacers,
      fetchNextPage,
      fetchPrevPage,
      setNextPage,
      setPrevPage,
      setRacerId,
      fetchSingleRacer
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(DataTableApp)
