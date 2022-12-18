import { api } from '@services/apiClient'
import { queryClient } from '@services/queryClient'
import { toastMessage } from '@utils/toast'

interface ICreateRatingDTO {
  height: number
  weight: number
  user_rating_id: string
  user_student_id: string
}

export async function createRating(data: ICreateRatingDTO): Promise<boolean> {
  let success = false

  await api
    .post('rating/imc', data)
    .then(() => {
      toastMessage({
        type: 'success',
        message: 'Avaliação cadastrada com sucesso!'
      })

      success = true
    })
    .catch(error => {
      const message = error.response
        ? `${error.response.data.message}`
        : 'Erro de comunicação com servidor'

      toastMessage({
        type: 'error',
        message: `Falha ao salvar avaliação: ${message}`,
        autoClose: 5000
      })
    })
    .finally(() => {
      queryClient.invalidateQueries('ratings')
    })

  return success
}
