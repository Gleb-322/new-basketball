import styled from 'styled-components'
import { Link } from 'react-router'
import { ReactComponent as SignUpSVG } from '../../assets/images/signup.svg'
import { ReactComponent as OpenEyeSVG } from '../../assets/icons/eye.svg'
import { ReactComponent as CloseEyeSVG } from '../../assets/icons/close-eye.svg'
import { FC, useState } from 'react'

export const SignUp: FC = () => {
	return (
		<Conatiner>
			<Left>
				<Form>
					<Title>Sign Up</Title>
					<div>
						<Label htmlFor="name">Name</Label>
						<Input
							autoComplete="off"
							type="text"
							name="name"
							id="name"
							autoFocus={true}
						/>
					</div>
					<div>
						<Label htmlFor="login">Login</Label>
						<Input autoComplete="off" type="text" name="login" id="login" />
					</div>
					<div>
						<Label htmlFor="password">Password</Label>
						<Input
							autoComplete="off"
							type="password"
							name="password"
							id="password"
						/>
					</div>
					<div>
						<Label htmlFor="passwordAgain"> Enter your password again</Label>
						<Input
							autoComplete="off"
							type="password"
							name="passwordAgain"
							id="passwordAgain"
						/>
					</div>
					<div>
						<CheckBox type="checkbox" id="checkbox" name="checkbox" />
						<Label htmlFor="checkbox">I accept the agreement</Label>
					</div>
					<Button>Sign Up</Button>
					<Links>
						Already a member?
						<StyledLink to="/signin">Sign in</StyledLink>
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
const Label = styled.label`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 14px;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.grey};
`
const Input = styled.input`
	margin-bottom: 24px;
	width: 100%;
	height: 40px;
	margin-top: 8px;
	border-radius: 4px;
	background-color: ${({ theme }) => theme.colors.mostLightGrey};
	color: ${({ theme }) => theme.colors.darkGrey};
	padding: 8px 12px;
	font-family: 'Avenir Medium';
	font-size: 14px;
	font-weight: 500;
	line-height: 24px;
	border: solid 1px ${({ theme }) => theme.colors.mostLightGrey};
	outline: none;
	&:hover {
		background-color: ${({ theme }) => theme.colors.lightestGrey};
		border: solid 1px ${({ theme }) => theme.colors.lightestGrey};
	}
	&:focus {
		box-shadow: 0 0 5px 0 ${({ theme }) => theme.colors.focusInput};
	}
	&:disabled {
		color: ${({ theme }) => theme.colors.lightestGrey};
		&:hover {
			background-color: ${({ theme }) => theme.colors.mostLightGrey};
			border: solid 1px ${({ theme }) => theme.colors.mostLightGrey};
		}
	}
	&:invalid {
		border: solid 1px ${({ theme }) => theme.colors.lightestRed};
	}
`

const CheckBox = styled.input`
	-webkit-appearance: none;
	appearance: none;
	outline: none;
	cursor: pointer;
	width: 1.6em;
	height: 1.6em;
	border-radius: 0.15em;
	margin-right: 0.5em;
	border: 0.15em solid #007a7e;
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
const StyledLink = styled(Link)`
	color: ${({ theme }) => theme.colors.red};
	margin-left: 4px;
`

const Button = styled.button`
	margin-bottom: 24px;
	width: 100%;
	height: 40px;
	background-color: ${({ theme }) => theme.colors.red};
	color: ${({ theme }) => theme.colors.white};
	font-family: 'Avenir Medium';
	font-size: 15px;
	line-height: 24px;
	font-weight: 500;
	padding: 8px auto;
	border: none;
	border-radius: 4px;
	&:hover {
		background-color: ${({ theme }) => theme.colors.lightRed};
	}
	&:active {
		background-color: ${({ theme }) => theme.colors.darkRed};
	}
	&:disabled {
		background-color: ${({ theme }) => theme.colors.mostLightGrey};
		color: ${({ theme }) => theme.colors.lightestGrey};
		&:hover {
			background-color: ${({ theme }) => theme.colors.mostLightGrey};
		}
	}
`
