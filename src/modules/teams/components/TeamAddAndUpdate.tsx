import { useLocation, useNavigate } from 'react-router'
import styled from 'styled-components'
import { InputComponent } from '../../../ui/Input'
import { ButtonComponent } from '../../../ui/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
	IAddAndUpdateTeamLocationState,
	IAddAndUpdateTeamFormFields,
} from '../interfaces/types'
import { FC, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { ImgUpload } from '../../../ui/ImageUpload'
import { convertFileToList } from '../../../common/helpers/converterFileToFileList'

import { convertFileToBase64 } from '../../../common/helpers/converterFileToBase64'
import { showToast } from '../../../ui/ToastrNotification'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { RootState } from '../../../core/redux/store'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { createTeamThunk, updateTeamThunk } from '../../../api/teams/teamThunks'
import { LinkComponent } from '../../../ui/Link'
import { resetTeamState } from '../teamSlice'
import { convertObjectUrlToFile } from '../../../common/helpers/converterObjectUrlToFile'

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
	const navigate = useNavigate()
	const location = useLocation() as unknown as Location &
		IAddAndUpdateTeamLocationState

	const dispatch = useAppDispatch()

	const { token } = useAppSelector((state: RootState) => state.user)

	const { status, error, lastCreatedTeam, lastUpdatedTeam } = useAppSelector(
		(state: RootState) => state.team
	)

	const [file, setFile] = useState<File>()
	const [fileList, setFileList] = useState<FileList>()
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

	// create or update team
	useEffect(() => {
		if (status === 'success' && lastCreatedTeam) {
			navigate('/teams')
			showToast({
				type: 'success',
				message: `Team: ${lastCreatedTeam} successful created!`,
			})
		}

		if (status === 'success' && lastUpdatedTeam) {
			navigate('/teams')
			showToast({
				type: 'success',
				message: `Team: ${lastUpdatedTeam} successful updated!`,
			})
		}

		if (status === 'error' && error) {
			showToast({
				type: 'error',
				message: `${error}`,
			})
		}

		return () => {
			dispatch(resetTeamState())
		}
	}, [dispatch, error, lastCreatedTeam, lastUpdatedTeam, navigate, status])

	// catch update team data from team detail for update team and set update team data in form values

	// useEffect(() => {
	// 	if (!location.state?.team) return

	// 	const { name, division, conference, year } = location.state?.team

	// 	// const file = convertBufferToFile({ team: location.state?.team })

	// 	// const fileList = convertFileToList([file!])

	// 	convertFileToBase64(file)
	// 		.then(result => setPreviewImage(result))
	// 		.catch(error =>
	// 			showToast({
	// 				type: 'error',
	// 				message: `${error.message}`,
	// 			})
	// 		)

	// 	// reset({
	// 	// 	teamName: name,
	// 	// 	teamDivision: division,
	// 	// 	teamConference: conference,
	// 	// 	teamYear: year,
	// 	// 	teamImage: fileList,
	// 	// })
	// 	// setValue('teamImage', fileList || undefined)
	// 	// setFileList(fileList)
	// }, [location, reset, setValue])

	// submit form
	const onSubmit: SubmitHandler<IAddAndUpdateTeamFormFields> = (
		body: IAddAndUpdateTeamFormFields
	): void => {
		console.log('add team or update', body)

		const formData = new FormData()
		formData.append('teamName', body.teamName)
		formData.append('teamDivision', body.teamDivision)
		formData.append('teamConference', body.teamConference)
		formData.append('teamYear', body.teamYear)

		if (location.state?.team) {
			if (location.state.team._id) {
				formData.append('teamId', location.state?.team._id)
			}

			if (
				body.teamImage &&
				body.teamImage.length > 0 &&
				(fileList?.[0]?.name !== body.teamImage[0].name ||
					fileList?.[0]?.size !== body.teamImage[0].size)
			) {
				formData.append('teamImage', body.teamImage[0])
			}
			dispatch(updateTeamThunk({ body: formData, token }))
		} else {
			if (body.teamImage && body.teamImage.length > 0) {
				formData.append('teamImage', body.teamImage[0])
			}
			dispatch(createTeamThunk({ body: formData, token }))
		}
	}

	return (
		<Section>
			<Header>
				<LinkComponent text={'Teams'} route={'/teams'} /> <Slash>/</Slash>{' '}
				{location.state?.team ? 'Update team' : 'Add new team'}
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
