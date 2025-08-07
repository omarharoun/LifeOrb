'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface SocialNetworkProps {
  userProfile: any
}

interface User {
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

interface Community {
  id: string
  name: string
  description: string
  memberCount: number
  category: string
  tags: string[]
  recentPosts: number
}

export default function SocialNetwork({ userProfile }: SocialNetworkProps) {
  const [matches, setMatches] = useState<User[]>([])
  const [communities, setCommunities] = useState<Community[]>([])
  const [activeTab, setActiveTab] = useState('matches')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    // Simulate finding matches and communities based on user profile
    const mockMatches: User[] = [
      {
        id: '1',
        avatar: '👨‍💼',
        goals: ['Leadership Role', 'Financial Independence'],
        values: ['Career', 'Family', 'Impact'],
        timeline: '2-3 years',
        progress: 65,
        location: 'Remote',
        matchPercentage: 89,
        recentActivity: 'Completed leadership certification',
        helpOffered: ['Mentoring', 'Network introductions'],
        helpNeeded: ['Industry insights', 'Work-life balance tips']
      },
      {
        id: '2',
        avatar: '👩‍🚀',
        goals: ['Entrepreneurship', 'Creative Pursuits'],
        values: ['Freedom', 'Creativity', 'Adventure'],
        timeline: '1 year',
        progress: 45,
        location: 'Urban',
        matchPercentage: 82,
        recentActivity: 'Launched MVP product',
        helpOffered: ['Product development', 'Design feedback'],
        helpNeeded: ['Marketing strategy', 'Funding advice']
      },
      {
        id: '3',
        avatar: '👨‍🎓',
        goals: ['Career Change', 'Skill Development'],
        values: ['Learning', 'Security', 'Community'],
        timeline: '2-3 years',
        progress: 30,
        location: 'Suburban',
        matchPercentage: 76,
        recentActivity: 'Started online course in data science',
        helpOffered: ['Study partnerships', 'Resource sharing'],
        helpNeeded: ['Career transition advice', 'Networking']
      }
    ]

    const mockCommunities: Community[] = [
      {
        id: '1',
        name: 'Future Leaders',
        description: 'A community for aspiring leaders sharing experiences and best practices',
        memberCount: 1247,
        category: 'Career Development',
        tags: ['Leadership', 'Management', 'Growth'],
        recentPosts: 23
      },
      {
        id: '2',
        name: 'Entrepreneur Connect',
        description: 'Supporting each other through the entrepreneurial journey',
        memberCount: 892,
        category: 'Business',
        tags: ['Startups', 'Innovation', 'Networking'],
        recentPosts: 31
      },
      {
        id: '3',
        name: 'Life Balance Seekers',
        description: 'Finding harmony between career ambitions and personal fulfillment',
        memberCount: 2156,
        category: 'Lifestyle',
        tags: ['Work-life balance', 'Wellness', 'Family'],
        recentPosts: 18
      }
    ]

    setMatches(mockMatches)
    setCommunities(mockCommunities)
  }, [userProfile])

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Your LifeOrb Community</h1>
          <p className="text-xl text-gray-600">
            Connect with others on similar paths and accelerate your journey together
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('matches')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'matches'
                  ? 'bg-white shadow-sm text-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Path Matches ({matches.length})
            </button>
            <button
              onClick={() => setActiveTab('communities')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'communities'
                  ? 'bg-white shadow-sm text-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Communities ({communities.length})
            </button>
          </div>
        </div>

        {/* Matches Tab */}
        {activeTab === 'matches' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {matches.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{user.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">Path Match</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                        {user.matchPercentage}% match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{user.location}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Shared Goals:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.goals.slice(0, 2).map(goal => (
                      <span key={goal} className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-600">{user.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-orb-500 h-2 rounded-full"
                      style={{ width: `${user.progress}%` }}
                    />
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  Recent: {user.recentActivity}
                </p>

                <div className="flex gap-2">
                  <button className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-primary-600 transition-colors">
                    Connect
                  </button>
                  <button className="flex-1 border border-primary-500 text-primary-500 py-2 px-4 rounded-lg text-sm hover:bg-primary-50 transition-colors">
                    Message
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Communities Tab */}
        {activeTab === 'communities' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-2 gap-6"
          >
            {communities.map((community, index) => (
              <motion.div
                key={community.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{community.name}</h3>
                    <p className="text-sm text-gray-500">{community.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{community.memberCount} members</p>
                    <p className="text-xs text-gray-500">{community.recentPosts} recent posts</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{community.description}</p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {community.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 btn-primary py-2 text-sm">
                    Join Community
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Preview
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* User Detail Modal */}
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl max-w-lg w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-6">
                <div className="text-6xl mr-4">{selectedUser.avatar}</div>
                <div>
                  <h2 className="text-2xl font-bold">Path Collaborator</h2>
                  <p className="text-gray-600">{selectedUser.matchPercentage}% compatibility</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Goals & Timeline</h3>
                  <p className="text-gray-600">{selectedUser.goals.join(', ')} • {selectedUser.timeline}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Can Help With</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.helpOffered.map(help => (
                      <span key={help} className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                        {help}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Looking for Help With</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.helpNeeded.map(help => (
                      <span key={help} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                        {help}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 btn-primary">Start Collaboration</button>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 btn-secondary"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
