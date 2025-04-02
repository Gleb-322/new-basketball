import { useLocation, useNavigate } from 'react-router'
import styled from 'styled-components'
import { InputComponent } from '../../../ui/Input'
import { ButtonComponent } from '../../../ui/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
	IAddAndUpdateTeamLocationState,
	IAddAndUpdateTeamFormFields,
	IUpdateTeamData,
} from '../interfaces/types'
import { FC, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { ImgUpload } from '../../../ui/ImageUpload'
import { useAuth } from '../../../common/hooks/useAuth'
import { convertFileToList } from '../../../common/helpers/converterFileToFileList'
import { convertBufferToFile } from '../helpers/converterBufferToFile'
import { convertFileToBase64 } from '../../../common/helpers/converterFileToBase64'
import { createTeams, patchTeam } from '../../../api/teams/teamsService'
import { showToast } from '../../../ui/ToastrNotification'

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
			// Если файла нет — ошибка
			return value instanceof FileList && value.length > 0
		})
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

export const TeamCreateAndUpdate: FC = () => {
	const { token } = useAuth()

	const navigate = useNavigate()
	const location = useLocation() as unknown as Location &
		IAddAndUpdateTeamLocationState

	const [createData, setCreateData] = useState<
		IAddAndUpdateTeamFormFields | undefined
	>(undefined)
	const [updateData, setUpdateData] = useState<IUpdateTeamData | undefined>(
		undefined
	)
	const [updateFormValues, setUpdateFormValues] = useState<
		IUpdateTeamData | undefined
	>(undefined)
	const [createTeam, setCreateTeam] = useState<boolean>(false)
	const [updateTeam, setUpdateTeam] = useState<boolean>(false)

	const [previewImage, setPreviewImage] = useState<string | undefined>()

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		trigger,
		formState: { errors },
	} = useForm<IAddAndUpdateTeamFormFields>({
		resolver: yupResolver<IAddAndUpdateTeamFormFields>(
			schemaCreateAndUpdateTeam
		),
		defaultValues: {
			teamImage: undefined,
		},
		mode: 'onTouched',
	})

	// create new team
	useEffect(() => {
		if (!createTeam && !createData) return

		if (createTeam && createData) {
			const createTeamFormData = new FormData()
			createTeamFormData.append('teamName', createData.teamName)
			createTeamFormData.append('teamDivision', createData.teamDivision)
			createTeamFormData.append('teamConference', createData.teamConference)
			createTeamFormData.append('teamYear', createData.teamYear)

			if (createData.teamImage && createData.teamImage.length > 0) {
				createTeamFormData.append('teamImage', createData.teamImage[0])
			}

			createTeams(createTeamFormData, token)
				.then(result => {
					console.log('team create res', result)
					if (result.success) {
						if (result.message instanceof Object) {
							navigate('/teams')
							showToast({
								type: 'success',
								message: `Team: ${result.message.team.name} successful created!`,
							})
						}
					}

					if (!result.success) {
						if (typeof result.message === 'string') {
							showToast({
								type: 'error',
								message: `${result.message}`,
							})
						}
					}
				})
				.catch(error => {
					console.log('team create res error', error)
				})
		}

		return () => {
			setCreateTeam(false)
		}
	}, [createData, createTeam, navigate, token])

	// catch one team data for update team
	useEffect(() => {
		if (!location.state?.team) return

		const locationState = location.state?.team

		const file = convertBufferToFile(locationState)

		const fileList = convertFileToList([file!])

		convertFileToBase64(file)
			.then(result => setPreviewImage(result))
			.catch(error =>
				showToast({
					type: 'error',
					message: `${error.message}`,
				})
			)

		const data: IUpdateTeamData = {
			teamName: locationState.name,
			teamDivision: locationState.division,
			teamConference: locationState.conference,
			teamYear: locationState.year,
			teamImage: fileList,
			teamId: locationState._id,
		}

		setUpdateFormValues(data)
	}, [location])

	// set update data in form values
	useEffect(() => {
		if (!updateFormValues) return
		console.log(updateFormValues)
		if (updateFormValues) {
			reset(updateFormValues)
			setValue('teamImage', updateFormValues.teamImage || undefined)
		}
	}, [updateFormValues, reset, setValue])

	// update team by updateData
	useEffect(() => {
		if (!updateTeam && !updateData) return

		if (updateTeam && updateData) {
			const updateTeamFormData = new FormData()
			updateTeamFormData.append('teamName', updateData.teamName)
			updateTeamFormData.append('teamDivision', updateData.teamDivision)
			updateTeamFormData.append('teamConference', updateData.teamConference)
			updateTeamFormData.append('teamYear', updateData.teamYear)

			if (updateFormValues?.teamId) {
				updateTeamFormData.append('teamId', updateFormValues.teamId)
			}

			if (updateFormValues?.teamImage !== updateData.teamImage) {
				if (updateData.teamImage && updateData.teamImage.length > 0) {
					updateTeamFormData.append('teamImage', updateData.teamImage[0])
				}
			}

			patchTeam(updateTeamFormData, token)
				.then(result => {
					console.log('res update team', result)
					if (result.success) {
						if (result.message instanceof Object) {
							navigate('/teams')
							showToast({
								type: 'success',
								message: `Team: ${result.message.name} successful updated!`,
							})
						}
					}
					if (!result.success) {
						if (typeof result.message === 'string') {
							showToast({
								type: 'error',
								message: `${result.message}`,
							})
						}
					}
				})
				.catch(error => {
					console.log('error update team', error)
				})
		}

		return () => {
			setUpdateTeam(false)
		}
	}, [
		updateTeam,
		updateData,
		updateFormValues?.teamImage,
		token,
		navigate,
		updateFormValues?.teamId,
	])

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
						setTeamImage={setValue}
						triggerTeamImage={trigger}
						defaultImage={previewImage}
						error={errors.teamImage?.message}
					/>
				</Left>
				<Right>
					<InputsBlock>
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
								onClick={() => navigate('/teams')}
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
