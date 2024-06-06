import { createSlice } from "@reduxjs/toolkit";
import { ForgotPassword,resetPassword } from "../../../api/auth/forgot-password";
import toast from "react-hot-toast"

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
  },
});
  
export const forgotPassword = (email) => async () => {
  try {
   const response = await ForgotPassword({email});
   if(response.data.success === true ){
    localStorage.setItem("resetToken", JSON.stringify(response.data.resetToken));
    toast.success(response.data.message)

   }else{
    toast.error(response.data.message)
   }
  } catch (error) {
     console.log(error);
  }
};

export const ResetPasswordU = (newPassword) => async()=>{
  try {
    const token = JSON.parse(localStorage.getItem("resetToken"));
    if (!token) {
      throw new Error("Reset token not found in local storage");
    }
    const response = await resetPassword({token,newPassword})
    if(response.data.success === true){
      toast.success(response.data.message)
      localStorage.removeItem("resetToken")
    }else{
      toast.error(response.data.message)
    }
  } catch (error) {
    console.log(error);
  }
}

export default forgotPasswordSlice.reducer;
