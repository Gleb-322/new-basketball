import { Navigate, Route, Routes } from 'react-router'
import { ThemeProvider } from 'styled-components'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'
import { MainLayout } from './MainLayout'
import { NotFound } from './NotFound'
import { TeamDashboard } from '../../modules/teams/components/TeamDashboard'
import { TeamLayout } from '../../modules/teams/components/TeamLayout'
import { TeamDetail } from '../../modules/teams/components/TeamDetail'
import { PlayerLayout } from '../../modules/players/components/PlayerLayout'
import { PlayerDashboard } from '../../modules/players/components/PlayerDashboard'
import { PlayerDetail } from '../../modules/players/components/PlayerDetail'
import { TeamAdd } from '../../modules/teams/components/TeamAdd'
import { PlayerAdd } from '../../modules/players/components/PlayersAdd'

const theme = {
	colors: {
		darkGrey: '#303030',
		grey: '#707070',
		gradientCard: 'linear-gradient(118deg, #303030 2%, #707070 82%)',
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
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="/" element={<Navigate to="/teams" />} />
					<Route path="teams" element={<TeamLayout />}>
						<Route index element={<TeamDashboard />} />
						<Route path="add" element={<TeamAdd />} />
						<Route path=":_id" element={<TeamDetail />} />
					</Route>

					<Route path="players" element={<PlayerLayout />}>
						<Route index element={<PlayerDashboard />} />
						<Route path="add" element={<PlayerAdd />} />
						<Route path=":_id" element={<PlayerDetail />} />
					</Route>
				</Route>

				<Route path="signin" element={<SignIn />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</ThemeProvider>
	)
}
