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
import { resetUserState } from '../../core/redux/userSlice'
import { device } from '../helpers/breakpoint'
import { RootState } from '../../core/redux/store'

const schemaSignIn = yup.object().shape({
	loginSignin: yup.string().required('Login is required!'),
	passwordSignin: yup
		.string()
		.required('Password is required!')
		.matches(
			/^(?=.*[a-zA-Zа-яА-Я])(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
			'Valid password ex.: Pass123!'
		),
})

export const SignIn: FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { status, error } = useAppSelector((state: RootState) => state.user)

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
		payload: ISigninFormFields
	): void => {
		console.log('Sign in', payload)
		dispatch(loginUserThunk(payload))
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
	width: 100vw;
	height: 100vh;
	display: flex;
	overflow-y: auto;
	@media ${device.mobileL} {
		padding: 0px 24px;
	}
`
const Left = styled.div`
	width: 40%;
	background-color: ${({ theme }) => theme.colors.white};
	display: flex;
	justify-content: center;
	align-items: center;
	@media ${device.laptop} {
		width: 100%;
	}
`
const Form = styled.form`
	width: 365px;
	max-height: 100%;

	@media ${device.mobileL} {
		width: 100%;
	}
`
const Title = styled.div`
	font-family: 'Avenir Book';
	font-size: 36px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.blue};
	margin-bottom: 32px;
	@media ${device.laptop} {
		text-align: center;
	}
`

const Right = styled.div`
	width: 60%;
	background-color: ${({ theme }) => theme.colors.whiteBlue};
	display: flex;
	justify-content: center;
	align-items: center;
	@media ${device.laptop} {
		display: none;
	}
`
const Links = styled.div`
	text-align: center;
	font-family: 'Avenir Medium';
	font-size: 14px;
	line-height: 24px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.grey};
`
