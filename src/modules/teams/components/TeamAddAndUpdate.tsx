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
import { showToast } from '../../../ui/ToastrNotification'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { RootState } from '../../../core/redux/store'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { createTeamThunk, updateTeamThunk } from '../../../api/teams/teamThunks'
import { LinkComponent } from '../../../ui/Link'
import { resetTeamState } from '../teamSlice'
import { loadImageData } from '../../../common/helpers/transformImageData'
import { device } from '../../../common/helpers/breakpoint'

const schemaCreateAndUpdateTeam = yup.object().shape({
	teamName: yup
		.string()
		.required('Name is required!')
		.matches(/^[A-Za-zА-Яа-яЁё\s-]+$/, 'Invalid Name!'),
	teamDivision: yup
		.string()
		.required('Division is required!')
		.matches(/^[A-Za-zА-Яа-яЁё\s-]+$/, 'Invalid Division!'),
	teamConference: yup
		.string()
		.required('Conference is required!')
		.matches(/^[A-Za-zА-Яа-яЁё\s-]+$/, 'Invalid Conference!'),
	teamYear: yup
		.string()
		.required('Team Year of foundation is required!')
		.matches(/^\d{4}$/, 'Four digits!'),
	teamImage: yup
		.mixed<FileList>()
		.test('required', 'Logo is required!', value => {
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

	// catch update team data from team detail for update team
	useEffect(() => {
		if (!location.state?.team) return

		const { name, division, conference, year, teamImg } = location.state?.team

		const loadImage = async () => {
			const imageData = await loadImageData(teamImg)

			setPreviewImage(imageData.previewImage)

			if (imageData.fileList) {
				setValue('teamImage', imageData.fileList, { shouldValidate: true })
				setFileList(imageData.fileList)
			}

			reset({
				teamName: name,
				teamDivision: division,
				teamConference: conference,
				teamYear: year,
				teamImage: imageData.fileList,
			})
		}

		loadImage()
	}, [location, reset, setValue])

	// submit form
	const onSubmit: SubmitHandler<IAddAndUpdateTeamFormFields> = (
		body: IAddAndUpdateTeamFormFields
	): void => {
		console.log('add team or update', body)

		const formData = new FormData()
		// teamName
		formData.append('teamName', body.teamName)
		// teamDivision
		formData.append('teamDivision', body.teamDivision)
		// teamConference
		formData.append('teamConference', body.teamConference)
		// teamYear
		formData.append('teamYear', body.teamYear)

		if (location.state?.team) {
			// teamId
			if (location.state.team._id) {
				formData.append('teamId', location.state.team._id)
			}

			// teamImage
			if (
				body.teamImage &&
				body.teamImage.length > 0 &&
				(!fileList ||
					body.teamImage[0].name !== fileList[0].name ||
					body.teamImage[0].size !== fileList[0].size)
			) {
				formData.append('teamImage', body.teamImage[0])
			}
			dispatch(updateTeamThunk({ body: formData, token }))
		} else {
			// teamImage
			if (body.teamImage && body.teamImage.length > 0) {
				formData.append('teamImage', body.teamImage[0])
			}
			dispatch(createTeamThunk({ body: formData, token }))
		}
	}

	return (
		<Container>
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
		</Container>
	)
}

const Container = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 10px;
	padding: 24px 32px;
	@media ${device.custom1140} {
		padding: 24px 20px;
	}
	@media ${device.tablet} {
		padding: 16px;
		border-radius: 0px;
	}
`
const Header = styled.header`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 14px;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.red};
	@media ${device.tablet} {
		font-size: 13px;
		line-height: 18px;
	}
`
const Slash = styled.span`
	color: ${({ theme }) => theme.colors.lightGrey};
`

const MainForm = styled.form`
	width: 70%;
	display: flex;
	justify-content: space-around;
	margin: 48px 0;
	@media ${device.desktop} {
		width: 100%;
	}
	@media ${device.tablet} {
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
`
const Left = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	@media ${device.custom1140} {
		width: 45%;
	}
	@media ${device.tablet} {
		align-items: center;
	}
	@media ${device.mobileL} {
		width: 100%;
	}
`

const Right = styled.div`
	@media ${device.custom1140} {
		width: 45%;
	}
	@media ${device.tablet} {
		width: 75%;
	}
	@media ${device.custom620} {
		width: 85%;
	}
	@media ${device.custom620} {
		width: 95%;
	}
	@media ${device.mobileL} {
		width: 100%;
	}
`
const InputsBlock = styled.div`
	width: 365px;
	@media ${device.custom1140} {
		width: 100%;
	}
	@media ${device.tablet} {
		margin-top: 48px;
	}
`

const Buttons = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`
