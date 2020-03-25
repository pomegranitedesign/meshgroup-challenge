import React, { useEffect } from 'react'
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
} from '../redux/actions'

const DataTableApp = (props) => {
  useEffect(() => {
    const handleFetchRacers = async () =>
      props.fetchRacers(props.currentState.currentPage)

    handleFetchRacers()
  }, [])

  const handlePrevPage = async () => {
    await props.setPrevPage(props.currentState.currentPage)
    await props.fetchPrevPage(props.currentState.currentPage)
  }

  const handleNextPage = async () => {
    await props.setNextPage(props.currentState.currentPage)
    await props.fetchNextPage(props.currentState.currentPage)
  }

  // TODO: Click on the driver's name and open the appropriate screen with all data

  const { currentState } = props
  console.log(props)
  return (
    <View style={styles.container}>
      {currentState.isFetching ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
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
                <DataTable.Cell>
                  <Text>{racer.givenName + ' ' + racer.familyName}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            )
          })}
        </DataTable>
      )}

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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    height: '100%',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
    paddingVertical: 30,
  },

  spinnerContainer: {
    height: '82.8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const mapStateToProps = (state) => ({ currentState: state })
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { fetchRacers, fetchNextPage, fetchPrevPage, setNextPage, setPrevPage },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(DataTableApp)
