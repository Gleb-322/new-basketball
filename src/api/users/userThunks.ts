import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUser, loginUser, logoutUser } from './usersService'
import {
	ISigninFormFields,
	ISignupFormFields,
} from '../../common/interfaces/types'
import {
	setAuthCookie,
	removeAuthCookie,
} from '../../common/helpers/setAuthToken'
import { closeLoader, showLoader } from '../../core/redux/loaderSlice'

export const loginUserThunk = createAsyncThunk(
	'users/login',
	async (payload: ISigninFormFields, { dispatch, rejectWithValue }) => {
		try {
			dispatch(showLoader())
			const response = await loginUser(JSON.stringify(payload))
			console.log('loginUserThunk', response)
			if (response.success && response.message instanceof Object) {
				setAuthCookie(response.message.token)
				return response.message
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to login!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to login!')
		} finally {
			dispatch(closeLoader())
		}
	}
)

export const createUserThunk = createAsyncThunk(
	'users/create',
	async (payload: ISignupFormFields, { rejectWithValue }) => {
		try {
			const response = await createUser(JSON.stringify(payload))
			console.log('createUserThunk', response)
			if (response.success && response.message instanceof Object) {
				setAuthCookie(response.message.token)
				return response.message
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to create User!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to create User!')
		}
	}
)

export const logoutUserThunk = createAsyncThunk(
	'users/logout',
	async (token: string | null, { rejectWithValue }) => {
		try {
			if (token) {
				const response = await logoutUser(token)
				console.log('logoutUserThunk', response)
				if (response.success) {
					removeAuthCookie()
					return response.message
				} else {
					return rejectWithValue(response.message || 'Failed to logout User!')
				}
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to logout User!')
		}
	}
)
