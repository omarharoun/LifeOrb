// Core type definitions for LifeOrb platform

export interface LifeParameter {
  id: string
  label: string
  type: 'slider' | 'select' | 'text' | 'multiselect'
  options?: string[]
  min?: number
  max?: number
  value: any
}

export interface UserProfile {
  // Current Life Situation
  age: string
  education: string
  career_satisfaction: number
  financial_status: number
  health_wellness: number
  relationships: number
  
  // Goals & Aspirations
  career_goals: string[]
  personal_goals: string[]
  timeline: string
  risk_tolerance: number
  
  // Values & Priorities
  values: string[]
  lifestyle_preferences: string[]
}

export interface LifeScenario {
  id: string
  title: string
  description: string
  probability: number
  timeline: string
  keyFactors: string[]
  outcomes: {
    positive: string[]
    challenges: string[]
  }
  actionSteps: string[]
}

export interface CommunityUser {
  id: string
  avatar: string
  goals: string[]
  values: string[]
  timeline: string
  progress: number
  location: string
  matchPercentage: number
  recentActivity: string
  helpOffered: string[]
  helpNeeded: string[]
}

export interface Community {
  id: string
  name: string
  description: string
  memberCount: number
  category: string
  tags: string[]
  recentPosts: number
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}
