"use client"

import { useEffect, useState } from 'react'
import { useProductivityStore } from '@/store/productivity'
import { Constraints, ScheduleEvent } from '@/types/productivity'

export default function SchedulePreview() {
  const { tasks, constraints, setSchedule } = useProductivityStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [aiInsights, setAiInsights] = useState<string>('')

  const requestSchedule = async () => {
    setLoading(true); setError(null); setAiInsights('')
    try {
      const res = await fetch('/api/productivity/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks, constraints, useAI: true }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json() as { events: ScheduleEvent[], unscheduled: any[], aiInsights?: string }
      setSchedule(data.events, data.unscheduled)
      if (data.aiInsights) setAiInsights(data.aiInsights)
    } catch (e: any) {
      setError(e?.message || 'Failed to schedule')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
          <h3 className="text-lg font-semibold text-slate-100">AI-Powered Schedule Timeline</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-600 to-transparent hidden sm:block"></div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-2">
            <span className="text-purple-400">🤖</span>
            <span className="text-sm text-slate-300">AI Optimized</span>
          </div>
          
          <button 
            onClick={requestSchedule} 
            disabled={loading || tasks.length === 0}
            className="bg-purple-600 hover:bg-purple-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 min-w-[140px]"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <span>⚡</span>
                Generate Schedule
              </>
            )}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
          <div className="flex items-center gap-2">
            <span>❌</span>
            {error}
          </div>
        </div>
      )}

      {aiInsights && (
        <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span>🤖</span>
            <div className="text-blue-300 font-medium text-sm">AI Insights</div>
          </div>
          <div className="text-blue-200 text-sm">{aiInsights}</div>
        </div>
      )}
      
      <ScheduleCalendar />
    </div>
  )
}

