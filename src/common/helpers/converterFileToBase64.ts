export const convertFileToBase64 = (
	file: File | undefined
): Promise<string | undefined> => {
	return new Promise((resolve, reject) => {
		if (!file) {
			resolve(undefined)
			return
		}

		const reader = new FileReader()

		reader.readAsDataURL(file)

		reader.onloadend = () => {
			resolve(reader.result?.toString())
		}

		reader.onerror = () => {
			reject(() => {
				// eslint-disable-next-line no-throw-literal
				throw { message: 'Failed to convert file to base64' }
			})
		}
	})
}
