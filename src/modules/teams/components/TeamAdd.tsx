import { useNavigate } from 'react-router'
import styled from 'styled-components'
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
import { ImgUpload } from '../../../ui/ImageUpload'

const schemaAddTeam = yup.object().shape({
	teamName: yup.string().required('Required'),
	teamDivision: yup.string().required('Required'),
	teamConference: yup.string().required('Required'),
	teamYear: yup.number().required('Required'),
	teamImage: yup
		.mixed<FileList>()
		.test('required', 'Team logo is required!', value => {
			return value instanceof FileList && value.length > 0 // Если файла нет — ошибка
		})
		.test('fileSize', 'The file is too big (max. 2MB)', value => {
			if (!value || !(value instanceof FileList) || value.length === 0)
				return true // Пропускаем, если файла нет
			return value[0].size <= 2 * 1024 * 1024 // Ограничение 2MB
		})
		.test('fileType', 'Incorrect file format (JPG, PNG only)', value => {
			if (!value || !(value instanceof FileList) || value.length === 0)
				return true // Пропускаем, если файла нет
			return ['image/jpeg', 'image/png'].includes(value[0].type) // Разрешаем только JPG и PNG
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
		mode: 'onTouched',
	})

	useEffect(() => {
		if (sendData) {
			const token = Cookies.get('token')
			const myFormData = new FormData()
			myFormData.append('teamName', formData!.teamName)
			myFormData.append('teamDivision', formData!.teamDivision)
			myFormData.append('teamConference', formData!.teamConference)
			myFormData.append('teamYear', formData!.teamYear.toString())
			if (formData?.teamImage) {
				myFormData.append('teamImage', formData!.teamImage[0])
			}
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
			<MainForm
				encType="multipart/form-data"
				onSubmit={handleSubmit(onSubmit, error => console.log(error))}
			>
				<Left>
					<ImgUpload
						register={register}
						type={'file'}
						name={'teamImage'}
						id={'teamImage'}
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
							type={'number'}
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
