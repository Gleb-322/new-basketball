import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { IPlayers, IPlayerSliceState } from './interfaces/types'
import { IOption, paginateOptions } from '../../common/interfaces/types'
import {
	createPlayerThunk,
	getMultiSelectOptionsThunk,
	getPlayersThunk,
	getPlayerThunk,
	removePlayerThunk,
	updatePlayerThunk,
} from '../../api/players/playerThunks'
import { RootState } from '../../core/redux/store'

const initialState: IPlayerSliceState = {
	error: null,
	status: 'idle',
	keyword: '',
	pageCount: 0,
	currentPage: 0,
	selectedOption: paginateOptions[0],
	lastCreatedPlayer: undefined,
	lastUpdatedPlayer: undefined,
	lastRemovedPlayer: undefined,
	teamsFilter: [],
	teamOptions: [],
}

const playerAdapter = createEntityAdapter({
	selectId: (player: IPlayers) => player._id,
})

const playerSlice = createSlice({
	name: 'players',
	initialState: playerAdapter.getInitialState(initialState),
	reducers: {
		resetPlayerState: state => {
			state.status = 'idle'
			state.lastCreatedPlayer = undefined
			state.lastUpdatedPlayer = undefined
			state.lastRemovedPlayer = undefined
			state.error = null
			state.teamsFilter = []
		},
		setKeyword: (state, action: PayloadAction<string>) => {
			state.keyword = action.payload
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
		setSelectedOption: (state, action: PayloadAction<IOption>) => {
			state.selectedOption = action.payload
		},
		setTeamsFilter: (state, action: PayloadAction<readonly IOption[]>) => {
			state.teamsFilter = [...action.payload]
		},
	},
	extraReducers: builder => {
		// create player
		builder.addCase(createPlayerThunk.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(createPlayerThunk.fulfilled, (state, action) => {
			playerAdapter.addOne(state, action.payload.createdPlayer)
			state.lastCreatedPlayer = action.payload.createdPlayer.name
			state.status = 'success'
		})
		builder.addCase(createPlayerThunk.rejected, (state, action) => {
			state.error = action.payload as string
			state.status = 'error'
		})
		// get all teams
		builder.addCase(getPlayersThunk.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(getPlayersThunk.fulfilled, (state, action) => {
			playerAdapter.setAll(state, action.payload.players)
			state.pageCount = Math.ceil(
				action.payload.countPlayers / parseInt(state.selectedOption.value)
			)
			state.status = 'success'
		})
		builder.addCase(getPlayersThunk.rejected, (state, action) => {
			state.error = action.payload as string
			state.status = 'error'
		})
		// get one team
		builder.addCase(getPlayerThunk.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(getPlayerThunk.fulfilled, (state, action) => {
			playerAdapter.upsertOne(state, action.payload.player)
			state.status = 'success'
		})
		builder.addCase(getPlayerThunk.rejected, (state, action) => {
			state.error = action.payload as string
			state.status = 'error'
		})
		// update team
		builder.addCase(updatePlayerThunk.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(updatePlayerThunk.fulfilled, (state, action) => {
			playerAdapter.updateOne(state, {
				id: action.payload.updatedPlayer._id,
				changes: action.payload.updatedPlayer,
			})
			state.lastUpdatedPlayer = action.payload.updatedPlayer.name
			state.status = 'success'
		})
		builder.addCase(updatePlayerThunk.rejected, (state, action) => {
			state.error = action.payload as string
			state.status = 'error'
		})
		// delete player
		builder.addCase(removePlayerThunk.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(removePlayerThunk.fulfilled, (state, action) => {
			if (action.payload?.playerId && action.payload?.playerId !== null) {
				playerAdapter.removeOne(state, action.payload.playerId)
			}
			state.lastRemovedPlayer = action.payload?.removedPlayer
			state.status = 'success'
		})
		builder.addCase(removePlayerThunk.rejected, (state, action) => {
			state.error = action.payload as string
			state.status = 'error'
		})
		// get all teams for multi select for players filter
		builder.addCase(getMultiSelectOptionsThunk.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(getMultiSelectOptionsThunk.fulfilled, (state, action) => {
			state.teamOptions = [...action.payload.teamOptions]
			state.status = 'success'
		})
		builder.addCase(getMultiSelectOptionsThunk.rejected, (state, action) => {
			state.error = action.payload as string
			state.status = 'error'
		})
	},
})

export const {
	setCurrentPage,
	setKeyword,
	setSelectedOption,
	setTeamsFilter,
	resetPlayerState,
} = playerSlice.actions

export const { selectAll: selectAllPlayers, selectById: selectPlayerById } =
	playerAdapter.getSelectors((state: RootState) => state.player)

export default playerSlice.reducer
