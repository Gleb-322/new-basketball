import { createSlice } from '@reduxjs/toolkit'
import {
	createUserThunk,
	loginUserThunk,
	logoutUserThunk,
} from '../../api/users/userThunks'
import { IUserSliceState } from '../../common/interfaces/types'

const initialState: IUserSliceState = {
	token: null,
	userName: null,
	logoutMessage: undefined,
	error: null,
	status: 'idle',
}

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		resetUserState: state => {
			state.error = null
			state.logoutMessage = undefined
			state.status = 'idle'
		},
		resetToken: state => {
			state.token = null
		},
	},
	extraReducers: builder => {
		// login user
		builder.addCase(loginUserThunk.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(loginUserThunk.fulfilled, (state, action) => {
			state.userName = action.payload.user.name
			state.token = action.payload.token
			state.status = 'success'
		})
		builder.addCase(loginUserThunk.rejected, (state, action) => {
			state.error = action.payload as string
			state.status = 'error'
		})
		// create user
		builder.addCase(createUserThunk.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(createUserThunk.fulfilled, (state, action) => {
			console.log('action createUserThunk.fulfilled', action)
			state.userName = action.payload.user.name
			state.token = action.payload.token
			state.status = 'success'
		})
		builder.addCase(createUserThunk.rejected, (state, action) => {
			state.error = action.payload as string
			state.status = 'error'
		})
		// logout user
		builder.addCase(logoutUserThunk.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
			state.userName = null
			state.logoutMessage = action.payload
			state.token = null
			state.status = 'success'
		})
		builder.addCase(logoutUserThunk.rejected, (state, action) => {
			state.error = action.payload as string
			state.status = 'error'
		})
	},
})

export const { resetUserState, resetToken } = userSlice.actions

export default userSlice.reducer
