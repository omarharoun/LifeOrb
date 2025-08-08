"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface LifeParameter {
  id: string
  label: string
  type: 'slider' | 'select' | 'text' | 'multiselect'
  options?: string[]
  min?: number
  max?: number
  value: any
}

interface LifeParametersFormProps {
  onComplete: (profile: any) => void
}

export default function LifeParametersForm({ onComplete }: LifeParametersFormProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [parameters, setParameters] = useState<LifeParameter[]>([
    // Current Life Situation
    { id: 'age', label: 'Age Range', type: 'select', options: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'], value: '' },
    { id: 'education', label: 'Education Level', type: 'select', options: ['High School', 'Some College', 'Bachelor\'s', 'Master\'s', 'PhD', 'Other'], value: '' },
    { id: 'career_satisfaction', label: 'Career Satisfaction', type: 'slider', min: 1, max: 10, value: 5 },
    { id: 'financial_status', label: 'Financial Comfort', type: 'slider', min: 1, max: 10, value: 5 },
    { id: 'health_wellness', label: 'Health & Wellness', type: 'slider', min: 1, max: 10, value: 5 },
    { id: 'relationships', label: 'Relationship Satisfaction', type: 'slider', min: 1, max: 10, value: 5 },
    
    // Goals & Aspirations
    { id: 'career_goals', label: 'Career Goals', type: 'multiselect', options: ['Leadership Role', 'Career Change', 'Entrepreneurship', 'Work-Life Balance', 'Skill Development', 'Financial Independence'], value: [] },
    { id: 'personal_goals', label: 'Personal Goals', type: 'multiselect', options: ['Travel', 'Health & Fitness', 'Family', 'Creative Pursuits', 'Learning', 'Community Service'], value: [] },
    { id: 'timeline', label: 'Primary Timeline', type: 'select', options: ['6 months', '1 year', '2-3 years', '5 years', '10+ years'], value: '' },
    { id: 'risk_tolerance', label: 'Risk Tolerance', type: 'slider', min: 1, max: 10, value: 5 },
    
    // Values & Priorities
    { id: 'values', label: 'Core Values', type: 'multiselect', options: ['Family', 'Career', 'Adventure', 'Security', 'Creativity', 'Impact', 'Freedom', 'Learning'], value: [] },
    { id: 'lifestyle_preferences', label: 'Lifestyle Preferences', type: 'multiselect', options: ['Urban', 'Suburban', 'Rural', 'Travel', 'Remote Work', 'Community Focused'], value: [] },
  ])

  // Persist form state per browser (anonymous-by-design)
  const STORAGE_KEY = 'lifeorb:parameters:v1'
  const hydratedRef = useRef(false)

  // Load saved values on mount and merge into defaults
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
      if (raw) {
        const saved = JSON.parse(raw) as {
          values: Record<string, any>
          currentSection?: number
        }
        if (saved && saved.values) {
          setParameters(prev => prev.map(p => ({ ...p, value: saved.values[p.id] ?? p.value })))
        }
        if (typeof saved?.currentSection === 'number') {
          setCurrentSection(s => {
            const total = 3 // number of sections below
            const clamped = Math.min(Math.max(saved.currentSection!, 0), total - 1)
            return clamped
          })
        }
      }
    } catch {
      // ignore malformed storage
    } finally {
      hydratedRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Save on change (debounced) after hydration
  useEffect(() => {
    if (!hydratedRef.current) return
    const handle = window.setTimeout(() => {
      try {
        const values = parameters.reduce<Record<string, any>>((acc, p) => {
          acc[p.id] = p.value
          return acc
        }, {})
        const payload = { values, currentSection }
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
      } catch {
        // storage write can fail (quota/disabled); ignore silently
      }
    }, 300)
    return () => window.clearTimeout(handle)
  }, [parameters, currentSection])

  const sections = [
    { title: 'Current Life Situation', params: parameters.slice(0, 6) },
    { title: 'Goals & Aspirations', params: parameters.slice(6, 10) },
    { title: 'Values & Priorities', params: parameters.slice(10) },
  ]

  const updateParameter = (id: string, value: any) => {
    setParameters(prev => prev.map(param => 
      param.id === id ? { ...param, value } : param
    ))
  }

  const handleMultiSelect = (id: string, option: string) => {
    const param = parameters.find(p => p.id === id)
    if (param) {
      const currentValues = param.value || []
      const newValues = currentValues.includes(option)
        ? currentValues.filter((v: string) => v !== option)
        : [...currentValues, option]
      updateParameter(id, newValues)
    }
  }

  const renderParameter = (param: LifeParameter) => {
    switch (param.type) {
      case 'slider':
        return (
          <div key={param.id} className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {param.label}: {param.value}
            </label>
            <input
              type="range"
              min={param.min}
              max={param.max}
              value={param.value}
              onChange={(e) => updateParameter(param.id, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{param.min}</span>
              <span>{param.max}</span>
            </div>
          </div>
        )
      
      case 'select':
        return (
          <div key={param.id} className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {param.label}
            </label>
            <select
              value={param.value}
              onChange={(e) => updateParameter(param.id, e.target.value)}
              className="input-field"
            >
              <option value="">Select an option</option>
              {param.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )
      
      case 'multiselect':
        return (
          <div key={param.id} className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {param.label} (Select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {param.options?.map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleMultiSelect(param.id, option)}
                  className={`p-3 rounded-lg border text-sm transition-all ${
                    param.value?.includes(option)
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  const isCurrentSectionComplete = () => {
    const currentParams = sections[currentSection].params
    return currentParams.every(param => {
      if (param.type === 'multiselect') return param.value?.length > 0
      return param.value !== '' && param.value !== null && param.value !== undefined
    })
  }

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    } else {
      // Complete the form
      const profile = parameters.reduce((acc, param) => {
        acc[param.id] = param.value
        return acc
      }, {} as any)
      onComplete(profile)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-center mb-4">Life Parameters</h1>
          <p className="text-center text-gray-600">
            Tell us about your current situation and goals. This information is completely anonymous.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {sections.map((section, index) => (
              <span
                key={index}
                className={`text-sm ${
                  index <= currentSection ? 'text-primary-600' : 'text-gray-400'
                }`}
              >
                {section.title}
              </span>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-orb-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Section */}
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h2 className="text-2xl font-semibold mb-6">{sections[currentSection].title}</h2>
          {sections[currentSection].params.map(renderParameter)}
          
          <div className="flex justify-between pt-6">
            <button
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={nextSection}
              disabled={!isCurrentSectionComplete()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentSection === sections.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
