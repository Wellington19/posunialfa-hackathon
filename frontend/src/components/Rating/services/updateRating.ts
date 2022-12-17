import { api } from '@services/apiClient'
import { queryClient } from '@services/queryClient'
import { toastMessage } from '@utils/toast'

interface IUpdateRatingDTO {
  id: string
  height?: number
  weight?: number
  user_rating_id?: string
  user_student_id?: string
}

interface IOldData {
  height: number
  weight: number
  user_rating_id: string
  user_student_id: string
}

// eslint-disable-next-line consistent-return
export async function updateRating(data: IUpdateRatingDTO, oldData: IOldData): Promise<boolean> {
  let success = false
  let objUpdate = {}

  if (data.height !== oldData.height) objUpdate = { ...objUpdate, height: data.height }
  if (data.weight !== oldData.weight) objUpdate = { ...objUpdate, weight: data.weight }
  if (data.user_rating_id !== oldData.user_rating_id)
    objUpdate = { ...objUpdate, user_rating_id: data.user_rating_id }
  if (data.user_student_id !== oldData.user_student_id)
    objUpdate = { ...objUpdate, user_student_id: data.user_student_id }

  if (Object.keys(objUpdate).length > 0) {
    await api
      .patch(`rating/imc/${data.id}`, {
        ...objUpdate
      })
      .then(() => {
        toastMessage({
          type: 'success',
          message: 'Avaliação editada com sucesso!'
        })
        success = true
      })
      .catch(error => {
        const message = error.response
          ? `${error.response.data.message}`
          : 'Erro de comunicação com servidor'

        toastMessage({
          type: 'error',
          message: `Falha ao editar avaliação: ${message}`,
          autoClose: 5000
        })
        success = false
      })
      .finally(() => {
        queryClient.invalidateQueries('ratings')
      })

    return success
  }
}
