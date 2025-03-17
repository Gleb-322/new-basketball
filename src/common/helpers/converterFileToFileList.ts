export const convertFileToList = (files: File[]): FileList => {
	const dataTransfer = new DataTransfer()
	files.forEach(file => dataTransfer.items.add(file))
	return dataTransfer.files
}
