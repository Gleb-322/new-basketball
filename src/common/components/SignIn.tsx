import styled from 'styled-components'
import { ReactComponent as SignInSVG } from '../../assets/images/signin.svg'
import { InputComponent } from '../../ui/Input'
import { FC, useEffect } from 'react'
import { ButtonComponent } from '../../ui/Button'
import { LinkComponent } from '../../ui/Link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ISigninFormFields } from '../interfaces/types'
import { useNavigate } from 'react-router'
import { showToast } from '../../ui/ToastrNotification'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { loginUserThunk } from '../../api/users/userThunks'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAuth } from '../hooks/useAuth'
import { resetUserState } from '../../core/redux/userSlice'

const schemaSignIn = yup.object().shape({
	loginSignin: yup.string().required('Login is required!'),
	passwordSignin: yup
		.string()
		.required('Password is required!')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			'Valid password ex.: Pass123!'
		),
})

export const SignIn: FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { setToken } = useAuth()
	const { status, error } = useAppSelector(state => state.user)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ISigninFormFields>({
		resolver: yupResolver<ISigninFormFields>(schemaSignIn),
		mode: 'onTouched',
	})

	useEffect(() => {
		if (status === 'success') {
			navigate('/teams')
			showToast({ type: 'success', message: 'You succesfully login!' })
		}
		if (status === 'error' && error) {
			showToast({ type: 'error', message: error })
		}
		return () => {
			dispatch(resetUserState())
		}
	}, [status, error, navigate, dispatch])

	const onSubmit: SubmitHandler<ISigninFormFields> = (
		body: ISigninFormFields
	): void => {
		console.log('Sign in', body)
		dispatch(loginUserThunk({ body, setToken }))
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
