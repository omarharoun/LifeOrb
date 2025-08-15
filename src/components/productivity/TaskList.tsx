"use client"

import { useProductivityStore } from '@/store/productivity'
import type { TaskItem } from '@/types/productivity'
import { useState, useEffect } from 'react'

export default function TaskList() {
  const tasks = useProductivityStore(s => s.tasks)
  const removeTask = useProductivityStore(s => s.removeTask)
  const updateTask = useProductivityStore(s => s.updateTask)
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [sortBy, setSortBy] = useState<'priority' | 'due' | 'duration'>('priority')
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())

  const markTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => new Set([...prev, taskId]))
    // Remove task after animation
    setTimeout(() => {
      removeTask(taskId)
      setCompletedTasks(prev => {
        const newSet = new Set(prev)
        newSet.delete(taskId)
        return newSet
      })
    }, 1000)
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'high') return task.priority >= 4
    if (filter === 'medium') return task.priority === 3
    if (filter === 'low') return task.priority <= 2
    return true
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        return b.priority - a.priority
      case 'due':
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      case 'duration':
        return a.durationMinutes - b.durationMinutes
      default:
        return 0
    }
  })

  if (!tasks.length) return (
    <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 sm:p-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center animate-pulse">
        <div className="text-2xl">📋</div>
      </div>
      <div className="text-slate-300 mb-2">No tasks in queue</div>
      <div className="text-sm text-slate-500">Add tasks above to start building your schedule</div>
    </div>
  )

  const getPriorityColor = (priority: number) => {
    if (priority >= 4) return 'bg-red-500/20 text-red-300 border-red-500/30'
    if (priority === 3) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    return 'bg-green-500/20 text-green-300 border-green-500/30'
  }

  const getEnergyIcon = (energy: string) => {
    switch (energy) {
      case 'low': return '🔋'
      case 'medium': return '⚡'
      case 'high': return '🚀'
      default: return '⚡'
    }
  }

  const getDaysUntilDue = (dueDate?: string) => {
    if (!dueDate) return null
    const days = Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <h3 className="text-lg font-semibold text-slate-100">Task Queue</h3>
          <div className="bg-slate-700/50 text-slate-300 text-xs px-2 py-1 rounded-full">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''}
          </div>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-600 to-transparent hidden sm:block"></div>
        
        {/* Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-1 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
          >
            <option value="all">All Tasks</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-1 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
          >
            <option value="priority">Sort by Priority</option>
            <option value="due">Sort by Due Date</option>
            <option value="duration">Sort by Duration</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-3">
        {sortedTasks.map((task, index) => {
          const daysUntilDue = getDaysUntilDue(task.dueDate)
          const isOverdue = daysUntilDue !== null && daysUntilDue < 0
          const isDueSoon = daysUntilDue !== null && daysUntilDue <= 1 && daysUntilDue >= 0
          const isCompleted = completedTasks.has(task.id)
          
          return (
            <div 
              key={task.id} 
              className={`group relative bg-slate-900/50 border rounded-lg p-3 sm:p-4 transition-all duration-500 hover:bg-slate-900/70 hover:border-slate-600/50 transform ${
                isCompleted ? 'scale-95 opacity-50 bg-green-500/10 border-green-500/30' :
                isOverdue ? 'border-red-500/50 bg-red-500/5 animate-pulse' : 
                isDueSoon ? 'border-yellow-500/50 bg-yellow-500/5' : 
                'border-slate-600/30'
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animationDuration: '0.5s',
                animationFillMode: 'both',
                animationName: isCompleted ? 'none' : 'slideInUp'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <div className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                      P{task.priority}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      {getEnergyIcon(task.energy || 'medium')}
                      <span className="hidden sm:inline">{task.energy || 'medium'}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {task.durationMinutes}min
                    </div>
                    {daysUntilDue !== null && (
                      <div className={`text-xs px-2 py-1 rounded ${
                        isOverdue ? 'bg-red-500/20 text-red-300' :
                        isDueSoon ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {isOverdue ? `${Math.abs(daysUntilDue)}d overdue` :
                         daysUntilDue === 0 ? 'Due today' :
                         `${daysUntilDue}d remaining`}
                      </div>
                    )}
                  </div>
                  
                  <h4 className={`text-slate-100 font-medium mb-1 pr-4 transition-all ${isCompleted ? 'line-through opacity-60' : ''}`}>
                    {task.title}
                  </h4>
                  
                  {task.dueDate && (
                    <div className="text-xs text-slate-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => markTaskComplete(task.id)}
                    className="opacity-0 group-hover:opacity-100 bg-green-500/20 hover:bg-green-500/30 text-green-300 p-2 rounded-lg transition-all text-sm"
                    title="Mark as complete"
                  >
                    ✓
                  </button>
                  <button 
                    onClick={() => removeTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 bg-red-500/20 hover:bg-red-500/30 text-red-300 p-2 rounded-lg transition-all text-sm"
                    title="Remove task"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              {/* Enhanced progress bar */}
              <div className="mt-3 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    isCompleted ? 'bg-green-500' :
                    isOverdue ? 'bg-red-500' :
                    isDueSoon ? 'bg-yellow-500' :
                    task.priority >= 4 ? 'bg-red-400' :
                    task.priority === 3 ? 'bg-yellow-400' :
                    'bg-green-400'
                  }`}
                  style={{ 
                    width: isCompleted ? '100%' : `${task.priority * 20}%`,
                    animationDelay: `${index * 200}ms`
                  }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-4 sm:mt-6 pt-4 border-t border-slate-700/50">
        <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-2 text-xs text-slate-400">
          <div>Total time: {tasks.reduce((sum, t) => sum + t.durationMinutes, 0)}min</div>
          <div>Avg priority: {tasks.length ? (tasks.reduce((sum, t) => sum + t.priority, 0) / tasks.length).toFixed(1) : '0'}</div>
          <div className="sm:hidden col-span-2">Filtered: {sortedTasks.length}/{tasks.length} tasks</div>
          <div className="hidden sm:block">Showing: {sortedTasks.length}/{tasks.length}</div>
        </div>
      </div>
      
      {/* Add CSS animation */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
