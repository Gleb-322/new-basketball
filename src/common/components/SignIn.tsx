import styled from 'styled-components'
import { ReactComponent as SignInSVG } from '../../assets/images/signin.svg'
import { InputComponent } from '../../ui/Input'
import { FC } from 'react'
import { ButtonComponent } from '../../ui/Button'
import { LinkComponent } from '../../ui/Link'

export const SignIn: FC = () => {
	const handlerSubmit = () => {
		console.log('Sign in')
	}
	return (
		<Conatiner>
			<Left>
				<Form>
					<Title>Sign In</Title>
					<InputComponent
						type={'text'}
						id={'signinLogin'}
						name={'login'}
						focus={true}
						label={'Login'}
					/>
					<InputComponent
						type={'password'}
						id={'signinPassword'}
						name={'password'}
						focus={false}
						label={'Password'}
					/>
					<ButtonComponent
						type={'submit'}
						text={'Sign in'}
						add={false}
						save={false}
						cancel={false}
						signin={true}
						signInHandler={handlerSubmit}
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
