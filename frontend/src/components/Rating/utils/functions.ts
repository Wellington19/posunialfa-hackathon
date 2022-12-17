import { IResponse } from '@services/hooks/rating/useRatingImc'
import { queryClient } from '@services/queryClient'
import { dateFormatted } from '@utils/date'

interface IParams {
  student_id: string
  page: number
  limit: number
}

export function getDataChart({ student_id, page, limit }: IParams): any[] {
  const data = [['', 'IMC']]
  if (!student_id) return data

  const cache =
    (queryClient.getQueryData(['ratings', student_id, page, limit]) as IResponse)?.ratings || []

  cache.forEach(item => {
    data.push([dateFormatted('DD/MM/YYYY', item[8]), item[4]])
  })

  return data
}
