import { createSlice } from "@reduxjs/toolkit";
import { submitCertificateRequest } from "../asyncActions/CertificateAsyncActions";

const initialState = {
  isLoading: false,
  submissionStatus: "",
};

const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {
    // updateTestString: (state) => {
    //   state.testString = "Final test";
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCertificateRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitCertificateRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.submissionStatus =
          action.payload === "Ok" ? "success" : "failure";
      })
      .addCase(submitCertificateRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { updateTestString } = certificateSlice.actions;
export default certificateSlice.reducer;
