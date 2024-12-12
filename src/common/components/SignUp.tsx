import styled from 'styled-components'
import { ReactComponent as SignUpSVG } from '../../assets/images/signup.svg'
import { FC, useState } from 'react'
import { InputComponent } from '../../ui/Input'
import { CheckboxComponent } from '../../ui/Checkbox'
import { LinkComponent } from '../../ui/Link'
import { ButtonComponent } from '../../ui/Button'

export const SignUp: FC = () => {
	const [checked, setChecked] = useState<boolean>(false)

	const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target?.checked)
		console.log(checked)
	}

	const handlerSubmit = () => {
		console.log('Sign up')
	}

	return (
		<Conatiner>
			<Left>
				<Form>
					<Title>Sign Up</Title>

					<InputComponent
						type={'text'}
						name={'name'}
						id={'signupName'}
						focus={true}
						label={'Name'}
					/>

					<InputComponent
						type={'text'}
						name={'login'}
						id={'signupLogin'}
						focus={false}
						label={'Login'}
					/>

					<InputComponent
						type={'password'}
						name={'password'}
						id={'signupPassword'}
						focus={false}
						label={'Password'}
					/>

					<InputComponent
						type={'password'}
						name={'passwordAgain'}
						id={'signupPasswordAgain'}
						focus={false}
						label={'Enter your password again'}
					/>

					<CheckboxComponent
						isChecked={checked}
						handleChange={handleCheckbox}
						label={'Text'}
					/>
					<ButtonComponent
						type={'submit'}
						text={'Sign Up'}
						add={false}
						save={false}
						cancel={false}
						signup={true}
						signUpHandler={handlerSubmit}
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
