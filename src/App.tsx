import { useEffect, useMemo, useState } from 'react'
import { Award, BookOpen, Braces, CheckCircle2, ChevronLeft, Code2, Flame, GitBranch, LayoutDashboard, Menu, Rocket, ShieldCheck, Sparkles, Target, Trophy, X } from 'lucide-react'
import { missions, tracks } from './data'
import { getCompletedCount, getNextStreak, getTotalLessons, getTrackProgress, getXp } from './lib/domain'
import type { Language, ProgressState, TrackId } from './types'

type View = 'dashboard' | 'paths' | 'studio' | 'passport'

const copy = {
  ar: {
    nav: { dashboard: 'لوحة التعلم', paths: 'المسارات', studio: 'استوديو المشاريع', passport: 'جواز المهارات' },
    heroLabel: 'منصة عراقية • موجهة للمشاريع',
    heroTitle: 'تعلم البرمجة. ابنِ مشروعك. أثبت مهارتك.',
    heroText: 'IraqCode يربط الدرس القصير بتطبيق عملي، ومهام هندسية، وملف إنجاز حقيقي تستطيع تطويره على GitHub.',
    start: 'ابدأ أول درس', explore: 'استكشف المسارات', progress: 'تقدمك', activePath: 'المسار النشط', continue: 'تابع التعلم', minutes: 'دقيقة', lessons: 'دروس', xp: 'XP', streak: 'سلسلة يومية',
    pathsTitle: 'مسارات منظمة، لا قوائم عشوائية', pathsText: 'اختر مسارك، وأكمل الدروس المتتابعة، ثم حوّل المعرفة إلى مشروع يمكن عرضه.', openPath: 'فتح المسار', lesson: 'الدرس', objective: 'الهدف', concept: 'الفكرة الأساسية', practice: 'تحقق من الفهم', selectAnswer: 'اختر إجابة لمعرفة السبب', correct: 'إجابة صحيحة. ممتاز.', incorrect: 'ليست الإجابة الصحيحة بعد.', complete: 'إكمال الدرس', done: 'مكتمل', codeWalkthrough: 'ورشة الكود',
    studioTitle: 'استوديو المشاريع', studioText: 'نفّذ مهام صغيرة تحاكي طريقة عمل المطورين: خطط، ابنِ، اختبر، وانشر دليلاً على عملك.', mission: 'مهمة هندسية', startMission: 'تسجيل المهمة كمكتملة', completed: 'مكتملة', skillsTitle: 'جواز المهارات', skillsText: 'هذا السجل يعرض فقط ما أكملته داخل IraqCode. إنه سجل تعلم، وليس شهادة أو ادعاءً غير موثّق.', proofTitle: 'سجل الإثبات', proofText: 'أكمل الدروس والمشاريع لتظهر مهاراتك المثبتة هنا.', verified: 'مهارة مكتسبة من نشاط مكتمل', learningMap: 'خريطة التعلم', total: 'الإجمالي', language: 'English', menu: 'القائمة', close: 'إغلاق', footer: 'ابنِ مساراً مهنياً خطوة بخطوة.', launch: 'مشروع جاهز للنشر', local: 'بياناتك تحفظ محلياً في هذا المتصفح.',
  },
  en: {
    nav: { dashboard: 'Learning dashboard', paths: 'Learning paths', studio: 'Project studio', passport: 'Skill passport' },
    heroLabel: 'Iraqi platform • Project-first',
    heroTitle: 'Learn code. Build projects. Prove your skill.',
    heroText: 'IraqCode connects focused lessons to practical work, engineering missions, and a learning record you can develop on GitHub.',
    start: 'Start first lesson', explore: 'Explore paths', progress: 'Your progress', activePath: 'Active path', continue: 'Continue learning', minutes: 'min', lessons: 'lessons', xp: 'XP', streak: 'day streak',
    pathsTitle: 'Structured paths, not random playlists', pathsText: 'Choose a path, complete its sequence, then turn knowledge into a project you can show.', openPath: 'Open path', lesson: 'Lesson', objective: 'Objective', concept: 'Core idea', practice: 'Check your understanding', selectAnswer: 'Choose an answer to see why', correct: 'Correct answer. Great work.', incorrect: 'Not the correct answer yet.', complete: 'Complete lesson', done: 'Completed', codeWalkthrough: 'Code walkthrough',
    studioTitle: 'Project studio', studioText: 'Complete focused missions that mirror engineering practice: plan, build, test, and publish evidence of your work.', mission: 'Engineering mission', startMission: 'Mark mission complete', completed: 'Completed', skillsTitle: 'Skill passport', skillsText: 'This record shows only activity you complete in IraqCode. It is a learning record, not a certificate or unsupported claim.', proofTitle: 'Evidence record', proofText: 'Complete lessons and projects to reveal your demonstrated learning here.', verified: 'Skill derived from completed activity', learningMap: 'Learning map', total: 'Total', language: 'العربية', menu: 'Menu', close: 'Close', footer: 'Build a professional path, one step at a time.', launch: 'Publish-ready project', local: 'Your data is stored locally in this browser.',
  },
} as const

