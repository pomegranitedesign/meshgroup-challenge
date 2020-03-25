import {
  RECEIVE_RACERS,
  REQUEST_RACERS,
  REQUEST_NEXT_PAGE,
  REQUEST_PREV_PAGE,
  SET_NEXT_PAGE,
  SET_PREV_PAGE,
  RECEIVE_SINGLE_RACER,
  REQUEST_SINGLE_RACER
} from './types'

const initialState = {
  racers: [],
  racer: null,
  isFetching: false,
  isFetchingSingleRacer: false,
  currentPage: 10
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SINGLE_RACER:
      return {
        ...state,
        isFetcisFetchingSingleRacerhing: false,
        racer: action.racer
      }

    case REQUEST_SINGLE_RACER:
      return { ...state, isFetcisFetchingSingleRacerhing: true }

    case SET_PREV_PAGE:
      return { ...state, currentPage: action.currentPage }

    case SET_NEXT_PAGE:
      return { ...state, currentPage: action.currentPage }

    case REQUEST_NEXT_PAGE:
      return { ...state, isFetching: true }

    case REQUEST_PREV_PAGE:
      return { ...state, isFetching: true }

    case RECEIVE_RACERS:
      return {
        ...state,
        isFetching: false,
        racers: action.racers
      }

    case REQUEST_RACERS:
      return { ...state, isFetching: true }

    default:
      return state
  }
}

export default reducer
