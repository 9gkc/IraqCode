import type { Bilingual, CurriculumStage, Lesson, StageId, Track, TrackId } from './types'

const bi = (ar: string, en: string): Bilingual => ({ ar, en })

const stages: CurriculumStage[] = [
  { id: 'foundation', title: bi('المستوى 1: الأساسيات', 'Level 1: Foundations'), summary: bi('ابدأ بالمفاهيم والبيئة والمفردات الأساسية دون افتراض خبرة سابقة.', 'Start with the core concepts, environment, and vocabulary with no prior experience assumed.'), outcome: bi('تقرأ أمثلة بسيطة وتكتبها وتفهم ناتجها.', 'Read, write, and explain simple examples.') },
  { id: 'core', title: bi('المستوى 2: المهارات الجوهرية', 'Level 2: Core skills'), summary: bi('ابنِ المنطق القابل لإعادة الاستخدام ونماذج البيانات المنظمة.', 'Build reusable logic and organized data models.'), outcome: bi('تحل مسائل متوسطة وتفككها إلى خطوات قابلة للاختبار.', 'Solve intermediate problems by breaking them into testable steps.') },
  { id: 'applied', title: bi('المستوى 3: التطبيق العملي', 'Level 3: Applied practice'), summary: bi('اربط المفاهيم بواجهة أو بيانات أو تدفق عمل حقيقي.', 'Connect concepts to a real interface, data set, or workflow.'), outcome: bi('تبني ميزة عملية صغيرة وتتحقق من سلوكها.', 'Build a small practical feature and validate its behavior.') },
  { id: 'professional', title: bi('المستوى 4: الاحتراف والمشروع', 'Level 4: Professional practice'), summary: bi('ركز على الجودة والاختبارات والتوثيق والتسليم القابل للمراجعة.', 'Focus on quality, tests, documentation, and reviewable delivery.'), outcome: bi('تسلّم مشروعاً منظمًا قابلاً للعرض والتحسين.', 'Deliver a structured project that can be presented and improved.') },
]

type Topic = { ar: string; en: string }
type TrackBlueprint = {
  id: TrackId; ar: string; en: string; summaryAr: string; summaryEn: string; color: string
  samples: Record<StageId, string>
  topics: Record<StageId, Topic[]>
}

const stageObjective = (stage: CurriculumStage, topic: Topic) => bi(
  `تعلّم ${topic.ar} ضمن ${stage.title.ar}، ثم طبّق الفكرة في مثال قصير قابل للتحقق.`,
  `Learn ${topic.en} in ${stage.title.en}, then apply the idea in a short verifiable example.`,
)

const stageConcept = (stage: CurriculumStage, topic: Topic) => bi(
  `${topic.ar} ليست معلومة للحفظ؛ هي خطوة عملية تساعدك على ${stage.outcome.ar}`,
  `${topic.en} is not a fact to memorize; it is a practical step that helps you ${stage.outcome.en.toLowerCase()}`,
)

const makeLessons = (blueprint: TrackBlueprint): Lesson[] => stages.flatMap((stage) => blueprint.topics[stage.id].map((topic, index) => ({
  id: `${blueprint.id}-${stage.id}-${index + 1}`,
  stage: stage.id,
  title: bi(topic.ar, topic.en),
  duration: 16 + index * 3,
  objective: stageObjective(stage, topic),
  concept: stageConcept(stage, topic),
  code: blueprint.samples[stage.id],
  challenge: {
    question: bi(`ما المخرج المتوقع من درس «${topic.ar}»؟`, `What outcome should you expect from “${topic.en}”?`),
    choices: [
      bi(stage.outcome.ar, stage.outcome.en),
      bi('تجاوز التطبيق العملي والانتقال إلى الموضوع التالي.', 'Skip practice and move straight to the next topic.'),
      bi('نسخ الكود دون فهم أو تحقق من النتيجة.', 'Copy code without understanding or checking the result.'),
      bi('تعديل ملفات المشروع عشوائياً دون هدف.', 'Change project files randomly without a goal.'),
    ],
    answer: 0,
    explanation: bi(`الإجابة الصحيحة ترتبط بهدف ${stage.title.ar}: ${stage.outcome.ar}`, `The correct answer matches the ${stage.title.en} outcome: ${stage.outcome.en}`),
  },
})))

