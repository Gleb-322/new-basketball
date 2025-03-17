import { IOption, IOptionMultiSelect } from '../../../common/interfaces/types'
import * as yup from 'yup'
import { ITeams } from '../../teams/interfaces/types'

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
	playerImg: { type: string; data: number[] }
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
	avatars: { [key: string]: string } | string
}

export interface IPlayerHeader {
	teamsOption: IOptionMultiSelect[]
	isTeamOptions: boolean
	search: string
	onSearch: (value: string) => void
}

export const playerPositionOption: IOption[] = [
	{ value: 'Center Forward', label: 'Center Forward' },
	{ value: 'Guard Forward', label: 'Guard Forward' },
	{ value: 'Forward', label: 'Forward' },
	{ value: 'Center', label: 'Center' },
	{ value: 'Guard', label: 'Guard' },
]
