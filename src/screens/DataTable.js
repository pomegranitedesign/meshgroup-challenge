import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DataTable } from 'react-native-paper'

import { fetchRacers } from '../redux/actions'

const DataTableApp = (props) => {
  useEffect(() => {
    const handleFetchRacers = async () => props.fetchRacers()
    handleFetchRacers()
  }, [])

  // TODO: Finish the data table render with all the data needed to be displayed
  // TODO: Create a pagination feature
  // TODO: Click on the driver's name and open the appropriate screen with all data

  const { currentState } = props
  console.log(currentState)
  return (
    <View style={styles.container}>
      {currentState.isFetching ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Driver ID</DataTable.Title>
            <DataTable.Title>Full Name</DataTable.Title>
          </DataTable.Header>

          {currentState.racers.map((racer) => (
            <DataTable.Row key={racer.driverId}>
              <DataTable.Cell>}{racer.driverId}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  test: {
    color: '#000000',
  },
})

const mapStateToProps = (state) => ({ currentState: state })
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchRacers }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DataTableApp)