const blueprints: TrackBlueprint[] = [
  {
    id: 'python', ar: 'Python: من الصفر إلى المشاريع', en: 'Python: zero to projects', color: '#7c5cff',
    summaryAr: 'منطق برمجي، أدوات عملية، اختبارات، ومشروع Python منظم.', summaryEn: 'Programming logic, practical tools, tests, and a structured Python project.',
    samples: {
      foundation: 'name = "Zahraa"\nminutes = 45\nprint(f"{name}: {minutes} min")',
      core: 'def average(values):\n    return sum(values) / len(values)\n\nprint(average([80, 90, 100]))',
      applied: 'from pathlib import Path\n\nnotes = Path("notes.txt")\nnotes.write_text("Build, test, improve\\n")',
      professional: 'def test_average():\n    assert average([2, 4]) == 3\n\nif __name__ == "__main__":\n    test_average()',
    },
    topics: {
      foundation: [
        { ar: 'بيئة Python وprint', en: 'Python environment and print' }, { ar: 'المتغيرات والأنواع', en: 'Variables and types' }, { ar: 'النصوص والأرقام والتحويل', en: 'Strings, numbers, and conversion' }, { ar: 'المقارنات والشروط', en: 'Comparisons and conditions' }, { ar: 'الحلقات والقوائم', en: 'Loops and lists' },
      ],
      core: [
        { ar: 'الدوال والمدخلات وreturn', en: 'Functions, parameters, and return' }, { ar: 'القواميس والمجموعات', en: 'Dictionaries and sets' }, { ar: 'الفهارس والتقطيع', en: 'Indexing and slicing' }, { ar: 'الاستثناءات ومعالجة الأخطاء', en: 'Exceptions and error handling' }, { ar: 'الملفات وPathlib', en: 'Files and Pathlib' },
      ],
      applied: [
        { ar: 'الوحدات وبيئات المشروع', en: 'Modules and project environments' }, { ar: 'البرمجة الكائنية الأساسية', en: 'Object-oriented fundamentals' }, { ar: 'التراكيب الاستيعابية والمولدات', en: 'Comprehensions and generators' }, { ar: 'قراءة JSON وCSV', en: 'Reading JSON and CSV' }, { ar: 'بناء أداة سطر أوامر صغيرة', en: 'Building a small command-line tool' },
      ],
      professional: [
        { ar: 'التفكير الاختباري وpytest', en: 'Testing mindset and pytest' }, { ar: 'type hints والتوثيق', en: 'Type hints and documentation' }, { ar: 'تنظيم الحزم وإدارة الاعتماديات', en: 'Package structure and dependencies' }, { ar: 'التسجيل Logging وتهيئة التطبيق', en: 'Logging and application configuration' }, { ar: 'مشروع احترافي: متعقب دراسة قابل للاختبار', en: 'Professional project: tested study tracker' },
      ],
    },
  },
  {
    id: 'web', ar: 'HTML وCSS: واجهات احترافية', en: 'HTML & CSS: professional interfaces', color: '#00b8a9',
    summaryAr: 'بنية دلالية، تصميم متجاوب، إتاحة وصول، وموقع Portfolio قابل للنشر.', summaryEn: 'Semantic structure, responsive design, accessibility, and a publishable portfolio.',
    samples: {
      foundation: '<main>\n  <h1>My learning plan</h1>\n  <p>One focused lesson today.</p>\n</main>',
      core: '.card {\n  display: grid;\n  gap: 1rem;\n  padding: 1.25rem;\n  border-radius: 1rem;\n}',
      applied: '.projects {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: 1rem;\n}',
      professional: '@media (prefers-reduced-motion: reduce) {\n  * {\n    animation-duration: 0.01ms;\n    transition-duration: 0.01ms;\n  }\n}',
    },
    topics: {
      foundation: [
        { ar: 'هيكل الوثيقة وعناصر HTML', en: 'Document structure and HTML elements' }, { ar: 'العناوين والنصوص والقوائم', en: 'Headings, text, and lists' }, { ar: 'الروابط والصور والمسارات', en: 'Links, images, and paths' }, { ar: 'النماذج والحقول والتسميات', en: 'Forms, fields, and labels' }, { ar: 'CSS selectors والأولوية', en: 'CSS selectors and cascade' },
      ],
      core: [
        { ar: 'نموذج الصندوق والمسافات', en: 'Box model and spacing' }, { ar: 'الألوان والطباعة وCSS variables', en: 'Color, type, and CSS variables' }, { ar: 'Flexbox للتخطيط', en: 'Layout with Flexbox' }, { ar: 'CSS Grid للواجهات', en: 'CSS Grid for interfaces' }, { ar: 'الدلالة وإتاحة الوصول', en: 'Semantics and accessibility' },
      ],
      applied: [
        { ar: 'التصميم المتجاوب Mobile-first', en: 'Mobile-first responsive design' }, { ar: 'مكونات واجهة قابلة لإعادة الاستخدام', en: 'Reusable interface components' }, { ar: 'الحالات hover وfocus وactive', en: 'Hover, focus, and active states' }, { ar: 'تصميم النماذج ورسائل الخطأ', en: 'Form design and error messages' }, { ar: 'أنماط صفحة Portfolio', en: 'Portfolio page patterns' },
      ],
      professional: [
        { ar: 'إتاحة الوصول عبر لوحة المفاتيح', en: 'Keyboard accessibility' }, { ar: 'اختبار التصميم على الأجهزة', en: 'Testing layouts across devices' }, { ar: 'تحسين الصور وأداء CSS', en: 'Image and CSS performance' }, { ar: 'تنظيم CSS وقابلية الصيانة', en: 'CSS organization and maintainability' }, { ar: 'مشروع احترافي: Portfolio متجاوب ومنشور', en: 'Professional project: responsive published portfolio' },
      ],
    },
  },
  {
    id: 'javascript', ar: 'JavaScript: منطق الويب', en: 'JavaScript: web logic', color: '#f7b801',
    summaryAr: 'منطق وتفاعل وبيانات غير متزامنة واختبارات ومشروع واجهة.', summaryEn: 'Logic, interaction, asynchronous data, tests, and an interface project.',
    samples: {
      foundation: 'const course = "JavaScript"\nlet completed = 0\ncompleted += 1\nconsole.log({ course, completed })',
      core: 'const learners = [{ name: "Noor", xp: 120 }]\nconst names = learners.map((learner) => learner.name)\nconsole.log(names)',
      applied: 'async function loadProfile() {\n  const response = await fetch("/profile.json")\n  if (!response.ok) throw new Error("Request failed")\n  return response.json()\n}',
      professional: 'export function calculateXp(lessons) {\n  return lessons * 20\n}\n\nconsole.assert(calculateXp(3) === 60)',
    },
    topics: {
      foundation: [
        { ar: 'القيم والمتغيرات وconst/let', en: 'Values, variables, const, and let' }, { ar: 'العمليات والمقارنات', en: 'Operators and comparisons' }, { ar: 'الشروط والمنطق', en: 'Conditions and boolean logic' }, { ar: 'الدوال والنطاق Scope', en: 'Functions and scope' }, { ar: 'المصفوفات والحلقات', en: 'Arrays and loops' },
      ],
      core: [
        { ar: 'الكائنات وdestructuring', en: 'Objects and destructuring' }, { ar: 'map وfilter وreduce', en: 'map, filter, and reduce' }, { ar: 'DOM واختيار العناصر', en: 'DOM and element selection' }, { ar: 'الأحداث وإدارة الحالة', en: 'Events and state management' }, { ar: 'JSON وlocalStorage', en: 'JSON and localStorage' },
      ],
      applied: [
        { ar: 'Promises وasync/await', en: 'Promises and async/await' }, { ar: 'fetch وحالات التحميل والخطأ', en: 'fetch, loading, and error states' }, { ar: 'الوحدات ES modules', en: 'ES modules' }, { ar: 'نماذج تفاعلية والتحقق من المدخلات', en: 'Interactive forms and input validation' }, { ar: 'بناء قائمة مهام منظمة', en: 'Building a structured task list' },
      ],
      professional: [
        { ar: 'تنقية الإدخال وDOM الآمن', en: 'Input handling and safe DOM updates' }, { ar: 'الاختبارات الوحدوية', en: 'Unit testing' }, { ar: 'التعامل مع الأخطاء والتسجيل', en: 'Error handling and logging' }, { ar: 'قياس الأداء وWeb Vitals', en: 'Performance and Web Vitals' }, { ar: 'مشروع احترافي: لوحة بيانات تعلم', en: 'Professional project: learning dashboard' },
      ],
    },
  },
  {
    id: 'git', ar: 'Git وGitHub: تسليم احترافي', en: 'Git & GitHub: professional delivery', color: '#f05033',
    summaryAr: 'تحكم بالإصدارات ومراجعة كود وتوثيق ونشر تلقائي للمشاريع.', summaryEn: 'Version control, code review, documentation, and automated project delivery.',
    samples: {
      foundation: 'git status\ngit add src/App.tsx\ngit commit -m "feat: add lesson view"',
      core: 'git switch -c feat/profile-card\n# make one focused change\ngit diff\ngit status',
      applied: 'git fetch origin\ngit rebase origin/main\n# resolve one conflict carefully\ngit push --force-with-lease',
      professional: 'pnpm test\npnpm build\n# GitHub Actions runs these checks before deployment',
    },
    topics: {
      foundation: [
        { ar: 'المستودع وGit status', en: 'Repository and git status' }, { ar: 'المرحلة staging وcommit', en: 'Staging and commits' }, { ar: 'رسائل commit الدلالية', en: 'Meaningful commit messages' }, { ar: 'remote وgit push', en: 'Remotes and git push' }, { ar: 'README وملفات المشروع الأساسية', en: 'README and essential project files' },
      ],
      core: [
        { ar: 'الفروع وخطة التغيير', en: 'Branches and change planning' }, { ar: 'الدمج Merge وrebase', en: 'Merge and rebase' }, { ar: 'حل التعارضات بأمان', en: 'Resolving conflicts safely' }, { ar: 'Pull Request جيد', en: 'A strong pull request' }, { ar: 'Issues وProject boards', en: 'Issues and project boards' },
      ],
      applied: [
        { ar: 'مراجعة الكود والتغذية الراجعة', en: 'Code review and feedback' }, { ar: 'Tags والإصدارات Releases', en: 'Tags and releases' }, { ar: 'GitHub Pages والنشر الثابت', en: 'GitHub Pages and static deployment' }, { ar: 'GitHub Actions للفحص والبناء', en: 'GitHub Actions for checks and builds' }, { ar: 'توثيق قرار هندسي قصير', en: 'Writing a concise engineering decision' },
      ],
      professional: [
        { ar: 'قوالب Issues وPull Requests', en: 'Issue and pull request templates' }, { ar: 'CODEOWNERS وسياسات المراجعة', en: 'CODEOWNERS and review policies' }, { ar: 'الأمان وإدارة الأسرار', en: 'Security and secret management' }, { ar: 'خطة إصدار واسترجاع', en: 'Release and rollback planning' }, { ar: 'مشروع احترافي: إطلاق مستودع جاهز للمراجعة', en: 'Professional project: review-ready repository launch' },
      ],
    },
  },
  {
    id: 'sql', ar: 'SQL: بيانات ومنهجية', en: 'SQL: data and design', color: '#30a4db',
    summaryAr: 'استعلامات وعلاقات وتصميم مخطط وأداء ومعاملات ومشروع بيانات.', summaryEn: 'Queries, relations, schema design, performance, transactions, and a data project.',
    samples: {
      foundation: 'CREATE TABLE learners (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  xp INTEGER DEFAULT 0\n);',
      core: 'SELECT track, COUNT(*) AS completed\nFROM lesson_progress\nWHERE completed = 1\nGROUP BY track\nORDER BY completed DESC;',
      applied: 'SELECT learners.name, projects.title\nFROM learners\nJOIN projects ON projects.learner_id = learners.id\nWHERE projects.published = 1;',
      professional: 'BEGIN;\nUPDATE learners SET xp = xp + 20 WHERE id = ?;\nINSERT INTO audit_log(action) VALUES ("lesson_completed");\nCOMMIT;',
    },
    topics: {
      foundation: [
        { ar: 'الجداول والصفوف والأعمدة', en: 'Tables, rows, and columns' }, { ar: 'أنواع البيانات والمفاتيح', en: 'Data types and keys' }, { ar: 'INSERT وSELECT', en: 'INSERT and SELECT' }, { ar: 'WHERE وORDER BY وLIMIT', en: 'WHERE, ORDER BY, and LIMIT' }, { ar: 'UPDATE وDELETE بوعي', en: 'Safe UPDATE and DELETE' },
      ],
      core: [
        { ar: 'الدوال التجميعية والتجميع', en: 'Aggregates and grouping' }, { ar: 'JOIN بين الجداول', en: 'JOINing tables' }, { ar: 'NULL والقيم المفقودة', en: 'NULL and missing values' }, { ar: 'الاستعلامات الفرعية وCTEs', en: 'Subqueries and CTEs' }, { ar: 'القيود Constraints وسلامة البيانات', en: 'Constraints and data integrity' },
      ],
      applied: [
        { ar: 'تصميم مخطط العلاقات', en: 'Relational schema design' }, { ar: 'التطبيع وتقليل التكرار', en: 'Normalization and reduced duplication' }, { ar: 'الفهارس وقراءة خطة الاستعلام', en: 'Indexes and query planning' }, { ar: 'Views وتقارير التقدم', en: 'Views and progress reports' }, { ar: 'معاملات الاستعلام الآمنة', en: 'Parameterized queries' },
      ],
      professional: [
        { ar: 'المعاملات ACID', en: 'ACID transactions' }, { ar: 'الصلاحيات ومبدأ أقل امتياز', en: 'Permissions and least privilege' }, { ar: 'النسخ الاحتياطي والترحيلات', en: 'Backups and migrations' }, { ar: 'مراقبة الأداء والأخطاء', en: 'Performance and error monitoring' }, { ar: 'مشروع احترافي: قاعدة بيانات لوحة تقدم', en: 'Professional project: progress dashboard database' },
      ],
    },
  },
]

