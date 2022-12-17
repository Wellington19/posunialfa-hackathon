import { useQuery } from 'react-query'
import { dateFormatted } from '@utils/date'
import { api } from '@services/apiClient'
import { toastMessage } from '@utils/toast'
import { IRatingImc } from './types/IRatingImc'

export interface IResponse {
  ratings: IRatingImc[]
  totalCount: number
}

interface IParams {
  user_student_id?: string
  page: number
  limit: number
}

export async function getRatings({ user_student_id, page, limit }: IParams): Promise<IResponse> {
  const ratings = []
  let totalCount = 0
  let skip = 0
  if (page > 0) skip = page * limit

  let objQuery = {}
  if (user_student_id) objQuery = { ...objQuery, user_student_id }

  const { data, headers } = await api.get('rating/imc', {
    params: { skip, limit, ...objQuery }
  })
  totalCount = Number(headers['x-total-count'])

  data.forEach((item: IRatingImc) => {
    ratings.push([
      { id: item.id, user_student_id: item.user_student_id, user_rating_id: item.user_rating_id },
      item.user_student_name,
      Number(item.height),
      Number(item.weight),
      Number(item.imc),
      item.classification,
      item.degree,
      item.user_rating_name,
      dateFormatted('YYYY-MM-DD', item.created_at)
    ])
  })

  return { ratings, totalCount }
}

export function useRatings({ user_student_id, page, limit }: IParams) {
  return useQuery(
    ['ratings', user_student_id, page, limit],
    () => getRatings({ user_student_id, page, limit }),
    {
      onError: (error: TErrorResponse) => {
        const message = error?.response?.data?.message
          ? `${error.response.data.message},`
          : 'Erro de comunicação com servidor,'

        const errorMessage = `Falha ao buscar avaliações: ${message} tente novamente!`
        toastMessage({
          type: 'error',
          message: errorMessage
        })
      },
      staleTime: 1000 * 60 * 1440 // 1440 minutos(24 horas)
    }
  )
}
