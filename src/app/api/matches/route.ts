import { NextRequest, NextResponse } from 'next/server'

// Mock API for finding matches based on user profile
export async function POST(request: NextRequest) {
  try {
    const userProfile = await request.json()
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Generate matches based on user profile
    const matches = generateMatches(userProfile)
    
    return NextResponse.json({ matches })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to find matches' }, { status: 500 })
  }
}

function generateMatches(profile: any) {
  const mockMatches = [
    {
      id: '1',
      avatar: '👨‍💼',
      compatibility: calculateCompatibility(profile, ['Leadership Role', 'Financial Independence']),
      goals: ['Leadership Role', 'Financial Independence'],
      values: ['Career', 'Family', 'Impact'],
      timeline: '2-3 years',
      progress: Math.floor(Math.random() * 40) + 40,
      location: 'Remote',
      recentActivity: 'Completed leadership certification',
      helpOffered: ['Mentoring', 'Network introductions'],
      helpNeeded: ['Industry insights', 'Work-life balance tips']
    },
    {
      id: '2',
      avatar: '👩‍🚀',
      compatibility: calculateCompatibility(profile, ['Entrepreneurship', 'Creative Pursuits']),
      goals: ['Entrepreneurship', 'Creative Pursuits'],
      values: ['Freedom', 'Creativity', 'Adventure'],
      timeline: '1 year',
      progress: Math.floor(Math.random() * 30) + 30,
      location: 'Urban',
      recentActivity: 'Launched MVP product',
      helpOffered: ['Product development', 'Design feedback'],
      helpNeeded: ['Marketing strategy', 'Funding advice']
    },
    {
      id: '3',
      avatar: '👨‍🎓',
      compatibility: calculateCompatibility(profile, ['Career Change', 'Skill Development']),
      goals: ['Career Change', 'Skill Development'],
      values: ['Learning', 'Security', 'Community'],
      timeline: '2-3 years',
      progress: Math.floor(Math.random() * 50) + 20,
      location: 'Suburban',
      recentActivity: 'Started online course in data science',
      helpOffered: ['Study partnerships', 'Resource sharing'],
      helpNeeded: ['Career transition advice', 'Networking']
    }
  ]
  
  // Filter and sort matches based on compatibility
  return mockMatches
    .filter(match => match.compatibility > 60)
    .sort((a, b) => b.compatibility - a.compatibility)
}

function calculateCompatibility(userProfile: any, matchGoals: string[]) {
  let compatibility = 50 // Base compatibility
  
  // Check goal overlap
  const userGoals = userProfile.career_goals || []
  const goalOverlap = userGoals.filter((goal: string) => matchGoals.includes(goal)).length
  compatibility += goalOverlap * 15
  
  // Check value alignment
  const userValues = userProfile.values || []
  const commonValues = ['Career', 'Family', 'Learning', 'Impact']
  const valueAlignment = userValues.filter((value: string) => commonValues.includes(value)).length
  compatibility += valueAlignment * 5
  
  // Timeline compatibility
  if (userProfile.timeline === '2-3 years') {
    compatibility += 10
  }
  
  // Add some randomness
  compatibility += Math.floor(Math.random() * 20) - 10
  
  return Math.min(Math.max(compatibility, 0), 100)
}
