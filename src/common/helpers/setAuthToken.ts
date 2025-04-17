import Cookies from 'js-cookie'

export const setAuthCookie = (token: string) => {
	Cookies.set('token', token, { expires: 7 })
}

export const removeAuthCookie = () => {
	Cookies.remove('token')
}

export const getAuthCookie = () => {
	return Cookies.get('token')
}
