import { profiles } from './variables'

export function getProfiles(values?: string[]): TOptions[] {
  if (values?.length) {
    return values
      .map(item => {
        return profiles.find(profile => profile.value === item)
      })
      .filter(item => item !== undefined)
  }

  return profiles
}
