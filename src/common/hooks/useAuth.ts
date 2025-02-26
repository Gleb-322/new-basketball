import { useContext } from 'react'
import { AuthContext } from '../helpers/AuthContext'

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error('useAuth must be used with AuthProvider!')
	}

	return context
}
