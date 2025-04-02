import { Dayjs } from 'dayjs'
import { SetStateAction } from 'react'
import {
	FieldValues,
	Path,
	RefCallBack,
	UseFormRegister,
	UseFormResetField,
	UseFormSetValue,
	UseFormTrigger,
} from 'react-hook-form'
import { IAddAndUpdatePlayerFormFields } from '../../modules/players/interfaces/types'
import { OnChangeValue } from 'react-select'
import { IAddAndUpdateTeamFormFields } from '../../modules/teams/interfaces/types'

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
	resetFieldPlayerImage?: UseFormResetField<IAddAndUpdatePlayerFormFields>
	triggerTeamImage?: UseFormTrigger<IAddAndUpdateTeamFormFields>
	triggerPlayerImage?: UseFormTrigger<IAddAndUpdatePlayerFormFields>
	setTeamImage?: UseFormSetValue<IAddAndUpdateTeamFormFields>
	error?: string
}

export interface IButton {
	type?: 'button' | 'reset' | 'submit' | undefined
	text: string
	variant: 'signin' | 'signup' | 'cancel' | 'addPlayer' | 'addTeam' | 'save'
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
	message: string | undefined
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
	value: string
	label: string
	teamId?: string
}

interface ISelectBase {
	options: IOption[]
	name?: string
	id?: string
	inputRef?: RefCallBack
	label?: string
	error?: string
	isLoading?: boolean
	variant: 'pagination' | 'player'
}

interface ISelectForPlayers extends ISelectBase {
	variant: 'player'
	selected: IOption | undefined | null
	onChange: (option: IOption | null) => void
}

interface ISelectForPagination extends ISelectBase {
	variant: 'pagination'
	selected: IOption
	onChange: (option: IOption) => void
}

export type ISelect = ISelectForPlayers | ISelectForPagination

export interface IMultiSelect {
	options: IOption[]
	isLoading: boolean
	onMultiValue: (value: OnChangeValue<IOption, true>) => void
}

export const paginateOptions: IOption[] = [
	{ value: '6', label: '6' },
	{ value: '12', label: '12' },
	{ value: '24', label: '24' },
]

export interface IDatePicker {
	name: string
	id: string
	label: string
	inputRef?: RefCallBack
	value: Dayjs | null
	error?: string
	onChange: (newValue: Dayjs | null) => void
}

export interface IToastNotificationProps {
	type: 'success' | 'error'
	message: string
}

export interface IUsers {
	name: string
	login: string
	password: string
	tokens?: { token: string }[]
}

export interface ICreateUserResponse {
	errorCode: string
	success: boolean
	message: { user: IUsers; token: string } | string
}

export interface ILoginUserResponse {
	errorCode: string
	success: boolean
	message: { user: IUsers; token: string } | string
}

export interface ILogoutUserResponse {
	errorCode: string
	success: boolean
	message: string
}

// Пользовательский тип ошибки для удобной передачи в компоненты
export type CustomError = {
	isCustomError: true
	status: number
	message?: string
}
