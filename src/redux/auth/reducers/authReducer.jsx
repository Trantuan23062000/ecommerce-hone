const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: null,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case "VERIFY_TOKEN_SUCCESS":
      return {
        ...state,
        responseMessage: action.payload,
      };
    case "VERIFY_TOKEN_FAILURE":
      return {
        ...state,
        responseMessage: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;

export default authReducer;
