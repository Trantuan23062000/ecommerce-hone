// orderReducer.js
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
} from '../oder/orderAction';

const initialState = {
  loading: false,
  orderData: null,
  orderDetailData: null,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orderData: action.payload.orderData,
        orderDetailData: action.payload.orderDetailData,
        error: null,
      };
    case CREATE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default orderReducer;
