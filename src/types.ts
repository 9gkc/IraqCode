export type Language = 'ar' | 'en'
export type TrackId = 'python' | 'web' | 'javascript' | 'git' | 'sql'

export type Bilingual = Record<Language, string>

export interface Lesson {
  id: string
  title: Bilingual
  duration: number
  concept: Bilingual
  objective: Bilingual
  code: string
  challenge: {
    question: Bilingual
    choices: Bilingual[]
    answer: number
    explanation: Bilingual
  }
}

export interface Track {
  id: TrackId
  title: Bilingual
  summary: Bilingual
  color: string
  level: Bilingual
  lessons: Lesson[]
}

export interface ProgressState {
  completedLessonIds: string[]
  completedMissionIds: string[]
  lastActivityDate?: string
  streak: number
}
