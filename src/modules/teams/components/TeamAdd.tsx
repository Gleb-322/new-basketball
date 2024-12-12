import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { ReactComponent as AddPhotoSVG } from '../../../assets/icons/add-photo.svg'
import { InputComponent } from '../../../ui/Input'
import { ButtonComponent } from '../../../ui/Button'

export const TeamAdd = () => {
	const navigate = useNavigate()

	const navigateToTeamDashboard = () => navigate('/teams')
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
						<InputComponent
							type={'text'}
							name={'teamText'}
							id={'teamText'}
							label={'Name'}
							focus={true}
						/>
						<InputComponent
							type={'text'}
							name={'teamDiv'}
							id={'teamDiv'}
							label={'Division'}
							focus={false}
						/>
						<InputComponent
							type={'text'}
							name={'teamCon'}
							id={'teamCon'}
							label={'Conference'}
							focus={false}
						/>
						<InputComponent
							type={'number'}
							name={'teamYear'}
							id={'teamYear'}
							label={'Year of foundation'}
							focus={false}
						/>
						<Buttons>
							<ButtonComponent
								type={'button'}
								text={'Cancel'}
								add={false}
								cancel={true}
								save={false}
								cancelTeamHandler={navigateToTeamDashboard}
							/>
							<ButtonComponent
								type={'submit'}
								text={'Save'}
								add={false}
								cancel={false}
								save={true}
								createTeamHandler={navigateToTeamDashboard}
							/>
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

const Buttons = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`
