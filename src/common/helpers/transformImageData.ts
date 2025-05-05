import { showToast } from '../../ui/ToastrNotification'
import { convertFileToBase64 } from './converterFileToBase64'
import { convertFileToList } from './converterFileToFileList'
import { convertUrlToFile } from './converterUrlToFile'

// универсальная функция для преобразования данных для формы
export const loadImageData = async (imageUrl?: string) => {
	try {
		// Если URL не предоставлен, не выполняем конвертацию
		if (!imageUrl) {
			return {
				file: undefined,
				fileList: undefined,
				previewImage: undefined,
			}
		}

		// Конвертируем URL в File
		const file = await convertUrlToFile(imageUrl)

		// Создаем FileList из File
		const fileList = convertFileToList([file])

		// Конвертируем в base64 для предпросмотра
		const previewImage = await convertFileToBase64(file)

		return {
			file,
			fileList,
			previewImage,
		}
	} catch (error) {
		showToast({
			type: 'error',
			message: error instanceof Error ? error.message : 'Failed to load image!',
		})

		return {
			file: undefined,
			fileList: undefined,
			previewImage: undefined,
		}
	}
}
