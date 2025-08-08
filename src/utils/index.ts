// Utility functions for LifeOrb platform

import { UserProfile, CommunityUser } from '@/types'

/**
 * Calculate compatibility percentage between two user profiles
 */
export function calculateCompatibility(userProfile: UserProfile, otherUser: CommunityUser): number {
  let compatibility = 50 // Base compatibility

  // Goal alignment (40% weight)
  const userGoals = userProfile.career_goals || []
  const otherGoals = otherUser.goals || []
  const goalOverlap = userGoals.filter(goal => otherGoals.includes(goal)).length
  const goalWeight = Math.min(goalOverlap * 20, 40)
  compatibility += goalWeight

  // Value alignment (30% weight)
  const userValues = userProfile.values || []
  const otherValues = otherUser.values || []
  const valueOverlap = userValues.filter(value => otherValues.includes(value)).length
  const valueWeight = Math.min(valueOverlap * 10, 30)
  compatibility += valueWeight

  // Timeline compatibility (20% weight)
  if (userProfile.timeline === otherUser.timeline) {
    compatibility += 20
  } else if (isTimelineCompatible(userProfile.timeline, otherUser.timeline)) {
    compatibility += 10
  }

  // Progress similarity (10% weight)
  const userProgress = estimateUserProgress(userProfile)
  const progressDiff = Math.abs(userProgress - otherUser.progress)
  const progressWeight = Math.max(10 - progressDiff / 10, 0)
  compatibility += progressWeight

  return Math.min(Math.max(compatibility, 0), 100)
}

/**
 * Check if two timelines are compatible
 */
function isTimelineCompatible(timeline1: string, timeline2: string): boolean {
  const shortTerms = ['6 months', '1 year']
  const mediumTerms = ['2-3 years']
  const longTerms = ['5 years', '10+ years']

  const getTimelineGroup = (timeline: string) => {
    if (shortTerms.includes(timeline)) return 'short'
    if (mediumTerms.includes(timeline)) return 'medium'
    if (longTerms.includes(timeline)) return 'long'
    return 'unknown'
  }

  const group1 = getTimelineGroup(timeline1)
  const group2 = getTimelineGroup(timeline2)

  // Adjacent groups are compatible
  return group1 === group2 || 
         (group1 === 'short' && group2 === 'medium') ||
         (group1 === 'medium' && group2 === 'short') ||
         (group1 === 'medium' && group2 === 'long') ||
         (group1 === 'long' && group2 === 'medium')
}

/**
 * Estimate user progress based on their profile
 */
function estimateUserProgress(profile: UserProfile): number {
  let progress = 0
  let factors = 0

  // Career satisfaction contributes to progress
  if (profile.career_satisfaction) {
    progress += profile.career_satisfaction * 10
    factors++
  }

  // Financial status contributes to progress
  if (profile.financial_status) {
    progress += profile.financial_status * 8
    factors++
  }

  // Health and wellness contributes to progress
  if (profile.health_wellness) {
    progress += profile.health_wellness * 6
    factors++
  }

  // Relationship satisfaction contributes to progress
  if (profile.relationships) {
    progress += profile.relationships * 6
    factors++
  }

  // Risk tolerance affects progress calculation
  if (profile.risk_tolerance) {
    progress += profile.risk_tolerance * 2
    factors++
  }

  return factors > 0 ? Math.min(progress / factors, 100) : 50
}

/**
 * Generate a unique anonymous ID based on user parameters
 */
export function generateAnonymousId(profile: UserProfile): string {
  const keyParams = [
    profile.age,
    profile.education,
    profile.career_goals?.join(','),
    profile.values?.join(','),
    profile.timeline
  ].filter(Boolean).join('|')

  // Simple hash function (in production, use a proper hash library)
  let hash = 0
  for (let i = 0; i < keyParams.length; i++) {
    const char = keyParams.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }

  return `user_${Math.abs(hash).toString(36)}_${Date.now().toString(36)}`
}

/**
 * Format timeline for display
 */
export function formatTimeline(timeline: string): string {
  const timelineMap: Record<string, string> = {
    '6 months': '6 months',
    '1 year': '1 year',
    '2-3 years': '2-3 years',
    '5 years': '5 years',
    '10+ years': '10+ years'
  }
  return timelineMap[timeline] || timeline
}

/**
 * Get color class for progress bars
 */
export function getProgressColor(progress: number): string {
  if (progress >= 80) return 'from-green-500 to-emerald-500'
  if (progress >= 60) return 'from-blue-500 to-cyan-500'
  if (progress >= 40) return 'from-yellow-500 to-orange-500'
  return 'from-red-500 to-pink-500'
}

/**
 * Validate user profile completeness
 */
export function validateProfile(profile: Partial<UserProfile>): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!profile.age) errors.push('Age range is required')
  if (!profile.education) errors.push('Education level is required')
  if (!profile.career_goals || profile.career_goals.length === 0) {
    errors.push('At least one career goal is required')
  }
  if (!profile.values || profile.values.length === 0) {
    errors.push('At least one core value is required')
  }
  if (!profile.timeline) errors.push('Timeline is required')

  return {
    isValid: errors.length === 0,
    errors
  }
}

export * from './openrouter'
