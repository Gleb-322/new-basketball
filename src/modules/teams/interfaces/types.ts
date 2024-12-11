import { IPlayers } from '../../players/interfaces/types'

export interface ITeams {
	_id: string
	name: string
	division: string
	conference: string
	year: number
	teamImg: string
	players: IPlayers[]
}
