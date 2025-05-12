import { createAsyncThunk } from '@reduxjs/toolkit'
import { closeLoader, showLoader } from '../../core/redux/loaderSlice'
import {
	createTeams,
	getTeam,
	getTeams,
	patchTeam,
	removeTeam,
} from './teamsService'

// create team
export const createTeamThunk = createAsyncThunk(
	'teams/createOne',
	async (
		payload: { body: FormData; token: string | null },
		{ dispatch, rejectWithValue }
	) => {
		try {
			dispatch(showLoader())
			const { body, token } = payload

			if (!token) {
				return rejectWithValue('Failed to create a Team! Token is Null!')
			}

			if (!body) {
				return rejectWithValue('Failed to create a Team! Body is Undefined!')
			}

			const response = await createTeams(body, token)
			if (response.success && response.message instanceof Object) {
				return { createdTeam: response.message.team }
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to create a Team!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to create a Team!')
		} finally {
			dispatch(closeLoader())
		}
	}
)

// get all teams
export const getTeamsThunk = createAsyncThunk(
	'teams/getAll',
	async (query: URLSearchParams, { dispatch, rejectWithValue }) => {
		try {
			dispatch(showLoader())

			const response = await getTeams(query)

			if (response.success && response.message instanceof Object) {
				return {
					teams: response.message.teams,
					// teams: [],
					countTeams: response.message.countTeams,
				}
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to get all Teams!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to get all Teams!')
		} finally {
			dispatch(closeLoader())
		}
	}
)

// get one team
export const getTeamThunk = createAsyncThunk(
	'teams/getOne',
	async (teamId: string | undefined, { dispatch, rejectWithValue }) => {
		try {
			dispatch(showLoader())

			if (!teamId) {
				return rejectWithValue('Failed to get a Team! Team ID is Undefined!')
			}

			const response = await getTeam(teamId)

			if (response.success && response.message instanceof Object) {
				return {
					team: response.message,
				}
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to get a Team!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to get a Team!')
		} finally {
			dispatch(closeLoader())
		}
	}
)

// update team
export const updateTeamThunk = createAsyncThunk(
	'teams/updateOne',
	async (
		payload: { body: FormData; token: string | null },
		{ dispatch, rejectWithValue }
	) => {
		try {
			dispatch(showLoader())
			const { body, token } = payload

			if (!token) {
				return rejectWithValue('Failed to update a Team! Token is Null!')
			}

			if (!body) {
				return rejectWithValue('Failed to update a Team! Body is Undefined!')
			}

			const response = await patchTeam(body, token)
			if (response.success && response.message instanceof Object) {
				return { updatedTeam: response.message }
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to update a Team!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to update a Team!')
		} finally {
			dispatch(closeLoader())
		}
	}
)

// remove team
export const removeTeamThunk = createAsyncThunk(
	'teams/removeOne',
	async (
		payload: { teamId: string | undefined; token: string | null },
		{ rejectWithValue, dispatch }
	) => {
		try {
			dispatch(showLoader())
			const { teamId, token } = payload

			if (!token) {
				return rejectWithValue('Failed to remove a Team! Token is Null!')
			}

			if (!teamId) {
				return rejectWithValue('Failed to remove a Team! Team ID is Undefined!')
			}

			const response = await removeTeam(teamId, token)
			if (response.success) {
				return { removedTeam: response.message, teamId }
			} else {
				return rejectWithValue(response.message || 'Failed to remove a Team!')
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to remove a Team!')
		} finally {
			dispatch(closeLoader())
		}
	}
)
