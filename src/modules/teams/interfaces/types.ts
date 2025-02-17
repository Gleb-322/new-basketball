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
}
