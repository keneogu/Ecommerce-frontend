import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk("orders/createOrder", 
	async (cart) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		
		const { data } =	await axios.post('/api/v1/order/new', cart, config)
		return data
	}
)

export const myOrders = createAsyncThunk(
	"orders/myOrders",
	async () => {
		const { data } =	await axios.get('/api/v1/orders/me')

		return data?.cart
	}
)

const initialState = {
  orders: [],
	status: null,
	isLoading: true
};

const OrderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers: {
		[createOrder.pending]: (state, action) => {
			state.status = 'pending'
			state.isLoading = true
		},
		[createOrder.fulfilled]: (state, action) => {
			state.status = "success"
			state.isLoading = false
			state.orders = action.payload
		},
		[createOrder.rejected]: (state, action) => {
			state.status = "rejected"
			state.isLoading = false
		},
		[myOrders.pending]: (state, action) => {
			state.status = 'pending'
			state.isLoading = true
		},
		[myOrders.fulfilled]: (state, action) => {
			state.status = "success"
			state.isLoading = false
			state.orders = action.payload
		},
		[myOrders.rejected]: (state, action) => {
			state.status = "rejected"
			state.isLoading = false
		},
	}
})

export default OrderSlice.reducer;
