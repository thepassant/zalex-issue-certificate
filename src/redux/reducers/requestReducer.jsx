const initialState = {
  requests: [],
  loading: false,
  error: null,
};

export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_REQUESTS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_REQUESTS_SUCCESS":
      return { ...state, loading: false, requests: action.payload };
    case "FETCH_REQUESTS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
