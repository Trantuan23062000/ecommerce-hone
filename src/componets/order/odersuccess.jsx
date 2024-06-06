import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { selectUser } from "../../redux/auth/reducers/authReducer";
import { useSelector, useDispatch } from "react-redux";
import { removeAllItems } from "../../redux/slices/cartSlice";
import { Oders } from "../../api/order/order";
import { motion } from "framer-motion";

const Odersuccess = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const paymentData = JSON.parse(localStorage.getItem("paymentData")); // Lấy dữ liệu từ Local Storage
    if (paymentData) {
      const { orderData, orderDetailData } = paymentData;
      // Gọi hàm Oders với các giá trị từ paymentData
      const sendOrder = async () => {
        try {
          const response = await Oders({ orderData, orderDetailData });
          if (response.data.EC === 0) {
            console.log("Order placed successfully!");
          } else {
            console.error("Failed to place order");
          }
        } catch (error) {
          console.error("Error while placing order:", error);
        }
      };
      sendOrder();
      // Xóa dữ liệu từ Local Storage sau khi đã sử dụng
      localStorage.removeItem("paymentData");
    }
    // Xóa tất cả các mục trong giỏ hàng
    dispatch(removeAllItems());
  }, [dispatch]);
  return (
    <div className="bg-gray-100 mt-48 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-black">
          Order Confirmed!
        </h2>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Thank {user.username} for your order. Your order has been successfully placed.
        </p>
        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 hover:text-yellow-500"
          >
            <Link to="/all-product">Continue Shopping</Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Odersuccess;
