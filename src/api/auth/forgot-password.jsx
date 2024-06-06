import axios from "axios";

export const ForgotPassword = async (email) =>{
   return await axios.post("https://api-ecommerce-pqnh.onrender.com/api/v1/forgot-password",email)
}

export const resetPassword = async(token,newPassword)=>{
   return await axios.post("https://api-ecommerce-pqnh.onrender.com/api/v1/reset-password",token,newPassword)
}