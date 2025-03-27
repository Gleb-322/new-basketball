import {
	ICreateTeamResponse,
	IRemoveTeamResponse,
	IGetTeamResponse,
	IGetTeamsResponse,
	IPatchTeamResponse,
} from '../../modules/teams/interfaces/types'
import { get, post, patch, remove } from '../baseRequest'

const TEAM_ENDPOINT = '/teams'

export const createTeams = (
	body: FormData,
	token?: string
): Promise<ICreateTeamResponse> => {
	return post(`${TEAM_ENDPOINT}/create`, token, body)
}

export const getTeams = (
	query?: URLSearchParams,
	token?: string
): Promise<IGetTeamsResponse> => {
	return get(`${TEAM_ENDPOINT}/get?${query ? query.toString() : ''}`, token)
}

export const getTeam = (
	teamId: string,
	token?: string
): Promise<IGetTeamResponse> => {
	return get(`${TEAM_ENDPOINT}/get/${teamId}`, token)
}

export const patchTeam = (
	body: FormData,
	token?: string
): Promise<IPatchTeamResponse> => {
	return patch(`${TEAM_ENDPOINT}/update`, token, body)
}

export const removeTeam = (
	teamId: string,
	token?: string
): Promise<IRemoveTeamResponse> => {
	return remove(`${TEAM_ENDPOINT}/delete/${teamId}`, token)
}
