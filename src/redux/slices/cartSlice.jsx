import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].productVariant.quantity += 1;
      } else {
        state.items.push(newItem);
      }
      // Cập nhật giỏ hàng trong Local Storage sau mỗi lần thêm sản phẩm vào giỏ hàng
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        if (existingItem.productVariant.quantity > 1) {
          existingItem.productVariant.quantity -= 1;
        } else {
          // Nếu số lượng giảm xuống 0, xoá mục khỏi giỏ hàng
          state.items.splice(existingItemIndex, 1);
        }
      }
    },

    updateCart: (state, action) => {
      const updatedItems = action.payload;
      updatedItems.forEach((updatedItem) => {
        const index = state.items.findIndex((item) => item.id === updatedItem.id);
        if (index !== -1) {
          state.items[index] = updatedItem;
        }
      });
    },
    removeFromCart(state, action) {
      const { id } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1); // Xoá sản phẩm khỏi giỏ hàng
        // Cập nhật giỏ hàng trong Local Storage sau mỗi lần xoá sản phẩm
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    // Bạn có thể giữ lại hoặc loại bỏ reducer này tùy thuộc vào yêu cầu của bạn
     updateCartdata: (state, action) => {
       state.items = action.payload; // Cập nhật giỏ hàng với dữ liệu mới từ payload
   },

   removeAllItems(state) {
    state.items = []; // Đặt giỏ hàng về trống
  },
   
  },
});

export const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => {
    // Tính giá sản phẩm sau khi giảm giá (nếu có)
    const discountedPrice = item.Product.price - (item.Product.price * (item.Product.sale || 0) / 100);
    // Tính tổng tiền của sản phẩm sau khi giảm giá và nhân với số lượng
    const itemTotal = discountedPrice * item.productVariant.quantity;
    // Cộng tổng tiền của sản phẩm vào tổng tiền tổng cộng
    return total + itemTotal;
  }, 0);
};


export const { addToCart, removeFromCart, decreaseQuantity, updateCart, updateCartdata,removeAllItems } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;


export default cartSlice.reducer;
