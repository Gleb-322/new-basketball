import { FC } from 'react'
import styled from 'styled-components'

export const CheckboxComponent: FC<{
	isChecked: boolean
	label: string
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}> = props => {
	return (
		<CheckBox>
			<Input
				id={props.label}
				type="checkbox"
				onChange={props.handleChange}
				checked={props.isChecked}
			/>
			<Label htmlFor={props.label}>{props.label}</Label>
		</CheckBox>
	)
}

const CheckBox = styled.div``
const Input = styled.input``

const Label = styled.label``
