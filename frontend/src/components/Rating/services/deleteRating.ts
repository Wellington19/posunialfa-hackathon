import { api } from '@services/apiClient'
import { queryClient } from '@services/queryClient'
import { toastMessage } from '@utils/toast'

export async function deleteRating(id: string): Promise<void> {
  await api
    .delete(`rating/imc/${id}`)
    .then(() => {
      toastMessage({
        type: 'success',
        message: 'Avaliação excluída com sucesso!'
      })
    })
    .catch(error => {
      const message = error.response
        ? `${error.response.data.message},`
        : 'Erro de comunicação com servidor,'

      toastMessage({
        type: 'error',
        message: `Falha ao excluir avaliação: ${message} tente novamente!`,
        autoClose: 5000
      })
    })
    .finally(() => {
      queryClient.invalidateQueries('ratings')
    })
}
