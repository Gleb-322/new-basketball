import { ITeams } from '../interfaces/types'

export const convertBufferToFile = (team: ITeams) => {
	if (team.teamImg && team.teamImg.data) {
		// Декодируем Buffer
		const byteArray = new Uint8Array(team.teamImg.data)
		// Создаём Blob
		const blob = new Blob([byteArray], { type: 'image/jpeg' })
		// Генерируем URL
		return new File([blob], `${team.name}.jpeg`, {
			type: blob.type,
		})
	}
	return
}
