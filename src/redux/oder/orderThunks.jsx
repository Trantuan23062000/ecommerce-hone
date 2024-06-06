import {
    createOrderRequest,
    createOrderSuccess, 
    createOrderFailure,
  } from "../oder/orderAction";
import {Oders} from "../../api/order/order"
import toast from "react-hot-toast"
  export const createOrder = (orderData, orderDetailData) => async (dispatch) => {
    try {
      dispatch(createOrderRequest());
      // Gửi yêu cầu API đến máy chủ để tạo đơn hàng và chi tiết đơn hàng
      const response = await Oders({orderData,orderDetailData})
      if(response.data.EC === 0){
        toast.success(response.data.message)
      }else{
        toast.error("Your order has been placed fail")
      }
      // Xử lý phản hồi thành công từ máy chủ
      dispatch(createOrderSuccess(orderData, orderDetailData));
    } catch (error) {
      // Xử lý lỗi
      dispatch(createOrderFailure(error.message));
    }
  };
  