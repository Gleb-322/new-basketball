import { FC } from 'react'
import styled from 'styled-components'
import { IPlayerList } from '../interfaces/types'
import { device } from '../../../common/helpers/breakpoint'
import { PlayerCard } from './PlayerCard'

export const PlayerList: FC<IPlayerList> = ({ players }) => {
	return (
		<Players>
			{players.map(player => (
				<PlayerCard key={player._id} player={player} />
			))}
		</Players>
	)
}

const Players = styled.div`
	width: 100%;
	display: grid;
	gap: 24px;
	grid-template-columns: repeat(auto-fill, minmax(464px, 1fr));
	grid-template-rows: repeat(auto-fill, minmax(480px, 1fr));
	grid-auto-rows: minmax(480px, 1fr);
	@media ${device.desktop} {
		grid-template-columns: repeat(auto-fill, minmax(364px, 1fr));
		grid-template-rows: repeat(auto-fill, minmax(380px, 1fr));
		grid-auto-rows: minmax(380px, 1fr);
	}
	@media ${device.laptopL} {
		grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
		grid-template-rows: repeat(auto-fill, minmax(340px, 1fr));
		grid-auto-rows: minmax(340px, 1fr);
	}

	@media ${device.tablet} {
		grid-template-columns: repeat(2, minmax(200px, 1fr));
		grid-template-rows: repeat(2, minmax(170px, 1fr));
		grid-auto-rows: minmax(170px, 1fr);
		gap: 12px;
	}
`
