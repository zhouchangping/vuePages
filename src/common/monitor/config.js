import { isDev } from './utils'

export const config = {
  tracker: () => { },
  log: isDev(),
}