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
	defaultImage?: string
	register: UseFormRegister<FormInputs>
	error?: string
}

export interface IButton {
	type?: 'button' | 'reset' | 'submit' | undefined
	text: string
	variant: 'signin' | 'signup' | 'cancel' | 'add' | 'save'
	disabled?: boolean
	onClick?: () => void
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

export interface IOption {
	value: number
	label: string
}

export interface ISelect {
	options: IOption[]
	selected: IOption
	onSelect: (selected: IOption) => void
}

export const paginateOptions: IOption[] = [
	{ value: 6, label: '6' },
	{ value: 12, label: '12' },
	{ value: 24, label: '24' },
]
