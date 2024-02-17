import { combineReducers } from "@reduxjs/toolkit";
// slices
import certificate from "./certificate/slices/CertificateSlice";
import request from "./requests/slices/RequestSlice";
export const slices = combineReducers({
  certificate,
  request,
});

export const reduxSlices = (state, action) => {
  return slices(state, action);
};
