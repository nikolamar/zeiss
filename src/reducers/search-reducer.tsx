import * as actionTypes from '../actions/action-types';

const initialState = {
  isSearching: false,
  results: [],
}

const reducer = (state = initialState, { type, payload }) => {

  switch(type) {

    case actionTypes.SEARCH_ON:
      return { ...state, isSearching: true };

    case actionTypes.SEARCH_OFF:
      return { ...state, isSearching: false };

    case actionTypes.SEARCH_SET_LIST:
      return { ...state, results: payload };

    default:
      return state;
  }
}

export default reducer;
