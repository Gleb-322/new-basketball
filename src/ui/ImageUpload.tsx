import { FC, useEffect, useState } from 'react'
import { ReactComponent as AddPhotoSVG } from '../assets/icons/add-photo.svg'
import styled from 'styled-components'
import { IInputProps } from '../common/interfaces/types'
import { convertFileToBase64 } from '../common/helpers/converterFileToBase64'
import { showToast } from './ToastrNotification'
import { device } from '../common/helpers/breakpoint'

export const ImgUpload: FC<IInputProps<any> & { defaultImage?: string }> = <
	FormInputs extends Record<string, any>
>({
	type,
	name,
	id,
	register,
	error,
	defaultImage,
	setTeamImage,
	setPlayerImage,
	triggerTeamImage,
	triggerPlayerImage,
}: IInputProps<FormInputs> & { defaultImage?: string }) => {
	const [image, setImage] = useState<string | undefined>('')

	useEffect(() => {
		setImage(defaultImage)
	}, [defaultImage])

	const resetImage = () => {
		setImage('')
		if (id === 'playerImage') {
			setPlayerImage &&
				setPlayerImage('playerImage', null, { shouldValidate: true })
			triggerPlayerImage && triggerPlayerImage('playerImage')
		}

		if (id === 'teamImage') {
			setTeamImage &&
				setTeamImage('teamImage', undefined, { shouldValidate: true })
			triggerTeamImage && triggerTeamImage('teamImage')
		}
	}

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
							<StyledAddPhotoSVG />
							<Input
								{...register(name, {
									onChange: e => {
										if (e.target?.files[0]) {
											convertFileToBase64(e.target?.files[0])
												.then(result => setImage(result))
												.catch(error =>
													showToast({
														type: 'error',
														message: `${error.message}`,
													})
												)
										}
									},
								})}
								id={id}
								tabIndex={-1}
								type={type}
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
		</>
	)
}

const Conatiner = styled.div`
	position: relative;
	@media ${device.custom1140} {
		width: 100%;
	}
	@media ${device.mobileL} {
		width: 185px;
	}
`

const Label = styled.label<{
	$image: string | undefined
}>`
	width: 365px;
	height: 280px;
	background-color: ${({ theme, $image }) =>
		$image ? 'inherit' : theme.colors.lightGrey};
	opacity: ${({ $image }) => ($image ? '1' : '0.5')};
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	@media ${device.custom1140} {
		width: 100%;
	}
	@media ${device.tablet} {
		height: 190px;
	}
	@media ${device.custom510} {
		height: 144px;
	}
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
	object-fit: contain;
	object-position: center;
`

const StyledAddPhotoSVG = styled(AddPhotoSVG)`
	@media ${device.tablet} {
		height: 41px;
		width: 40px;
	}
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
