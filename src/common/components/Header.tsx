import styled from 'styled-components'
import { ReactComponent as AppLogoSVG } from '../../assets/images/logo.svg'
import { ReactComponent as UserIconSVG } from '../../assets/icons/profile.svg'
import { FC } from 'react'
import Cookies from 'js-cookie'

export const Header: FC = () => {
	return (
		<Container>
			<AppLogoSVG />
			<User>
				<UserName>
					{Cookies.get('name') !== undefined ? Cookies.get('name') : null}
				</UserName>
				<UserIconStyled />
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
	z-index: 10;
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
