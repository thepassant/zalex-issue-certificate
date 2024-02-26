import { createAsyncThunk } from "@reduxjs/toolkit";
import CertificateService from "../../../services/CertificateService";

export const submitCertificateRequest = createAsyncThunk(
  "submitCertificateRequest",
  async function (formData) {
    const response = await CertificateService.sendCertificateData(formData);

    return response.data.response;
  }
);
