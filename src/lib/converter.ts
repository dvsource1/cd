import { forOwn } from 'lodash'

export const convertObjectToStringRecord = <T>(
  object: T,
): Record<string, string> => {
  const result: Record<string, string> = {}
  forOwn(object, (value, key) => {
    result[key] = value.toString()
  })
  return result
}
