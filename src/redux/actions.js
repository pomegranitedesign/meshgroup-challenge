import axios from 'axios'
import {
  REQUEST_RACERS,
  RECEIVE_RACERS,
  REQUEST_NEXT_PAGE,
  RECEIVE_NEXT_PAGE,
  REQUEST_PREV_PAGE,
  RECEIVE_PREV_PAGE,
  SET_NEXT_PAGE,
  SET_PREV_PAGE,
} from './types'

const BASE_URL = 'http://ergast.com/api/f1/drivers.json'

export const requestRacers = () => ({ type: REQUEST_RACERS })
export const receiveRacers = (racers) => ({ type: RECEIVE_RACERS, racers })

export const requestNextPage = () => ({ type: REQUEST_NEXT_PAGE })
export const receiveNextPage = (racers) => ({ type: RECEIVE_NEXT_PAGE, racers })

export const requestPrevPage = () => ({ type: REQUEST_PREV_PAGE })
export const receivePrevPage = (racers) => ({ type: RECEIVE_PREV_PAGE, racers })

export const setNextPage = (currentPage) => ({
  type: SET_NEXT_PAGE,
  currentPage: currentPage + 10,
})

export const setPrevPage = (currentPage) => ({
  type: SET_PREV_PAGE,
  currentPage: currentPage > 10 && currentPage - 10,
})

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
