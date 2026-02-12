import type { RoastRequest, RoastApiResponse, RoastResult } from '@/types/roast'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export class RoastApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message)
    this.name = 'RoastApiError'
  }
}

export async function roastCode(request: RoastRequest): Promise<RoastResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/roast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new RoastApiError(
        errorData.message || `API request failed with status ${response.status}`,
        response.status,
      )
    }

    const data: RoastApiResponse = await response.json()

    return {
      roast: data.roast,
      score: data.score,
      explanation: data.explanation,
      error: undefined,
    }
  } catch (error) {
    if (error instanceof RoastApiError) {
      return {
        roast: null,
        score: null,
        error: error.message,
      }
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        roast: null,
        score: null,
        error: 'Unable to connect to the API. Please check your connection.',
      }
    }

    return {
      roast: null,
      score: null,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}
