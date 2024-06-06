import axios from "axios"

export const Oders = async(orderData,orderDetailData)=>{
    return await axios.post("https://api-ecommerce-pqnh.onrender.com/api/v1/oders",orderData,orderDetailData)
}

export const getOrderbyId = async(userId)=>{
    return await axios.get(`https://api-ecommerce-pqnh.onrender.com/api/v1/oderById/${userId}`)
}

export const cancelOrder = async (orderId) =>{
    return await axios.post("https://api-ecommerce-pqnh.onrender.com/api/v1/cancelorder",orderId)
}

export const OrderVNpay = async (orderData,orderDetailData)=>{
    return await axios.post("https://api-ecommerce-pqnh.onrender.com/api/v1/oder-vnpay",orderData,orderDetailData)
}