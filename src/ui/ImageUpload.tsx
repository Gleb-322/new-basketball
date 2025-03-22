import { FC, useEffect, useRef, useState } from 'react'
import { ReactComponent as AddPhotoSVG } from '../assets/icons/add-photo.svg'
import styled from 'styled-components'
import { IInputProps } from '../common/interfaces/types'
import { convertFileToBase64 } from '../common/helpers/converterFileToBase64'
import { NotificationComponent } from './Notification'

export const ImgUpload: FC<IInputProps<any> & { defaultImage?: string }> = <
	FormInputs extends Record<string, any>
>({
	type,
	name,
	id,
	register,
	error,
	defaultImage,
	reset,
}: IInputProps<FormInputs> & { defaultImage?: string }) => {
	// const fileInputRef = useRef<HTMLInputElement>(null)
	const [image, setImage] = useState<string | undefined>('')
	const [notification, setNotification] = useState<string | null>(null)

	useEffect(() => {
		// Обновляем изображение, если передали defaultImage
		setImage(defaultImage)
	}, [defaultImage])

	// console.log('ref', fileInputRef.current?.files)

	// useEffect(() => {
	// 	if (!fileInputRef.current?.files) {
	// 		if (resetReactForm) {
	// 			resetReactForm('clear')
	// 		}
	// 	}
	// })

	const resetImage = () => {
		setImage('')

		// if (!fileInputRef.current?.files) {
		// if (resetReactForm) {
		// 	resetReactForm('clear')
		// }
		if (reset) {
			reset('playerImage')
		}
		// }

		// if (fileInputRef.current) {
		// 	fileInputRef.current.value = '' // Сброс физически у input type="file"
		// }
	}

	const closeNotification = () => setNotification(null)
	return (
		<>
			<Conatiner>
				<Label $image={image}>
					{image ? (
						<>
							<Img src={image} alt="try again" />
							<ResetButton type="button" onClick={resetImage}></ResetButton>
						</>
					) : (
						<>
							<AddPhotoSVG />
							<Input
								{...register(name, {
									onChange: e => {
										if (e.target?.files[0]) {
											convertFileToBase64(e.target?.files[0])
												.then(result => setImage(result))
												.catch(error =>
													setNotification(
														`Something going wrong... Error: ${error.message}`
													)
												)
										}
									},
								})}
								id={id}
								tabIndex={-1}
								type={type}
								// ref={fileInputRef}
							/>
						</>
					)}
				</Label>
				{image ? (
					<ResetButton type="button" onClick={resetImage}>
						X
					</ResetButton>
				) : null}
				{error && <InputError>{error}</InputError>}
			</Conatiner>
			{notification ? (
				<NotificationComponent
					error={true}
					message={notification}
					close={closeNotification}
				/>
			) : null}
		</>
	)
}

const Conatiner = styled.div`
	position: relative;
`

const Label = styled.label<{
	$image: string | undefined
}>`
	width: 365px;
	height: 280px;
	background-color: ${({ theme, $image }) =>
		$image ? 'none' : theme.colors.lightGrey};
	opacity: ${({ $image }) => ($image ? 'none' : '0.5')};
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`

const Input = styled.input`
	width: 0px;
	height: 0px;
`

const InputError = styled.div`
	margin-top: 5px;
	text-align: center;
	font-family: 'Avenir Medium';
	font-size: 12px;
	font-weight: 500;
	line-height: 18px;
	color: ${({ theme }) => theme.colors.lightestRed};
`

const Img = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 10px;
`

const ResetButton = styled.button`
	position: absolute;
	top: -10px;
	right: -30px;
	width: 25px;
	height: 25px;
	border: none;
	border-radius: 100%;
	font-family: 'Avenir Medium';
	font-size: 12px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.grey};
	background-color: ${({ theme }) => theme.colors.lightestGrey};
	cursor: pointer;
	&:hover {
		background-color: ${({ theme }) => theme.colors.lightGrey};
		color: ${({ theme }) => theme.colors.white};
	}
`
