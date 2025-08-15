export type Priority = 1 | 2 | 3 | 4 | 5;

export type EnergyLevel = 'low' | 'medium' | 'high';

export interface TaskItem {
  id: string;
  title: string;
  durationMinutes: number; // estimate
  priority: Priority;
  dueDate?: string; // ISO
  energy?: EnergyLevel;
  tags?: string[];
  dependsOn?: string[];
  fixedWindow?: { start: string; end: string }; // ISO times if fixed
  context?: 'work' | 'personal' | 'deep';
  notes?: string;
}

export interface TimeWindow {
  // ISO times without date, e.g., '09:00', '17:30'
  start: string;
  end: string;
}

export interface DayConfig {
  weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0=Sun
  windows: TimeWindow[];
}

export interface EnergyPeak {
  weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  windows: TimeWindow[];
}

export interface Constraints {
  timezone: string; // e.g., 'America/New_York'
  planningHorizonDays: number; // e.g., 7
  defaultDayStart: string; // '08:00'
  defaultDayEnd: string; // '20:00'
  workWeek: DayConfig[]; // available windows
  energyPeaks?: EnergyPeak[];
  breakEveryMinutes?: number; // e.g., 90
  breakDurationMinutes?: number; // e.g., 15
  bufferMinutes?: number; // e.g., 5 between tasks
}

export interface ScheduleEvent {
  id: string;
  taskId?: string;
  title: string;
  start: string; // ISO datetime
  end: string;   // ISO datetime
  kind: 'task' | 'break' | 'buffer';
  dayKey: string; // YYYY-MM-DD for grouping
}

export interface ScheduleResult {
  events: ScheduleEvent[];
  unscheduled: TaskItem[];
}
