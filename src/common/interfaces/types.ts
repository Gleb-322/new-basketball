export interface IInput {
	type: string
	id: string
	name: string
	focus: boolean
	label: string
}

export interface IButton {
	type: 'button' | 'reset' | 'submit' | undefined
	text: string
	add: boolean
	signin?: boolean
	signup?: boolean
	save: boolean
	cancel: boolean
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
}
