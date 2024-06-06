import { Login } from "../../../api/auth/login";
import toast from "react-hot-toast";
import { CheckToken } from "../../../api/auth/checktoken";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await Login({ email, password });
    if (response && response.data && response.data.EC === 0) {
      dispatch(loginSuccess(response.data.user, response.data.token));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // Set up a timer to clear the token after 1 minute
       setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("The login version has expired, please log in again")
        window.location.href = "/";
      }, 86400000); // 1 minute in milliseconds

      toast.success(response.data.message);
    } else {
      toast.error(response.data.message || "Invalid response");
    }
    return response; // Return response for further processing
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // Throw error for error handling in the component
  }
};


export const verifyToken = (email, token) => async (dispatch) => {
  try {
    const response = await CheckToken({email,token})
     if(response.data.EC === 0){
      console.log("Continue...");
     }else{
      localStorage.removeItem("token");
        localStorage.removeItem("user");
      alert("Session expired. Please log in again")
      window.location.href = "/";
     }
  } catch (error) {
    console.error('Error verifying token:', error);
    dispatch({ type: 'VERIFY_TOKEN_FAILURE', payload: 'An error occurred while verifying token.' });
  }
};

const loginSuccess = (user, token) => ({
  type: "LOGIN_SUCCESS",
  payload: { user, token },
});

