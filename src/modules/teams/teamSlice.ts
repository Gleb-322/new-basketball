import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { ITeams, ITeamSliceState } from './interfaces/types'
import {
	createTeamThunk,
	getTeamsThunk,
	getTeamThunk,
	removeTeamThunk,
	updateTeamThunk,
} from '../../api/teams/teamThunks'
import { RootState } from '../../core/redux/store'
import { IOption, paginateOptions } from '../../common/interfaces/types'

const initialState: ITeamSliceState = {
	error: null,
	status: 'idle',
	keyword: '',
	pageCount: 0,
	currentPage: 0,
	selectedOption: paginateOptions[0],
	lastCreatedTeam: undefined,
	lastUpdatedTeam: undefined,
	lastRemovedTeam: undefined,
}

const teamsAdapter = createEntityAdapter({
	selectId: (team: ITeams) => team._id,
})

const teamSlice = createSlice({
	name: 'teams',
	initialState: teamsAdapter.getInitialState(initialState),
	reducers: {
		resetTeamState: state => {
			state.status = 'idle'
			state.lastCreatedTeam = undefined
			state.lastUpdatedTeam = undefined
			state.lastRemovedTeam = undefined
			state.error = null
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
	},
	extraReducers: builder => {
		// create team
		builder.addCase(createTeamThunk.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(createTeamThunk.fulfilled, (state, action) => {
			teamsAdapter.addOne(state, action.payload.createdTeam)
			state.lastCreatedTeam = action.payload.createdTeam.name
			state.status = 'success'
		})
		builder.addCase(createTeamThunk.rejected, (state, action) => {
			state.error = action.payload as string
			state.status = 'error'
		})
		// get all teams
		builder.addCase(getTeamsThunk.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(getTeamsThunk.fulfilled, (state, action) => {
			teamsAdapter.setAll(state, action.payload.teams)
			state.pageCount = Math.ceil(
				action.payload.countTeams / parseInt(state.selectedOption.value)
			)

			state.status = 'success'
		})
		builder.addCase(getTeamsThunk.rejected, (state, action) => {
			state.error = action.payload as string
			state.status = 'error'
		})
		// get one team
		builder.addCase(getTeamThunk.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(getTeamThunk.fulfilled, (state, action) => {
			teamsAdapter.upsertOne(state, action.payload.team)
			state.status = 'success'
		})
		builder.addCase(getTeamThunk.rejected, (state, action) => {
			state.error = action.payload as string
			state.status = 'error'
		})
		// update team
		builder.addCase(updateTeamThunk.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(updateTeamThunk.fulfilled, (state, action) => {
			teamsAdapter.updateOne(state, {
				id: action.payload.updatedTeam._id,
				changes: action.payload.updatedTeam,
			})
			state.lastUpdatedTeam = action.payload.updatedTeam.name
			state.status = 'success'
		})
		builder.addCase(updateTeamThunk.rejected, (state, action) => {
			state.error = action.payload as string
			state.status = 'error'
		})
		// delete team
		builder.addCase(removeTeamThunk.pending, state => {
			state.status = 'loading'
		})
		builder.addCase(removeTeamThunk.fulfilled, (state, action) => {
			teamsAdapter.removeOne(state, action.payload.teamId)
			state.lastRemovedTeam = action.payload.removedTeam
			state.status = 'success'
		})
		builder.addCase(removeTeamThunk.rejected, (state, action) => {
			state.error = action.payload as string
			state.status = 'error'
		})
	},
})

export const { setCurrentPage, setKeyword, setSelectedOption, resetTeamState } =
	teamSlice.actions

export const { selectAll: selectAllTeams, selectById: selectTeamById } =
	teamsAdapter.getSelectors((state: RootState) => state.team)

export default teamSlice.reducer
