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
	IAddAndUpdatePlayerLocationState,
	playerPositionOption,
} from '../interfaces/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { DatePickerComponent } from '../../../ui/DatePicker'
import { SelectComponent } from '../../../ui/Select'
import { IOption } from '../../../common/interfaces/types'
import dayjs from 'dayjs'
import { showToast } from '../../../ui/ToastrNotification'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { RootState } from '../../../core/redux/store'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { resetPlayerState } from '../playerSlice'
import { loadImageData } from '../../../common/helpers/transformImageData'
import {
	createPlayerThunk,
	updatePlayerThunk,
} from '../../../api/players/playerThunks'

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
			.nullable()
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
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation() as unknown as Location &
		IAddAndUpdatePlayerLocationState

	const { token } = useAppSelector((state: RootState) => state.user)
	const { status, error, lastCreatedPlayer, lastUpdatedPlayer, teamOptions } =
		useAppSelector((state: RootState) => state.player)

	const { isLoading } = useAppSelector((state: RootState) => state.loader)

	const [previewImage, setPreviewImage] = useState<string | undefined>()

	const {
		register,
		handleSubmit,
		reset,
		trigger,
		control,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<IAddAndUpdatePlayerFormFields>({
		resolver: yupResolver<IAddAndUpdatePlayerFormFields>(
			schemaCreateAndUpdatePlayer
		),
		defaultValues: {
			playerImage: null,
		},
		mode: 'onTouched',
	})

	// create or update player
	useEffect(() => {
		if (status === 'success' && lastCreatedPlayer) {
			navigate('/players')
			showToast({
				type: 'success',
				message: `Player: ${lastCreatedPlayer} successful created!`,
			})
		}

		if (status === 'success' && lastUpdatedPlayer) {
			navigate('/players')
			showToast({
				type: 'success',
				message: `Player: ${lastUpdatedPlayer} successful updated!`,
			})
		}

		if (status === 'error' && error) {
			showToast({
				type: 'error',
				message: `${error}`,
			})
		}

		return () => {
			dispatch(resetPlayerState())
		}
	}, [dispatch, error, lastCreatedPlayer, lastUpdatedPlayer, navigate, status])

	//  catch update player data from player detail for update player
	useEffect(() => {
		if (!location.state?.player) return

		const {
			name: playerName,
			position,
			height,
			weight,
			number,
			birthday,
			playerImg,
			team: { name: teamName },
		} = location.state?.player

		const loadImage = async () => {
			const imageData = await loadImageData(playerImg)

			setPreviewImage(imageData.previewImage)

			if (imageData.fileList) {
				setValue('playerImage', imageData.fileList, { shouldValidate: true })
			}

			reset({
				playerName,
				playerPosition: position,
				playerTeam: teamName,
				playerHeight: height,
				playerWeight: weight,
				playerBirthday: birthday,
				playerNumber: number,
				playerImage: imageData.fileList,
			})
		}

		loadImage()
	}, [location, reset, setValue])

	// submit form
	const onSubmit: SubmitHandler<IAddAndUpdatePlayerFormFields> = (
		body: IAddAndUpdatePlayerFormFields
	): void => {
		console.log('add player or update', body)
		console.log('form value', getValues())

		const formData = new FormData()
		//playerName
		formData.append('playerName', body.playerName)
		//playerPosition
		if (typeof body.playerPosition === 'string') {
			formData.append('playerPosition', body.playerPosition)
		}
		//playerHeight
		formData.append('playerHeight', body.playerHeight)
		//playerWeight
		formData.append('playerWeight', body.playerWeight)
		//playerBirthday
		formData.append('playerBirthday', body.playerBirthday.toISOString())

		if (location.state?.player) {
			//playerId
			if (location.state.player._id) {
				formData.append('playerId', location.state.player._id)
			}
			// oldTeamId
			if (location.state.player.team._id) {
				formData.append('oldTeamId', location.state.player.team._id)
				// newTeamId
				const newTeam = teamOptions.find(team => team.value === body.playerTeam)

				if (
					newTeam?.teamId &&
					newTeam.teamId !== location.state.player.team._id
				) {
					formData.append('newTeamId', newTeam.teamId)
				}
			}

			//playerNumber
			if (body.playerNumber !== undefined) {
				if (
					body.playerNumber &&
					location.state.player.number !== body.playerNumber
				) {
					formData.append('playerNumber', body.playerNumber)
				} else if (!body.playerNumber && location.state.player.number) {
					formData.append('removeNumber', 'true')
				}
			}

			//playerImage
			if (body.playerImage && body.playerImage.length > 0) {
				formData.append('playerImage', body.playerImage[0])
			} else if (location.state.player.playerImg && !body.playerImage) {
				formData.append('removeImage', 'true')
			}

			dispatch(updatePlayerThunk({ body: formData, token }))
		} else {
			// teamId
			if (teamOptions.length > 0) {
				const team = teamOptions.filter(team => team.value === body.playerTeam)
				formData.append('teamId', team[0].teamId!)
			}
			//playerNumber
			if (body.playerNumber) {
				formData.append('playerNumber', body.playerNumber)
			}
			//playerImage
			if (body.playerImage && body.playerImage.length > 0) {
				formData.append('playerImage', body.playerImage[0])
			}
			dispatch(createPlayerThunk({ body: formData, token }))
		}
	}

	return (
		<Section>
			<Header>
				<LinkComponent text={'Players'} route={'/players'} /> <Slash>/</Slash>{' '}
				{location.state?.player ? 'Update player' : 'Add new player'}
			</Header>
			<MainForm encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
				<Left>
					<ImgUpload
						register={register}
						type={'file'}
						name={'playerImage'}
						id={'playerImage'}
						defaultImage={previewImage}
						setPlayerImage={setValue}
						triggerPlayerImage={trigger}
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
									options={teamOptions ?? []}
									selected={
										teamOptions?.find(
											(option: IOption) => option.value === value
										) ?? null
									}
									onChange={(val: IOption | null) => {
										onChange(val?.value ?? null)
										trigger('playerTeam')
									}}
									isLoading={isLoading}
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
								onClick={() => navigate('/players')}
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