const emptyProgress: ProgressState = { completedLessonIds: [], completedMissionIds: [], streak: 0 }
const storageKey = 'iraqcode-progress-v1'

export default function App() {
  const [language, setLanguage] = useState<Language>('ar')
  const [view, setView] = useState<View>('dashboard')
  const [selectedTrackId, setSelectedTrackId] = useState<TrackId>('python')
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0)
  const [progress, setProgress] = useState<ProgressState>(() => {
    try { return { ...emptyProgress, ...JSON.parse(localStorage.getItem(storageKey) ?? '{}') } } catch { return emptyProgress }
  })
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [mobileOpen, setMobileOpen] = useState(false)
  const c = copy[language]
  const isAr = language === 'ar'
  const selectedTrack = tracks.find((track) => track.id === selectedTrackId) ?? tracks[0]
  const selectedLesson = selectedTrack.lessons[selectedLessonIndex] ?? selectedTrack.lessons[0]
  const completed = getCompletedCount(tracks, progress)
  const totalLessons = getTotalLessons(tracks)
  const xp = getXp(progress)
  const overall = Math.round((completed / totalLessons) * 100)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = isAr ? 'rtl' : 'ltr'
    document.title = isAr ? 'IraqCode | ابنِ. انشر. أثبت.' : 'IraqCode | Build. Ship. Prove.'
  }, [language, isAr])

  useEffect(() => localStorage.setItem(storageKey, JSON.stringify(progress)), [progress])

  const activeSkills = useMemo(() => {
    const lessonSkills = tracks.filter((track) => getTrackProgress(track, progress) > 0).flatMap((track) => [track.title.en])
    const missionSkills = missions.filter((mission) => progress.completedMissionIds.includes(mission.id)).flatMap((mission) => mission.skills)
    return [...new Set([...lessonSkills, ...missionSkills])]
  }, [progress])

  const selectPath = (id: TrackId) => {
    setSelectedTrackId(id)
    setSelectedLessonIndex(0)
    setView('paths')
    setMobileOpen(false)
  }

  const completeLesson = () => {
    const today = new Date().toISOString().slice(0, 10)
    setProgress((current) => {
      if (current.completedLessonIds.includes(selectedLesson.id)) return current
      const nextStreak = current.lastActivityDate === today ? current.streak : getNextStreak(current.lastActivityDate, today)
      return { ...current, completedLessonIds: [...current.completedLessonIds, selectedLesson.id], lastActivityDate: today, streak: nextStreak }
    })
  }

  const completeMission = (id: string) => setProgress((current) => current.completedMissionIds.includes(id) ? current : { ...current, completedMissionIds: [...current.completedMissionIds, id] })

  const Nav = () => <nav className={mobileOpen ? 'nav mobile-open' : 'nav'} aria-label={c.nav.dashboard}>
    {(['dashboard', 'paths', 'studio', 'passport'] as View[]).map((item) => {
      const Icon = item === 'dashboard' ? LayoutDashboard : item === 'paths' ? BookOpen : item === 'studio' ? Rocket : Award
      return <button key={item} className={view === item ? 'nav-item active' : 'nav-item'} onClick={() => { setView(item); setMobileOpen(false) }}><Icon size={18} />{c.nav[item]}</button>
    })}
  </nav>

  return <div className="app-shell">
    <aside className="sidebar">
      <button className="brand" onClick={() => setView('dashboard')} aria-label="IraqCode home"><span className="brand-mark"><Code2 size={20} /></span><span>Iraq<span>Code</span></span></button>
      <Nav />
      <div className="sidebar-foot"><div className="mini-status"><Sparkles size={15} /><span>{xp} XP</span></div><p>{c.local}</p><button className="language-switch desktop-language" onClick={() => setLanguage((current) => current === 'ar' ? 'en' : 'ar')}>{c.language}</button></div>
    </aside>
    <header className="topbar">
      <button className="menu-button" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? c.close : c.menu}>{mobileOpen ? <X /> : <Menu />}</button>
      <button className="brand mobile-brand" onClick={() => setView('dashboard')}><span className="brand-mark"><Code2 size={18} /></span><span>Iraq<span>Code</span></span></button>
      <button className="language-switch" onClick={() => setLanguage((current) => current === 'ar' ? 'en' : 'ar')}>{c.language}</button>
    </header>
    <main className="main">
      {view === 'dashboard' && <Dashboard c={c} progress={progress} xp={xp} overall={overall} completed={completed} selectedTrack={selectedTrack} language={language} onStart={() => selectPath('python')} onExplore={() => setView('paths')} onSelectPath={selectPath} />}
      {view === 'paths' && <Paths c={c} language={language} progress={progress} selectedTrack={selectedTrack} selectedLesson={selectedLesson} selectedLessonIndex={selectedLessonIndex} answers={answers} onSelectTrack={selectPath} onSelectLesson={setSelectedLessonIndex} onAnswer={(index) => setAnswers((current) => ({ ...current, [selectedLesson.id]: index }))} onComplete={completeLesson} />}
      {view === 'studio' && <Studio c={c} language={language} progress={progress} onComplete={completeMission} />}
      {view === 'passport' && <Passport c={c} language={language} progress={progress} skills={activeSkills} completed={completed} />}
    </main>
  </div>
}

