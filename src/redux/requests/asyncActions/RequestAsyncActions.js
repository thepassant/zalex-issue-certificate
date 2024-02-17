import { createAsyncThunk } from "@reduxjs/toolkit";
import RequestsService from "../../../services/RequestsService";

export const fetchRequestsList = createAsyncThunk(
  "fetchRequestsList",
  async function () {
    const response = await RequestsService.fetchRequestsList();
    return response.data;
  }
);
