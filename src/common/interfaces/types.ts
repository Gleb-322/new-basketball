import { SetStateAction } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

export interface ISigninFormFields {
	loginSignin: string
	passwordSignin: string
}

export interface ISignupFormFields {
	nameSignup: string
	loginSignup: string
	passwordSignup: string
	passwordAgainSignup: string
	checkboxSignUp?: boolean
}

export interface IInputProps<FormInputs extends FieldValues> {
	type: string
	id: string
	name: Path<FormInputs>
	focus?: boolean
	label?: string
	register: UseFormRegister<FormInputs>
	error?: string
}

export interface IButton {
	type: 'button' | 'reset' | 'submit' | undefined
	text: string
	add?: boolean
	signin?: boolean
	signup?: boolean
	save?: boolean
	cancel?: boolean
	formValid?: boolean
	signUpHandler?: () => void
	signInHandler?: () => void
	addTeamHandler?: () => void
	createTeamHandler?: () => void
	cancelTeamHandler?: () => void
}

export interface ILink {
	route: string
	text: string
}

export interface ISearch {
	type: string
	id: string
	name: string
	search: string
	onSearch: (value: string) => void
}

export interface INotification {
	message: string | null
	error: boolean
	close: () => void
}

export interface IRequestBaseBody {
	method: string
	body?: string | FormData
}

export interface IPagination {
	pageClick: (data: { selected: SetStateAction<number> }) => void
	countPage: number
}

export interface IAuthContext {
	token: string | undefined
	setToken: (token: string | undefined) => void
}
