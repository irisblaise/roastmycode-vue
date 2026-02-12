import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { RoastRequest, RoastResponse } from '../src/types/roast'
import { generateRoast } from '../lib/openai-service.ts'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const body: RoastRequest = req.body
    const { code, language = 'JavaScript' } = body
    const apiKey = process.env.OPENAI_API_KEY

    const response: RoastResponse = await generateRoast(code, language, apiKey)
    return res.status(200).json(response)
  } catch (error) {
    console.error('Error generating roast:', error)
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Internal server error',
    })
  }
}
