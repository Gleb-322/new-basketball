export const convertBufferToBase64AndFile = (buffer: { data: number[] }) => {
	// Декодируем Buffer
	const byteArray = new Uint8Array(buffer.data)
	// Создаём Blob
	const blob = new Blob([byteArray], { type: 'image/jpeg' })
	// Генерируем File
	const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })
	// Генерируем ObjectURL
	// const objectUrl = URL.createObjectURL(file)
	// Генерируем base64
	const base64String = btoa(
		byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '')
	)
	return { file, base64String: `data:image/jpeg;base64,${base64String}` }
}
