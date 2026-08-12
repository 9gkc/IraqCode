import { describe, expect, it } from 'vitest'
import { getCompletedCount, getNextStreak, getTotalLessons, getTrackProgress, getXp } from './domain'
import { tracks } from '../data'

const progress = { completedLessonIds: ['py-1', 'web-1'], completedMissionIds: ['mission-portfolio'], streak: 2 }

describe('learning progress', () => {
  it('counts lessons and XP from verified completion records', () => {
    expect(getCompletedCount(tracks, progress)).toBe(2)
    expect(getTotalLessons(tracks)).toBe(30)
    expect(getXp(progress)).toBe(120)
  })

  it('calculates a track percentage from completed lesson IDs', () => {
    expect(getTrackProgress(tracks[0], progress)).toBe(17)
  })

  it('maintains a daily streak only across consecutive UTC dates', () => {
    expect(getNextStreak(undefined, '2026-08-12')).toBe(1)
    expect(getNextStreak('2026-08-11', '2026-08-12')).toBe(2)
    expect(getNextStreak('2026-08-09', '2026-08-12')).toBe(1)
  })
})

describe('curriculum integrity', () => {
  it('keeps each lesson uniquely identifiable and bilingual', () => {
    const lessons = tracks.flatMap((track) => track.lessons)
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(lessons.length)
    expect(lessons.every((lesson) => lesson.title.ar.trim() && lesson.title.en.trim() && lesson.objective.ar.trim() && lesson.objective.en.trim() && lesson.code.trim())).toBe(true)
  })

  it('keeps every checkpoint answerable with a valid answer index', () => {
    for (const lesson of tracks.flatMap((track) => track.lessons)) {
      expect(lesson.challenge.choices).toHaveLength(4)
      expect(lesson.challenge.answer).toBeGreaterThanOrEqual(0)
      expect(lesson.challenge.answer).toBeLessThan(lesson.challenge.choices.length)
      expect(lesson.challenge.question.ar.trim()).not.toBe('')
      expect(lesson.challenge.question.en.trim()).not.toBe('')
    }
  })
})
