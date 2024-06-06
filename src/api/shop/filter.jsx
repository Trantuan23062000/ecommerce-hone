import axios from "axios";

export const FilterData = async (brandId, sizeId, colorId, minPrice, maxPrice, category) =>{
   return await axios.post("https://api-ecommerce-pqnh.onrender.com/api/v1/products/filter",brandId, sizeId, colorId, minPrice, maxPrice, category)

}
