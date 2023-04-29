import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	products: [],
	status: null,
	isLoading: true,
	productDetail: {},
}

export const fetchProducts = createAsyncThunk(
	"products/fetchproducts",
	async () => {
		const response =	await axios.get("/api/v1/products")
		return response?.data
	}
)

export const fetchProductDetails = createAsyncThunk(
	"products/fetchProductDetails",
	async (id) => {
		const response =	await axios.get(`/api/v1/products/${id}`)
		return response?.data
	}
)

const ProductSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchProducts.pending]: (state, action) => {
			state.status = "pending";
			state.isLoading = true
		},
		[fetchProducts.fulfilled]: (state, action) => {
			state.status = "success";
			state.isLoading = false;
			state.products = action.payload
		},
		[fetchProducts.rejected]: (state, action) => {
			state.status = "rejected";
			state.isLoading = false
		},
		[fetchProductDetails.fulfilled]: (state, action) => {
			state.status = "success";
			state.isLoading = true;
			// return {...state, productDetail: payload};
			state.productDetail = action.payload
		},
	}
});

export default ProductSlice.reducer;
