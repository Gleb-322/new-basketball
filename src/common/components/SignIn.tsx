import styled from 'styled-components'
import { ReactComponent as SignInSVG } from '../../assets/images/signin.svg'
import { InputComponent } from '../../ui/Input'
import { FC, useEffect, useState } from 'react'
import { ButtonComponent } from '../../ui/Button'
import { LinkComponent } from '../../ui/Link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ISigninFormFields } from '../interfaces/types'
import { NotificationComponent } from '../../ui/Notification'
import { post } from '../../api/baseRequest'
import { useLocation, useNavigate } from 'react-router'
import { setAuthCookie } from '../helpers/setAuthToken'
import { useAuth } from '../hooks/useAuth'

const schemaSignIn = yup.object().shape({
	loginSignin: yup.string().required('Login is required!'),
	passwordSignin: yup.string().required('Password is required!'),
})

export const SignIn: FC = () => {
	const location = useLocation()
	const { setToken } = useAuth()
	const navigate = useNavigate()
	const [formData, setFormData] = useState<ISigninFormFields | null>(null)
	const [sendData, allowSendData] = useState<boolean>(false)
	const [notification, setNotification] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ISigninFormFields>({
		resolver: yupResolver<ISigninFormFields>(schemaSignIn),
		mode: 'onTouched',
	})

	useEffect(() => {
		if (sendData) {
			post('/users/login', undefined, JSON.stringify(formData))
				.then(result => {
					console.log(result)
					if (result.success) {
						setAuthCookie(result.message.token)
						setToken(result.message.token)
						localStorage.setItem('name', result.message.user.name)
						navigate('/teams')
					}

					if (!result.success) {
						setNotification(`${result.message}`)
					}
				})
				.catch(error => {
					console.log('error', error)
					setNotification(
						`Something going wrong... Error status: ${error.status}`
					)
				})
		}

		return () => {
			allowSendData(false)
		}
	}, [formData, sendData])

	useEffect(() => {
		if (location.state?.successLogout) {
			setNotification(`${location.state?.successLogout}`)
			const timer = setTimeout(() => {
				closeNotification()
			}, 6000)

			return () => clearTimeout(timer)
		}
	}, [location])

	const onSubmit: SubmitHandler<ISigninFormFields> = (
		data: ISigninFormFields
	): void => {
		console.log('Sign in', data)
		setFormData(data)
		allowSendData(true)
	}

	const closeNotification = () => setNotification(null)

	return (
		<Conatiner>
			<Left>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Title>Sign In</Title>
					<InputComponent
						register={register}
						type={'text'}
						id={'signinLogin'}
						name={'loginSignin'}
						focus={true}
						label={'Login'}
						error={errors.loginSignin?.message}
					/>
					<InputComponent
						register={register}
						type={'password'}
						id={'signinPassword'}
						name={'passwordSignin'}
						focus={false}
						label={'Password'}
						error={errors.passwordSignin?.message}
					/>
					<ButtonComponent
						type={'submit'}
						text={'Sign in'}
						variant={'signin'}
						disabled={isValid}
					/>
					<Links>
						Not a member yet?
						<LinkComponent route={'/signup'} text={'Sign up'} />
					</Links>
				</Form>
			</Left>
			<Right>
				<SignInSVG />
			</Right>
			{notification ? (
				<NotificationComponent
					error={location.state?.successLogout ? false : true}
					message={notification}
					close={closeNotification}
				/>
			) : null}
		</Conatiner>
	)
}

const Conatiner = styled.section`
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
