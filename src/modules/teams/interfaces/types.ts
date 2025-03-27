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
	teamImage?: FileList | undefined
}

export interface IUpdateTeamData extends IAddAndUpdateTeamFormFields {
	teamId?: string
}

export interface ITeamHeader {
	search: string
	onSearch: (value: string) => void
}

export interface IAddAndUpdateTeamLocationState {
	state?: { team: ITeams }
}

export interface IDashTeamLocationState {
	state?: { createTeam?: string; updateTeam?: string; deleteTeam?: string }
}

export interface ICreateTeamResponse {
	errorCode: string
	success: boolean
	message: { team: ITeams } | string
}

export interface IGetTeamsResponse {
	errorCode: string
	success: boolean
	message:
		| {
				teams: ITeams[]
				countTeams: number
		  }
		| string
}

export interface IGetTeamResponse {
	errorCode: string
	success: boolean
	message: ITeams | string
}

export interface IPatchTeamResponse {
	errorCode: string
	success: boolean
	message: ITeams | string
}

export interface IRemoveTeamResponse {
	errorCode: string
	success: boolean
	message: string
}
