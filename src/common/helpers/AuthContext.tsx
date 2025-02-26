import Cookies from 'js-cookie'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { IAuthContext } from '../interfaces/types'

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | undefined>(
		Cookies.get('token') ?? undefined
	)
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const checkAuth = () => {
			const newToken = Cookies.get('token')
			if (!newToken) {
				setToken(undefined)
				if (
					location.pathname !== '/signin' &&
					location.pathname !== '/signup'
				) {
					navigate('/signin')
				}
			}
		}

		//  Функция для отслеживания изменений в куках
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === 'token') {
				checkAuth()
			}
		}

		//  Слушаем изменения в `localStorage`
		window.addEventListener('storage', handleStorageChange)

		//  Проверяем куки при монтировании
		checkAuth()

		return () => {
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [navigate])

	return (
		<AuthContext.Provider value={{ token, setToken }}>
			{children}
		</AuthContext.Provider>
	)
}
