import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

const orderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers: {
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

export default orderSlice.reducer;
