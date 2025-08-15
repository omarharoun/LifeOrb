"use client"

import { useState } from 'react'
import { useProductivityStore } from '@/store/productivity'
import type { EnergyLevel, TaskItem } from '@/types/productivity'

export default function TaskForm() {
  const addTask = useProductivityStore(s => s.addTask)
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState(60)
  const [priority, setPriority] = useState(3)
  const [dueDate, setDueDate] = useState('')
  const [energy, setEnergy] = useState<EnergyLevel>('medium')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    const payload: Omit<TaskItem, 'id'> = {
      title: title.trim(),
      durationMinutes: Number(duration),
      priority: Math.max(1, Math.min(5, Number(priority))) as any,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      energy,
    }
    addTask(payload)
    setTitle(''); setDuration(60); setPriority(3); setDueDate(''); setEnergy('medium')
  }

  const getPriorityColor = (p: number) => {
    if (p >= 4) return 'text-red-400 bg-red-500/10 border-red-500/20'
    if (p === 3) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
    return 'text-green-400 bg-green-500/10 border-green-500/20'
  }

  return (
    <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
        <h3 className="text-lg font-semibold text-slate-100">New Task Entry</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-600 to-transparent"></div>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-wider">Task Title</label>
            <input 
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              placeholder="Enter task description..."
              value={title} 
              onChange={e=>setTitle(e.target.value)} 
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-wider">Duration (min)</label>
            <input 
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              type="number" 
              min={5} 
              step={5} 
              value={duration} 
              onChange={e=>setDuration(Number(e.target.value))} 
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-wider">Priority Level</label>
            <select 
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              value={priority} 
              onChange={e=>setPriority(Number(e.target.value))}
            >
              {[1,2,3,4,5].map(p => (
                <option key={p} value={p} className="bg-slate-800">
                  P{p} - {p >= 4 ? 'Critical' : p === 3 ? 'High' : p === 2 ? 'Medium' : 'Low'}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-wider">Due Date</label>
            <input 
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              type="date" 
              value={dueDate} 
              onChange={e=>setDueDate(e.target.value)} 
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-wider">Energy Level</label>
            <select 
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              value={energy} 
              onChange={e=>setEnergy(e.target.value as EnergyLevel)}
            >
              <option value="low" className="bg-slate-800">🔋 Low Energy</option>
              <option value="medium" className="bg-slate-800">⚡ Medium Energy</option>
              <option value="high" className="bg-slate-800">🚀 High Energy</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-slate-700/50 gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(priority)}`}>
              P{priority}
            </div>
            <div className="text-xs text-slate-400">
              {duration}min • {energy} energy
            </div>
          </div>
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto"
            disabled={!title.trim()}
          >
            <span>+</span>
            Add Task
          </button>
        </div>
      </form>
    </div>
  )
}
