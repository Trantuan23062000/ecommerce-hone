import axios from "axios"

export const Login = (email,password) =>{
    return axios.post("https://api-ecommerce-pqnh.onrender.com/api/v1/login",email,password)
}