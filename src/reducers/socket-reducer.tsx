import * as actionTypes from '../actions/action-types';

const initialState = {
  error: '',
  status: '',
}

const reducer = (state = initialState, { type, payload }) => {

  switch(type) {

    case actionTypes.SOCKET_ERROR:
      return { ...state, error: payload };

    case actionTypes.SOCKET_STATUS:
      return { ...state, status: payload };

    default:
      return state;
  }
}

export default reducer;
