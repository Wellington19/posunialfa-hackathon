import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)

export default class DateProvider implements IDateProvider {
  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate()
  }
}
