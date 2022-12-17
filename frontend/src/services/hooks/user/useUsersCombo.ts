import { useQuery } from 'react-query'
import { api } from '@services/apiClient'
import { toastMessage } from '@utils/toast'
import { IUser } from './types/IUser'

export interface IResponse {
  usersCombo: TOptions[]
}

interface IParams {
  profile?: string
  page?: number
  limit?: number
}

export async function getUsersCombo({ profile, page, limit }: IParams): Promise<IResponse> {
  const usersCombo = []
  let skip = 0
  if (page > 0) skip = page * limit

  let objQuery = {}
  if (profile) objQuery = { ...objQuery, profile }
  if (page) objQuery = { ...objQuery, page }
  if (skip) objQuery = { ...objQuery, skip }

  const { data } = await api.get('user', {
    params: { ...objQuery }
  })

  data.forEach((item: IUser) => {
    usersCombo.push({
      value: item.id,
      description: item.name
    })
  })

  return { usersCombo }
}

export function useUsersCombo({ profile, page, limit }: IParams) {
  return useQuery(
    ['usersCombo', profile, page, limit],
    () => getUsersCombo({ profile, page, limit }),
    {
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
    }
  )
}
