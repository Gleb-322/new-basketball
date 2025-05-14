import { CustomError, IRequestBaseBody } from '../common/interfaces/types'
import { showToast } from '../ui/ToastrNotification'

const baseUrl = process.env.REACT_APP_BASE_URL

export const baseRequest = async <T>(
	url: string,
	data: IRequestBaseBody,
	token: string | undefined
): Promise<T> => {
	const headersForToken = token
		? {
				Authorization: `Bearer ${token}`,
		  }
		: {}

	const headersForMultiPart =
		typeof data.body === 'string'
			? {
					'Content-Type': 'application/json; charset=utf-8',
			  }
			: {}

	try {
		const response = await fetch(url, {
			...data,
			headers: {
				...(headersForToken as HeadersInit),
				...(headersForMultiPart as HeadersInit),
			},
		})

		if (!response.ok) {
			if (response.status === 401) {
				showToast({
					type: 'error',
					message: 'Authorization error! Please Login again!',
				})
			} else if (response.status >= 500) {
				showToast({
					type: 'error',
					message: 'Server error! Try again later...',
				})
			} else {
				showToast({
					type: 'error',
					message: `Something going wrong... Error status: ${response.status}`,
				})
			}

			// eslint-disable-next-line no-throw-literal
			throw {
				isCustomError: true,
				status: response.status,
				// Пытаемся получить сообщение из ответа, если это возможно
				message: response.headers
					.get('content-type')
					?.includes('application/json')
					? (await response.json()).message
					: undefined,
			} as CustomError
		}

		return (await response.json()) as T
	} catch (error: any) {
		// Проверяем, если это наша кастомная ошибка - просто пробрасываем
		if (error.isCustomError) {
			throw error
		}

		if (!navigator.onLine) {
			showToast({ type: 'error', message: 'There is no internet connection!' })
		} else {
			showToast({
				type: 'error',
				message: 'Something going wrong... Try again later...',
			})
		}

		throw error
	}
}

export const get = <T>(url: string, token?: string) => {
	return baseRequest<T>(`${baseUrl}${url}`, { method: 'GET' }, token)
}

export const post = <T>(
	url: string,
	token?: string,
	body?: string | FormData
) => {
	return baseRequest<T>(`${baseUrl}${url}`, { method: 'POST', body }, token)
}

export const patch = <T>(
	url: string,
	token?: string,
	body?: string | FormData
) => {
	return baseRequest<T>(`${baseUrl}${url}`, { method: 'PATCH', body }, token)
}

export const remove = <T>(url: string, token?: string) => {
	return baseRequest<T>(`${baseUrl}${url}`, { method: 'DELETE' }, token)
}
