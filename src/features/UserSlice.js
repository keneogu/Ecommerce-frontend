import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
	user: {},
	isLoading: false,
	isAuthenticated: false
}

export const loginUser = createAsyncThunk(
	"user/login",
	async (userData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const response = await axios.post('/api/v1/login', userData, config)

		if (response.data) {
			localStorage.setItem('user', JSON.stringify(response.data))
		}
		return response.data
	}
)

const UserSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: {
		[loginUser.pending]: (state, action) => {
			state.isLoading = true
			state.isAuthenticated = false
		},
		[loginUser.fulfilled]: (state, action) => {
			state.isLoading = false
			state.isAuthenticated = true
			state.user = action.payload
		},
		[loginUser.rejected]: (state, action) => {
			state.isLoading = false
			state.isAuthenticated = false
			state.user = null
		}
	}
})

export default UserSlice.reducer;