function ScheduleCalendar() {
  const events = useProductivityStore(s => s.schedule)
  const unscheduled = useProductivityStore(s => s.unscheduled)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'calendar' | 'timeline'>('calendar')

  if (!events.length) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center animate-pulse">
          <div className="text-2xl">📅</div>
        </div>
        <div className="text-slate-300 mb-2">No schedule generated yet</div>
        <div className="text-sm text-slate-500">Add tasks and click &ldquo;Generate Schedule&rdquo; to see your optimized timeline</div>
      </div>
    )
  }

  const byDay = events.reduce<Record<string, typeof events>>((acc, e) => {
    acc[e.dayKey] = acc[e.dayKey] || []
    acc[e.dayKey].push(e)
    return acc
  }, {})

  const sortedDays = Object.keys(byDay).sort()

  const getEventTypeColor = (kind: string) => {
    switch (kind.toLowerCase()) {
      case 'task': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'break': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'meeting': return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30'
    }
  }

  const getEventDotColor = (kind: string) => {
    switch (kind.toLowerCase()) {
      case 'task': return 'bg-blue-500'
      case 'break': return 'bg-green-500'
      case 'meeting': return 'bg-purple-500'
      default: return 'bg-slate-500'
    }
  }

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const getDuration = (start: string, end: string) => {
    const durationMs = new Date(end).getTime() - new Date(start).getTime()
    const minutes = Math.round(durationMs / (1000 * 60))
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
    }
    return `${minutes}m`
  }

  const getTimeProgress = (start: string, end: string) => {
    const now = new Date()
    const startTime = new Date(start)
    const endTime = new Date(end)
    
    if (now < startTime) return 0
    if (now > endTime) return 100
    
    const total = endTime.getTime() - startTime.getTime()
    const elapsed = now.getTime() - startTime.getTime()
    return (elapsed / total) * 100
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-1">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              viewMode === 'calendar' 
                ? 'bg-purple-600 text-white' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📅 Calendar
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              viewMode === 'timeline' 
                ? 'bg-purple-600 text-white' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 Timeline
          </button>
        </div>
        
        <div className="text-xs text-slate-400">
          {sortedDays.length} day{sortedDays.length !== 1 ? 's' : ''} • {events.length} event{events.length !== 1 ? 's' : ''}
        </div>
      </div>

      {viewMode === 'calendar' ? (
        // Calendar Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedDays.map(day => {
            const dayEvents = byDay[day].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
            const totalDuration = dayEvents.reduce((sum, e) => {
              const duration = new Date(e.end).getTime() - new Date(e.start).getTime()
              return sum + duration / (1000 * 60)
            }, 0)
            
            return (
              <div 
                key={day} 
                className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600/50 transition-all cursor-pointer group"
                onClick={() => setSelectedDay(selectedDay === day ? null : day)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-slate-100 text-sm">
                      {new Date(day).toLocaleDateString('en-US', { 
                        weekday: 'short',
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="text-xs text-slate-400">
                      {Math.round(totalDuration)}min total
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {dayEvents.map((event, index) => {
                    const progress = getTimeProgress(event.start, event.end)
                    const isActive = progress > 0 && progress < 100
                    
                    return (
                      <div key={event.id} className="relative">
                        <div className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${getEventTypeColor(event.kind)} ${
                          isActive ? 'ring-2 ring-yellow-500/50 bg-yellow-500/5' : ''
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${getEventDotColor(event.kind)} ${isActive ? 'animate-pulse' : ''}`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate">{event.title}</div>
                            <div className="text-xs opacity-75">
                              {formatTime(event.start)} - {formatTime(event.end)}
                            </div>
                          </div>
                        </div>
                        {isActive && (
                          <div className="absolute bottom-0 left-0 h-0.5 bg-yellow-500 rounded-full transition-all duration-1000"
                               style={{ width: `${progress}%` }}>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        // Timeline View
        <div className="space-y-6">
          {sortedDays.map(day => (
            <div key={day} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="text-slate-100 font-semibold">
                  {new Date(day).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex-1 h-px bg-slate-700/50"></div>
                <div className="text-xs text-slate-400">
                  {byDay[day].length} event{byDay[day].length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="space-y-2">
                {byDay[day].map(ev => {
                  const progress = getTimeProgress(ev.start, ev.end)
                  const isActive = progress > 0 && progress < 100
                  
                  return (
                    <div key={ev.id} className={`group bg-slate-900/50 border rounded-lg p-4 hover:border-slate-600/50 transition-all ${
                      isActive ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-slate-600/30'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`px-2 py-1 rounded text-xs font-medium border ${getEventTypeColor(ev.kind)}`}>
                            {ev.kind.toUpperCase()}
                          </div>
                          <div className="text-slate-100 font-medium">{ev.title}</div>
                          {isActive && (
                            <div className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs animate-pulse">
                              ACTIVE
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-slate-300">
                            {formatTime(ev.start)} - {formatTime(ev.end)}
                          </div>
                          <div className="text-slate-500">
                            {getDuration(ev.start, ev.end)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Timeline bar */}
                      <div className="mt-3 flex items-center gap-2">
                        <div className="text-xs text-slate-500 w-12">{formatTime(ev.start)}</div>
                        <div className="flex-1 h-3 bg-slate-700/50 rounded-full overflow-hidden relative">
                          <div 
                            className={`h-full ${
                              ev.kind === 'task' ? 'bg-blue-500' :
                              ev.kind === 'break' ? 'bg-green-500' :
                              'bg-purple-500'
                            } transition-all duration-1000`}
                            style={{ width: '100%' }}
                          ></div>
                          {isActive && (
                            <div 
                              className="absolute top-0 left-0 h-full bg-yellow-500/50 transition-all duration-1000"
                              style={{ width: `${progress}%` }}
                            ></div>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 w-12 text-right">{formatTime(ev.end)}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!!unscheduled.length && (
        <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span>⚠️</span>
            <div className="text-orange-300 font-medium">Unscheduled Tasks</div>
          </div>
          <div className="text-sm text-orange-200 mb-2">
            The following tasks couldn&apos;t be fit into the schedule:
          </div>
          <div className="flex flex-wrap gap-2">
            {unscheduled.map((task, i) => (
              <div key={i} className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs">
                {task.title} ({task.durationMinutes}min)
              </div>
            ))}
          </div>
        </div>
      )}
      
      {events.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-700/50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-slate-400 text-xs uppercase tracking-wider">Total Events</div>
              <div className="text-slate-100 text-lg font-semibold">{events.length}</div>
            </div>
            <div>
              <div className="text-slate-400 text-xs uppercase tracking-wider">Scheduled Days</div>
              <div className="text-slate-100 text-lg font-semibold">{Object.keys(byDay).length}</div>
            </div>
            <div>
              <div className="text-slate-400 text-xs uppercase tracking-wider">Total Duration</div>
              <div className="text-slate-100 text-lg font-semibold">
                {Math.round(events.reduce((sum, e) => {
                  const duration = new Date(e.end).getTime() - new Date(e.start).getTime()
                  return sum + duration / (1000 * 60 * 60)
                }, 0))}h
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-xs uppercase tracking-wider">Unscheduled</div>
              <div className="text-slate-100 text-lg font-semibold">{unscheduled.length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
