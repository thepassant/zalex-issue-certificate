import { createSlice } from "@reduxjs/toolkit";
import { fetchRequestsList } from "../asyncActions/RequestAsyncActions";

const initialState = {
  requestsList: [],
  isLoading: false,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    // updateTestString: (state) => {
    //   state.testString = "Final test";
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRequestsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requestsList = action.payload;
      })
      .addCase(fetchRequestsList.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { updateTestString } = requestSlice.actions;
export default requestSlice.reducer;
