export interface RoastResult {
  roast: string | null
  score: number | null
  explanation?: string
  error?: string
}

export interface RoastRequest {
  code: string
  language?: string
}

export interface RoastApiResponse {
  roast: string
  score: number
  explanation?: string
}
