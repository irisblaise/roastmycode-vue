import type { RoastResponse } from './roast'

export interface ArchivedRoast extends RoastResponse {
  id: string
  code: string
  timestamp: string
}
