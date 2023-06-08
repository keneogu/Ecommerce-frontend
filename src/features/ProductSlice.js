import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	products: [],
	status: null,
	isLoading: true,
	productDetail: {},
	success: false,
	search: ''
}

export const fetchProducts = createAsyncThunk(
	"products/fetchproducts",
	async (features) => {
		const {search = '', currentPage = 1, price, category, ratings} = features
		const response =	await axios.get(
			category ?
			`/api/v1/products?search=${search}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${ratings}` :
			`/api/v1/products?search=${search}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${ratings}`
			)
		return response?.data
	}
)

export const fetchProductDetails = createAsyncThunk(
	"products/fetchProductDetails",
	async (id) => {
		const response =	await axios.get(`/api/v1/product/${id}`)
		return response?.data
	}
)

export const review = createAsyncThunk(
	"products/review",
	async(reviewData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		
		const { data } =	await axios.put('/api/v1/review', reviewData, config)
		return data.success
	}
)

const ProductSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		searchItems:(state, action) => {
			state.search = action.payload
		},
		resetReview(state,action) {
			state.success = false;
		},
	},
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
			state.isLoading = false;
			state.productDetail = action.payload;
		},
		[review.fulfilled]: (state = {}, action) => {
			state.status = "success";
			state.isLoading = false;
			state.success = action.payload;
		},
	}
});

export const { searchItems, resetReview } = ProductSlice.actions
export const getSelectedProduct = (state) => state.products.productDetail;
export default ProductSlice.reducer;
