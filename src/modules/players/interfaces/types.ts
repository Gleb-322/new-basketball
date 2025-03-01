export interface IPlayers {
	__v: number
	_id: string
	name: string
	position: string
	team: string
	height: number
	weight: number
	birthday: string
	number: number
	playerImg: { type: string; data: number[] }
}

export interface IAddAndUpdatePlayerFormFields {
	playerName: string
	playerPosition: string
	playerHeight: number
	playerWeight: number
	playerBirthday: Date
	playerNumber?: number
	playerImage?: FileList
}

export interface IPlayerList {
	players: IPlayers[]
	avatars: { [key: string]: string }
}

export interface IPlayerHeader {
	search: string
	onSearch: (value: string) => void
}
