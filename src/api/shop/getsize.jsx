import axios from "axios";

export const GetSize = async() =>{
    return await axios.get("https://api-ecommerce-pqnh.onrender.com/api/v1/size")
}