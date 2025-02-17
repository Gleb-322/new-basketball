import styled from 'styled-components'
import { ReactComponent as SignUpSVG } from '../../assets/images/signup.svg'
import { FC, useEffect, useState } from 'react'
import { InputComponent } from '../../ui/Input'
import { CheckboxComponent } from '../../ui/Checkbox'
import { LinkComponent } from '../../ui/Link'
import { ButtonComponent } from '../../ui/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ISignupFormFields } from '../interfaces/types'
import { post } from '../../api/baseRequest'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import { NotificationComponent } from '../../ui/Notification'

const schemaSignUp = yup.object().shape({
	nameSignup: yup.string().required('Required'),
	loginSignup: yup.string().required('Required'),
	passwordSignup: yup.string().required('Required'),
	passwordAgainSignup: yup
		.string()
		.oneOf([yup.ref('passwordSignup')], 'Passwords must match')
		.required('Confirm password is required'),
})

export const SignUp: FC = () => {
	const navigate = useNavigate()
	const [notification, setNotification] = useState<string | null>(null)
	const [formData, setFormData] = useState<ISignupFormFields | null>(null)
	const [sendData, allowSendData] = useState<boolean>(false)
	const [checked, setChecked] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors },
	} = useForm<ISignupFormFields>({
		resolver: yupResolver<ISignupFormFields>(schemaSignUp),
	})

	useEffect(() => {
		if (sendData) {
			post('/users/create', undefined, JSON.stringify(formData))
				.then(result => {
					if (result.success) {
						Cookies.set('token', result.message.token, {
							expires: 1,
							secure: true,
						})
						Cookies.set('name', result.message.user.name, {
							expires: 1,
						})
						if (Cookies.get('token') !== undefined) {
							navigate('/teams')
						}
					}

					if (!result.success) {
						setNotification(`${result.message}`)
					}
				})
				.catch(error => {
					setNotification(
						`Something going wrong... Error status: ${error.status}`
					)
				})
		}

		return () => {
			allowSendData(false)
		}
	}, [formData, sendData])

	const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target?.checked)
		console.log(checked)
	}

	const onSubmit: SubmitHandler<ISignupFormFields> = (
		data: ISignupFormFields
	) => {
		console.log('Sign up', data)
		setFormData(data)
		allowSendData(true)
	}

	const submitTrigger = () => trigger()

	const closeNotification = () => setNotification(null)

	return (
		<Conatiner>
			<Left>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Title>Sign Up</Title>

					<InputComponent
						register={register}
						type={'text'}
						name={'nameSignup'}
						id={'nameSignup'}
						focus={true}
						label={'Name'}
						error={errors.nameSignup?.message}
					/>

					<InputComponent
						register={register}
						type={'text'}
						name={'loginSignup'}
						id={'loginSignup'}
						focus={false}
						label={'Login'}
						error={errors.loginSignup?.message}
					/>

					<InputComponent
						register={register}
						type={'password'}
						name={'passwordSignup'}
						id={'passwordSignup'}
						focus={false}
						label={'Password'}
						error={errors.passwordSignup?.message}
					/>

					<InputComponent
						register={register}
						type={'password'}
						name={'passwordAgainSignup'}
						id={'passwordAgainSignup'}
						focus={false}
						label={'Enter your password again'}
						error={errors.passwordAgainSignup?.message}
					/>

					<CheckboxComponent
						isChecked={checked}
						handleChange={handleCheckbox}
						label={'Text'}
					/>
					<ButtonComponent
						type={'submit'}
						text={'Sign Up'}
						signup={true}
						signUpHandler={submitTrigger}
					/>

					<Links>
						Already a member?
						<LinkComponent route={'/signin'} text={'Sign in'} />
					</Links>
				</Form>
			</Left>
			<Right>
				<SignUpSVG />
			</Right>
			{notification ? (
				<NotificationComponent
					message={notification}
					error={true}
					close={closeNotification}
				/>
			) : null}
		</Conatiner>
	)
}

const Conatiner = styled.section`
	position: relative;
	z-index: 20;
	width: 100wh;
	height: 100vh;
	display: flex;
`
const Left = styled.div`
	width: 40%;
	background-color: ${({ theme }) => theme.colors.white};
	display: flex;
	justify-content: center;
	align-items: center;
`
const Form = styled.form`
	width: 365px;
`
const Title = styled.div`
	font-family: 'Avenir Book';
	font-size: 36px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.blue};
	margin-bottom: 32px;
`

const Right = styled.div`
	width: 60%;
	background-color: ${({ theme }) => theme.colors.whiteBlue};
	display: flex;
	justify-content: center;
	align-items: center;
`
const Links = styled.div`
	text-align: center;
	font-family: 'Avenir Medium';
	font-size: 14px;
	line-height: 24px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.grey};
`
