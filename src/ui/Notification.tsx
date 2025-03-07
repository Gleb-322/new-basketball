import { FC } from 'react'
import { INotification } from '../common/interfaces/types'
import styled from 'styled-components'

export const NotificationComponent: FC<INotification> = ({
	message,
	close,
	error,
}) => {
	return (
		<Container $error={error} onClick={() => close()}>
			{message}
		</Container>
	)
}

const Container = styled.div<{
	$error: boolean
}>`
	position: fixed;
	cursor: pointer;
	z-index: 40;
	top: 36px;
	right: 36px;
	height: 40px;
	padding: 8px 16px;
	border-radius: 4px;
	background-color: ${({ theme, $error }) =>
		$error ? theme.colors.lightRed : theme.colors.green};
	font-family: 'Avenir Medium';
	font-size: 16px;
	font-weight: 500;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.white};
	&:hover {
		background-color: ${({ theme, $error }) =>
			$error ? theme.colors.lightestRed : theme.colors.ligthGreen};
	}
`
