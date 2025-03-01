import { useLocation, useNavigate } from 'react-router'
import styled from 'styled-components'
import { InputComponent } from '../../../ui/Input'
import { ButtonComponent } from '../../../ui/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { IAddAndUpdateTeamFormFields, ITeams } from '../interfaces/types'
import { FC, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { patch, post } from '../../../api/baseRequest'
import { NotificationComponent } from '../../../ui/Notification'
import { ImgUpload } from '../../../ui/ImageUpload'
import { useAuth } from '../../../common/hooks/useAuth'

const schemaCreateAndUpdateTeam = yup.object().shape({
	teamName: yup.string().required('Team Name is required!'),
	teamDivision: yup.string().required('Team Division is required!'),
	teamConference: yup.string().required('Team Conference is required!'),
	teamYear: yup
		.string()
		.required('Team Year of foundation is required!')
		.matches(/^\d{4}$/, 'Four digits required!'),
	teamImage: yup
		.mixed<FileList>()
		.test('required', 'Team Logo is required!', value => {
			return value instanceof FileList && value.length > 0 // Если файла нет — ошибка
		})
		.test('fileSize', 'The file is too big (max. 2MB)!', value => {
			if (!value || !(value instanceof FileList) || value.length === 0)
				return true // Пропускаем, если файла нет
			return value[0].size <= 2 * 1024 * 1024 // Ограничение 2MB
		})
		.test('fileType', 'Incorrect file format (JPG, PNG only)!', value => {
			if (!value || !(value instanceof FileList) || value.length === 0)
				return true // Пропускаем, если файла нет
			return ['image/jpeg', 'image/png'].includes(value[0].type) // Разрешаем только JPG и PNG
		}),
})

export const TeamAdd: FC = () => {
	const { token } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const [createData, setCreateData] = useState<
		IAddAndUpdateTeamFormFields | undefined
	>(undefined)
	const [updateData, setUpdateData] = useState<
		IAddAndUpdateTeamFormFields | undefined
	>(undefined)
	const [previewImage, setPreviewImage] = useState<string | undefined>()
	const [createTeam, setCreateTeam] = useState<boolean>(false)
	const [updateTeam, setUpdateTeam] = useState<boolean>(false)
	const [notification, setNotification] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IAddAndUpdateTeamFormFields>({
		resolver: yupResolver<IAddAndUpdateTeamFormFields>(
			schemaCreateAndUpdateTeam
		),
		mode: 'onTouched',
		// defaultValues: updateData,
	})

	// create new team
	useEffect(() => {
		if (createTeam && createData) {
			const createTeamFormData = new FormData()
			createTeamFormData.append('teamName', createData.teamName)
			createTeamFormData.append('teamDivision', createData.teamDivision)
			createTeamFormData.append('teamConference', createData.teamConference)
			createTeamFormData.append('teamYear', createData.teamYear)
			createTeamFormData.append('teamImage', createData.teamImage![0])

			if (createData.teamImage && createData.teamImage.length > 0) {
				createTeamFormData.append('teamImage', createData.teamImage![0])
			}

			post('/teams/create', token, createTeamFormData)
				.then(result => {
					console.log('team create res', result)
					if (result.success) {
						navigate('/teams', { state: { name: result.message.team.name } })
					}

					if (!result.success) {
						setNotification(`${result.message}`)
					}
				})
				.catch(error => {
					console.log('team create res error', error)
					setNotification(
						`Something going wrong... Error status: ${error.status}`
					)
				})
		}

		return () => {
			setCreateTeam(false)
		}
	}, [createData, createTeam])

	// catch one team data for update team
	useEffect(() => {
		if (location.state?.team) {
			const locationState = location.state?.team

			let file: File | undefined

			if (locationState.teamImg && locationState.teamImg.data) {
				// Декодируем Buffer
				const byteArray = new Uint8Array(locationState.teamImg.data)
				// Создаём Blob
				const blob = new Blob([byteArray], { type: 'image/jpeg' })
				// Создаём File
				file = new File([blob], `${locationState.name}`, { type: blob.type })
				// Конвертируем в base64 для отображения в ImgUpload
				const reader = new FileReader()
				reader.readAsDataURL(blob)
				reader.onloadend = () => {
					setPreviewImage(reader.result as string)
				}
			}
			const data: IAddAndUpdateTeamFormFields = {
				teamName: locationState.name,
				teamDivision: locationState.division,
				teamConference: locationState.conference,
				teamYear: locationState.year,
				teamImage: file ? ([file] as unknown as FileList) : undefined, // Преобразуем в FileList
			}
			console.log(data)
			setUpdateData(data)
			setUpdateTeam(true)
		}
	}, [location])

	// set update data in form values
	useEffect(() => {
		if (updateData) {
			reset(updateData) // Сбрасываем форму с новыми значениями
		}
	}, [updateData, reset])

	// update team by updateData
	useEffect(() => {
		if (updateTeam && updateData) {
			console.log('updateData', updateData)
			const updateTeamFormData = new FormData()
			updateTeamFormData.append('teamName', updateData.teamName)
			updateTeamFormData.append('teamDivision', updateData.teamDivision)
			updateTeamFormData.append('teamConference', updateData.teamConference)
			updateTeamFormData.append('teamYear', updateData.teamYear)

			if (
				typeof updateData === 'object' &&
				updateData.teamImage &&
				Array.isArray(updateData.teamImage) &&
				updateData.teamImage.length > 0
			) {
				updateTeamFormData.append('teamImage', updateData.teamImage[0])
			}

			patch('/teams/update', token, updateTeamFormData).then(result => {
				console.log('res update team', result)
			})
		}
	}, [updateTeam, updateData])

	const onSubmit: SubmitHandler<IAddAndUpdateTeamFormFields> = (
		data: IAddAndUpdateTeamFormFields
	): void => {
		console.log('add team or update', data)
		if (location.state?.team) {
			setUpdateData(data)
			setUpdateTeam(true)
		} else {
			setCreateData(data)
			setCreateTeam(true)
		}
	}

	const closeNotification = () => setNotification(null)
	const navigateToTeamDashboard = () => navigate('/teams')
	return (
		<Section>
			<Header>
				Teams <Slash>/</Slash> Add new team
			</Header>
			<MainForm encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
				<Left>
					<ImgUpload
						register={register}
						type={'file'}
						name={'teamImage'}
						id={'teamImage'}
						defaultImage={previewImage} // Передаём картинку
						error={errors.teamImage?.message}
					/>
				</Left>
				<Right>
					<FormBlock>
						<InputComponent
							register={register}
							type={'text'}
							name={'teamName'}
							id={'teamName'}
							label={'Name'}
							focus={true}
							error={errors.teamName?.message}
						/>
						<InputComponent
							register={register}
							type={'text'}
							name={'teamDivision'}
							id={'teamDivision'}
							label={'Division'}
							focus={false}
							error={errors.teamDivision?.message}
						/>
						<InputComponent
							register={register}
							type={'text'}
							name={'teamConference'}
							id={'teamConference'}
							label={'Conference'}
							focus={false}
							error={errors.teamConference?.message}
						/>
						<InputComponent
							register={register}
							type={'string'}
							name={'teamYear'}
							id={'teamYear'}
							label={'Year of foundation'}
							focus={false}
							error={errors.teamYear?.message}
						/>

						<Buttons>
							<ButtonComponent
								type={'button'}
								text={'Cancel'}
								variant={'cancel'}
								onClick={navigateToTeamDashboard}
							/>
							<ButtonComponent type={'submit'} text={'Save'} variant={'save'} />
						</Buttons>
					</FormBlock>
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
const FormBlock = styled.div`
	width: 365px;
`

const Buttons = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`
