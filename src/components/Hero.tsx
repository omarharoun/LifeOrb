'use client'

import { motion } from 'framer-motion'
import { Button, Card } from './ui'

interface HeroProps {
  onGetStarted: () => void
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="max-w-5xl mx-auto text-center relative z-10">
=======
  <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
>>>>>>> 9413f88596b7057098f8cc5cd68e298f877e5f00
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="relative mb-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="w-40 h-40 mx-auto mb-8 relative"
            >
              <div className="w-full h-full bg-gradient-to-br from-primary-400 via-orb-500 to-sage-400 rounded-full flex items-center justify-center text-white text-7xl font-bold shadow-2xl animate-glow relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                <span className="relative z-10">🔮</span>
              </div>
              {/* Floating particles around the orb */}
              <div className="absolute inset-0">
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary-400 rounded-full animate-bounce-slow opacity-60"></div>
                <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-orb-400 rounded-full animate-float opacity-70"></div>
                <div className="absolute top-1/2 -left-4 w-4 h-4 bg-sage-400 rounded-full animate-drift opacity-50"></div>
                <div className="absolute top-1/4 -right-4 w-2 h-2 bg-warm-400 rounded-full animate-pulse-slow opacity-60"></div>
              </div>
            </motion.div>
            <h1 className="text-7xl font-bold heading-comfort mb-6 tracking-tight">
              LifeOrb
            </h1>
            <p className="text-3xl text-comfort font-light mb-8 leading-relaxed">
              Where Dreams Meet Reality
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl font-semibold text-comfort mb-8 leading-relaxed">
            Discover Your Future. Connect with Your Journey.
          </h2>
          <p className="text-xl text-comfort/80 max-w-4xl mx-auto leading-relaxed font-light">
            LifeOrb is a sanctuary where human wisdom meets AI insight. Share your life's parameters anonymously, 
            explore infinite possibilities, and connect with kindred spirits walking similar paths. 
            No judgments, no data collection—just pure, compassionate life planning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="grid md:grid-cols-3 gap-10 mb-16"
        >
<<<<<<< HEAD
          <motion.div 
            className="card group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">�</div>
            <h3 className="text-2xl font-semibold mb-4 text-comfort">Nurture Your Dreams</h3>
            <p className="text-comfort/70 leading-relaxed">
              Share your life's story and aspirations in a safe, anonymous space. 
              No emails, no tracking—just your authentic self and genuine goals.
            </p>
          </motion.div>
          
          <motion.div 
            className="card group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">✨</div>
            <h3 className="text-2xl font-semibold mb-4 text-comfort">Explore Possibilities</h3>
            <p className="text-comfort/70 leading-relaxed">
              Let our compassionate AI guide you through potential life paths. 
              Discover scenarios that inspire and motivate your next steps.
            </p>
          </motion.div>
          
          <motion.div 
            className="card group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🤝</div>
            <h3 className="text-2xl font-semibold mb-4 text-comfort">Find Your Tribe</h3>
            <p className="text-comfort/70 leading-relaxed">
              Connect with fellow travelers on similar journeys. Share wisdom, 
              offer support, and grow together in meaningful community.
            </p>
          </motion.div>
=======
          <Card>
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Set Your Parameters</h3>
            <p className="text-gray-600">
              Define your current life situation and goals anonymously. 
              No emails, no personal data - just your aspirations.
            </p>
          </Card>
          
          <Card>
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI Simulation</h3>
            <p className="text-gray-600">
              Explore possible life scenarios based on your parameters. 
              See potential outcomes and paths to your goals.
            </p>
          </Card>
          
          <Card>
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Human Connection</h3>
            <p className="text-gray-600">
              Connect with others on similar journeys. Share experiences, 
              collaborate, and achieve goals together.
            </p>
          </Card>
>>>>>>> 9413f88596b7057098f8cc5cd68e298f877e5f00
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
<<<<<<< HEAD
          <motion.button
            onClick={onGetStarted}
            className="btn-primary text-2xl px-16 py-5 relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative z-10">Begin Your Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-orb-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
          <p className="text-sm text-comfort/60 leading-relaxed">
            🌿 Completely Anonymous • 🔒 No Registration Required • 🤖 AI-Powered Insights
=======
          <Button onClick={onGetStarted} size="lg" className="px-12">Start Your Journey</Button>
          <p className="text-sm text-gray-500 mt-4">
            100% Anonymous • No Registration Required • AI-Powered
>>>>>>> 9413f88596b7057098f8cc5cd68e298f877e5f00
          </p>
        </motion.div>
      </div>
    </div>
  )
}