function Dashboard({ c, progress, xp, overall, completed, selectedTrack, language, onStart, onExplore, onSelectPath }: { c: typeof copy.ar | typeof copy.en; progress: ProgressState; xp: number; overall: number; completed: number; selectedTrack: typeof tracks[number]; language: Language; onStart: () => void; onExplore: () => void; onSelectPath: (id: TrackId) => void }) {
  const isAr = language === 'ar'
  return <>
    <section className="hero panel-grid"><div className="eyebrow"><Sparkles size={15} />{c.heroLabel}</div><h1>{c.heroTitle}</h1><p>{c.heroText}</p><div className="hero-actions"><button className="primary" onClick={onStart}>{c.start}<ChevronLeft size={18} /></button><button className="secondary" onClick={onExplore}>{c.explore}</button></div><div className="hero-code" aria-hidden="true"><span>01</span><code>const path = "{selectedTrack.title.en}";</code><span>02</span><code>build(skill) → proof</code><span>03</span><code>ship(project)</code></div></section>
    <section className="stats-grid" aria-label={c.progress}>
      <Stat icon={<Target />} value={`${overall}%`} label={c.progress} accent="violet" />
      <Stat icon={<Sparkles />} value={String(xp)} label={c.xp} accent="gold" />
      <Stat icon={<Flame />} value={String(progress.streak)} label={c.streak} accent="coral" />
      <Stat icon={<CheckCircle2 />} value={`${completed}/30`} label={c.lessons} accent="teal" />
    </section>
    <section className="section-head"><div><span className="eyebrow"><BookOpen size={15} />{c.activePath}</span><h2>{selectedTrack.title[language]}</h2></div><button className="text-button" onClick={onExplore}>{c.continue}<ChevronLeft size={16} /></button></section>
    <section className="active-card"><div className="track-swatch" style={{ background: selectedTrack.color }} /><div className="active-card-main"><span className="tag">{selectedTrack.level[language]}</span><p>{selectedTrack.summary[language]}</p><div className="progress-line"><span style={{ width: `${getTrackProgress(selectedTrack, progress)}%`, background: selectedTrack.color }} /></div><small>{getTrackProgress(selectedTrack, progress)}% · {selectedTrack.lessons.length} {c.lessons}</small></div><div className="launch-note"><Rocket size={20} /><span>{c.launch}</span></div></section>
    <section className="section-head compact"><div><span className="eyebrow"><Braces size={15} />{isAr ? 'المسارات المتاحة' : 'Available paths'}</span><h2>{isAr ? 'تعلم مهارة لها أثر' : 'Learn skills with outcomes'}</h2></div></section>
    <section className="track-grid">{tracks.map((track) => <button className="track-card" key={track.id} onClick={() => onSelectPath(track.id)}><span className="track-dot" style={{ background: track.color }} /><span className="track-card-title">{track.title[language]}</span><span className="track-card-text">{track.summary[language]}</span><span className="track-card-footer">{track.lessons.length} {c.lessons}<ChevronLeft size={16} /></span></button>)}</section>
  </>
}

