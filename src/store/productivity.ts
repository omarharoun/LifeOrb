import { create } from 'zustand'
import { Constraints, ScheduleEvent, TaskItem } from '@/types/productivity'
import { v4 as uuid } from 'uuid'

interface ProductivityState {
  tasks: TaskItem[]
  constraints: Constraints
  schedule: ScheduleEvent[]
  unscheduled: TaskItem[]
  addTask: (t: Omit<TaskItem, 'id'>) => void
  removeTask: (id: string) => void
  updateTask: (id: string, updates: Partial<TaskItem>) => void
  setConstraints: (c: Partial<Constraints>) => void
  setSchedule: (events: ScheduleEvent[], unscheduled: TaskItem[]) => void
  reset: () => void
}

const defaultConstraints: Constraints = {
  timezone: 'UTC',
  planningHorizonDays: 7,
  defaultDayStart: '08:00',
  defaultDayEnd: '18:00',
  workWeek: [
    { weekday: 1, windows: [{ start: '09:00', end: '17:00' }] },
    { weekday: 2, windows: [{ start: '09:00', end: '17:00' }] },
    { weekday: 3, windows: [{ start: '09:00', end: '17:00' }] },
    { weekday: 4, windows: [{ start: '09:00', end: '17:00' }] },
    { weekday: 5, windows: [{ start: '09:00', end: '17:00' }] },
  ],
  breakEveryMinutes: 90,
  breakDurationMinutes: 10,
  bufferMinutes: 5,
}

export const useProductivityStore = create<ProductivityState>((set) => ({
  tasks: [],
  constraints: defaultConstraints,
  schedule: [],
  unscheduled: [],
  addTask: (t) => set((s) => ({ tasks: [...s.tasks, { id: uuid(), ...t }] })),
  removeTask: (id) => set((s) => ({ tasks: s.tasks.filter(t => t.id !== id) })),
  updateTask: (id, updates) => set((s) => ({ 
    tasks: s.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
  })),
  setConstraints: (c) => set((s) => ({ constraints: { ...s.constraints, ...c } })),
  setSchedule: (events, unscheduled) => set({ schedule: events, unscheduled }),
  reset: () => set({ tasks: [], schedule: [], unscheduled: [] }),
}))
