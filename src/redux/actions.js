import axios from 'axios'
import {
  REQUEST_RACERS,
  RECEIVE_RACERS,
  REQUEST_NEXT_PAGE,
  REQUEST_PREV_PAGE,
  SET_NEXT_PAGE,
  SET_PREV_PAGE,
  RECEIVE_SINGLE_RACER,
  REQUEST_SINGLE_RACER,
  SET_RACER_ID
} from './types'

const BASE_URL = 'http://ergast.com/api/f1/drivers.json'

export const requestRacers = () => ({ type: REQUEST_RACERS })
export const receiveRacers = (racers) => ({ type: RECEIVE_RACERS, racers })

export const requestSingleRacer = () => ({ type: REQUEST_SINGLE_RACER })
export const receiveSingleRacer = (racer) => ({
  type: RECEIVE_SINGLE_RACER,
  racer
})

export const requestNextPage = () => ({ type: REQUEST_NEXT_PAGE })
export const requestPrevPage = () => ({ type: REQUEST_PREV_PAGE })

// Synchronous actions
export const setNextPage = (currentPage) => ({
  type: SET_NEXT_PAGE,
  currentPage: currentPage + 10
})

export const setPrevPage = (currentPage) => ({
  type: SET_PREV_PAGE,
  currentPage: currentPage > 10 && currentPage - 10
})

export const setRacerId = (id) => ({ type: SET_RACER_ID, id })

// Asynchronous actions
export const fetchRacers = (currentPage) => {
  return (dispatch) => {
    dispatch(requestRacers())
    return axios
      .get(`${BASE_URL}?limit=10&offset=${currentPage}`)
      .then((response) =>
        dispatch(receiveRacers(response.data.MRData.DriverTable.Drivers))
      )
  }
}

export const fetchNextPage = (currentPage) => {
  return (dispatch) => {
    dispatch(requestNextPage())
    return axios
      .get(`${BASE_URL}?limit=10&offset=${currentPage}`)
      .then((response) =>
        dispatch(receiveRacers(response.data.MRData.DriverTable.Drivers))
      )
  }
}

export const fetchPrevPage = (currentPage) => {
  return (dispatch) => {
    dispatch(requestPrevPage())
    return axios
      .get(`${BASE_URL}?limit=10&offset=${currentPage}`)
      .then((response) =>
        dispatch(receiveRacers(response.data.MRData.DriverTable.Drivers))
      )
  }
}

export const fetchSingleRacer = (id) => {
  return (dispatch) => {
    dispatch(requestSingleRacer())
    return axios
      .get(`http://ergast.com/api/f1/drivers/${id}`)
      .then((response) => dispatch(receiveSingleRacer(response.data)))
  }
}