function Stat({ icon, value, label, accent }: { icon: React.ReactNode; value: string; label: string; accent: string }) { return <article className={`stat ${accent}`}><span className="stat-icon">{icon}</span><strong>{value}</strong><span>{label}</span></article> }

function Paths({ c, language, progress, selectedTrack, selectedLesson, selectedLessonIndex, answers, onSelectTrack, onSelectLesson, onAnswer, onComplete }: { c: typeof copy.ar | typeof copy.en; language: Language; progress: ProgressState; selectedTrack: typeof tracks[number]; selectedLesson: typeof tracks[number]['lessons'][number]; selectedLessonIndex: number; answers: Record<string, number>; onSelectTrack: (id: TrackId) => void; onSelectLesson: (index: number) => void; onAnswer: (index: number) => void; onComplete: () => void }) {
  const selectedAnswer = answers[selectedLesson.id]
  const hasAnswer = selectedAnswer !== undefined
  const completed = progress.completedLessonIds.includes(selectedLesson.id)
  return <>
    <section className="section-head paths-head"><div><span className="eyebrow"><BookOpen size={15} />{c.pathsTitle}</span><h1>{selectedTrack.title[language]}</h1><p>{c.pathsText}</p></div></section>
    <div className="path-tabs">{tracks.map((track) => <button key={track.id} className={selectedTrack.id === track.id ? 'path-tab active' : 'path-tab'} onClick={() => onSelectTrack(track.id)}><span style={{ background: track.color }} />{track.title[language]}</button>)}</div>
    <div className="learning-layout">
      <aside className="lesson-list">{selectedTrack.lessons.map((lesson, index) => { const done = progress.completedLessonIds.includes(lesson.id); return <button key={lesson.id} className={selectedLesson.id === lesson.id ? 'lesson-item active' : 'lesson-item'} onClick={() => onSelectLesson(index)}><span className={done ? 'lesson-number done' : 'lesson-number'}>{done ? <CheckCircle2 size={15} /> : String(index + 1).padStart(2, '0')}</span><span><b>{lesson.title[language]}</b><small>{lesson.duration} {c.minutes}</small></span></button> })}</aside>
      <article className="lesson-workspace"><div className="lesson-meta"><span className="tag" style={{ borderColor: selectedTrack.color }}>{c.lesson} {selectedLessonIndex + 1}</span><span>{selectedLesson.duration} {c.minutes}</span></div><h2>{selectedLesson.title[language]}</h2><div className="info-grid"><div><span>{c.objective}</span><p>{selectedLesson.objective[language]}</p></div><div><span>{c.concept}</span><p>{selectedLesson.concept[language]}</p></div></div><section className="code-card"><header><span><Braces size={16} />{c.codeWalkthrough}</span><span className="language-dot">●</span></header><pre><code>{selectedLesson.code}</code></pre></section><section className="challenge-card"><span className="eyebrow"><Target size={15} />{c.practice}</span><h3>{selectedLesson.challenge.question[language]}</h3><div className="choice-list">{selectedLesson.challenge.choices.map((choice, index) => <button key={choice.en} disabled={hasAnswer} className={hasAnswer ? (index === selectedLesson.challenge.answer ? 'choice correct' : index === selectedAnswer ? 'choice incorrect' : 'choice') : 'choice'} onClick={() => onAnswer(index)}><span>{String.fromCharCode(65 + index)}</span>{choice[language]}</button>)}</div>{hasAnswer && <p className={selectedAnswer === selectedLesson.challenge.answer ? 'answer-feedback success' : 'answer-feedback'}>{selectedAnswer === selectedLesson.challenge.answer ? c.correct : c.incorrect} {selectedLesson.challenge.explanation[language]}</p>}</section><button className={completed ? 'complete-button is-done' : 'complete-button'} onClick={onComplete} disabled={completed}>{completed ? <><CheckCircle2 />{c.done}</> : <><Trophy />{c.complete}</>}</button></article>
    </div>
  </>
}

