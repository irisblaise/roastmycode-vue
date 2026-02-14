import type { RoastApiResponse } from './roast'

export interface ArchivedRoast extends RoastApiResponse {
  id: string
  code: string
  timestamp: string
}
