export const submitCertificateRequest = (formData) => async (dispatch) => {
  dispatch({ type: "SUBMIT_CERTIFICATE_REQUEST" });
  try {
    const response = await fetch(
      `https://zalexinc.azure-api.net/request-certificate?subscription-key=43b647491f1d436cb0130a329fcdca50`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      dispatch({ type: "SUBMIT_CERTIFICATE_SUCCESS" });
    } else {
      throw new Error("Submission failed");
    }
  } catch (error) {
    dispatch({
      type: "SUBMIT_CERTIFICATE_FAIL",
      payload: error.message,
    });
  }
};
