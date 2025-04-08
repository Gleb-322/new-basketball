import { createSlice } from '@reduxjs/toolkit'
import { ITeams } from './interfaces/types'

interface ITeamsState {
	loading: boolean
	teams: ITeams[]
}

const teamSlice = createSlice({
	name: 'team',
	initialState: {
		loading: false,
		teams: [],
	} satisfies ITeamsState as ITeamsState,
	reducers: {},
})
