import { FC } from 'react'
import { IButton } from '../common/interfaces/types'
import styled from 'styled-components'

export const ButtonComponent: FC<IButton> = ({
	type,
	text,
	add,
	cancel,
	save,
	signin,
	signup,
	signInHandler,
	signUpHandler,
	addTeamHandler,
	createTeamHandler,
	cancelTeamHandler,
}) => {
	const handlerClick = () => {
		if (signin) {
			signInHandler!()
		}

		if (signup) {
			signUpHandler!()
		}

		if (add) {
			addTeamHandler!()
		}

		if (save) {
			createTeamHandler!()
		}

		if (cancel) {
			cancelTeamHandler!()
		}
	}
	return (
		<Button
			type={type}
			$add={add}
			$cancel={cancel}
			$save={save}
			onClick={handlerClick}
		>
			{text}
		</Button>
	)
}

const Button = styled.button<{
	$add: boolean
	$cancel: boolean
	$save: boolean
}>`
	cursor: pointer;
	margin-bottom: 24px;
	width: ${({ $add, $cancel, $save }) =>
		$add ? '105px' : $cancel || $save ? '45%' : '100%'};
	height: 40px;
	background-color: ${({ theme, $cancel }) =>
		$cancel ? theme.colors.white : theme.colors.red};
	color: ${({ theme, $cancel }) =>
		$cancel ? theme.colors.lightGrey : theme.colors.white};
	font-family: 'Avenir Medium';
	font-size: 15px;
	line-height: 24px;
	font-weight: 500;
	padding: 8px 0;
	border: ${({ theme, $cancel }) =>
		$cancel ? `solid 1px ${theme.colors.lightGrey}` : 'none'};
	border-radius: 4px;
	outline: none;
	&:hover {
		background-color: ${({ theme, $cancel }) =>
			$cancel ? theme.colors.lightestGrey : theme.colors.lightRed};
	}
	&:active {
		background-color: ${({ theme, $cancel }) =>
			$cancel ? theme.colors.lightGrey : theme.colors.darkRed};
		border: ${({ theme, $cancel }) =>
			$cancel ? `solid 1px ${theme.colors.grey}` : 'none'};
		color: ${({ theme, $cancel }) =>
			$cancel ? theme.colors.grey : theme.colors.white};
	}
	&:disabled {
		background-color: ${({ theme }) => theme.colors.mostLightGrey};
		color: ${({ theme }) => theme.colors.lightestGrey};
		border: ${({ theme, $cancel }) =>
			$cancel ? `solid 1px ${theme.colors.lightGrey}` : 'none'};
		&:hover {
			background-color: ${({ theme }) => theme.colors.mostLightGrey};
		}
	}
`
