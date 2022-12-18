import { useQuery } from 'react-query'
import { dateFormatted } from '@utils/date'
import { api } from '@services/apiClient'
import { toastMessage } from '@utils/toast'
import { IUser } from './types/IUser'

interface IResponse {
  users: IUser[]
  totalCount: number
}

interface IParams {
  profile?: string
  page?: number
  limit?: number
}

export async function getUsers({ profile, page, limit }: IParams): Promise<IResponse> {
  const users = []
  let totalCount = 0
  let skip = 0
  if (page > 0) skip = page * limit

  let objQuery = {}
  if (profile) objQuery = { ...objQuery, profile }
  if (page) objQuery = { ...objQuery, skip }
  if (limit) objQuery = { ...objQuery, limit }

  const { data, headers } = await api.get('user', {
    params: { ...objQuery }
  })
  totalCount = Number(headers['x-total-count'])

  data.forEach((item: IUser) => {
    users.push([
      { id: item.id },
      item.name,
      item.username,
      item.profile,
      item.situation === 'A' ? 'Ativo' : 'Inativo',
      dateFormatted('YYYY-MM-DD', item.created_at)
    ])
  })

  return { users, totalCount }
}

export function useUsers({ profile, page, limit }: IParams) {
  return useQuery(['users', profile, page, limit], () => getUsers({ profile, page, limit }), {
    onError: (error: TErrorResponse) => {
      const message = error?.response?.data?.message
        ? `${error.response.data.message},`
        : 'Erro de comunicação com servidor,'

      const errorMessage = `Falha ao buscar usuários: ${message} tente novamente!`
      toastMessage({
        type: 'error',
        message: errorMessage
      })
    },
    staleTime: 1000 * 60 * 1440 // 1440 minutos(24 horas)
  })
}
