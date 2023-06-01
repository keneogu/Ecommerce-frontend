import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	products: [],
	product: {},
	status: null,
	success: false,
	isLoading: true,
}

export const fetchAdminProducts = createAsyncThunk(
	"admin/fetchAdminProducts",
	async () => {
		const { data } =	await axios.get('/api/v1/admin/products')
		return data.products
	}
)

export const createProducts = createAsyncThunk(
	"admin/createProducts",
	async (productData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		
		const response =	await axios.post('/api/v1/admin/product/new', productData, config)
		return response?.data
	}
)

export const deleteProduct = createAsyncThunk(
	"admin/deleteProduct",
	async (id) => {
		const {data} =	await axios.delete(`/api/v1/admin/product/${id}`)
		return data.success
	}
)

const AdminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		resetDeletedProduct(state,action) {
			action.payload = false;
			state.isDeleted = false
		},
	},
	extraReducers: {
		[fetchAdminProducts.pending]: (state, action) => {
			state.status = "pending";
			state.isLoading = true
		},
		[fetchAdminProducts.fulfilled]: (state, action) => {
			state.status = "success";
			state.isLoading = false;
			state.products = action.payload
		},
		[fetchAdminProducts.rejected]: (state, action) => {
			state.status = "rejected";
			state.isLoading = false
		},
		[createProducts.fulfilled]: (state, action) => {
			state.success = action.payload.success;
			state.isLoading = false;
			state.product = action.payload.product;
		},
		[deleteProduct.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isDeleted = action.payload;
		},
	}
})

export const {resetDeletedProduct} = AdminSlice.actions
export default AdminSlice.reducer;
