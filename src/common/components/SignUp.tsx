import styled from 'styled-components'
import { ReactComponent as SignUpSVG } from '../../assets/images/signup.svg'
import { FC, useEffect, useState } from 'react'
import { InputComponent } from '../../ui/Input'
import { LinkComponent } from '../../ui/Link'
import { ButtonComponent } from '../../ui/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ISignupFormFields } from '../interfaces/types'
import { post } from '../../api/baseRequest'
import { useNavigate } from 'react-router'
import { NotificationComponent } from '../../ui/Notification'
import { setAuthCookie } from '../helpers/setAuthToken'
import { useAuth } from '../hooks/useAuth'

const schemaSignUp = yup.object().shape({
	nameSignup: yup.string().required('Name is required!'),
	loginSignup: yup.string().required('Login is required!'),
	passwordSignup: yup.string().required('Password is required!'),
	// .matches(
	// 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
	// 	'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
	// ),
	passwordAgainSignup: yup
		.string()
		.oneOf([yup.ref('passwordSignup')], 'Passwords must match')
		.required('Confirm password is required!'),
	checkboxSignUp: yup
		.boolean()
		.oneOf([true], 'You must be accept the agreement!'),
})

export const SignUp: FC = () => {
	const { setToken } = useAuth()
	const navigate = useNavigate()
	const [notification, setNotification] = useState<string | null>(null)
	const [formData, setFormData] = useState<ISignupFormFields | null>(null)
	const [sendData, allowSendData] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ISignupFormFields>({
		resolver: yupResolver<ISignupFormFields>(schemaSignUp),
		mode: 'onTouched',
	})

	useEffect(() => {
		if (sendData) {
			post('/users/create', undefined, JSON.stringify(formData))
				.then(result => {
					if (result.success) {
						setAuthCookie(result.message.token)
						setToken(result.message.token)
						// Cookies.set('name', result.message.user.name, {
						// 	expires: 1,
						// })
						navigate('/teams')
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

	const onSubmit: SubmitHandler<ISignupFormFields> = (
		data: ISignupFormFields
	) => {
		console.log('Sign up', data)
		setFormData(data)
		allowSendData(true)
	}

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

					<InputComponent
						register={register}
						label={'I accept the agreement'}
						type={'checkbox'}
						name={'checkboxSignUp'}
						id={'checkboxSignUp'}
						focus={false}
						error={errors.checkboxSignUp?.message}
					/>
					<ButtonComponent
						type={'submit'}
						text={'Sign Up'}
						disabled={isValid}
						variant={'signup'}
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
