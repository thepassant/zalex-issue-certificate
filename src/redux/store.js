import { configureStore } from "@reduxjs/toolkit";
//root reducer
import { reduxSlices } from "./reduxSlices";
import logger from "redux-logger";
const isDevelopment = import.meta.env.MODE === "development";

export default configureStore({
  reducer: reduxSlices,
  devTools: isDevelopment,
  middleware: (getDefaultMiddleware) => {
    if (isDevelopment) {
      return getDefaultMiddleware().concat(logger);
    }

    return getDefaultMiddleware();
  },
});
