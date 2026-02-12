import express from 'express'
import { config } from 'dotenv'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const require = createRequire(import.meta.url)
const jiti = require('jiti')(__filename)
const { generateRoast } = jiti('./lib/openai-service.ts')

config()

const app = express()
app.use(express.json())

app.post('/api/roast', async (req, res) => {
  try {
    const { code, language = 'JavaScript' } = req.body
    const apiKey = process.env.OPENAI_API_KEY

    const response = await generateRoast(code, language, apiKey)
    res.json(response)
  } catch (error) {
    console.error('Error generating roast:', error)
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Internal server error',
    })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
