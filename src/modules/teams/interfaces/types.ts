import { IPlayers } from '../../players/interfaces/types'

export interface ITeams {
	__v: number
	_id: string
	name: string
	division: string
	conference: string
	year: number
	teamImg: { type: string; data: number[] }
	players: IPlayers[]
}

export interface ITeamList {
	teams: ITeams[]
	avatars: { [key: string]: string }
	teamsLimit: number
}

export interface IAddTeamFormFields {
	teamName: string
	teamDivision: string
	teamConference: string
	teamYear: string
	teamImage?: FileList
}

export interface ISelect {
	options: IOption[]
	selected: IOption
	onSelect: (selected: IOption) => void
}

export interface IOption {
	value: number
	label: string
}

export interface ITeamHeader {
	search: string
	onSearch: (value: string) => void
}

export const paginateOptions: IOption[] = [
	{ value: 6, label: '6' },
	{ value: 12, label: '12' },
	{ value: 24, label: '24' },
]
