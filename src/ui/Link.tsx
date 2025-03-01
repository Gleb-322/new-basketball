import { FC } from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import { ILink } from '../common/interfaces/types'

export const LinkComponent: FC<ILink> = ({ text, route }) => {
	return (
		<StyledLink to={route} $routename={route}>
			{text}
		</StyledLink>
	)
}

const StyledLink = styled(Link)<{
	$routename: string
}>`
	color: ${({ theme }) => theme.colors.red};
	margin-left: ${({ $routename }) =>
		$routename === '/teams' || $routename === '/players' ? '0px' : '4px'};
	outline: none;
	text-decoration: ${({ $routename }) =>
		$routename === '/teams' || $routename === '/players'
			? 'none'
			: 'underline'};
	&:disabled {
		color: ${({ theme }) => theme.colors.lightestGrey};
	}
`
