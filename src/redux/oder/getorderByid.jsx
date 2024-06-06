import { createSlice } from "@reduxjs/toolkit";
import {getOrderbyId} from "../../api/order/order"

export const orderByid = createSlice({
  name: "filter",
  initialState: {
    data:[],
    loading: false,
    error: null,

  },
  reducers: {
    fetchOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrderSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
   fetchOrderRequest,
   fetchOrderSuccess,
   fetchOrderFailure

    // export các reducers cho các actions khác
  } = orderByid.actions;



export const fetchOrderById = (userId) => async (dispatch) => {
  try {
    dispatch(fetchOrderRequest());
    const response = await getOrderbyId(userId);
    if (response && response.data && response.data.EC === 0) {
      dispatch(fetchOrderSuccess(response.data.data));
    } else {
      dispatch(fetchOrderFailure("Failed to fetch brands"));
    }
  } catch (error) {
    dispatch(fetchOrderFailure(error.message));
  }
};

export const selectData = (state) => state.orderId.data;


export default orderByid.reducer;
