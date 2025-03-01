import { IPlayers } from '../../players/interfaces/types'

export interface ITeams {
	__v: number
	_id: string
	name: string
	division: string
	conference: string
	year: string
	teamImg: { type: string; data: number[] }
	players: IPlayers[]
}

export interface ITeamList {
	teams: ITeams[]
	avatars: { [key: string]: string }
}

export interface IAddAndUpdateTeamFormFields {
	teamName: string
	teamDivision: string
	teamConference: string
	teamYear: string
	teamImage?: FileList
}

export interface ITeamHeader {
	search: string
	onSearch: (value: string) => void
}
