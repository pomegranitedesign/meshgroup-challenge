import {
  RECEIVE_RACERS,
  REQUEST_RACERS,
  RECEIVE_NEXT_PAGE,
  RECEIVE_PREV_PAGE,
  REQUEST_NEXT_PAGE,
  REQUEST_PREV_PAGE,
  SET_NEXT_PAGE,
  SET_PREV_PAGE,
} from './types'

const initialState = {
  racers: [],
  selectedRacer: null,
  isFetching: false,
  currentPage: 10,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PREV_PAGE:
      return { ...state, currentPage: action.currentPage }

    case SET_NEXT_PAGE:
      return { ...state, currentPage: action.currentPage }

    case RECEIVE_NEXT_PAGE:
      return { ...state, isFetching: false, racers: action.racers }

    case REQUEST_NEXT_PAGE:
      return { ...state, isFetching: true }

    case RECEIVE_PREV_PAGE:
      return { ...state, isFetching: false, racers: action.racers }

    case REQUEST_PREV_PAGE:
      return { ...state, isFetching: true }

    case RECEIVE_RACERS:
      return {
        ...state,
        isFetching: false,
        racers: action.racers,
      }

    case REQUEST_RACERS:
      return { ...state, isFetching: true }

    default:
      return state
  }
}

export default reducer
