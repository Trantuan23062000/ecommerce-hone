import { createSlice } from "@reduxjs/toolkit";
import { GetBrands } from "../../api/shop/getproduct";
import { GetSize } from "../../api/shop/getsize";
import { GetColor } from "../../api/shop/getcolor";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    brands: [],
    sizes: [],
    colors: [],
    filterData:[],
    loading: false,
    error: null,
    selectedBrand: null,
    selectedSize: null,
    selectedColor: null,
    selectedCategory: null,
    selectedMinPrice: null,
    selectedMaxPrice: null,

  },
  reducers: {
    fetchBrandsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBrandsSuccess: (state, action) => {
      state.loading = false;
      state.brands = action.payload;
    },
    fetchBrandsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchSizesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSizesSuccess: (state, action) => {
      state.loading = false;
      state.sizes = action.payload;
    },
    fetchSizesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchColorsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchColorsSuccess: (state, action) => {
      state.loading = false;
      state.colors = action.payload;
    },
    fetchColorsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchFilterDataRequest :(state)=>{
      state.loading =true
      state.error = null
    },
    fetchFilterDataSuccess :(state,action)=>{
      state.loading =false
      state.filterData = action.payload
    },
    fetchFilterDataFailure :(state,action)=>{
      state.loading =false
      state.filterData = action.payload
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedMinPrice: (state, action) => {
      state.selectedMinPrice = action.payload;
    },
    setSelectedMaxPrice: (state, action) => {
      state.selectedMaxPrice = action.payload;
    },
    clearAllFilters: (state) => {
      state.selectedBrand = null;
      state.selectedSize = null;
      state.selectedColor = null;
      state.selectedCategory = null;
      state.selectedMinPrice = null;
      state.selectedMaxPrice = null;
    },

  },
});

export const {
  fetchBrandsRequest,
  fetchBrandsSuccess,
  fetchBrandsFailure,
  fetchSizesRequest,
  fetchSizesSuccess,
  fetchSizesFailure,
  fetchColorsRequest,
  fetchColorsSuccess,
  fetchColorsFailure,
  fetchFilterDataRequest,
  fetchFilterDataSuccess,
  fetchFilterDataFailure,setSelectedBrand,setSelectedCategory,setSelectedMaxPrice,setSelectedMinPrice,setSelectedSize,setSelectedColor,clearAllFilters

  // export các reducers cho các actions khác
} = filterSlice.actions;



export const fetchBrand = () => async (dispatch) => {
  try {
    dispatch(fetchBrandsRequest());
    const response = await GetBrands();
    if (response && response.data && response.data.EC === 0) {
      dispatch(fetchBrandsSuccess(response.data.DT));
    } else {
      dispatch(fetchBrandsFailure("Failed to fetch brands"));
    }
  } catch (error) {
    dispatch(fetchBrandsFailure(error.message));
  }
};

export const fetchSize = () => async (dispatch) => {
  try {
    dispatch(fetchSizesRequest());
    const response = await GetSize();
    if (response && response.data && response.data.EC === 0) {
      dispatch(fetchSizesSuccess(response.data.size));
    } else {
      dispatch(fetchSizesFailure("Failed to fetch brands"));
    }
  } catch (error) {
    dispatch(fetchSizesFailure(error.message));
  }
};

export const fetchColor = () => async (dispatch) => {
  try {
    dispatch(fetchColorsRequest());
    const response = await GetColor();
    if (response && response.data && response.data.EC === 0) {
      dispatch(fetchColorsSuccess(response.data.color));
    } else {
      dispatch(fetchColorsFailure("Failed to fetch brands"));
    }
  } catch (error) {
    dispatch(fetchColorsFailure(error.message));
  }
};


export default filterSlice.reducer;
