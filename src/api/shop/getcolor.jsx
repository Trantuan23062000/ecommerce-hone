import axios from "axios";

export const GetColor = async() =>{
    return await axios.get("https://api-ecommerce-pqnh.onrender.com/api/v1/color")
}