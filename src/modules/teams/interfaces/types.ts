import { IOption } from '../../../common/interfaces/types'
import { IPlayers, IServerPlayers } from '../../players/interfaces/types'

export interface IServerTeams {
	__v: number
	_id: string
	name: string
	division: string
	conference: string
	year: string
	teamImg: { data: number[] }
	players: IServerPlayers[]
}

export interface ITeams {
	__v: number
	_id: string
	name: string
	division: string
	conference: string
	year: string
	teamImg: string
	players: IPlayers[]
	file: File | null
}

export interface ITeamList {
	teams: ITeams[]
}
export interface ITeamCard {
	team: ITeams
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

export interface ICreateTeamResponse {
	errorCode: string
	success: boolean
	message: { team: IServerTeams } | string
}

export interface IGetTeamsResponse {
	errorCode: string
	success: boolean
	message:
		| {
				teams: IServerTeams[]
				countTeams: number
		  }
		| string
}

export interface IGetTeamResponse {
	errorCode: string
	success: boolean
	message: IServerTeams | string
}

export interface IPatchTeamResponse {
	errorCode: string
	success: boolean
	message: IServerTeams | string
}

export interface IRemoveTeamResponse {
	errorCode: string
	success: boolean
	message: string
}

export interface ITeamSliceState {
	error: string | null
	status: 'idle' | 'loading' | 'success' | 'error'
	keyword: string
	pageCount: number
	currentPage: number
	selectedOption: IOption
	lastCreatedTeam: string | undefined
	lastUpdatedTeam: string | undefined
	lastRemovedTeam: string | undefined
}
