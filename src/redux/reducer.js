import { RECEIVE_RACERS, REQUEST_RACERS } from './types'

const initialState = {
  racers: [],
  selectedRacer: null,
  isFetching: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_RACERS:
      return {
        ...state,
        racers: [...state.racers, action.racers],
        isFetching: false,
      }

    case REQUEST_RACERS:
      return { ...state, isFetching: true }

    default:
      return state
  }
}

export default reducer
