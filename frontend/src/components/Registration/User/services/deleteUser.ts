import { api } from '@services/apiClient'
import { queryClient } from '@services/queryClient'
import { toastMessage } from '@utils/toast'

export async function deleteUser(id: string): Promise<void> {
  await api
    .delete(`user/${id}`)
    .then(() => {
      toastMessage({
        type: 'success',
        message: 'Usuário excluído com sucesso!'
      })
      queryClient.invalidateQueries('users')
    })
    .catch(error => {
      const message = error.response
        ? `${error.response.data.message},`
        : 'Erro de comunicação com servidor,'

      toastMessage({
        type: 'error',
        message: `Falha ao excluir usuário: ${message} tente novamente!`,
        autoClose: 5000
      })
    })
}
