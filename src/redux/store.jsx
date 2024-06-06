// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./slices/ productSlice";
import filterReducer from "./slices/filterReducer";
import relatedReducer from "./slices/relatedProduct";
import cartReducer from "./slices/cartSlice";
import localStorageMiddleware from './middleware/localStorageMiddleware';
import authReducer from './auth/reducers/authReducer'
import forgotPasswordReducer from "./auth/actions/forgot-password";
import orderReducer from "./oder/oderReduces"
import orderByIdReducer from "./oder/getorderByid"

const rootReducer = combineReducers({
  products: productReducer, 
  filter: filterReducer,
  dataRelated: relatedReducer,
  cart: cartReducer,
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  order: orderReducer,
  orderId:orderByIdReducer

});
const preloadedState = {
  cart: {
    items: JSON.parse(localStorage.getItem("cartItems")) || [], // Initialize cart with data from local storage
  },
};


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState
});

export default store;
