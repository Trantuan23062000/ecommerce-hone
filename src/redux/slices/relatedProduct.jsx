  import { createSlice } from "@reduxjs/toolkit";
  import {relatedProduct,GetByName} from "../../api/shop/relatedproduct"


  export const relatedSlice = createSlice({
    name: "dataRelated",
    initialState: {
      dataRelated: [],
      dataProductName:[],
      loading: false,
      error: null,
    },
    reducers: {
      fetchRelatedRequest: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchRelatedSuccess: (state, action) => {
        state.loading = false;
        state.dataRelated = action.payload;
      },
      fetchRelatedFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      fetchGetbyNameRequest:(state)=>{
        state.loading = true
        state.error = null
      },

      fetchGetByNameSuccess:(state,action)=>{
        state.loading=false
        state.dataProductName = action.payload
      },

      fetchByNameFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
      },

    },
  });

  export const {
    fetchRelatedRequest,
    fetchRelatedSuccess,
    fetchRelatedFailure,
    fetchGetbyNameRequest,
    fetchGetByNameSuccess,
    fetchByNameFailure
    // export các reducers cho các actions khác
  } = relatedSlice.actions;

  export const fetchRelated = () => async (dispatch) => {
    try {
      dispatch(fetchRelatedRequest());
      const response = await relatedProduct();
      //console.log(detailId);
      if (response && response.data && response.data.EC === 0) {
        dispatch(fetchRelatedSuccess(response.data.relatedDetails));
      } else {
        dispatch(fetchRelatedFailure("Failed to Error"));
      }
    } catch (error) {
      dispatch(fetchRelatedFailure(error.message));
    }
  };

  export const getByName = (detailId) =>async(dispatch)=>{
    try {
        dispatch(fetchGetbyNameRequest())
        const response = await GetByName(detailId)
        if(response && response.data && response.data.EC === 0){
          dispatch(fetchGetByNameSuccess(response.data.details))
        }
    } catch (error) {
      dispatch(fetchByNameFailure(error.message))
    }
  }

  

  export default relatedSlice.reducer;