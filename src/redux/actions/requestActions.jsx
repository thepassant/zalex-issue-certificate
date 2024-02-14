export const fetchRequests = () => async (dispatch) => {
  dispatch({ type: "FETCH_REQUESTS_START" });
  try {
    const response = await fetch(
      `https://zalexinc.azure-api.net/request-list?subscription-key=43b647491f1d436cb0130a329fcdca50`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    dispatch({ type: "FETCH_REQUESTS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_REQUESTS_FAIL", payload: error.message });
  }
};
