function getMimeType(url?: string): string {
	const extension = url?.split('.')?.pop()?.toLowerCase()
	return extension === 'jpg' || extension === 'jpeg'
		? 'image/jpeg'
		: 'image/png'
}

export const convertUrlToFile = async (imageUrl: string): Promise<File> => {
	try {
		// Определяем полный URL
		const fullUrl = `${process.env.REACT_APP_BASE_URL_IMAGE}${imageUrl}`

		// Получаем данные по URL
		const response = await fetch(fullUrl)

		if (!response.ok) {
			throw new Error(
				`Failed to fetch image: ${response.status} ${response.statusText}`
			)
		}

		// Преобразуем в Blob
		const blob = await response.blob()

		// Получаем имя файла из URL
		const fileName = fullUrl.split('/').pop() || `image-${Date.now()}.png`

		// Определяем MIME-тип
		const mimeType = getMimeType(fileName)

		// Создаем и возвращаем File
		return new File([blob], fileName, { type: mimeType })
	} catch (error) {
		throw error
	}
}
