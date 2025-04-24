import { IPlayers } from '../../modules/players/interfaces/types'
import { ITeams } from '../../modules/teams/interfaces/types'

export const convertBufferToFile = (payload: {
	team?: ITeams
	player?: IPlayers
}) => {
	if (payload.team) {
		if (payload.team.teamImg && payload.team.teamImg.data) {
			// Декодируем Buffer
			const byteArray = new Uint8Array(payload.team.teamImg.data)
			// Создаём Blob
			const blob = new Blob([byteArray], { type: 'image/jpeg' })
			// Генерируем URL
			return new File([blob], `${payload.team.name}.jpeg`, {
				type: blob.type,
			})
		}
	}

	if (payload.player) {
		if (payload.player.playerImg && payload.player.playerImg.data) {
			// Декодируем Buffer
			const byteArray = new Uint8Array(payload.player.playerImg.data)
			// Создаём Blob
			const blob = new Blob([byteArray], { type: 'image/jpeg' })
			// Генерируем URL
			return new File([blob], `${payload.player.name}.jpeg`, {
				type: blob.type,
			})
		}
	}
	return
}
