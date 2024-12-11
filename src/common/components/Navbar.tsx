import { NavLink, useLocation } from 'react-router'
import styled from 'styled-components'
import { ReactComponent as TeamsSVG } from '../../assets/icons/group-person.svg'
import { ReactComponent as TeamsSVGRed } from '../../assets/icons/group-person-red.svg'
import { ReactComponent as PlayersSVG } from '../../assets/icons/person.svg'
import { ReactComponent as PlayersSVGRed } from '../../assets/icons/person-red.svg'
import { ReactComponent as SignOutSVGRed } from '../../assets/icons/input.svg'

export const Navbar = () => {
	const location = useLocation()

	return (
		<Container>
			<List>
				<StyledLink to="/teams">
					{location.pathname === '/teams' ||
					location.pathname === '/teams/add' ||
					location.pathname === '/teams/detail' ? (
						<TeamsSVGRed />
					) : (
						<TeamsSVG />
					)}
					Teams
				</StyledLink>
				<StyledLink to="/players">
					{location.pathname === '/players' ||
					location.pathname === '/players/add' ||
					location.pathname === '/players/detail' ? (
						<PlayersSVGRed />
					) : (
						<PlayersSVG />
					)}
					Players
				</StyledLink>
			</List>
			<SignOut type="button">
				<SignOutSVGRed /> <br />
				Sign out
			</SignOut>
		</Container>
	)
}

const Container = styled.nav`
	background-color: ${({ theme }) => theme.colors.white};
	width: 140px;
	height: calc(100vh - 80px);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	z-index: 8;
	position: sticky;
	left: 0;
	top: 80px;
	padding: 32px 45px;
`

const List = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const StyledLink = styled(NavLink)`
	color: ${({ theme }) => theme.colors.lightGrey};
	font-size: 12px;
	font-family: 'Avenir Medium';
	font-weight: 500;
	line-height: 18px;
	text-decoration: none;
	margin-bottom: 35px;
	width: 50px;
	height: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	&.active {
		color: ${({ theme }) => theme.colors.red};
	}
`

const SignOut = styled.button`
	cursor: pointer;
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.lightestRed};
	border: none;
	font-size: 12px;
	font-family: 'Avenir Medium';
	font-weight: 500;
	line-height: 18px;
`
