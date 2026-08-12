import type { ProgressState, Track } from '../types'

export const getCompletedCount = (tracks: Track[], progress: ProgressState) =>
  tracks.flatMap((track) => track.lessons).filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length

export const getTotalLessons = (tracks: Track[]) => tracks.reduce((sum, track) => sum + track.lessons.length, 0)

export const getXp = (progress: ProgressState) => progress.completedLessonIds.length * 20 + progress.completedMissionIds.length * 80

export const getTrackProgress = (track: Track, progress: ProgressState) =>
  Math.round((track.lessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length / track.lessons.length) * 100)

export const getNextStreak = (lastActivityDate: string | undefined, today: string) => {
  if (!lastActivityDate) return 1
  if (lastActivityDate === today) return 1
  const day = 24 * 60 * 60 * 1000
  const difference = Math.round((new Date(`${today}T00:00:00Z`).getTime() - new Date(`${lastActivityDate}T00:00:00Z`).getTime()) / day)
  return difference === 1 ? 2 : 1
}