export const tracks: Track[] = blueprints.map((blueprint) => ({
  id: blueprint.id,
  title: bi(blueprint.ar, blueprint.en),
  summary: bi(blueprint.summaryAr, blueprint.summaryEn),
  color: blueprint.color,
  level: bi('من الصفر إلى مشروع احترافي', 'Zero to professional project'),
  stages,
  lessons: makeLessons(blueprint),
}))

export const missions = [
  { id: 'mission-python', title: bi('مشروع Python: متعقب دراسة', 'Python project: study tracker'), track: bi('Python', 'Python'), summary: bi('حلّل جلسات الدراسة، خزّن البيانات محلياً، واكتب اختبارات للحسابات الأساسية.', 'Analyze study sessions, store local data, and write tests for core calculations.'), skills: ['Python', 'Testing', 'Files'] },
  { id: 'mission-portfolio', title: bi('مشروع الويب: Portfolio منشور', 'Web project: published portfolio'), track: bi('HTML/CSS + GitHub', 'HTML/CSS + GitHub'), summary: bi('أنشئ صفحة متجاوبة ومتاحة، وثّقها، وانشرها مع رابط مباشر.', 'Create a responsive, accessible page, document it, and publish it with a direct link.'), skills: ['HTML', 'CSS', 'Accessibility', 'GitHub Pages'] },
  { id: 'mission-dashboard', title: bi('مشروع JavaScript: لوحة تعلم', 'JavaScript project: learning dashboard'), track: bi('JavaScript', 'JavaScript'), summary: bi('ابنِ واجهة حالة تحفظ التقدم محلياً وتعرض حالات تحميل وخطأ واضحة.', 'Build a stateful interface that saves progress locally and exposes clear loading and error states.'), skills: ['JavaScript', 'DOM', 'Async code', 'Local storage'] },
  { id: 'mission-data', title: bi('مشروع SQL: قاعدة بيانات تقدم', 'SQL project: progress database'), track: bi('SQL', 'SQL'), summary: bi('صمّم مخططاً مترابطاً واكتب استعلامات تقارير وتحقق من صلاحيات الوصول.', 'Design a related schema, write reporting queries, and verify access permissions.'), skills: ['SQL', 'Schema design', 'Joins', 'Transactions'] },
  { id: 'mission-release', title: bi('مشروع Git: إصدار قابل للمراجعة', 'Git project: reviewable release'), track: bi('Git/GitHub', 'Git/GitHub'), summary: bi('أطلق مشروعاً موثقاً مع فروع وPR واختبارات وسير نشر آلي.', 'Launch a documented project with branches, a PR, tests, and an automated deployment flow.'), skills: ['Git', 'GitHub', 'Code review', 'CI'] },
]
