import { createSlice } from '@reduxjs/toolkit'
import { loginUserThunk } from '../../api/users/userThunks'
import { IUserSliceState } from '../../common/interfaces/types'

const initialState: IUserSliceState = {
	userName: null,
	error: null,
	status: 'idle',
}

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(loginUserThunk.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(loginUserThunk.fulfilled, (state, action) => {
			console.log('action loginUserThunk.fulfilled', action)
			state.userName = action.payload.user.name
			state.status = 'success'
		})
		builder.addCase(loginUserThunk.rejected, (state, action) => {
			console.log('action loginUserThunk.rejected', action)
			state.error = action.payload as string
			state.status = 'error'
		})
	},
})

export default userSlice.reducer
