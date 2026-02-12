import OpenAI from 'openai'
import type { RoastResponse } from '../src/types/roast'

export async function generateRoast(
  code: string,
  language: string = 'JavaScript',
  apiKey: string | undefined,
): Promise<RoastResponse> {
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured')
  }

  if (!code || typeof code !== 'string') {
    throw new Error('Code is required')
  }

  const openai = new OpenAI({ apiKey })

  const prompt = `You are a witty code reviewer who roasts bad code with humor. Analyze the following ${language} code and provide:
1. A funny, sarcastic roast (1-2 sentences)
2. A "shame score" from 1-10 (10 being the worst code you've ever seen)
3. A brief explanation of what's wrong

Code to roast:
\`\`\`${language.toLowerCase()}
${code}
\`\`\`

Respond in JSON format:
{
  "roast": "your witty roast here",
  "score": 7,
  "explanation": "brief explanation of issues"
}`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are a sarcastic code reviewer who provides humorous but constructive feedback. Always respond in valid JSON format.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 500,
    response_format: { type: 'json_object' },
  })

  const content = completion.choices[0]?.message?.content
  if (!content) {
    throw new Error('No response from OpenAI')
  }

  const result = JSON.parse(content)
  return {
    roast: result.roast || 'Your code is... interesting.',
    score: Math.min(10, Math.max(1, result.score || 5)),
    explanation: result.explanation,
  }
}
