import { NextRequest, NextResponse } from 'next/server'
import { Constraints, TaskItem } from '@/types/productivity'
import { simpleSchedule } from '@/utils/scheduler'
import { chatCompletion } from '@/utils/openrouter'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const tasks = (body?.tasks || []) as TaskItem[]
    const constraints = (body?.constraints) as Constraints
    const useAI = body?.useAI || false
    
    if (!Array.isArray(tasks) || !constraints) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    let result
    
    if (useAI && tasks.length > 0) {
      try {
        // Use AI to optimize the schedule
        const aiResult = await generateAISchedule(tasks, constraints)
        result = aiResult
      } catch (error) {
        console.error('AI scheduling failed, falling back to simple scheduler:', error)
        result = simpleSchedule(tasks, constraints)
      }
    } else {
      result = simpleSchedule(tasks, constraints)
    }
    
    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}

async function generateAISchedule(tasks: TaskItem[], constraints: Constraints) {
  const systemPrompt = `You are an expert AI scheduler that optimizes task schedules based on priorities, energy levels, and constraints.

  Analyze the given tasks and constraints to create an optimal schedule that:
  1. Prioritizes high-priority tasks (P4-P5) during peak hours
  2. Matches task energy requirements with time of day
  3. Respects due dates and deadlines
  4. Includes appropriate breaks
  5. Maximizes productivity and focus

  Return a JSON object with the exact structure:
  {
    "events": [
      {
        "id": "uuid",
        "taskId": "task-id",
        "title": "Task Title",
        "start": "2025-08-15T09:00:00.000Z",
        "end": "2025-08-15T10:30:00.000Z",
        "kind": "task",
        "dayKey": "2025-08-15"
      }
    ],
    "unscheduled": [],
    "aiInsights": "Brief explanation of scheduling decisions"
  }`

  const userPrompt = `Tasks to schedule:
${tasks.map(t => `- ${t.title} (${t.durationMinutes}min, P${t.priority}, ${t.energy} energy${t.dueDate ? `, due: ${t.dueDate}` : ''})`).join('\n')}

Work schedule constraints:
- Planning horizon: ${constraints.planningHorizonDays || 7} days
- Buffer between tasks: ${constraints.bufferMinutes || 5} minutes
- Break every: ${constraints.breakEveryMinutes || 90} minutes
- Break duration: ${constraints.breakDurationMinutes || 10} minutes
- Work windows: ${JSON.stringify(constraints.workWeek)}

Current date: ${new Date().toISOString()}`

  const response = await chatCompletion([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ], {
    model: 'deepseek/deepseek-r1',
    temperature: 0.3,
    maxTokens: 2000
  })

  try {
    const parsed = JSON.parse(response)
    if (parsed.events && Array.isArray(parsed.events)) {
      return {
        events: parsed.events,
        unscheduled: parsed.unscheduled || [],
        aiInsights: parsed.aiInsights || 'AI-optimized schedule generated'
      }
    }
  } catch (parseError) {
    console.error('Failed to parse AI response:', parseError)
  }

  // Fallback to simple scheduler if AI fails
  return simpleSchedule(tasks, constraints)
}
