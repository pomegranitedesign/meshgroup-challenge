import React, { useState, useEffect, Fragment } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { parseString } from 'react-native-xml2js'

const Racer = (props) => {
  const [currentRacer, setCurrentRacer] = useState(null)
  const [parsing, setParsing] = useState(true)

  useEffect(() => {
    const parseXML = async () =>
      await parseString(props.route.params.racer, (error, result) => {
        if (error) throw new Error(error)
        else {
          setParsing(false)
          setCurrentRacer(result.MRData.DriverTable[0].Driver[0])
        }
      })

    parseXML()
  }, [parseString, setCurrentRacer, setParsing])

  return (
    <View style={styles.container}>
      {!parsing && (
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

export default Racer
