import { IPlayers } from '../interfaces/types'

export const convertBufferToUrl = (player: IPlayers[] | IPlayers) => {
	if (Array.isArray(player)) {
		const playersCopy = JSON.parse(JSON.stringify(player)) as IPlayers[]
		const avatars: { [key: string]: string } = {}
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
		return avatars
	} else {
		const playerCopy = JSON.parse(JSON.stringify(player)) as IPlayers
		if (playerCopy.playerImg && playerCopy.playerImg.data) {
			const byteArray = new Uint8Array(playerCopy.playerImg.data)
			const blob = new Blob([byteArray], { type: 'image/jpeg' })
			return URL.createObjectURL(blob)
		}
	}
}
