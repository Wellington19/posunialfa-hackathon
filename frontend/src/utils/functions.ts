export function getColorSituation(situation: string): string {
  if (['A', 'Ativo'].includes(situation)) return 'green'
  if (['I', 'Inativo'].includes(situation)) return 'red'
  return 'default'
}
