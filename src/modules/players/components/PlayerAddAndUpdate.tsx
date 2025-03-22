import { useLocation, useNavigate } from 'react-router'
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
	IUpdatePlayer,
	playerPositionOption,
} from '../interfaces/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { DatePickerComponent } from '../../../ui/DatePicker'
import { SelectComponent } from '../../../ui/Select'
import { IOption } from '../../../common/interfaces/types'
import { get, patch, post } from '../../../api/baseRequest'
import { NotificationComponent } from '../../../ui/Notification'
import dayjs from 'dayjs'
import { useAuth } from '../../../common/hooks/useAuth'
import { ITeams } from '../../teams/interfaces/types'
import { convertBufferToFile } from '../helpers/converterBufferToFile'
import { convertFileToList } from '../../../common/helpers/converterFileToFileList'
import { convertFileToBase64 } from '../../../common/helpers/converterFileToBase64'

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
	const { token } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()

	const [createData, setCreateData] = useState<
		IAddAndUpdatePlayerFormFields | undefined
	>(undefined)
	const [updateData, setUpdateData] = useState<IUpdatePlayer | undefined>(
		undefined
	)
	const [createPlayer, setCreatePlayer] = useState<boolean>(false)
	const [updatePlayer, setUpdatePlayer] = useState<boolean>(false)
	const [updateFormValues, setUpdateFormValues] = useState<
		IUpdatePlayer | undefined
	>(undefined)

	const [teamOption, setTeamOption] = useState<IOption[] | undefined | null>()
	const [isOptionsLoading, setIsOptionsLoading] = useState<boolean>(false)
	const [teams, setTeams] = useState<ITeams[] | []>([])

	const [previewImage, setPreviewImage] = useState<string | undefined>()

	const [notification, setNotification] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		reset,
		trigger,
		control,
		setValue,
		resetField,
		getValues,
		formState: { errors },
	} = useForm<IAddAndUpdatePlayerFormFields>({
		resolver: yupResolver<IAddAndUpdatePlayerFormFields>(
			schemaCreateAndUpdatePlayer
		),
		defaultValues: {
			playerImage: undefined,
		},
	})

	// get all teams for playerTeams
	useEffect(() => {
		setIsOptionsLoading(true)

		get('/teams/get', undefined)
			.then(result => {
				console.log('get all teams', result)
				if (result.success) {
					const teamsCopy = JSON.parse(
						JSON.stringify(result.message.teams)
					) as IPlayers[]
					const teamOptions = teamsCopy.map(team => ({
						value: team.name,
						label: team.name,
					}))
					setTeamOption(teamOptions)
					setTeams(result.message.teams)
				}
				if (!result.success) {
					setNotification(`${result.message}`)
				}
			})
			.catch(error => {
				console.log('error get teams', error)
				setNotification(
					`Something going wrong... Error status: ${error.status}`
				)
			})
			.finally(() => setIsOptionsLoading(false))
	}, [])

	// create player
	useEffect(() => {
		if (!createPlayer && !createData) return

		if (createPlayer && createData) {
			const createPlayerFormData = new FormData()
			createPlayerFormData.append('playerName', createData.playerName)
			if (typeof createData.playerPosition === 'string') {
				createPlayerFormData.append('playerPosition', createData.playerPosition)
			}
			if (teams.length > 0) {
				const team = teams.filter(team => team.name === createData.playerTeam)
				createPlayerFormData.append('teamId', team[0]._id)
			}
			createPlayerFormData.append('playerHeight', createData.playerHeight)
			createPlayerFormData.append('playerWeight', createData.playerWeight)
			createPlayerFormData.append(
				'playerBirthday',
				createData.playerBirthday.toISOString()
			)
			if (createData.playerNumber) {
				createPlayerFormData.append('playerNumber', createData.playerNumber)
			}
			if (createData.playerImage && createData.playerImage.length > 0) {
				createPlayerFormData.append('playerImage', createData.playerImage[0])
			}

			post('/players/create', token, createPlayerFormData)
				.then(result => {
					console.log('player create res', result)
					if (result.success) {
						navigate('/players', {
							state: { createPlayer: result.message.player.name },
						})
					}

					if (!result.success) {
						setNotification(`${result.message}`)
					}
				})
				.catch(error => {
					console.log('player create res error', error)
					setNotification(
						`Something going wrong... Error status: ${error.status}`
					)
				})
		}

		return () => {
			setCreatePlayer(false)
		}
	}, [createData, createPlayer, navigate, teams, token])

	// catch one player data for update player
	useEffect(() => {
		if (location.state?.player) {
			console.log(location.state?.player)
			const locationState = location.state?.player as IPlayers

			const file = convertBufferToFile(locationState)
			const fileList = file ? convertFileToList([file]) : undefined

			convertFileToBase64(file)
				.then(result => setPreviewImage(result))
				.catch(error => setNotification(`${error.message}`))

			const data = {
				playerName: locationState.name,
				playerPosition: locationState.position,
				playerTeam: locationState.team.name,
				playerHeight: locationState.height,
				playerWeight: locationState.weight,
				playerBirthday: locationState.birthday,
				playerNumber: locationState?.number,
				playerImage: fileList,
				playerId: locationState._id,
				oldTeamId: locationState.team._id,
			}
			console.log(data)
			setUpdateFormValues(data)
		}
	}, [location])

	// set update data in form values
	useEffect(() => {
		if (!updateFormValues) return
		if (updateFormValues) {
			reset(updateFormValues)
		}
	}, [updateFormValues, reset])

	// update player by updateData
	useEffect(() => {
		if (!updateData && !updatePlayer) return

		if (updateData && updatePlayer) {
			const updatePlayerFormData = new FormData()
			//playerName
			updatePlayerFormData.append('playerName', updateData.playerName)
			//playerPosition
			if (typeof updateData.playerPosition === 'string') {
				updatePlayerFormData.append('playerPosition', updateData.playerPosition)
			}
			// oldTeamId
			if (updateFormValues?.oldTeamId) {
				updatePlayerFormData.append('oldTeamId', updateFormValues.oldTeamId)
			}
			// newTeamId
			if (teams.length > 0) {
				const team = teams.filter(team => team.name === updateData.playerTeam)

				if (updateFormValues?.oldTeamId !== team[0]._id)
					updatePlayerFormData.append('newTeamId', team[0]._id)
			}

			//playerHeight

			updatePlayerFormData.append('playerHeight', updateData.playerHeight)
			//playerWeight
			updatePlayerFormData.append('playerWeight', updateData.playerWeight)

			//playerBirthday
			updatePlayerFormData.append(
				'playerBirthday',
				updateData.playerBirthday.toISOString()
			)
			//playerNumber

			if (updateData.playerNumber && updateFormValues?.playerNumber) {
				updatePlayerFormData.append('playerNumber', updateData.playerNumber)
			}

			if (updateFormValues?.playerNumber && !updateData.playerNumber) {
				updatePlayerFormData.append('removeNumber', 'true')
			}

			if (!updateFormValues?.playerNumber && updateData.playerNumber) {
				updatePlayerFormData.append('playerNumber', updateData.playerNumber)
			}

			//playerImage
			if (updateData.playerImage && updateFormValues?.playerImage) {
				if (updateData.playerImage && updateData.playerImage.length > 0) {
					updatePlayerFormData.append('playerImage', updateData.playerImage[0])
				}
			}

			if (updateFormValues?.playerImage && !updateData.playerImage) {
				updatePlayerFormData.append('removeImage', 'true')
			}

			if (!updateFormValues?.playerImage && updateData.playerImage) {
				if (updateData.playerImage && updateData.playerImage.length > 0) {
					updatePlayerFormData.append('playerImage', updateData.playerImage[0])
				}
			}

			//playerId
			if (updateFormValues?.playerId) {
				updatePlayerFormData.append('playerId', updateFormValues.playerId)
			}

			patch('/players/update', token, updatePlayerFormData)
				.then(result => {
					console.log('res update player', result)
					if (result.success) {
						navigate('/players', {
							state: { updatePlayer: result.message.name },
						})
					}
					if (!result.success) {
						setNotification(`${result.message}`)
					}
				})
				.catch(error => {
					console.log('error update player', error)
					setNotification(
						`Something going wrong... Error status: ${error.status}`
					)
				})
		}
		return () => {
			setUpdatePlayer(false)
		}
	}, [
		updatePlayer,
		updateData,
		navigate,
		teams,
		token,
		updateFormValues?.oldTeamId,
		updateFormValues?.playerImage,
		updateFormValues?.playerId,
		updateFormValues?.playerNumber,
	])

	const onSubmit: SubmitHandler<IAddAndUpdatePlayerFormFields> = (
		data: IAddAndUpdatePlayerFormFields
	): void => {
		console.log('add player or update', data)

		// if (location.state?.player) {
		// 	setUpdateData(data)
		// 	setUpdatePlayer(true)
		// } else {
		// 	setCreateData(data)
		// 	setCreatePlayer(true)
		// }
	}

	// const resetImage = (value: string | undefined) => {
	// 	console.log('resetImage', value)
	// 	if (value === 'clear') {
	// 		reset({ playerImage: undefined })
	// 	}
	// }

	console.log('formstate', getValues('playerImage'))

	const navigateToPlayerDashboard = () => navigate('/players')
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
						defaultImage={previewImage}
						reset={resetField}
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
										teamOption?.find(
											(option: IOption) => option.value === value
										) ?? null
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