function Studio({ c, language, progress, onComplete }: { c: typeof copy.ar | typeof copy.en; language: Language; progress: ProgressState; onComplete: (id: string) => void }) { return <><section className="section-head paths-head"><div><span className="eyebrow"><Rocket size={15} />{c.mission}</span><h1>{c.studioTitle}</h1><p>{c.studioText}</p></div></section><div className="mission-grid">{missions.map((mission, index) => { const done = progress.completedMissionIds.includes(mission.id); return <article className="mission-card" key={mission.id}><div className="mission-top"><span>0{index + 1}</span>{done && <CheckCircle2 size={20} />}</div><span className="tag">{mission.track[language]}</span><h2>{mission.title[language]}</h2><p>{mission.summary[language]}</p><div className="skill-chips">{mission.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><button className={done ? 'secondary is-done' : 'primary'} onClick={() => onComplete(mission.id)} disabled={done}>{done ? c.completed : c.startMission}</button></article> })}</div><section className="studio-principles"><ShieldCheck size={26} /><div><h3>{language === 'ar' ? 'مبدأ IraqCode: دليل لا ادعاء' : 'The IraqCode principle: evidence, not claims'}</h3><p>{language === 'ar' ? 'أكمل المهمة، احتفظ برابط المشروع أو المستودع، ثم صف ما تعلمته بدقة في ملفك الشخصي.' : 'Complete the mission, keep the project or repository link, and describe what you learned accurately in your profile.'}</p></div></section></> }

function Passport({ c, language, progress, skills, completed }: { c: typeof copy.ar | typeof copy.en; language: Language; progress: ProgressState; skills: string[]; completed: number }) { return <><section className="section-head paths-head"><div><span className="eyebrow"><Award size={15} />IraqCode</span><h1>{c.skillsTitle}</h1><p>{c.skillsText}</p></div></section><section className="passport-card"><div className="passport-header"><div className="passport-mark"><Award size={36} /></div><div><span>{c.proofTitle}</span><h2>IraqCode learner record</h2><p>{completed} {c.lessons} · {progress.completedMissionIds.length} {c.mission}</p></div></div><div className="passport-skills">{skills.length ? skills.map((skill) => <div key={skill}><CheckCircle2 size={16} /><span>{skill}</span><small>{c.verified}</small></div>) : <p className="empty-proof">{c.proofText}</p>}</div></section><section className="section-head compact"><div><span className="eyebrow"><Target size={15} />{c.learningMap}</span><h2>{c.total}: {Math.round((completed / 30) * 100)}%</h2></div></section><div className="map-grid">{tracks.map((track) => <article key={track.id} className="map-card"><div><span className="track-dot" style={{ background: track.color }} />{track.title[language]}</div><strong>{getTrackProgress(track, progress)}%</strong><div className="progress-line"><span style={{ width: `${getTrackProgress(track, progress)}%`, background: track.color }} /></div></article>)}</div><p className="passport-note"><GitBranch size={16} />{language === 'ar' ? 'أفضل إثبات للمهارة هو مشروع قابل للمراجعة مع README واضح واختبارات ورابط نشر.' : 'The strongest proof of skill is a reviewable project with a clear README, tests, and a live link.'}</p></> }
