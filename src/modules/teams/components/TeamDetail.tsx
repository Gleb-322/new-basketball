import styled from 'styled-components'
import teamLogo from '../../../assets/images/Team.png'
// import { useParams } from 'react-router'
import { ReactComponent as DeleteSVG } from '../../../assets/icons/delete.svg'
import { ReactComponent as EditSVG } from '../../../assets/icons/create.svg'
import playerLogo from '../../../assets/images/Player.png'

export const TeamDetail = () => {
	// const params = useParams()
	// console.log(params)

	const players: any[] = [
		{
			_id: '12345235213233',
			name: 'Bol Bol',
			position: 'Centerforward',
			height: 218,
			weight: 100,
			birthday: 21,
			number: 3,
			playerImg: 'img',
		},
		{
			_id: '2',
			name: 'Greg Whittington',
			position: 'Forward',
			height: 218,
			weight: 100,
			birthday: 21,
			playerImg: 'img',
		},
		{
			_id: '3',
			name: 'Zeke Nnaji',
			position: 'Forward-center',
			height: 218,
			weight: 100,
			birthday: 21,
			number: 99,
			playerImg: 'img',
		},
		{
			_id: '546456',
			name: 'R. J. Hampton',
			position: 'Defender',
			height: 218,
			weight: 100,
			birthday: 21,
			number: 1,
			playerImg: 'img',
		},
		{
			_id: '4322342',
			name: 'Bol Bol',
			position: 'Centerforward',
			height: 218,
			weight: 100,
			birthday: 21,
			number: 3,
			playerImg: 'img',
		},
		{
			_id: '123455235235235213233',
			name: 'Bol Bol',
			position: 'Centerforward',
			height: 218,
			weight: 100,
			birthday: 21,
			number: 3,
			playerImg: 'img',
		},
	]
	return (
		<section>
			<DetailBlock>
				<HeaderDetail>
					<HeaderText>
						Teams <Slash>/</Slash> Denver Nuggets
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
						<Img src={teamLogo} alt="logo" />
					</Left>
					<Right>
						<Name>Denver Nuggets</Name>
						<TextBlock>
							<TextColumn>
								<Key>Year of foundation</Key>
								<Value>1976</Value>
							</TextColumn>
							<TextColumn>
								<Key>Division</Key>
								<Value>Northwestern</Value>
							</TextColumn>
							<TextColumn>
								<Key>Conference</Key>
								<Value>Western</Value>
							</TextColumn>
						</TextBlock>
					</Right>
				</MainDetail>
			</DetailBlock>

			<RosterBlock>
				<RoosterTitle>Roster</RoosterTitle>
				<RosterTable>
					<PlayerHeader>
						<PlayerHeaderLeft>
							<MarginRight>
								<PlayerNumber>#</PlayerNumber>
							</MarginRight>
							<div>Player</div>
						</PlayerHeaderLeft>
						<PlayerHeaderRight>
							<div>Height</div> <div>Weight</div> <div>Age</div>
						</PlayerHeaderRight>
					</PlayerHeader>

					{players.length ? (
						<>
							{players.map(player => (
								<Player key={player._id}>
									<PlayerLeft>
										<MarginRight>
											<PlayerNumber>
												{player.number ? player.number : '-'}
											</PlayerNumber>
										</MarginRight>

										<PlayerInfo>
											<PlayerImg src={playerLogo} alt="player" />
											<PlayerNameAndPosition>
												<div>{player.name}</div>
												<PlayerPosition>{player.position}</PlayerPosition>
											</PlayerNameAndPosition>
										</PlayerInfo>
									</PlayerLeft>
									<PlayerRight>
										<div>{player.height} cm</div>
										<div>{player.weight} kg</div>
										<div>{player.birthday}</div>
									</PlayerRight>
								</Player>
							))}
						</>
					) : (
						<EmptyPlayers>Team doesn't have any players...</EmptyPlayers>
					)}
				</RosterTable>
			</RosterBlock>
		</section>
	)
}

const DetailBlock = styled.div`
	border-radius: 10px;
	background-image: ${({ theme }) => theme.colors.gradientTeamDetail};
	width: 100%;
	height: 480px;
`

const HeaderDetail = styled.header`
	padding: 18px 24px;
	height: 15%;
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
	height: 85%;
	width: 100%;
`

const Left = styled.div`
	width: 40%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`
const Img = styled.img`
	width: 210px;
	height: 210px;
`

const Right = styled.div`
	width: 60%;
	padding: 65px 0;
`

const Name = styled.span`
	font-family: 'Avenir Black';
	font-size: 36px;
	font-weight: 900;
	color: ${({ theme }) => theme.colors.white};
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

const RosterBlock = styled.div`
	margin-top: 24px;
	background: ${({ theme }) => theme.colors.white};
	border-radius: 10px;

	border: solid 0.5px ${({ theme }) => theme.colors.lightGrey};
`

const RoosterTitle = styled.div`
	padding: 14px 32px;
	font-family: 'Avenir Medium';
	font-size: 18px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.grey};
`
const RosterTable = styled.div`
	width: 100%;
`

const PlayerHeader = styled.header`
	padding: 5px 32px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	border-top: solid 0.5px ${({ theme }) => theme.colors.lightGrey};
	font-family: 'Avenir Medium';
	font-size: 14px;
	font-weight: 500;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.grey};
`
const PlayerHeaderLeft = styled.div`
	width: 70%;
	display: flex;
	align-items: center;
`

const MarginRight = styled.div`
	margin-right: 30px;
`

const PlayerHeaderRight = styled.div`
	width: 30%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Player = styled.div`
	padding: 5px 32px;
	display: flex;
	justify-content: space-between;
	border-top: solid 0.5px ${({ theme }) => theme.colors.lightGrey};
	font-family: 'Avenir Medium';
	font-size: 14px;
	font-weight: 500;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.grey};
`
const PlayerLeft = styled.div`
	width: 70%;
	display: flex;
	align-items: center;
`
const PlayerInfo = styled.div`
	display: flex;
`
const PlayerNameAndPosition = styled.div`
	display: flex;
	flex-direction: column;
`
const PlayerNumber = styled.div`
	width: 25px;
	display: flex;
	justify-content: start;
	align-items: center;
`
const PlayerImg = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 100%;
	margin-right: 16px;
`

const PlayerPosition = styled.div`
	font-family: 'Avenir Medium';
	font-size: 12px;
	font-weight: 500;
	line-height: 21px;
	color: ${({ theme }) => theme.colors.lightGrey};
`

const PlayerRight = styled.div`
	width: 30%;
	padding-right: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const EmptyPlayers = styled.div`
	padding: 5px 32px;
	font-family: 'Avenir Medium';
	font-size: 12px;
	font-weight: 500;
	line-height: 18px;
	color: ${({ theme }) => theme.colors.lightestRed};
`
