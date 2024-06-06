import axios from "axios"

export const getBanner = async () =>{
    return await axios.get("https://api-ecommerce-pqnh.onrender.com/api/v1/banner/get")
}