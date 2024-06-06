import axios from "axios";

export const openPayPal = async(orderDetailData)=>{
    return axios.post("https://api-ecommerce-pqnh.onrender.com/api/v1/create-payment",{orderDetailData})
}

export const getPaypal = async()=>{
    return axios.get("https://api-ecommerce-pqnh.onrender.com/api/v1/success")
}

