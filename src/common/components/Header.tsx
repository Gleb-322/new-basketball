import styled from 'styled-components'
import { ReactComponent as AppLogoSVG } from '../../assets/images/logo.svg'
import { ReactComponent as UserIconSVG } from '../../assets/icons/profile.svg'
import { ReactComponent as BurgerIconSVG } from '../../assets/icons/menu.svg'
import { FC } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { toggleNavbar } from '../../core/redux/uiSlice'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { device } from '../helpers/breakpoint'

export const Header: FC = () => {
	const { userName } = useAppSelector(state => state.user)
	const { isNavbarOpen, windowSize } = useAppSelector(state => state.ui)
	const dispatch = useAppDispatch()

	return (
		<Container>
			<>
				<BurgerMenu type={'button'} onClick={() => dispatch(toggleNavbar())}>
					<BurgerIconSVG />
				</BurgerMenu>

				<AppLogoSVG />
			</>
			<User>
				{isNavbarOpen && windowSize >= 1024 ? (
					<>
						<UserName>{userName ? userName : null}</UserName>
						<UserIconStyled />
					</>
				) : null}
			</User>
		</Container>
	)
}

const Container = styled.header`
	height: 80px;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white};
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 1px 10px 0 rgba(209, 209, 209, 0.5);
	padding: 0 50px;
	position: sticky;
	top: 0;
	z-index: 20;
	@media ${device.laptop} {
		padding: 0 12px;
	}
	@media ${device.tablet} {
		height: 62px;
	}
`
const User = styled.div`
	display: flex;
	align-items: center;
`
const UserIconStyled = styled(UserIconSVG)`
	width: 36px;
	height: 36px;
	margin-left: 16px;
`

const UserName = styled.div`
	font-size: 14px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.darkGrey};
	font-family: 'Avenir Medium';
	line-height: 24px;
`
const BurgerMenu = styled.button`
	display: none;
	background-color: inherit;
	border: none;
	cursor: pointer;
	@media ${device.laptop} {
		display: block;
	}
`
