const initialState = {
  submissionStatus: null,
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SUBMIT_CERTIFICATE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SUBMIT_CERTIFICATE_SUCCESS":
      return {
        ...state,
        loading: false,
        submissionStatus: "success",
      };
    case "SUBMIT_CERTIFICATE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
