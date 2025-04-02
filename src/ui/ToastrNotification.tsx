import styled from 'styled-components'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IToastNotificationProps } from '../common/interfaces/types'

export const showToast = ({ type, message }: IToastNotificationProps) => {
	toast[type](message, {
		autoClose: type === 'success' ? 6000 : false,
	})
}

export const ToastNotification = () => {
	return <StyledToastContainer />
}

const StyledToastContainer = styled(ToastContainer).attrs({
	position: 'top-right',
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: false,
	icon: false,
	closeButton: false,
})`
	.Toastify__toast {
		--toastify-toast-padding: 8px 16px;
		border-radius: 4px;
		font-family: 'Avenir Medium';
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		--toastify-toast-min-height: 40px;
		display: inline-block;
		width: auto;
		max-width: 80vw;
		white-space: nowrap;
	}

	.Toastify__toast--success {
		background-color: ${({ theme }) => theme.colors.green};
		color: ${({ theme }) => theme.colors.white};
		&:hover {
			background-color: ${({ theme }) => theme.colors.ligthGreen};
		}
	}

	.Toastify__toast--error {
		background-color: ${({ theme }) => theme.colors.lightRed};
		color: ${({ theme }) => theme.colors.white};
		&:hover {
			background-color: ${({ theme }) => theme.colors.lightestRed};
		}
	}
`
