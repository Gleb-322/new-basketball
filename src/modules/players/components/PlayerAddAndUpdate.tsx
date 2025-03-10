import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { LinkComponent } from '../../../ui/Link'
import { ButtonComponent } from '../../../ui/Button'
import { InputComponent } from '../../../ui/Input'
import { FC, useEffect, useState } from 'react'
import { ImgUpload } from '../../../ui/ImageUpload'
import * as yup from 'yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
	IAddAndUpdatePlayerFormFields,
	IPlayers,
	playerPositionOption,
} from '../interfaces/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { DatePickerComponent } from '../../../ui/DatePicker'
import { SelectComponent } from '../../../ui/Select'
import { IOption } from '../../../common/interfaces/types'
import { get } from '../../../api/baseRequest'
import { NotificationComponent } from '../../../ui/Notification'
import dayjs from 'dayjs'

const schemaCreateAndUpdatePlayer = yup.object().shape(
	{
		playerName: yup.string().required('Player Name is required!'),
		playerPosition: yup
			.string()
			.nullable()
			.test(
				'required',
				'Player Position is required!',
				(option: string | undefined | null) => {
					if (!option) return false
					return true
				}
			),
		playerTeam: yup
			.string()
			.nullable()
			.test(
				'required',
				'Player Team is required!',
				(option: string | undefined | null) => {
					if (!option) return false
					return true
				}
			),
		playerHeight: yup
			.string()
			.required('Player Height is required!')
			.matches(/^\d{3}$/, 'Three digits required!'),
		playerWeight: yup
			.string()
			.required('Player Weight is required!')
			.matches(/^\d{2,3}$/, 'Two or Three digits required!'),
		playerBirthday: yup.date().required('Player Birthday is required!'),
		playerNumber: yup
			.string()
			.notRequired()
			.when('playerNumber', {
				is: (value: string) => value,
				then: rule => rule.matches(/^\d{2}$/, 'Two digits required!'),
			}),
		playerImage: yup
			.mixed<FileList>()
			.notRequired()
			.test('fileSize', 'The file is too big (max. 2MB)!', value => {
				// Пропускаем, если файла нет
				if (!value || !(value instanceof FileList) || value.length === 0)
					return true
				// Ограничение 2MB
				return value[0].size <= 2 * 1024 * 1024
			})
			.test('fileType', 'Incorrect file format (JPG, PNG only)!', value => {
				// Пропускаем, если файла нет
				if (!value || !(value instanceof FileList) || value.length === 0)
					return true
				// Разрешаем только JPG и PNG
				return ['image/jpeg', 'image/png'].includes(value[0].type)
			}),
	},
	[['playerNumber', 'playerNumber']]
)

export const PlayerCreateAndUpdate: FC = () => {
	const navigate = useNavigate()
	const navigateToPlayerDashboard = () => navigate('/players')

	const [teamOption, setTeamOption] = useState<IOption[] | undefined | null>()
	const [isOptionsLoading, setIsOptionsLoading] = useState<boolean>(false)
	const [notification, setNotification] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		reset,
		trigger,
		control,
		formState: { errors },
	} = useForm<IAddAndUpdatePlayerFormFields>({
		resolver: yupResolver<IAddAndUpdatePlayerFormFields>(
			schemaCreateAndUpdatePlayer
		),
	})

	useEffect(() => {
		setIsOptionsLoading(true)
		get('/teams/get', undefined)
			.then(result => {
				console.log('get all teams', result)
				if (result.success) {
					const teamsCopy = JSON.parse(
						JSON.stringify(result.message.teams)
					) as IPlayers[]
					const teamOptions = teamsCopy.map(team => {
						return { value: team.name, label: team.name }
					})
					setTeamOption(teamOptions)
					setIsOptionsLoading(false)
				}
				if (!result.success) {
					setNotification(`${result.message}`)
					setIsOptionsLoading(false)
				}
			})
			.catch(error => {
				console.log('error get teams', error)
				setNotification(
					`Something going wrong... Error status: ${error.status}`
				)
				setIsOptionsLoading(false)
			})
	}, [])

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
	const closeNotification = () => setNotification(null)
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
							render={({ field: { onChange, value, ref, name } }) => (
								<SelectComponent
									inputRef={ref}
									id={'playerPosition'}
									name={name}
									label={'Position'}
									error={errors.playerPosition?.message}
									variant={'player'}
									options={playerPositionOption}
									selected={
										playerPositionOption.find(
											option => option.value === value
										) ?? null
									}
									onChange={(val: IOption | null) => {
										onChange(val?.value ?? null)
										trigger('playerPosition')
									}}
								/>
							)}
						/>

						<Controller
							control={control}
							name={'playerTeam'}
							render={({ field: { ref, value, onChange, name } }) => (
								<SelectComponent
									inputRef={ref}
									id={'playerTeam'}
									name={name}
									label={'Team'}
									error={errors.playerTeam?.message}
									variant={'player'}
									options={teamOption ?? []}
									selected={
										teamOption?.find(option => option.value === value) ?? null
									}
									onChange={(val: IOption | null) => {
										onChange(val?.value ?? null)
										trigger('playerTeam')
									}}
									isLoading={isOptionsLoading}
								/>
							)}
						/>

						<FourInputs>
							<TwoInputs>
								<InputComponent
									register={register}
									type={'text'}
									name={'playerHeight'}
									id={'playerHeight'}
									label={'Height (cm)'}
									focus={false}
									error={errors.playerHeight?.message}
								/>

								<Controller
									name={'playerBirthday'}
									control={control}
									render={({ field: { name, value, onChange, ref } }) => (
										<DatePickerComponent
											inputRef={ref}
											value={value ? dayjs(value) : null}
											id={'playerBirthday'}
											label={'Birthday'}
											name={name}
											error={errors.playerBirthday?.message}
											onChange={onChange}
										/>
									)}
								/>
							</TwoInputs>
							<TwoInputs>
								<InputComponent
									register={register}
									type={'text'}
									name={'playerWeight'}
									id={'playerWeight'}
									label={'Weight (kg)'}
									focus={false}
									error={errors.playerWeight?.message}
								/>
								<InputComponent
									register={register}
									type={'text'}
									name={'playerNumber'}
									id={'playerNumber'}
									label={'Number'}
									focus={false}
									error={errors.playerNumber?.message}
								/>
							</TwoInputs>
						</FourInputs>
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
			{notification ? (
				<NotificationComponent
					error={true}
					message={notification}
					close={closeNotification}
				/>
			) : null}
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
const FourInputs = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`
const TwoInputs = styled.div`
	width: 45%;
	display: flex;
	flex-direction: column;
`

const Buttons = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`
