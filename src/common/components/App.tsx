import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router'
import { ThemeProvider } from 'styled-components'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'
import { MainLayout } from './MainLayout'
import { NotFound } from './NotFound'
import { TeamDashboard } from '../../modules/teams/components/TeamDashboard'
import { TeamLayout } from '../../modules/teams/components/TeamLayout'
import { TeamCreateAndUpdate } from '../../modules/teams/components/TeamAddAndUpdate'
import { TeamDetail } from '../../modules/teams/components/TeamDetail'
import { PlayerLayout } from '../../modules/players/components/PlayerLayout'
import { PlayerDashboard } from '../../modules/players/components/PlayerDashboard'
import { PlayerDetail } from '../../modules/players/components/PlayerDetail'
import { PlayerCreateAndUpdate } from '../../modules/players/components/PlayerAddAndUpdate'
import { ToastNotification } from '../../ui/ToastrNotification'
import { useAppSelector } from '../hooks/useAppSelector'
import { useEffect } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { resetToken } from '../../core/redux/userSlice'
import { getAuthCookie } from '../helpers/setAuthToken'
import { LoaderComponent } from '../../ui/Loader'

const theme = {
	colors: {
		overlay: '#414141',
		lightOverlay: '#6d6666',
		darkGrey: '#303030',
		grey: '#707070',
		gradientCard: 'linear-gradient(118deg, #303030 2%, #707070 82%)',
		gradientCardTablet: 'linear-gradient(121deg, #303030 2%, #707070 79%)',
		gradientTeamDetail: ' linear-gradient(109deg, #707070 0%, #393939 100%);',
		lightGrey: '#9c9c9c',
		lightestGrey: '#d1d1d1',
		mostLightGrey: '#f6f6f6',
		focusInput: '#d9d9d9',
		darkRed: '#c60e2e',
		red: '#e4163a',
		lightRed: '#ff5761',
		lightestRed: '#ff768e',
		blue: '#344472',
		whiteBlue: '#f5fbff',
		white: '#ffffff',
		green: '#008000',
		ligthGreen: '#228B22',
	},
}

export const App = () => {
	const { token } = useAppSelector(state => state.user)
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	useEffect(() => {
		const cookieToken = getAuthCookie()

		if (!cookieToken && token) {
			dispatch(resetToken())
		}

		if (!token && !['signin', 'signup'].includes(location.pathname)) {
			navigate('/signin')
		}
	}, [dispatch, location.pathname, navigate, token])

	return (
		<ThemeProvider theme={theme}>
			<LoaderComponent />
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="/" element={<Navigate to="/teams" />} />
					<Route path="teams" element={<TeamLayout />}>
						<Route index element={<TeamDashboard />} />
						<Route path="add" element={<TeamCreateAndUpdate />} />
						<Route path=":_id" element={<TeamDetail />} />
					</Route>

					<Route path="players" element={<PlayerLayout />}>
						<Route index element={<PlayerDashboard />} />
						<Route path="add" element={<PlayerCreateAndUpdate />} />
						<Route path=":_id" element={<PlayerDetail />} />
					</Route>
				</Route>

				<Route path="signin" element={<SignIn />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ToastNotification />
		</ThemeProvider>
	)
}
