import axios from "axios"

export const GetProduct = async() =>{
    return await axios.get("https://api-ecommerce-pqnh.onrender.com/api/v1/productDetails/getall")
}
export const GetBrands = async ()=>{
    return await axios.get("https://api-ecommerce-pqnh.onrender.com/api/v1/brand/getBrand")
}

export const SearchProduct = async (name) => {
  return await axios.post("https://api-ecommerce-pqnh.onrender.com/api/v1/productDetails/search",name);
};

