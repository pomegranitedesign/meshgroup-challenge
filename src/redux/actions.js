import axios from 'axios'
import { REQUEST_RACERS, RECEIVE_RACERS } from './types'

const BASE_URL = 'http://ergast.com/api/f1/drivers.json'

export const requestRacers = () => ({ type: REQUEST_RACERS })
export const receiveRacers = (racers) => ({ type: RECEIVE_RACERS, racers })

export const fetchRacers = (currentPage = 10) => {
  return (dispatch) => {
    dispatch(requestRacers())
    return axios
      .get(`${BASE_URL}?limit=10&offset=${currentPage}`)
      .then((response) =>
        dispatch(receiveRacers(response.data.MRData.DriverTable.Drivers))
      )
  }
}
