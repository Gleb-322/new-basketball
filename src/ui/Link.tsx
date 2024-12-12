import { FC } from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import { ILink } from '../common/interfaces/types'

export const LinkComponent: FC<ILink> = ({ text, route }) => {
	return <StyledLink to={route}>{text}</StyledLink>
}

const StyledLink = styled(Link)`
	color: ${({ theme }) => theme.colors.red};
	margin-left: 4px;
	outline: none;
	&:disabled {
		color: ${({ theme }) => theme.colors.lightestGrey};
	}
`
