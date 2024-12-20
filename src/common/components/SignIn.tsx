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
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'

const schemaSignIn = yup.object().shape({
	loginSignin: yup.string().required('Required'),
	passwordSignin: yup.string().required('Required'),
})

export const SignIn: FC = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState<ISigninFormFields | null>(null)
	const [sendData, allowSendData] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors },
	} = useForm<ISigninFormFields>({
		resolver: yupResolver<ISigninFormFields>(schemaSignIn),
	})

	useEffect(() => {
		if (sendData) {
			post('/users/login', undefined, JSON.stringify(formData))
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
						setErrorMessage(`${result.message}`)
					}
				})
				.catch(error => {
					console.log('error', error)
					setErrorMessage(
						`Something going wrong... Error status: ${error.status}`
					)
				})
		}

		return () => {
			allowSendData(false)
		}
	}, [formData, sendData])

	const onSubmit: SubmitHandler<ISigninFormFields> = (
		data: ISigninFormFields
	): void => {
		console.log('Sign in', data)
		setFormData(data)
		allowSendData(true)
	}

	const closeErrorMessage = (close: boolean) => setErrorMessage(null)

	const submitTrigger = () => trigger()
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
						signin={true}
						signInHandler={submitTrigger}
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
			{errorMessage ? (
				<NotificationComponent
					message={errorMessage}
					close={closeErrorMessage}
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
