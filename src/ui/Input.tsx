import { FC, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as OpenEyeSVG } from '../assets/icons/eye.svg'
import { ReactComponent as CloseEyeSVG } from '../assets/icons/close-eye.svg'
import { IInput } from '../common/interfaces/types'

export const InputComponent: FC<IInput> = ({
	type,
	name,
	id,
	focus,
	label,
}) => {
	const [isOpen, setOpen] = useState<boolean>(false)
	return (
		<Container>
			<Label htmlFor={id}>{label}</Label>
			<Input
				$typeinput={type}
				autoComplete="off"
				type={isOpen ? 'text' : type}
				name={name}
				id={id}
				autoFocus={focus}
			/>
			{type === 'password' ? (
				<PasswordIcon type="button" onClick={() => setOpen(perv => !perv)}>
					{isOpen ? <OpenEyeSVG /> : <CloseEyeSVG />}
				</PasswordIcon>
			) : null}
		</Container>
	)
}

const Container = styled.div`
	position: relative;
`

const Label = styled.label`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 14px;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.grey};
`
const Input = styled.input<{
	$typeinput: string
}>`
	margin-bottom: 24px;
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
	border: solid 1px ${({ theme }) => theme.colors.mostLightGrey};
	outline: none;
	&:hover {
		background-color: ${({ theme }) => theme.colors.lightestGrey};
		border: solid 1px ${({ theme }) => theme.colors.lightestGrey};
	}
	&:focus {
		box-shadow: 0 0 5px 0 ${({ theme }) => theme.colors.focusInput};
	}
	&:disabled {
		color: ${({ theme }) => theme.colors.lightestGrey};
		&:hover {
			background-color: ${({ theme }) => theme.colors.mostLightGrey};
			border: solid 1px ${({ theme }) => theme.colors.mostLightGrey};
		}
	}
	&:invalid {
		border: solid 1px ${({ theme }) => theme.colors.lightestRed};
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
