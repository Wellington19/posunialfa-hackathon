import { api } from '@services/apiClient'
import { queryClient } from '@services/queryClient'
import { toastMessage } from '@utils/toast'

interface IUpdateUserDTO {
  id: string
  name?: string
  username?: string
  password?: string
  profile?: string
  situation?: string
}

interface IOldData {
  name: string
  username: string
  profile: string
  situation: string
}

// eslint-disable-next-line consistent-return
export async function updateUser(data: IUpdateUserDTO, oldData: IOldData): Promise<boolean> {
  let success = false
  let objUpdate = {}

  if (data.name !== oldData.name) objUpdate = { ...objUpdate, name: data.name }
  if (data.username !== oldData.username) objUpdate = { ...objUpdate, username: data.username }
  if (data.profile !== oldData.profile) objUpdate = { ...objUpdate, profile: data.profile }
  if (data.situation !== oldData.situation) objUpdate = { ...objUpdate, situation: data.situation }

  if (Object.keys(objUpdate).length > 0) {
    await api
      .patch(`user/${data.id}`, {
        ...objUpdate
      })
      .then(() => {
        toastMessage({
          type: 'success',
          message: 'Usuário editado com sucesso!'
        })

        success = true
      })
      .catch(error => {
        const message = error.response
          ? `${error.response.data.message}`
          : 'Erro de comunicação com servidor'

        toastMessage({
          type: 'error',
          message: `Falha ao editar usuário: ${message}`,
          autoClose: 5000
        })
      })
      .finally(() => {
        queryClient.invalidateQueries('users')
        queryClient.invalidateQueries('usersCombo')
      })
  } else success = true

  return success
}
