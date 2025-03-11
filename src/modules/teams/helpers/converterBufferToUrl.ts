import { ITeams } from '../interfaces/types'

export const convertBufferToUrl = (team: ITeams[] | ITeams) => {
	if (Array.isArray(team)) {
		const teamsCopy = JSON.parse(JSON.stringify(team)) as ITeams[]
		const avatars: { [key: string]: string } = {}
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
		return avatars
	} else {
		const teamCopy = JSON.parse(JSON.stringify(team)) as ITeams
		if (teamCopy.teamImg && teamCopy.teamImg.data) {
			const byteArray = new Uint8Array(teamCopy.teamImg.data)
			const blob = new Blob([byteArray], { type: 'image/jpeg' })
			return URL.createObjectURL(blob)
		}
	}
}
