import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	orders: {},
	order: [],
	status: null,
	isLoading: true
};

export const createOrder = createAsyncThunk("order/createOrder", 
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
	"order/myOrders",
	async () => {
		const {data} =	await axios.get('/api/v1/orders/me')

		return data
		// console.log(data)
	}
)

const OrderSlice = createSlice({
	name: "orders",
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
			state.orders = action.payload.cart
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
			state.status = action.payload.status
			state.isLoading = false
			state.order = action.payload
		},
		[myOrders.rejected]: (state, action) => {
			state.status = "rejected"
			state.isLoading = false
		},
	}
})

export default OrderSlice.reducer;
