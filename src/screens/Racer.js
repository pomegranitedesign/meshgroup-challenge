import React, { useState, useEffect, Fragment } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { parseString } from 'react-native-xml2js'
import { ActivityIndicator } from 'react-native-paper'

const Racer = (props) => {
  const [currentRacer, setCurrentRacer] = useState(null)

  useEffect(() => {
    const getSingleRacer = async () =>
      await parseString(props.currentState.racer, (error, result) => {
        if (error) throw new Error(error)
        else setCurrentRacer(result.MRData.DriverTable[0].Driver[0])
      })

    getSingleRacer()
  }, [parseString])

  return (
    <View style={styles.container}>
      {props.currentState.isFetchingSingleRacer && currentRacer === null ? (
        <ActivityIndicator size="large" color="#454545" />
      ) : (
        <Fragment>
          <Text style={styles.driverIdContainer}>
            Driver ID:{' '}
            <Text style={styles.driverId}>{currentRacer.$.driverId}</Text>
          </Text>
          <Text style={styles.fullName}>
            {currentRacer.GivenName[0]} {currentRacer.FamilyName[0]}
          </Text>
          <Text style={styles.nationality}>{currentRacer.Nationality[0]}</Text>
          <Text style={styles.birthDate}>{currentRacer.DateOfBirth[0]}</Text>
        </Fragment>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 50
  },

  fullName: {
    fontSize: 25,
    fontWeight: 'bold'
  },

  nationality: {
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'italic'
  },

  birthDate: {
    fontSize: 14
  },

  driverIdContainer: {
    marginBottom: 20
  },

  driverId: {
    fontWeight: 'bold'
  }
})

const mapStateToProps = (state) => ({ currentState: state })
export default connect(mapStateToProps, null)(Racer)
