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
			{image ? (
				<ResetButton type="button" onClick={() => setImage('')}>
					X
				</ResetButton>
			) : null}
			{error && <InputError>{error}</InputError>}
		</Conatiner>
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
