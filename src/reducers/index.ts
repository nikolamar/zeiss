import { combineReducers } from "redux";
import machinesReducer from "./machines-reducer";
import socketReducer from "./socket-reducer";
import searchReducer from "./search-reducer";

export default combineReducers({
  machines: machinesReducer,
  socket: socketReducer,
  search: searchReducer,
});
