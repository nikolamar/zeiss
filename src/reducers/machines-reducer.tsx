import * as actionTypes from '../actions/action-types';

const initialState = {
  machines: [],
  updatedId: 0,
  updatedIdx: 0,
}

const reducer = (state = initialState, { type, payload }) => {

  switch(type) {

    case actionTypes.MACHINE_SET_LIST:
      return { ...state, machines: payload };

    case actionTypes.MACHINE_UPDATE_STATUS:
      const update = state.machines.map(machine => {
        if (machine.id === payload.machine_id) {
          if (process.env.NODE_ENV === "development") {
            console.log('List machines array upd status: ', payload.status);
          }
          machine.status = payload.status;
        }
        return machine;
      });

      return { ...state, machines: update };

    case actionTypes.MACHINE_UPDATE_INDEX:
      const idx = state.machines.map(m => m.id).indexOf(payload.machine_id);
      if (process.env.NODE_ENV === "development") {
        console.log('[ This is not valid for upd search result!!! ]');
        console.log('List machines array upd idx: ', idx+1);
      }
      return { ...state, updatedId: payload.machine_id, updatedIdx: idx};

    default:
      return state;
  }
}

export default reducer;
