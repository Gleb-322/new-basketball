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

// login user
export const loginUserThunk = createAsyncThunk(
	'users/login',
	async (payload: ISigninFormFields, { dispatch, rejectWithValue }) => {
		try {
			dispatch(showLoader())
			const response = await loginUser(JSON.stringify(payload))
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

// create user
export const createUserThunk = createAsyncThunk(
	'users/create',
	async (payload: ISignupFormFields, { dispatch, rejectWithValue }) => {
		try {
			dispatch(showLoader())
			const response = await createUser(JSON.stringify(payload))
			if (response.success && response.message instanceof Object) {
				setAuthCookie(response.message.token)
				return response.message
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to create a User!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to create a User!')
		} finally {
			dispatch(closeLoader())
		}
	}
)

// logout user
export const logoutUserThunk = createAsyncThunk(
	'users/logout',
	async (token: string | null, { dispatch, rejectWithValue }) => {
		try {
			dispatch(showLoader())
			if (!token) {
				return rejectWithValue('Failed to logout! Token is Null!')
			}

			const response = await logoutUser(token)

			if (response.success) {
				removeAuthCookie()
				return response.message
			} else {
				return rejectWithValue(response.message || 'Failed to logout!')
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to logout!')
		} finally {
			dispatch(closeLoader())
		}
	}
)
