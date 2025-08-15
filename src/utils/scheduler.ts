import { Constraints, ScheduleEvent, ScheduleResult, TaskItem } from '@/types/productivity'
import { v4 as uuid } from 'uuid'

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}
function fromMinutes(total: number) {
  const h = Math.floor(total / 60)
  const m = total % 60
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`
}

function sameDayKey(date: Date) {
  return date.toISOString().slice(0,10)
}

export function simpleSchedule(tasks: TaskItem[], constraints: Constraints, startDate = new Date()): ScheduleResult {
  const events: ScheduleEvent[] = []
  const unscheduled: TaskItem[] = []

  const horizonDays = constraints.planningHorizonDays || 7
  const buffer = constraints.bufferMinutes ?? 5
  const breakEvery = constraints.breakEveryMinutes ?? 90
  const breakDur = constraints.breakDurationMinutes ?? 10

  // Sort tasks: by priority desc (5 high) then due date asc
  const sorted = [...tasks].sort((a,b)=>{
    const p = (b.priority||1) - (a.priority||1)
    if (p !== 0) return p
    const ad = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
    const bd = b.dueDate ? new Date(b.dueDate).getTime() : Infinity
    return ad - bd
  })

  let day = new Date(startDate)

  for (let d=0; d<horizonDays; d++) {
    const weekday = day.getDay() as 0|1|2|3|4|5|6
    const dayCfg = constraints.workWeek.find(w => w.weekday === weekday)
    if (!dayCfg || dayCfg.windows.length === 0) {
      day.setDate(day.getDate()+1)
      continue
    }

    for (const win of dayCfg.windows) {
      let cursor = toMinutes(win.start)
      const end = toMinutes(win.end)
      let sinceBreak = 0

      // fill window greedily
      for (let i=0; i<sorted.length && cursor < end; i++) {
        const task = sorted[i]
        if (!task) break

        // skip already scheduled (marked by duration -1)
        if ((task as any)._scheduled) continue

        // honor fixed windows if present
        if (task.fixedWindow) {
          // only place if inside today window
          const fwStart = toMinutes(task.fixedWindow.start)
          const fwEnd = toMinutes(task.fixedWindow.end)
          const slotStart = Math.max(fwStart, cursor)
          const slotEnd = Math.min(fwEnd, end)
          if (slotEnd - slotStart < task.durationMinutes) continue
          const startMin = slotStart
          const endMin = startMin + task.durationMinutes
          const dayKey = sameDayKey(day)
          const startISO = new Date(`${dayKey}T${fromMinutes(startMin)}:00.000Z`).toISOString()
          const endISO = new Date(`${dayKey}T${fromMinutes(endMin)}:00.000Z`).toISOString()
          events.push({ id: uuid(), taskId: task.id, title: task.title, start: startISO, end: endISO, kind: 'task', dayKey })
          ;(task as any)._scheduled = true
          cursor = endMin + buffer
          sinceBreak += task.durationMinutes
          if (sinceBreak >= breakEvery && cursor + breakDur <= end) {
            const bStartISO = new Date(`${dayKey}T${fromMinutes(cursor)}:00.000Z`).toISOString()
            const bEndISO = new Date(`${dayKey}T${fromMinutes(cursor+breakDur)}:00.000Z`).toISOString()
            events.push({ id: uuid(), title: 'Break', start: bStartISO, end: bEndISO, kind: 'break', dayKey })
            cursor += breakDur + buffer
            sinceBreak = 0
          }
          continue
        }

        // normal task
        if (cursor + task.durationMinutes > end) continue
        const dayKey = sameDayKey(day)
        const startISO = new Date(`${dayKey}T${fromMinutes(cursor)}:00.000Z`).toISOString()
        const endISO = new Date(`${dayKey}T${fromMinutes(cursor + task.durationMinutes)}:00.000Z`).toISOString()
        events.push({ id: uuid(), taskId: task.id, title: task.title, start: startISO, end: endISO, kind: 'task', dayKey })
        ;(task as any)._scheduled = true
        cursor += task.durationMinutes + buffer
        sinceBreak += task.durationMinutes
        if (sinceBreak >= breakEvery && cursor + breakDur <= end) {
          const bStartISO = new Date(`${dayKey}T${fromMinutes(cursor)}:00.000Z`).toISOString()
          const bEndISO = new Date(`${dayKey}T${fromMinutes(cursor+breakDur)}:00.000Z`).toISOString()
          events.push({ id: uuid(), title: 'Break', start: bStartISO, end: bEndISO, kind: 'break', dayKey })
          cursor += breakDur + buffer
          sinceBreak = 0
        }
      }
    }

    day.setDate(day.getDate()+1)
  }

  for (const t of sorted) {
    if (!(t as any)._scheduled) unscheduled.push(t)
  }

  return { events, unscheduled }
}
