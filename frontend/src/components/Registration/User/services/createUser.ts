import { api } from '@services/apiClient'
import { queryClient } from '@services/queryClient'
import { toastMessage } from '@utils/toast'

interface ICreateUserDTO {
  name: string
  username: string
  password: string
  profile: string
  situation: string
}

export async function createUser(data: ICreateUserDTO): Promise<boolean> {
  let success = false

  await api
    .post('user', data)
    .then(() => {
      toastMessage({
        type: 'success',
        message: 'Usuário cadastrado com sucesso!'
      })

      success = true
    })
    .catch(error => {
      const message = error.response
        ? `${error.response.data.message}`
        : 'Erro de comunicação com servidor'
      toastMessage({
        type: 'error',
        message: `Falha ao salvar usuário: ${message}`,
        autoClose: 5000
      })
    })
    .finally(() => {
      queryClient.invalidateQueries('users')
      queryClient.invalidateQueries('usersCombo')
    })

  return success
}
