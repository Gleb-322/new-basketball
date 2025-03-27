import {
	ICreateUserResponse,
	ILoginUserResponse,
	ILogoutUserResponse,
} from '../../common/interfaces/types'
import { post } from '../baseRequest'

const USER_ENDPOINT = '/users'

export const createUser = (
	body: string,
	token?: string
): Promise<ICreateUserResponse> => {
	return post(`${USER_ENDPOINT}/create`, token, body)
}

export const loginUser = (
	body: string,
	token?: string
): Promise<ILoginUserResponse> => {
	return post(`${USER_ENDPOINT}/login`, token, body)
}

export const logoutUser = (token?: string): Promise<ILogoutUserResponse> => {
	return post(`${USER_ENDPOINT}/logout`, token)
}
