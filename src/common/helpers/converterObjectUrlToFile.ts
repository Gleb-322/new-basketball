export const convertObjectUrlToFile = async (
	url: string,
	filename: string
): Promise<File> => {
	const response = await fetch(url)
	if (!response.ok) {
		// eslint-disable-next-line no-throw-literal
		throw { message: 'Failed to convert ObjectUrl to file!' }
	}
	const blob = await response.blob()
	const file = new File([blob], filename, { type: blob.type })
	return file
}
