import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	users: [],
	products: [],
	orders: [],
	totalAmount: 0,
	product: {},
	userDetail: {},
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

export const updateProduct = createAsyncThunk(
	"admin/updateProduct",
	async (product) => {
		const { id, productData } = product;
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const {data} =	await axios.put(`/api/v1/admin/product/${id}`, productData, config)
		return data.success
	}
)

export const adminFetchOrders = createAsyncThunk(
	"admin/fetchAdminOrders",
	async () => {
		const { data } =	await axios.get('/api/v1/admin/orders')
		return data
	}
)

export const deleteOrder = createAsyncThunk(
	"admin/deleteOrder",
	async (id) => {
		const {data} =	await axios.delete(`/api/v1/admin/order/${id}`)
		return data.success
	}
)

export const fetchUsers = createAsyncThunk(
	"admin/fetchUsers",
	async () => {
		const { data } =	await axios.get('/api/v1/admin/users')
		return data
	}
)

export const deleteUser = createAsyncThunk(
	"admin/deleteUser",
	async (id) => {
		const {data} = await axios.delete(`/api/v1/admin/user/${id}`)
		return data.success
	}
)

export const fetchUserDetails = createAsyncThunk(
	"admin/deleteUser",
	async (id) => {
		const {data} = await axios.get(`/api/v1/admin/user/${id}`)
		return data
	}
)

export const updateUser = createAsyncThunk(
	"admin/updateUser",
	async (user) => {
		const { id, userData } = user;
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const {data} =	await axios.put(`/api/v1/admin/user/${id}`, userData, config)
		return data.success
	}
)

export const updateOrder = createAsyncThunk(
	"admin/updateUser",
	async (order) => {
		const { id, orderData } = order;
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const {data} =	await axios.put(`/api/v1/admin/order/${id}`, orderData, config)
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
		resetUpdateProduct(state,action) {
			state.isUpdated = false;
		},
		resetDeletedOrder(state,action) {
			state.isOrderDeleted = false;
		},
		resetDeletedUser(state,action) {
			state.isUserDeleted = false;
		},
		resetUpdateUser(state,action) {
			state.updated = false;
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
		[adminFetchOrders.pending]: (state, action) => {
			state.status = "pending";
			state.isLoading = true
		},
		[adminFetchOrders.fulfilled]: (state, action) => {
			state.success = action.payload.success;
			state.isLoading = false;
			state.totalAmount = action.payload.totalAmount;
			state.orders = action.payload.carts;
		},
		[adminFetchOrders.rejected]: (state, action) => {
			state.status = "rejected";
			state.isLoading = false
		},
		[fetchUsers.pending]: (state, action) => {
			state.status = "pending";
			state.isLoading = true
		},
		[fetchUsers.fulfilled]: (state, action) => {
			state.success = action.payload.success;
			state.isLoading = false;
			state.users = action.payload.users;
		},
		[fetchUsers.rejected]: (state, action) => {
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
		[updateProduct.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isUpdated = action.payload;
		},
		[deleteOrder.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isOrderDeleted = action.payload;
		},
		[deleteUser.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isUserDeleted = action.payload;
		},
		[fetchUserDetails.fulfilled]: (state, action) => {
			state.success = action.payload.success;
			state.isLoading = false;
			state.userDetail = action.payload.user;
		},
		[updateUser.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.updated = action.payload;
		},
		[updateOrder.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isUpdated = action.payload;
		},
	}
})

export const {resetDeletedProduct, resetUpdateProduct, resetDeletedOrder, resetDeletedUser, resetUpdateUser} = AdminSlice.actions
export const getSelectedUser = (state) => state.admin.userDetail;
export default AdminSlice.reducer;
