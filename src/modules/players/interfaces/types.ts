import { IOption } from '../../../common/interfaces/types'
import * as yup from 'yup'
import { ITeams } from '../../teams/interfaces/types'
import { OnChangeValue } from 'react-select'

export interface IPlayers {
	__v: number
	_id: string
	name: string
	position: string
	team: ITeams
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
}
export interface IPlayerCard {
	player: IPlayers
}

export interface IPlayerHeader {
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

export interface IPlayerSliceState {
	error: string | null
	status: 'idle' | 'loading' | 'success' | 'error'
	keyword: string
	pageCount: number
	currentPage: number
	selectedOption: IOption
	lastCreatedPlayer: string | undefined
	lastUpdatedPlayer: string | undefined
	lastRemovedPlayer: string | undefined
	teamsFilter: IOption[]
	teamOptions: IOption[]
}
