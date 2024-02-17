import { combineReducers } from "redux";
import requestReducer from "./requestReducer";

const rootReducer = combineReducers({
  request: requestReducer,
});

export default rootReducer;
