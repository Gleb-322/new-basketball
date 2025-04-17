import { FC } from 'react'
import { IButton } from '../common/interfaces/types'
import styled from 'styled-components'
import { device } from '../common/helpers/breakpoint'

export const ButtonComponent: FC<IButton> = ({
	type,
	text,
	variant,
	disabled,
	onClick,
}) => {
	const isAuthAndIsTeams =
		variant === 'signup' || variant === 'signin' || variant === 'addPlayer'

	return (
		<Button
			type={type}
			$variant={variant}
			onClick={onClick}
			disabled={isAuthAndIsTeams ? !disabled : false}
		>
			{text}
		</Button>
	)
}

const Button = styled.button<{
	$variant: 'signin' | 'signup' | 'cancel' | 'addPlayer' | 'addTeam' | 'save'
}>`
	cursor: pointer;
	margin-top: ${({ $variant }) =>
		$variant === 'addPlayer' || $variant === 'addTeam' || $variant === 'signup'
			? '0px'
			: '12px'};
	margin-bottom: ${({ $variant }) =>
		$variant === 'addPlayer' || $variant === 'addTeam' ? '0px' : '24px'};
	width: ${({ $variant }) =>
		$variant === 'addPlayer' || $variant === 'addTeam'
			? '105px'
			: $variant === 'cancel' || $variant === 'save'
			? '45%'
			: '100%'};
	height: 40px;
	background-color: ${({ theme, $variant }) =>
		$variant === 'cancel' ? theme.colors.white : theme.colors.red};
	color: ${({ theme, $variant }) =>
		$variant === 'cancel' ? theme.colors.lightGrey : theme.colors.white};
	font-family: 'Avenir Medium';
	font-size: 15px;
	line-height: 24px;
	font-weight: 500;
	padding: 8px 0;
	border: ${({ theme, $variant }) =>
		$variant === 'cancel' ? `solid 1px ${theme.colors.lightGrey}` : 'none'};
	border-radius: 4px;
	outline: none;
	&:hover {
		background-color: ${({ theme, $variant }) =>
			$variant === 'cancel'
				? theme.colors.lightestGrey
				: theme.colors.lightRed};
	}
	&:active {
		background-color: ${({ theme, $variant }) =>
			$variant === 'cancel' ? theme.colors.lightGrey : theme.colors.darkRed};
		border: ${({ theme, $variant }) =>
			$variant === 'cancel' ? `solid 1px ${theme.colors.grey}` : 'none'};
		color: ${({ theme, $variant }) =>
			$variant === 'cancel' ? theme.colors.grey : theme.colors.white};
	}
	&:disabled {
		background-color: ${({ theme }) => theme.colors.mostLightGrey};
		color: ${({ theme }) => theme.colors.lightestGrey};
		border: ${({ theme, $variant }) =>
			$variant === 'cancel' ? `solid 1px ${theme.colors.lightGrey}` : 'none'};
		&:hover {
			background-color: ${({ theme }) => theme.colors.mostLightGrey};
		}
	}

	@media ${device.customForTeamHeader} {
		width: ${({ $variant }) =>
			$variant === 'addPlayer' || $variant === 'addTeam' ? '100%' : null};
	}
`
