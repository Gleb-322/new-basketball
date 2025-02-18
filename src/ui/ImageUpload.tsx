import { FC, useState } from 'react'
import { ReactComponent as AddPhotoSVG } from '../assets/icons/add-photo.svg'
import styled from 'styled-components'
import { IInputProps } from '../common/interfaces/types'

export const ImgUpload: FC<IInputProps<any>> = <
	FormInputs extends Record<string, any>
>({
	type,
	name,
	id,
	register,
	error,
}: IInputProps<FormInputs>) => {
	const [image, setImage] = useState<string | undefined>('')

	return (
		<Conatiner>
			<Label $image={image}>
				{image ? (
					<>
						<Img src={image} alt="try again" />
						<ResetButton
							type="button"
							onClick={() => setImage('')}
						></ResetButton>
					</>
				) : (
					<>
						<AddPhotoSVG />
						<Input
							{...register(name, {
								onChange: e => {
									console.log(e.target?.files[0])
									if (e.target?.files[0]) {
										const reader = new FileReader()
										reader.onloadend = () => {
											setImage(reader.result?.toString())
										}
										reader.readAsDataURL(e.target?.files[0])
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

			{error && <InputError>{error}</InputError>}
		</Conatiner>
	)
}

const Conatiner = styled.div`
	position: relative;
	z-index: 10;
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
	position: absolute;
	top: 0px;
	left: -5000px;
	z-index: -1000;
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
	top: -20px;
	left: -20px;
	width: 0px;
	height: 0px;
	cursor: pointer;
	z-index: 100;
`
