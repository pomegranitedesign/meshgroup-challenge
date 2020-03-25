import {
  RECEIVE_RACERS,
  REQUEST_RACERS,
  REQUEST_NEXT_PAGE,
  REQUEST_PREV_PAGE,
  SET_NEXT_PAGE,
  SET_PREV_PAGE,
  RECEIVE_SINGLE_RACER,
  REQUEST_SINGLE_RACER,
  SET_RACER_ID
} from './types'

const initialState = {
  racers: [],
  racer: {},
  racerId: '',
  isFetching: false,
  currentPage: 10
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RACER_ID:
      return { ...state, racerId: action.id }

    case RECEIVE_SINGLE_RACER:
      return {
        ...state,
        isFetching: false,
        racer: action.racer
      }

    case REQUEST_SINGLE_RACER:
      return { ...state, isFetching: true }

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
