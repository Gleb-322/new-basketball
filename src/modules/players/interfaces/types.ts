import { IOption } from '../../../common/interfaces/types'
import * as yup from 'yup'
import { IServerTeams, ITeams } from '../../teams/interfaces/types'
import { OnChangeValue } from 'react-select'

export interface IServerPlayers {
	__v: number
	_id: string
	name: string
	position: string
	team: IServerTeams
	height: string
	weight: string
	birthday: Date
	number: string
	playerImg: { type: string; data: number[] }
}

export interface IPlayers {
	__v: number
	_id: string
	name: string
	position: string
	team: ITeams | null
	height: string
	weight: string
	birthday: Date
	number: string
	playerImg: string
}

export interface IAddAndUpdatePlayerFormFields {
	playerName: string
	playerPosition?: IOption | string | undefined | null
	playerTeam?: IOption | string | undefined | null
	playerHeight: string
	playerWeight: string
	playerBirthday: Date
	playerNumber?: yup.Maybe<string | undefined>
	playerImage?: yup.Maybe<FileList | undefined>
}

export interface IUpdatePlayer extends IAddAndUpdatePlayerFormFields {
	newTeamId?: string
	oldTeamId?: string
	playerId?: string
}

export interface IPlayerList {
	players: IPlayers[]
	avatars: { [key: string]: string }
}

export interface IPlayerHeader {
	teamsOption: IOption[]
	isTeamOptions: boolean
	isLoading: boolean
	search: string
	onSearch: (value: string) => void
	onMultiValue: (value: OnChangeValue<IOption, true>) => void
}

export const playerPositionOption: IOption[] = [
	{ value: 'Center Forward', label: 'Center Forward' },
	{ value: 'Guard Forward', label: 'Guard Forward' },
	{ value: 'Forward', label: 'Forward' },
	{ value: 'Center', label: 'Center' },
	{ value: 'Guard', label: 'Guard' },
]

export interface IAddAndUpdatePlayerLocationState {
	state?: { player: IPlayers }
}

export interface ICreatePlayersResponse {
	errorCode: string
	success: boolean
	message: { player: IPlayers } | string
}

export interface IGetPlayersResponse {
	errorCode: string
	success: boolean
	message:
		| {
				players: IPlayers[]
				countPlayers: number
		  }
		| string
}

export interface IGetPlayerResponse {
	errorCode: string
	success: boolean
	message: IPlayers | string
}

export interface IPatchPlayerResponse {
	errorCode: string
	success: boolean
	message: IPlayers | string
}

export interface IRemovePlayerResponse {
	errorCode: string
	success: boolean
	message: string
}
