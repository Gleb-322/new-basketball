import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { ReactComponent as AddPhotoSVG } from '../../../assets/icons/add-photo.svg'

export const TeamAdd = () => {
	const navigate = useNavigate()
	return (
		<Section>
			<Header>
				Teams <Slash>/</Slash> Add new team
			</Header>
			<Main>
				<Left>
					<ImgBlock>
						<AddPhotoSVG />
					</ImgBlock>
				</Left>
				<Right>
					<Form>
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
							<Label htmlFor="division">Division</Label>
							<Input
								autoComplete="off"
								type="text"
								name="division"
								id="division"
							/>
						</div>
						<div>
							<Label htmlFor="cnference">Conference</Label>
							<Input
								autoComplete="off"
								type="text"
								name="cnference"
								id="cnference"
							/>
						</div>
						<div>
							<Label htmlFor="year">Year of foundation</Label>
							<Input autoComplete="off" type="number" name="year" id="year" />
						</div>
						<Buttons>
							<Cancel onClick={() => navigate('/teams')} type="button">
								Cancel
							</Cancel>
							<Submit type="submit">Save</Submit>
						</Buttons>
					</Form>
				</Right>
			</Main>
		</Section>
	)
}

const Section = styled.section`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 10px;
	padding: 24px 32px;
`
const Header = styled.header`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 14px;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.red};
`
const Slash = styled.span`
	color: ${({ theme }) => theme.colors.lightGrey};
`

const Main = styled.div`
	display: flex;
	margin: 48px 0;
`
const Left = styled.div`
	width: 50%;
	display: flex;
	justify-content: start;
	align-items: start;
`

const ImgBlock = styled.div`
	margin-left: 60px;
	width: 365px;
	height: 280px;
	background-color: ${({ theme }) => theme.colors.lightGrey};
	opacity: 0.5;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Right = styled.div`
	width: 50%;
`
const Form = styled.form`
	width: 365px;
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

const Buttons = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`

const Cancel = styled.button`
	cursor: pointer;
	width: 45%;
	height: 40px;
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.lightGrey};
	border: solid 1px ${({ theme }) => theme.colors.lightGrey};
	font-family: 'Avenir Medium';
	font-size: 15px;
	line-height: 24px;
	font-weight: 500;
	padding: 8px auto;
	border-radius: 4px;
	&:hover {
		background-color: ${({ theme }) => theme.colors.lightGrey};
		color: ${({ theme }) => theme.colors.white};
	}
	&:active {
		background-color: ${({ theme }) => theme.colors.grey};
		color: ${({ theme }) => theme.colors.white};
		border: solid 1px ${({ theme }) => theme.colors.grey};
	}
	&:disabled {
		background-color: ${({ theme }) => theme.colors.mostLightGrey};
		color: ${({ theme }) => theme.colors.lightestGrey};
		border: solid 1px ${({ theme }) => theme.colors.mostLightGrey};
		&:hover {
			background-color: ${({ theme }) => theme.colors.mostLightGrey};
			border: solid 1px ${({ theme }) => theme.colors.mostLightGrey};
		}
	}
`

const Submit = styled.button`
	cursor: pointer;
	width: 45%;
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
