import Cookies from 'js-cookie'

export const setAuthCookie = (token: string) => {
	// Cookies.set('token', token, { expires: 7 }) // 7 дней
	Cookies.set('token', token, { expires: 0.000694 })
}

export const removeAuthCookie = () => {
	Cookies.remove('token')
}

export const getAuthCookie = () => {
	return Cookies.get('token')
}
