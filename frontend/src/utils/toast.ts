import { toast } from 'react-toastify'

interface ToastMessage {
  type: 'success' | 'info' | 'error' | 'warning' | 'warn' | 'dark' | 'loading'
  message: string
  autoClose?: number
}

export function toastMessage({ type, message, autoClose = 3000 }: ToastMessage): string | number {
  return toast[type](message, {
    position: 'top-right',
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  })
}
