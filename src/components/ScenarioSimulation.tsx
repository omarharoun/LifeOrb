'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ScenarioSimulationProps {
  userProfile: any
  onContinue: () => void
}

interface Scenario {
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

export default function ScenarioSimulation({ userProfile, onContinue }: ScenarioSimulationProps) {
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate AI scenario generation based on user profile
    setTimeout(() => {
      const generatedScenarios = generateScenarios(userProfile)
      setScenarios(generatedScenarios)
      setIsLoading(false)
    }, 2000)
  }, [userProfile])

  const generateScenarios = (profile: any): Scenario[] => {
    // This would be replaced with actual AI generation
    // For now, we'll create scenarios based on the user's goals and parameters
    const scenarios: Scenario[] = []

    // Career-focused scenario
    if (profile.career_goals?.includes('Leadership Role')) {
      scenarios.push({
        id: 'leadership-path',
        title: 'Leadership Advancement Path',
        description: 'Pursuing senior leadership roles through strategic skill development and networking.',
        probability: 75,
        timeline: profile.timeline || '2-3 years',
        keyFactors: ['Current skills', 'Industry connections', 'Market conditions'],
        outcomes: {
          positive: [
            'Increased salary and benefits',
            'Greater influence and impact',
            'Enhanced professional reputation',
            'Expanded network'
          ],
          challenges: [
            'Increased responsibility and stress',
            'Work-life balance challenges',
            'Need for continuous learning',
            'Political navigation required'
          ]
        },
        actionSteps: [
          'Identify key leadership competencies to develop',
          'Find mentors in senior positions',
          'Lead cross-functional projects',
          'Pursue executive education',
          'Build strategic internal and external networks'
        ]
      })
    }

    // Entrepreneurship scenario
    if (profile.career_goals?.includes('Entrepreneurship')) {
      scenarios.push({
        id: 'entrepreneurship-path',
        title: 'Entrepreneurial Venture',
        description: 'Starting your own business based on your skills and market opportunities.',
        probability: 45,
        timeline: profile.timeline || '1-2 years',
        keyFactors: ['Market demand', 'Financial resources', 'Risk tolerance', 'Industry expertise'],
        outcomes: {
          positive: [
            'Financial independence potential',
            'Creative freedom and autonomy',
            'Building something meaningful',
            'Flexible lifestyle'
          ],
          challenges: [
            'Financial uncertainty',
            'High stress and responsibility',
            'Long working hours initially',
            'Market competition'
          ]
        },
        actionSteps: [
          'Validate business idea with market research',
          'Develop minimum viable product',
          'Build financial runway',
          'Establish legal structure',
          'Create marketing and sales strategy'
        ]
      })
    }

    // Work-life balance scenario
    if (profile.career_goals?.includes('Work-Life Balance') || profile.values?.includes('Family')) {
      scenarios.push({
        id: 'balance-optimization',
        title: 'Work-Life Integration',
        description: 'Optimizing career growth while maintaining strong personal relationships and well-being.',
        probability: 85,
        timeline: '6 months - 1 year',
        keyFactors: ['Current role flexibility', 'Family priorities', 'Financial needs'],
        outcomes: {
          positive: [
            'Improved relationships',
            'Better mental health',
            'Sustained career growth',
            'Personal fulfillment'
          ],
          challenges: [
            'Potential slower career advancement',
            'Income limitations',
            'Need for excellent time management',
            'Setting boundaries'
          ]
        },
        actionSteps: [
          'Negotiate flexible work arrangements',
          'Establish clear boundaries',
          'Optimize productivity systems',
          'Prioritize high-impact activities',
          'Build supportive relationships'
        ]
      })
    }

    return scenarios
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-semibold">Generating Your Life Scenarios...</h2>
          <p className="text-gray-600">AI is analyzing your parameters and creating personalized paths</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Your Life Scenarios</h1>
          <p className="text-xl text-gray-900">
            Based on your parameters, here are potential paths your life could take
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`card cursor-pointer transition-all hover:shadow-xl ${
                selectedScenario === scenario.id ? 'ring-2 ring-primary-500' : ''
              }`}
              onClick={() => setSelectedScenario(scenario.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{scenario.title}</h3>
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {scenario.probability}% likely
                </div>
              </div>
              
              <p className="text-gray-900 mb-4">{scenario.description}</p>
              
              <div className="flex items-center text-sm text-gray-900 mb-4">
                <span>Timeline: {scenario.timeline}</span>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Key Factors:</h4>
                <div className="flex flex-wrap gap-2">
                  {scenario.keyFactors.map(factor => (
                    <span key={factor} className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-900">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>

              {selectedScenario === scenario.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 pt-6 border-t"
                >
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Positive Outcomes:</h4>
                      <ul className="text-sm space-y-1 text-gray-900">
                        {scenario.outcomes.positive.map(outcome => (
                          <li key={outcome} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-700 mb-2">Challenges:</h4>
                      <ul className="text-sm space-y-1 text-gray-900">
                        {scenario.outcomes.challenges.map(challenge => (
                          <li key={challenge} className="flex items-start">
                            <span className="text-orange-500 mr-2">⚠</span>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Recommended Action Steps:</h4>
                    <ol className="text-sm space-y-2 text-gray-900">
                      {scenario.actionSteps.map((step, index) => (
                        <li key={step} className="flex items-start">
                          <span className="bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={onContinue}
            className="btn-primary"
          >
            Connect with Others on Similar Paths
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Find people who share your goals and learn from their experiences
          </p>
        </motion.div>
      </div>
    </div>
  )
}
