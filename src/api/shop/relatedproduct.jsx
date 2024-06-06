import axios from "axios"

export const relatedProduct = async()=>{
    return await axios.get("https://api-ecommerce-pqnh.onrender.com/api/v1/product/related")
}

export const GetByName = async (detailId) => {
    return await axios.get(`https://api-ecommerce-pqnh.onrender.com/api/v1/product/getByName/${detailId}`);
  };