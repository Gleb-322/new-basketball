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
import { useNavigate } from 'react-router'
import { setAuthCookie } from '../helpers/setAuthToken'
import { useAuth } from '../hooks/useAuth'
import { loginUser } from '../../api/users/usersService'
import { showToast } from '../../ui/ToastrNotification'

const schemaSignIn = yup.object().shape({
	loginSignin: yup.string().required('Login is required!'),
	passwordSignin: yup.string().required('Password is required!'),
})

export const SignIn: FC = () => {
	const { setToken } = useAuth()
	const navigate = useNavigate()
	const [signInData, setSignInData] = useState<ISigninFormFields | null>(null)
	const [sendSignInData, allowSendSignInData] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ISigninFormFields>({
		resolver: yupResolver<ISigninFormFields>(schemaSignIn),
		mode: 'onTouched',
	})

	useEffect(() => {
		if (!sendSignInData && !signInData) return

		if (sendSignInData && signInData) {
			loginUser(JSON.stringify(signInData))
				.then(result => {
					console.log('signin res', result)
					if (result.success) {
						if (result.message instanceof Object) {
							setAuthCookie(result.message.token)
							setToken(result.message.token)
							localStorage.setItem('name', result.message.user.name)
							navigate('/teams')
							showToast({ type: 'success', message: 'You succesfully login!' })
						}
					}

					if (!result.success) {
						if (typeof result.message === 'string') {
							showToast({ type: 'error', message: result.message })
						}
					}
				})
				.catch(error => {
					console.log('error', error)
				})
				.finally(() => allowSendSignInData(false))
		}
	}, [signInData, sendSignInData, setToken, navigate])

	const onSubmit: SubmitHandler<ISigninFormFields> = (
		data: ISigninFormFields
	): void => {
		console.log('Sign in', data)
		setSignInData(data)
		allowSendSignInData(true)
	}

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
