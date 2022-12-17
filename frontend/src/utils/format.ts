/* eslint-disable prettier/prettier */
export function formatCurrencyBRL(value: string): string {
  return value !== ''
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value))
    : ''
}

export function formatDateptBR(value: string): string {
  return value !== ''
    ? new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(value))
    : ''
}

export function formatQuantity(value: string): string {
  return value !== ''
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(Number(value))
      .replace('R$', '')
    : ''
}
