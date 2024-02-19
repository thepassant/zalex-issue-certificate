import { createSlice } from "@reduxjs/toolkit";
import { fetchRequestsList } from "../asyncActions/RequestAsyncActions";

const initialState = {
  requestsList: [],
  isLoading: false,
  isEditModalActive: false,
  isDownloadModalActive: false,
  targetRequestData: null,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    openEditRequestModal: (state) => {
      state.isEditModalActive = true;
    },
    closeEditRequestModal: (state) => {
      state.isEditModalActive = false;
    },
    openDownloadRequestModal: (state) => {
      state.isDownloadModalActive = true;
    },
    closeDownloadRequestModal: (state) => {
      state.isDownloadModalActive = false;
    },
    setTargetRequestData: (state, action) => {
      state.targetRequestData = action.payload;
    },
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

export const {
  openEditRequestModal,
  closeEditRequestModal,
  openDownloadRequestModal,
  closeDownloadRequestModal,
  setTargetRequestData,
} = requestSlice.actions;
export default requestSlice.reducer;
