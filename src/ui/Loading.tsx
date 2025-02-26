import { FC } from 'react'
import styled from 'styled-components'

export const LoadingComponent: FC = () => {
	return <Loading>Loading...</Loading>
}

const Loading = styled.div`
	font-family: 'Avenir Book';
	font-size: 36px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.blue};
`
