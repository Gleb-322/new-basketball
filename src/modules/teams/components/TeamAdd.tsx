import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { ReactComponent as AddPhotoSVG } from '../../../assets/icons/add-photo.svg'
import { InputComponent } from '../../../ui/Input'
import { ButtonComponent } from '../../../ui/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { IAddTeamFormFields } from '../../../common/interfaces/types'
import { FC, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { post } from '../../../api/baseRequest'
import Cookies from 'js-cookie'
import { NotificationComponent } from '../../../ui/Notification'

const schemaAddTeam = yup.object().shape({
	teamName: yup.string().required('Required'),
	teamDivision: yup.string().required('Required'),
	teamConference: yup.string().required('Required'),
	teamYear: yup.number().required('Required'),
	teamImage: yup
		.mixed<FileList>()
		.required('Profile picture is required')
		.test('fileSize', 'File size must be less than 2MB', value => {
			return value && value.length > 0 && value[0].size <= 2 * 1024 * 1024 // Проверка размера файла
		})
		.test('fileType', 'Only JPEG or PNG files are allowed', value => {
			return (
				value &&
				value.length > 0 &&
				['image/jpeg', 'image/png'].includes(value[0].type)
			) // Проверка типа файла
		}),
})

export const TeamAdd: FC = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState<IAddTeamFormFields | null>(null)
	const [sendData, allowSendData] = useState<boolean>(false)
	const [notification, setNotification] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors },
	} = useForm<IAddTeamFormFields>({
		resolver: yupResolver<IAddTeamFormFields>(schemaAddTeam),
	})

	useEffect(() => {
		if (sendData) {
			const token = Cookies.get('token')
			const myFormData = new FormData()
			myFormData.append('teamName', formData!.teamName)
			myFormData.append('teamDivision', formData!.teamDivision)
			myFormData.append('teamConference', formData!.teamConference)
			myFormData.append('teamYear', formData!.teamYear.toString())
			myFormData.append('teamImage', formData!.teamImage[0])
			post('/teams/create', token, myFormData)
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
			allowSendData(false)
		}
	}, [formData, sendData])

	const onSubmit: SubmitHandler<IAddTeamFormFields> = (
		data: IAddTeamFormFields
	): void => {
		console.log('add team', data)

		setFormData(data)
		allowSendData(true)
	}

	const submitTrigger = () => trigger()
	const closeNotification = () => setNotification(null)
	const navigateToTeamDashboard = () => navigate('/teams')
	return (
		<Section>
			<Header>
				Teams <Slash>/</Slash> Add new team
			</Header>
			<Main>
				<Left>
					<ImgBlock>
						<AddPhotoSVG />
					</ImgBlock>
				</Left>
				<Right>
					<Form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
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
							type={'number'}
							name={'teamYear'}
							id={'teamYear'}
							label={'Year of foundation'}
							focus={false}
							error={errors.teamYear?.message}
						/>
						<InputComponent
							register={register}
							type={'file'}
							name={'teamImage'}
							id={'teamImage'}
							label={''}
							focus={false}
							error={errors.teamImage?.message}
						/>
						<Buttons>
							<ButtonComponent
								type={'button'}
								text={'Cancel'}
								cancel={true}
								cancelTeamHandler={navigateToTeamDashboard}
							/>
							<ButtonComponent
								type={'submit'}
								text={'Save'}
								save={true}
								createTeamHandler={submitTrigger}
							/>
						</Buttons>
					</Form>
				</Right>
			</Main>
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

const Main = styled.div`
	display: flex;
	margin: 48px 0;
`
const Left = styled.div`
	width: 50%;
	display: flex;
	justify-content: start;
	align-items: start;
`

const ImgBlock = styled.div`
	margin-left: 60px;
	width: 365px;
	height: 280px;
	background-color: ${({ theme }) => theme.colors.lightGrey};
	opacity: 0.5;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Right = styled.div`
	width: 50%;
`
const Form = styled.form`
	width: 365px;
`

const Buttons = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`
