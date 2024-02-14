import { combineReducers } from "redux";
import certificateReducer from "./certificateReducer";
import requestReducer from "./requestReducer";

const rootReducer = combineReducers({
  certificate: certificateReducer,
  request: requestReducer,
});

export default rootReducer;
