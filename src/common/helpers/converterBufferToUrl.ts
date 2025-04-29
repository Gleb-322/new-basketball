import { IServerPlayers } from '../../modules/players/interfaces/types'
import { IServerTeams } from '../../modules/teams/interfaces/types'

export const convertBufferToUrl = (payload: {
	team?: IServerTeams[]
	player?: IServerPlayers[]
}) => {
	const avatars: { [key: string]: string } = {}

	if (payload.team) {
		payload.team.forEach(t => {
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
		payload.player.forEach(p => {
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
