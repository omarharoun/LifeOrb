/*
  OpenRouter client utility for server-side usage in Next.js API routes.
  Uses fetch to call the OpenRouter chat completions endpoint.
*/

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatOptions {
  model?: string
  temperature?: number
  maxTokens?: number
}

interface OpenRouterChoice {
  message: { role: string; content: string }
}

interface OpenRouterResponse {
  choices: OpenRouterChoice[]
}

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function chatCompletion(messages: ChatMessage[], opts: ChatOptions = {}) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set')
  }

  const model = opts.model ?? 'deepseek/deepseek-r1'

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      // Optional attribution headers (don’t include secrets)
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://lifeorb.app',
      'X-Title': 'LifeOrb',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: opts.temperature ?? 0.3,
      max_tokens: opts.maxTokens,
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`OpenRouter error ${res.status}: ${text}`)
  }

  const data = (await res.json()) as OpenRouterResponse
  const content = data.choices?.[0]?.message?.content ?? ''
  return content
}

export function tryExtractJson(text: string): unknown | null {
  // Attempt to find a JSON block in the model output
  const start = Math.min(
    ...['[{', '{[', '[', '{']
      .map((s) => (text.indexOf(s) === -1 ? Infinity : text.indexOf(s)))
      .filter((v) => Number.isFinite(v)),
  )
  const end = Math.max(text.lastIndexOf(']'), text.lastIndexOf('}'))
  if (!Number.isFinite(start) || start === Infinity || end === -1 || end <= (start as number)) return null
  const slice = text.slice(start as number, end + 1)
  try {
    return JSON.parse(slice)
  } catch {
    return null
  }
}
