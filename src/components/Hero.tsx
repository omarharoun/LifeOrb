'use client'

import { motion } from 'framer-motion'

interface HeroProps {
  onGetStarted: () => void
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 mx-auto mb-6"
            >
              <div className="w-full h-full bg-gradient-to-r from-primary-500 to-orb-500 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                🔮
              </div>
            </motion.div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary-600 to-orb-600 bg-clip-text text-transparent mb-4">
              LifeOrb
            </h1>
            <p className="text-2xl text-gray-600 mb-8">
              Revolutionize Your Life Planning
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Discover Your Future. Connect with Your Path.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            LifeOrb is where human collaboration meets AI simulation. Input your life parameters, 
            explore possible futures, and connect with others walking similar paths. 
            No personal data required - just pure, anonymous life planning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="card">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Set Your Parameters</h3>
            <p className="text-gray-600">
              Define your current life situation and goals anonymously. 
              No emails, no personal data - just your aspirations.
            </p>
          </div>
          
          <div className="card">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI Simulation</h3>
            <p className="text-gray-600">
              Explore possible life scenarios based on your parameters. 
              See potential outcomes and paths to your goals.
            </p>
          </div>
          
          <div className="card">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Human Connection</h3>
            <p className="text-gray-600">
              Connect with others on similar journeys. Share experiences, 
              collaborate, and achieve goals together.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={onGetStarted}
            className="btn-primary text-xl px-12 py-4"
          >
            Start Your Journey
          </button>
          <p className="text-sm text-gray-500 mt-4">
            100% Anonymous • No Registration Required • AI-Powered
          </p>
        </motion.div>
      </div>
    </div>
  )
}
