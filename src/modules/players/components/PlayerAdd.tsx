import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { LinkComponent } from '../../../ui/Link'
import { ButtonComponent } from '../../../ui/Button'
import { InputComponent } from '../../../ui/Input'
import { FC, useState } from 'react'
import { ImgUpload } from '../../../ui/ImageUpload'
import * as yup from 'yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
	IAddAndUpdatePlayerFormFields,
	playerPositionOption,
} from '../interfaces/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { DatePickerComponent } from '../../../ui/DatePicker'
import { SelectComponent } from '../../../ui/Select'
import { IOption } from '../../../common/interfaces/types'

const schemaCreateAndUpdatePlayer = yup.object().shape({
	playerName: yup.string().required('Player Name is required!'),
	playerPosition: yup.string().required('Player Position is required!'),
	playerHeight: yup.number().required('Player Height is required!'),
	playerWeight: yup.number().required('Player Weight is required!'),
	playerBirthday: yup.date().required('Player Birthday is required!'),
	playerNumber: yup.number().optional(),
	playerImage: yup
		.mixed<FileList>()
		.optional()
		.test('fileSize', 'The file is too big (max. 2MB)!', value => {
			if (!value || !(value instanceof FileList) || value.length === 0)
				// Пропускаем, если файла нет
				return true
			// Ограничение 2MB
			return value[0].size <= 2 * 1024 * 1024
		})
		.test('fileType', 'Incorrect file format (JPG, PNG only)!', value => {
			if (!value || !(value instanceof FileList) || value.length === 0)
				// Пропускаем, если файла нет
				return true
			// Разрешаем только JPG и PNG
			return ['image/jpeg', 'image/png'].includes(value[0].type)
		}),
})

export const PlayerAdd: FC = () => {
	const navigate = useNavigate()
	const navigateToPlayerDashboard = () => navigate('/players')
	const [selectedOption, setSelectedOption] = useState<IOption | undefined>()

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<IAddAndUpdatePlayerFormFields>({
		resolver: yupResolver<IAddAndUpdatePlayerFormFields>(
			schemaCreateAndUpdatePlayer
		),
	})

	const onSubmit: SubmitHandler<IAddAndUpdatePlayerFormFields> = (
		data: IAddAndUpdatePlayerFormFields
	): void => {
		console.log('add player or update', data)
		// if (location.state?.team) {
		// 	setUpdateData(data)
		// 	setUpdateTeam(true)
		// } else {
		// 	setCreateData(data)
		// 	setCreateTeam(true)
		// }
	}
	return (
		<Section>
			<Header>
				<LinkComponent text={'Players'} route={'/players'} /> <Slash>/</Slash>{' '}
				Add new player
			</Header>
			<MainForm encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
				<Left>
					<ImgUpload
						register={register}
						type={'file'}
						name={'playerImage'}
						id={'playerImage'}
						// defaultImage={previewImage}
						error={errors.playerImage?.message}
					/>
				</Left>
				<Right>
					<InputsBlock>
						<InputComponent
							register={register}
							type={'text'}
							name={'playerName'}
							id={'playerName'}
							label={'Name'}
							focus={true}
							error={errors.playerName?.message}
						/>
						<Controller
							control={control}
							name={'playerPosition'}
							render={({ field: { ref, name, onChange, value } }) => (
								<SelectComponent
									inputRef={ref}
									id={'playerPosition'}
									name={name}
									label={'Position'}
									error={errors.playerPosition?.message}
									variant={'playerPosition'}
									options={playerPositionOption}
									selected={playerPositionOption.find(
										option => option.value === value
									)}
									onSelect={onChange}
								/>
							)}
						/>
						{/*  */}
						<InputComponent
							register={register}
							type={'number'}
							name={'playerHeight'}
							id={'playerHeight'}
							label={'Height (cm)'}
							focus={false}
							error={errors.playerHeight?.message}
						/>
						<InputComponent
							register={register}
							type={'number'}
							name={'playerWeight'}
							id={'playerWeight'}
							label={'Weight (kg)'}
							focus={false}
							error={errors.playerHeight?.message}
						/>
						<DatePickerComponent />
						<InputComponent
							register={register}
							type={'number'}
							name={'playerNumber'}
							id={'playerNumber'}
							label={'Number'}
							focus={false}
							error={errors.playerNumber?.message}
						/>
						<Buttons>
							<ButtonComponent
								type={'button'}
								text={'Cancel'}
								variant={'cancel'}
								onClick={navigateToPlayerDashboard}
							/>
							<ButtonComponent type={'submit'} text={'Save'} variant={'save'} />
						</Buttons>
					</InputsBlock>
				</Right>
			</MainForm>
		</Section>
	)
}

const Section = styled.section`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 10px;
	padding: 24px 32px;
`
const Header = styled.header`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 14px;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.red};
`
const Slash = styled.span`
	color: ${({ theme }) => theme.colors.lightGrey};
`

const MainForm = styled.form`
	display: flex;
	margin: 48px 0;
`
const Left = styled.div`
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: start;
`

const Right = styled.div`
	width: 50%;
`
const InputsBlock = styled.div`
	width: 365px;
`

const Buttons = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`
