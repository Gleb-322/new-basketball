import { FC, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as OpenEyeSVG } from '../assets/icons/eye.svg'
import { ReactComponent as CloseEyeSVG } from '../assets/icons/close-eye.svg'
import { IInputProps } from '../common/interfaces/types'

export const InputComponent: FC<IInputProps<any>> = <
	FormInputs extends Record<string, any>
>({
	type,
	name,
	id,
	focus,
	label,
	register,
	error,
}: IInputProps<FormInputs>) => {
	const [isOpen, setOpen] = useState<boolean>(false)
	return (
		<Container $typeinput={type}>
			{type === 'checkbox' ? (
				<>
					<Label $typeinput={type} $errormessage={error}>
						<InputCheckbox
							{...register(name)}
							autoComplete="off"
							id={id}
							autoFocus={focus}
							type={type}
							$errormessage={error}
						/>
						<PseudoInputCheckbox $errormessage={error} />
						{label}
					</Label>
				</>
			) : (
				<>
					<Label $typeinput={type} $errormessage={error} htmlFor={id}>
						{label}
					</Label>
					<Input
						{...register(name)}
						autoComplete="off"
						type={isOpen ? 'text' : type}
						id={id}
						autoFocus={focus}
						$typeinput={type}
						$errormessage={error}
					/>
				</>
			)}
			{type === 'password' ? (
				<PasswordIcon type="button" onClick={() => setOpen(perv => !perv)}>
					{isOpen ? <OpenEyeSVG /> : <CloseEyeSVG />}
				</PasswordIcon>
			) : null}
			{error && <InputError>{error}</InputError>}
		</Container>
	)
}

const Container = styled.div<{
	$typeinput: string
}>`
	position: relative;
	height: ${({ $typeinput }) => ($typeinput === 'checkbox' ? '46px' : '92px')};
`

const Label = styled.label<{
	$typeinput: string
	$errormessage: string | undefined
}>`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 14px;
	line-height: 24px;
	cursor: pointer;
	color: ${({ theme, $typeinput, $errormessage }) =>
		$typeinput === 'checkbox' && $errormessage
			? theme.colors.lightestRed
			: theme.colors.grey};
	display: ${({ $typeinput }) =>
		$typeinput === 'checkbox' ? 'flex' : 'inline'};
	align-items: ${({ $typeinput }) =>
		$typeinput === 'checkbox' ? 'center' : 'none'};
`
const Input = styled.input<{
	$typeinput: string
	$errormessage: string | undefined
}>`
	width: 100%;
	height: 40px;
	margin-top: 8px;
	border-radius: 4px;
	background-color: ${({ theme }) => theme.colors.mostLightGrey};
	color: ${({ theme }) => theme.colors.darkGrey};
	padding: ${({ $typeinput }) =>
		$typeinput === 'password' ? '8px 30px 8px 12px' : '8px 12px'};
	font-family: 'Avenir Medium';
	font-size: 14px;
	font-weight: 500;
	line-height: 24px;
	border: ${({ $errormessage, theme }) =>
		$errormessage
			? `solid 1px ${theme.colors.lightestRed}`
			: `solid 1px ${theme.colors.mostLightGrey}`};
	outline: none;
	&:hover {
		background-color: ${({ theme }) => theme.colors.lightestGrey};
		border: ${({ $errormessage, theme }) =>
			$errormessage
				? `solid 1px ${theme.colors.lightestRed}`
				: `solid 1px ${theme.colors.lightestGrey}`};
	}
	&:focus {
		box-shadow: 0 0 5px 0 ${({ theme }) => theme.colors.focusInput};
	}
	&:disabled {
		color: ${({ theme }) => theme.colors.lightestGrey};
		&:hover {
			background-color: ${({ theme }) => theme.colors.mostLightGrey};
			border: ${({ $errormessage, theme }) =>
				$errormessage
					? `solid 1px ${theme.colors.lightestRed}`
					: `solid 1px ${theme.colors.mostLightGrey}`};
		}
	}
`

const PseudoInputCheckbox = styled.div<{
	$errormessage: string | undefined
}>`
	width: 12px;
	height: 12px;
	position: relative;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 2px;
	margin-right: 10px;
	border: ${({ theme, $errormessage }) =>
		$errormessage
			? `solid 1px ${theme.colors.lightestRed}`
			: `solid 1px ${theme.colors.lightGrey}`};
	&::after {
		content: '';
		position: absolute;
		left: 4.7px;
		top: 1.2px;
		width: 2.3px;
		height: 5.5px;
		border: ${({ theme }) => `solid ${theme.colors.white}`};
		border-width: 0 1.5px 1.5px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
`

const InputCheckbox = styled.input<{
	$errormessage: string | undefined
}>`
	width: 0px;
	height: 0px;

	&:hover + ${PseudoInputCheckbox} {
		border: ${({ theme }) => `solid 1px ${theme.colors.red}`};
	}
	&:checked + ${PseudoInputCheckbox} {
		background-color: ${({ theme }) => theme.colors.red};
		border: ${({ theme }) => `solid 1px ${theme.colors.red}`};
	}
`

const PasswordIcon = styled.button`
	width: 16px;
	height: 16px;
	background-color: inherit;
	outline: none;
	border: none;
	cursor: pointer;
	position: absolute;
	top: 44px;
	right: 12px;
`

const InputError = styled.div`
	margin-top: 2px;
	margin-bottom: 4px;
	font-family: 'Avenir Medium';
	font-size: 12px;
	font-weight: 500;
	line-height: 18px;
	color: ${({ theme }) => theme.colors.lightestRed};
`
