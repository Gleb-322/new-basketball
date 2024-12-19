import { FC } from 'react'
import { INotification } from '../common/interfaces/types'
import styled from 'styled-components'

export const NotificationComponent: FC<INotification> = ({
	message,
	close,
}) => {
	return <Container onClick={() => close(true)}>{message}</Container>
}

const Container = styled.div`
	position: absolute;
	cursor: pointer;
	z-index: 40;
	top: 36px;
	right: 36px;
	height: 40px;
	padding: 8px 16px;
	border-radius: 4px;
	background-color: ${({ theme }) => theme.colors.lightRed};
	font-family: 'Avenir Medium';
	font-size: 16px;
	font-weight: 500;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.white};
	&:hover {
		background-color: ${({ theme }) => theme.colors.lightestRed};
	}
`
