import { IPlayers } from '../interfaces/types'

export const convertBufferToFile = (player: IPlayers) => {
	if (player.playerImg && player.playerImg.data) {
		// Декодируем Buffer
		const byteArray = new Uint8Array(player.playerImg.data)
		// Создаём Blob
		const blob = new Blob([byteArray], { type: 'image/jpeg' })
		// Генерируем URL
		return new File([blob], `${player.name}.jpeg`, {
			type: blob.type,
		})
	}
	return
}
