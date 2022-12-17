import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function dateNowFormatted(format: string): string {
  return dayjs().format(format)
}

export function dateFormatted(format: string, date: Date): string {
  return dayjs(date).format(format)
}

export function firstDayMonthCurrentFormatted(format: string): string {
  return dayjs().startOf('month').format(format)
}

export function lastDayMonthCurrentFormatted(format: string): string {
  return dayjs().endOf('month').format(format)
}
