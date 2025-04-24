import { NavLink, useLocation, useNavigate } from 'react-router'
import styled from 'styled-components'
import { ReactComponent as TeamsSVG } from '../../assets/icons/group-person.svg'
import { ReactComponent as TeamsSVGRed } from '../../assets/icons/group-person-red.svg'
import { ReactComponent as PlayersSVG } from '../../assets/icons/person.svg'
import { ReactComponent as PlayersSVGRed } from '../../assets/icons/person-red.svg'
import { ReactComponent as SignOutSVGRed } from '../../assets/icons/input.svg'
import { ReactComponent as UserIconSVG } from '../../assets/icons/profile.svg'
import { FC, useEffect } from 'react'
import { showToast } from '../../ui/ToastrNotification'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { logoutUserThunk } from '../../api/users/userThunks'
import { resetUserState } from '../../core/redux/userSlice'
import { RootState } from '../../core/redux/store'
import { device } from '../helpers/breakpoint'

export const Navbar: FC = () => {
	const dispatch = useAppDispatch()
	const { logoutMessage, error, status, token } = useAppSelector(
		(state: RootState) => state.user
	)
	const { userName } = useAppSelector((state: RootState) => state.user)
	const { isNavbarOpen, windowSize } = useAppSelector(
		(state: RootState) => state.ui
	)
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (status === 'success' && logoutMessage) {
			navigate('/signin')
			showToast({ type: 'success', message: logoutMessage })
		}
		if (status === 'error' && error) {
			showToast({ type: 'error', message: error })
		}
		return () => {
			dispatch(resetUserState())
		}
	}, [dispatch, error, logoutMessage, navigate, status])

	return (
		<>
			<Container $isOpen={isNavbarOpen}>
				<ListNavLinks>
					{(isNavbarOpen && windowSize < 1024) ||
					(!isNavbarOpen && windowSize < 1024) ? (
						<User>
							<UserIconStyled />
							<UserName>{userName ? userName : null}</UserName>
						</User>
					) : null}

					<StyledNavLink to="/teams">
						{location.pathname.includes('/teams') ? (
							<TeamsSVGRed />
						) : (
							<TeamsSVG />
						)}

						<Text>Teams</Text>
					</StyledNavLink>

					<StyledNavLink to="/players">
						{location.pathname.includes('/players') ? (
							<PlayersSVGRed />
						) : (
							<PlayersSVG />
						)}

						<Text>Players</Text>
					</StyledNavLink>
				</ListNavLinks>

				<SignOut type="button" onClick={() => dispatch(logoutUserThunk(token))}>
					<SignOutSVGRed />
					<Text>Sign out</Text>
				</SignOut>
			</Container>
		</>
	)
}

const Container = styled.nav<{
	$isOpen: boolean
}>`
	background-color: ${({ theme }) => theme.colors.white};
	width: 140px;
	height: calc(100vh - 80px);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	z-index: 20;
	position: sticky;
	left: 0;
	top: 80px;
	padding-bottom: 32px;
	@media ${device.laptop} {
		width: 30%;
		position: fixed;
		align-items: flex-start;
		transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
	}
	@media ${device.tablet} {
		height: calc(100vh - 62px);
		top: 62px;
		width: 50%;
	}
`

const ListNavLinks = styled.div`
	width: 100%;
	height: 25%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	@media ${device.laptop} {
		height: 23%;
		align-items: flex-start;
		justify-content: space-between;
	}
`

const User = styled.div`
	display: flex;
	width: 100%;
	height: 80px;
	align-items: center;
	border-bottom: solid 0.5px ${({ theme }) => theme.colors.lightGrey};
	@media ${device.laptop} {
		padding-left: 16px;
	}
`

const UserIconStyled = styled(UserIconSVG)`
	width: 48px;
	height: 48px;
`

const UserName = styled.div`
	flex: 1;
	margin-left: 8px;
	font-size: 14px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.darkGrey};
	font-family: 'Avenir Medium';
	line-height: 24px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	@media ${device.laptop} {
		font-size: 15px;
	}
`

const StyledNavLink = styled(NavLink)`
	width: 100%;
	color: ${({ theme }) => theme.colors.lightGrey};
	font-size: 12px;
	font-family: 'Avenir Medium';
	font-weight: 500;
	line-height: 18px;
	text-decoration: none;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	&.active {
		color: ${({ theme }) => theme.colors.red};
	}
	@media ${device.laptop} {
		padding-left: 20px;
		flex-direction: row;
		font-size: 13px;
	}
`
const Text = styled.span`
	@media ${device.laptop} {
		margin-left: 8px;
	}
`

const SignOut = styled.button`
	width: 100%;
	cursor: pointer;
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.lightestRed};
	border: none;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 12px;
	font-family: 'Avenir Medium';
	font-weight: 500;
	line-height: 18px;
	@media ${device.laptop} {
		padding-left: 20px;
		flex-direction: row;
		font-size: 13px;
	}
`
