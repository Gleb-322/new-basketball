import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUser, loginUser, logoutUser } from './usersService'
import {
	ISigninFormFields,
	ISignupFormFields,
} from '../../common/interfaces/types'
import { setAuthCookie } from '../../common/helpers/setAuthToken'

export const loginUserThunk = createAsyncThunk(
	'users/login',
	async (
		payload: {
			body: ISigninFormFields
			setToken: (token: string | undefined) => void
		},
		{ rejectWithValue }
	) => {
		const { body, setToken } = payload
		try {
			const response = await loginUser(JSON.stringify(body))
			console.log('loginUserThunk', response)
			if (response.success && response.message instanceof Object) {
				setAuthCookie(response.message.token)
				setToken(response.message.token)
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
		}
	}
)

export const createUserThunk = createAsyncThunk(
	'users/create',
	async (
		payload: {
			body: ISignupFormFields
			setToken: (token: string | undefined) => void
		},
		{ rejectWithValue }
	) => {
		const { body, setToken } = payload
		try {
			const response = await createUser(JSON.stringify(body))
			console.log('createUserThunk', response)
			if (response.success && response.message instanceof Object) {
				setAuthCookie(response.message.token)
				setToken(response.message.token)
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
	async (
		payload: {
			token: string | undefined
			setToken: (token: string | undefined) => void
		},
		{ rejectWithValue }
	) => {
		const { token, setToken } = payload
		try {
			const response = await logoutUser(token)
			console.log('logoutUserThunk', response)
			if (response.success) {
				setAuthCookie(undefined)
				setToken(undefined)
				return response.message
			} else {
				return rejectWithValue(response.message || 'Failed to logout User!')
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to logout User!')
		}
	}
)
