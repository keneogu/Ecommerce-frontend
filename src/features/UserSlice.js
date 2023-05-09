import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
	user: {},
	isLoading: false,
	isAuthenticated: false
}

export const registerUser = createAsyncThunk(
	"user/register", async(userData) => {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
		
		const response =	await axios.post('/api/v1/register', userData, config)

		if(response.data) {
			localStorage.setItem('user', JSON.stringify(response.data))
		}
		return response.data
	}
)

export const loginUser = createAsyncThunk(
	"user/login",
	async (userData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		
		const response =	await axios.post('/api/v1/login', userData, config)

		if(response.data) {
			localStorage.setItem('user', JSON.stringify(response.data))
		}
		return response.data
	}
)

export const logout = createAsyncThunk(
	"user/logout", async () => {
		localStorage.removeItem('user')
	}
)

export const loadUser = createAsyncThunk("user/loadUser",
	async () => {
		const response =	await axios.get('/api/v1/me')
		return response?.data
})

const UserSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: {
		[registerUser.pending]: (state, action) => {
			state.isLoading = true
			state.isAuthenticated = false
		},
		[registerUser.fulfilled]: (state, action) => {
			state.isLoading = false
			state.isAuthenticated = true
			state.user = action.payload
		},
		[registerUser.rejected]: (state, action) => {
			state.isLoading = false
			state.isAuthenticated = false
			state.user = null
		},
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
		},
		[loadUser.pending]: (state, action) => {
			state.isLoading = true
			state.isAuthenticated = false
		},
		[loadUser.fulfilled]: (state, action) => {
			state.isLoading = false
			state.isAuthenticated = true
			state.user = action.payload
		},
		[loadUser.rejected]: (state, action) => {
			state.isLoading = false
			state.isAuthenticated = false
			state.user = null
		},
		[logout.fulfilled]: (state, action) => {
			state.isLoading = false
			state.isAuthenticated = true
			state.user = null
		},
	}
})

export default UserSlice.reducer;
