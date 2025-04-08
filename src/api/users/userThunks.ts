import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser } from './usersService'
import { ISigninFormFields } from '../../common/interfaces/types'
import { setAuthCookie } from '../../common/helpers/setAuthToken'

export const loginUserThunk = createAsyncThunk(
	'users/login',
	async (
		payload: { body: ISigninFormFields; setToken: (token: string) => void },
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
			return rejectWithValue(error.message || 'Failed to login')
		}
	}
)
