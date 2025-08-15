'use client'

import { useState } from 'react'
import TaskForm from '@/components/productivity/TaskForm'
import TaskList from '@/components/productivity/TaskList'
import SchedulePreview from '@/components/productivity/SchedulePreview'
import { useProductivityStore } from '@/store/productivity'

export default function ProductivityPage() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'schedule' | 'analytics'>('tasks')
  const tasks = useProductivityStore(s => s.tasks)
  const schedule = useProductivityStore(s => s.schedule)

  const stats = {
    totalTasks: tasks.length,
    scheduledTasks: schedule.filter(e => e.kind === 'task').length,
    totalDuration: tasks.reduce((sum, t) => sum + t.durationMinutes, 0),
    highPriorityTasks: tasks.filter(t => t.priority >= 4).length
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* DevOps-style header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Productivity Pipeline</h1>
                <p className="text-slate-400 text-sm">Intelligent task scheduling & workflow automation</p>
              </div>
            </div>
            
            {/* Quick stats */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.totalTasks}</div>
                <div className="text-xs text-slate-400">TASKS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{stats.scheduledTasks}</div>
                <div className="text-xs text-slate-400">SCHEDULED</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{Math.round(stats.totalDuration / 60)}h</div>
                <div className="text-xs text-slate-400">TOTAL TIME</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{stats.highPriorityTasks}</div>
                <div className="text-xs text-slate-400">HIGH PRI</div>
              </div>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex space-x-1 mt-6 border-b border-slate-700">
            {[
              { id: 'tasks', label: 'Task Queue', icon: '📝' },
              { id: 'schedule', label: 'Schedule View', icon: '📅' },
              { id: 'analytics', label: 'Analytics', icon: '📊' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-t-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-slate-800 text-white border-b-2 border-blue-500'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'tasks' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <TaskForm />
            </div>
            <div className="lg:col-span-2">
              <TaskList />
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-8">
            <SchedulePreview />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">Productivity Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Task Completion Rate</span>
                  <span className="text-green-400 font-bold">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Average Task Duration</span>
                  <span className="text-blue-400 font-bold">{tasks.length > 0 ? Math.round(stats.totalDuration / tasks.length) : 0}min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Energy Efficiency</span>
                  <span className="text-purple-400 font-bold">92%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">Task Distribution</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(priority => {
                  const count = tasks.filter(t => t.priority === priority).length
                  const percentage = tasks.length > 0 ? (count / tasks.length) * 100 : 0
                  return (
                    <div key={priority} className="flex items-center space-x-3">
                      <span className="text-slate-300 w-16">P{priority}</span>
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            priority >= 4 ? 'bg-red-500' : priority === 3 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-slate-400 w-12 text-sm">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
