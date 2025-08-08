import { NextRequest, NextResponse } from 'next/server'
import { chatCompletion, tryExtractJson, type ChatMessage } from '@/utils/openrouter'

// AI-powered scenario generation endpoint using OpenRouter DeepSeek R1
export async function POST(request: NextRequest) {
  try {
    const userProfile = await request.json()

    const system: ChatMessage = {
      role: 'system',
      content:
        'You are LifeOrb, an AI that generates realistic life planning scenarios. Return 2-4 concise scenarios as JSON array with fields: id (kebab), title, description, probability (0-100), timeline, keyFactors (array), actionSteps (array). Keep descriptions short and practical.',
    }
    const user: ChatMessage = {
      role: 'user',
      content: `Profile: ${JSON.stringify(userProfile)}`,
    }

    const content = await chatCompletion([system, user], {
      model: 'deepseek/deepseek-r1',
      temperature: 0.4,
      maxTokens: 800,
    })

    const parsed = tryExtractJson(content)
    if (Array.isArray(parsed)) {
      return NextResponse.json({ scenarios: parsed })
    }

    // Fallback: wrap raw text in a single scenario
    return NextResponse.json({
      scenarios: [
        {
          id: 'ai-generated-scenario',
          title: 'AI Generated Plan',
          description: typeof content === 'string' ? content.slice(0, 300) : 'See details',
          probability: 70,
          timeline: userProfile.timeline || '1-2 years',
          keyFactors: ['AI insights', 'User parameters', 'Feasibility'],
          actionSteps: ['Review details', 'Pick first step', 'Track progress'],
        },
      ],
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate scenarios' }, { status: 500 })
  }
}
