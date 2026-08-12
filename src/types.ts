export type Language = 'ar' | 'en'
export type TrackId = 'python' | 'web' | 'javascript' | 'git' | 'sql'
export type StageId = 'foundation' | 'core' | 'applied' | 'professional'

export type Bilingual = Record<Language, string>

export interface Lesson {
  id: string
  stage: StageId
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

export interface CurriculumStage {
  id: StageId
  title: Bilingual
  summary: Bilingual
  outcome: Bilingual
}

export interface Track {
  id: TrackId
  title: Bilingual
  summary: Bilingual
  color: string
  level: Bilingual
  stages: CurriculumStage[]
  lessons: Lesson[]
}

export interface ProgressState {
  completedLessonIds: string[]
  completedMissionIds: string[]
  lastActivityDate?: string
  streak: number
}
