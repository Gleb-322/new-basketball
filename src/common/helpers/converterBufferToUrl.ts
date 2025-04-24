import { IPlayers } from '../../modules/players/interfaces/types'
import { ITeams } from '../../modules/teams/interfaces/types'

export const convertBufferToUrl = (payload: {
	team?: ITeams[]
	player?: IPlayers[]
}) => {
	const avatars: { [key: string]: string } = {}

	if (payload.team) {
		const teamsCopy = JSON.parse(JSON.stringify(payload.team)) as ITeams[]
		teamsCopy.forEach((t: ITeams) => {
			if (t.teamImg && t.teamImg.data) {
				// Декодируем Buffer
				const byteArray = new Uint8Array(t.teamImg.data)
				// Создаём Blob
				const blob = new Blob([byteArray], { type: 'image/jpeg' })
				// Генерируем URL
				avatars[t._id] = URL.createObjectURL(blob)
			}
		})
	}

	if (payload.player) {
		const playersCopy = JSON.parse(JSON.stringify(payload.player)) as IPlayers[]

		playersCopy.forEach((p: IPlayers) => {
			if (p.playerImg && p.playerImg.data) {
				// Декодируем Buffer
				const byteArray = new Uint8Array(p.playerImg.data)
				// Создаём Blob
				const blob = new Blob([byteArray], { type: 'image/jpeg' })
				// Генерируем URL
				avatars[p._id] = URL.createObjectURL(blob)
			}
		})
	}

	return avatars
}
