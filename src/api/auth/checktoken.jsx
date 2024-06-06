import axios from "axios"
export const CheckToken = async(email,token)=>{
    return await axios.post("https://api-ecommerce-pqnh.onrender.com/api/v1/checktoken",email,token)
}