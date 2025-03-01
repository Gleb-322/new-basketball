import { FC } from 'react'
import { IButton } from '../common/interfaces/types'
import styled from 'styled-components'

export const ButtonComponent: FC<IButton> = ({
	type,
	text,
	variant,
	disabled,
	onClick,
}) => {
	const isAuthButton = variant === 'signup' || variant === 'signin'

	return (
		<Button
			type={type}
			$variant={variant}
			onClick={onClick}
			disabled={isAuthButton ? !disabled : false}
		>
			{text}
		</Button>
	)
}

const Button = styled.button<{
	$variant: 'signin' | 'signup' | 'cancel' | 'add' | 'save'
}>`
	cursor: pointer;
	margin-top: ${({ $variant }) =>
		$variant === 'add' || $variant === 'signup' ? '0px' : '12px'};
	margin-bottom: ${({ $variant }) => ($variant === 'add' ? '0px' : '24px')};
	width: ${({ $variant }) =>
		$variant === 'add'
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
`
