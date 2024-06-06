import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetProduct } from "../../api/shop/getproduct";
import toast from "react-hot-toast";
import { FilterData } from "../../api/shop/filter";
import { SearchProduct } from "../../api/shop/getproduct";

export const fetchData = createAsyncThunk(
  "products/fetchData",
  async ({ currentPage, currentLimit }, { dispatch }) => {
    try {
      const response = await GetProduct(currentPage, currentLimit);
      if (response && response.data && response.data.EC === 0) {
        dispatch(setData(response.data.product));
      } else {
        toast.error("No data!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data!");
    }
  }
);

export const fetchFilterData = createAsyncThunk(
  "products/fetchFilterData",
  async (filters, { dispatch }) => {
    try {
      const response = await FilterData(filters);
      if (response && response.data && response.data.EC === 0) {
        dispatch(setData(response.data.data));
        dispatch(setDataFilter(response.data.data))
        dispatch(setKeyFilter(filters))
      } else {
        toast.error("No data!");
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      toast.error("Error fetching filtered data!");
    }
  }
);

export const fetchFilterDataSearch = createAsyncThunk(
  "products/fetchFilterDataSearch",
  async ({ name }, { dispatch }) => {
    try {
      const response = await SearchProduct({ name });
      if (response && response.data && response.data.EC === 0) {
        dispatch(setData(response.data.Details));
      } else {
        dispatch(setSearchKeyword("No data!"));
      }
    } catch (error) {
      console.error("Error fetching search data:", error);
      toast.error("Error fetching search data!");
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    totalPages: 0,
    currentPage: 1,
    currentLimit: 6,
    selectedProduct: null,
    searchResults: [],
    searchKeyword: '',
    keyFilter : [],
    dataFilter:[]
  },

  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setDataFilter: (state, action) => {
      state.dataFilter = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentLimit: (state, action) => {
      state.currentLimit = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSearchKeyword: (state, action) => { // New action for setting search keyword
      state.searchKeyword = action.payload;
    },
    setKeyFilter:(state,action)=>{
      state.keyFilter = action.payload
    },
  },
});

export const {
  setData,
  setTotalPages,
  setCurrentPage,
  setCurrentLimit,
  setSelectedProduct,
  setFilterData,
  setSearchResults,setSearchKeyword,setKeyFilter,resetClearFiltersFlag,setDataFilter
} = productSlice.actions;

export const selectProductData = (state) => state.products.data;
export const selectTotalPages = (state) => state.products.totalPages;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectCurrentLimit = (state) => state.products.currentLimit;
export const selectSelectedProduct = (state) => state.products.selectedProduct;


export default productSlice.reducer;
