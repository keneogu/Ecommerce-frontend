import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	products: [],
	product: {},
	status: null,
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
		
		const { data } =	await axios.post('/api/v1/admin/products/new', productData, config)
		return data.product
	}
)

const AdminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {},
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
		[createProducts.pending]: (state, action) => {
			state.status = "pending";
			state.isLoading = true
		},
		[createProducts.fulfilled]: (state, action) => {
			state.status = "success";
			state.isLoading = false;
			state.product = action.payload
		},
		[createProducts.rejected]: (state, action) => {
			state.status = "rejected";
			state.isLoading = false
		},
	}
})

export default AdminSlice.reducer;
