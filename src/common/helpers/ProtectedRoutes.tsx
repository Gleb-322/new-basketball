import Cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router'

export const ProtectedRoutes = () => {
	const token = Cookies.get('token')
	return token !== undefined ? <Outlet /> : <Navigate to="/signin" />
}
