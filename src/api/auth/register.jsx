import axios from "axios"

export const RegisterUser = (username,phone,password,email,confirmPassword) =>{
    return axios.post("https://api-ecommerce-pqnh.onrender.com/api/v1/register",username,phone,password,email,confirmPassword)
}