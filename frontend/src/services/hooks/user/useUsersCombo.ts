import { useQuery } from 'react-query'
import { api } from '@services/apiClient'
import { toastMessage } from '@utils/toast'
import { IUser } from './types/IUser'

export interface IResponse {
  usersCombo: TOptions[]
}

interface IParams {
  profile?: string
}

export async function getUsersCombo({ profile }: IParams): Promise<IResponse> {
  const usersCombo = []

  let objQuery = {}
  if (profile) objQuery = { ...objQuery, profile }

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

export function useUsersCombo({ profile }: IParams) {
  return useQuery(['usersCombo', profile], () => getUsersCombo({ profile }), {
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
