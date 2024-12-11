import styled from 'styled-components'
import playerLogo from '../../../assets/images/Player.png'
import { ReactComponent as DeleteSVG } from '../../../assets/icons/delete.svg'
import { ReactComponent as EditSVG } from '../../../assets/icons/create.svg'

export const PlayerDetail = () => {
	return (
		<DetailBlock>
			<HeaderDetail>
				<HeaderText>
					Players <Slash>/</Slash> Judge Sex
				</HeaderText>

				<div>
					<ButtonEdit>
						<EditSVG />
					</ButtonEdit>
					<ButtonDelete>
						<DeleteSVG />
					</ButtonDelete>
				</div>
			</HeaderDetail>

			<MainDetail>
				<Left>
					<Img src={playerLogo} alt="logo" />
				</Left>
				<Right>
					<Name>
						Judge Sex<Number>#69</Number>{' '}
					</Name>
					<TextBlock>
						<TextColumn>
							<Key>Position</Key>
							<Value>Always on Top</Value>
						</TextColumn>

						<TextColumn>
							<Key>Team</Key>
							<Value>PornHub</Value>
						</TextColumn>

						<TextColumn>
							<Key>Height</Key>
							<Value>25 cm</Value>
						</TextColumn>

						<TextColumn>
							<Key>Weight</Key>
							<Value>100 kg</Value>
						</TextColumn>

						<TextColumn>
							<Key>Age</Key>
							<Value>Milf Hunter</Value>
						</TextColumn>
					</TextBlock>
				</Right>
			</MainDetail>
		</DetailBlock>
	)
}

const DetailBlock = styled.div`
	border-radius: 10px;
	background-image: ${({ theme }) => theme.colors.gradientTeamDetail};
	width: 100%;
	height: 600px;
`

const HeaderDetail = styled.header`
	padding: 18px 24px;
	height: 12%;
	width: 100%;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.white};
	border: solid 0.5px ${({ theme }) => theme.colors.lightGrey};
`
const HeaderText = styled.span`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 14px;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.red};
`
const Slash = styled.span`
	color: ${({ theme }) => theme.colors.lightGrey};
`

const ButtonEdit = styled.button`
	cursor: pointer;
	background-color: ${({ theme }) => theme.colors.white};
	border: none;
`
const ButtonDelete = styled.button`
	cursor: pointer;
	background-color: ${({ theme }) => theme.colors.white};
	margin-left: 16px;
	border: none;
`

const MainDetail = styled.div`
	display: flex;
	height: 88%;
	width: 100%;
`

const Left = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-end;
`
const Img = styled.img`
	width: 530px;
	height: 460px;
`

const Right = styled.div`
	width: 50%;
	padding: 65px 0;
`

const Name = styled.span`
	font-family: 'Avenir Black';
	font-size: 36px;
	font-weight: 900;
	color: ${({ theme }) => theme.colors.white};
`
const Number = styled.span`
	color: ${({ theme }) => theme.colors.lightRed};
`
const TextBlock = styled.div`
	margin-top: 40px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-auto-rows: 1fr;
	row-gap: 54px;
`
const TextColumn = styled.div`
	display: flex;
	flex-direction: column;
`
const Key = styled.span`
	font-family: 'Avenir Black';
	font-size: 24px;
	font-weight: 900;
	color: ${({ theme }) => theme.colors.white};
`

const Value = styled.span`
	font-family: 'Avenir Medium';
	font-size: 18px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.white};
`
