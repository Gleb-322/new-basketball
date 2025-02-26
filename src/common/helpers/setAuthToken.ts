import Cookies from 'js-cookie'

export const setAuthCookie = (token?: string) => {
	if (token) {
		Cookies.set('token', token, { expires: 7 }) // 7 дней
		localStorage.setItem('token', token)
	} else {
		Cookies.remove('token')
		localStorage.removeItem('token')
	}

	// Генерируем событие изменения в `localStorage`
	window.dispatchEvent(new StorageEvent('storage', { key: 'token' }))
}
