import { createSlice } from "@reduxjs/toolkit";
import { submitCertificateRequest } from "../asyncActions/CertificateAsyncActions";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  submissionStatus: "",
};

const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(submitCertificateRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitCertificateRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.submissionStatus = "success";
        toast.success(
          "Your certificate request has been submitted successfully."
        );
      })
      .addCase(submitCertificateRequest.rejected, (state) => {
        state.isLoading = false;
        state.submissionStatus = "failed";
        toast.error("Something went wrong");
      });
  },
});

export default certificateSlice.reducer;
