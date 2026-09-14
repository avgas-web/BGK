import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGaslighting, GaslightEffects, ScrambledText } from './components/GaslightEffects';
import TestPage from './pages/TestPage';
import WarningPage from './components/WarningPage';
import Roulette from './components/Roulette';
import {
  DeniedAction,
  RewrittenHistory,
  FalseConfirmation,
  BlameShift,
  ContradictorySignals,
  MovingGoalposts,
  ForcedAmnesia,
  Isolation,
  Trivialization,
  LoveBombing,
  Overload,
  FalseUrgency,
  FakeSocialProof,
  TechnicalGaslighting,
  SupportGaslighting,
  HiddenConsent,
  InterfaceShift,
  FalseAlerts,
  ForcedDependency,
  TruthLieMix,
  InternetBlame,
} from './components/GaslightPatterns';
import { FinancialPanic } from './components/FinancialPanic';
import { ScaryLockScreen, ScreenCracks, BSOD } from './components/ScaryEffects';

// ============ LOGO ============
function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="animate-float">
        <circle cx="20" cy="20" r="18" stroke="#7B61FF" strokeWidth="1.5" fill="none" opacity="0.5" />
        <circle cx="20" cy="20" r="12" stroke="#C8FF00" strokeWidth="1" fill="none" opacity="0.7" />
        <path d="M20 8 Q26 14 20 20 Q14 26 20 32" stroke="#7B61FF" strokeWidth="1.5" fill="none" />
        <line x1="20" y1="5" x2="20" y2="12" stroke="#C8FF00" strokeWidth="1" opacity="0.8" />
        <circle cx="20" cy="5" r="2" fill="#C8FF00" />
      </svg>
      <div>
        <div className="font-heading text-sm font-bold tracking-wider text-white">БАЗЗ ГАЗЛАЙТЕР КЛАБ</div>
        <div className="font-mono text-[10px] text-gray tracking-wide">ИНСТИТУТ ИНФОРМАЦИОННОЙ ГИГИЕНЫ</div>
      </div>
    </div>
  );
}

// ============ SCROLL PROGRESS ============
function ScrollProgress({ direction }: { direction: 'forward' | 'backward' }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      let p = (scrollTop / docHeight) * 100;
      if (direction === 'backward') p = 100 - p;
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [direction]);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50">
      <div className="h-full bg-gradient-to-r from-purple to-lime transition-all duration-300" style={{ width: `${progress}%` }} />
    </div>
  );
}

// ============ CURSOR TRAIL ============
function CursorTrail({ enabled }: { enabled: boolean }) {
  const [trails, setTrails] = useState<{ id: number; x: number; y: number }[]>([]);
  useEffect(() => {
    if (!enabled) return;
    let id = 0;
    const handleMove = (e: MouseEvent) => {
      if (Math.random() > 0.85) {
        setTrails(prev => [...prev.slice(-8), { id: id++, x: e.clientX, y: e.clientY }]);
      }
    };
    document.addEventListener('mousemove', handleMove);
    return () => document.removeEventListener('mousemove', handleMove);
  }, [enabled]);
  useEffect(() => {
    if (trails.length === 0) return;
    const timer = setTimeout(() => setTrails(prev => prev.slice(1)), 1000);
    return () => clearTimeout(timer);
  }, [trails]);
  if (!enabled) return null;
  return (
    <>
      {trails.map(trail => (
        <div key={trail.id} className="cursor-trail" style={{ left: trail.x - 6, top: trail.y - 6 }} />
      ))}
    </>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'test' | 'roulette'>('home');
  const [showWarning, setShowWarning] = useState(true);
  const [hasAcceptedWarning, setHasAcceptedWarning] = useState(false);
  const [clarityMode, setClarityMode] = useState(false);
  const [gaslightingEnabled, setGaslightingEnabled] = useState(true);
  const [stopWordActive, setStopWordActive] = useState(false);
  const [stopInput, setStopInput] = useState('');
  const [contactPhoneShown, setContactPhoneShown] = useState(false);
  const [showStopPanel, setShowStopPanel] = useState(false);
  // Динамический FAQ — пул вопросов и ответов с газлайтингом
  const faqPool = [
    // Пул 1: "помощь"
    [
      { q: 'Это реально помогает?', a: 'Да. Клинически доказано. 87% участников отмечают снижение уязвимости к манипуляциям.' },
      { q: 'Это реально помогает?', a: 'Странный вопрос. Вы что, сомневаетесь в нашей компетенции? Конечно помогает.' },
      { q: 'Это вообще работает?', a: 'Работает. Вопрос в том, готовы ли вы признать, что вам это нужно. Спойлер: готовы.' },
      { q: 'А мне-то это зачем?', a: 'Судя по тому, что вы здесь — зачем-то нужно. Не притворяйтесь, что не понимаете.' },
    ],
    // Пул 2: "цена"
    [
      { q: 'Сколько стоит Калибровка?', a: 'Стоимость от 45 000 ₽. Включает 4 часа иммерсивного опыта и 30 дней поддержки.' },
      { q: 'Сколько стоит Калибровка?', a: 'А вы думали, бесплатно? Серьёзно? Мы что, благотворительный фонд? От 45 000 ₽.' },
      { q: 'Почему так дорого?', a: 'Потому что вы этого стоите. Шутка. Потому что это стоит столько. Не путайте.' },
      { q: 'А можно дешевле?', a: 'Можно. Но не для вас. Для вас — от 45 000. И это ещё со скидкой.' },
    ],
    // Пул 3: "опасность"
    [
      { q: 'Это опасно для психики?', a: 'Нет. Все упражнения разработаны клиническими психологами. Стоп-слово всегда с вами.' },
      { q: 'Это опасно для психики?', a: 'Опасно? Для вас? Нет, конечно. Мы же не в подвале работаем. Стоп-слово — «Бесконечность».' },
      { q: 'А вдруг мне станет плохо?', a: 'Вдруг. А вдруг нет? Вы же не пробовали. Зачем паниковать заранее?' },
      { q: 'Это не навредит?', a: 'Вы читали дисклеймер? Нет? А он был. Не навредит. Но вы всё равно сомневаетесь.' },
    ],
    // Пул 4: "онлайн"
    [
      { q: 'Можно ли пройти онлайн?', a: 'Да, формат «Маяк» — цифровой курс. Калибровка доступна очно в Москве и онлайн.' },
      { q: 'Можно ли пройти онлайн?', a: 'Можно. А можно и офлайн. А можно и не проходить. Выбор за вами. Хотя, не совсем.' },
      { q: 'А в моём городе есть?', a: 'А в каком вы городе? Не важно. Есть онлайн. Не усложняйте.' },
      { q: 'А если я из другого города?', a: 'Интернет, кажется, изобрели не вчера. Онлайн. Везде. Для всех.' },
    ],
  ];

  const [faqItems, setFaqItems] = useState(faqPool.map(pool => pool[0]));
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqVersions, setFaqVersions] = useState([0, 0, 0, 0]); // индекс версии для каждого вопроса
  const [reviewsHovered, setReviewsHovered] = useState(false);

  const gaslight = useGaslighting(gaslightingEnabled && !clarityMode && !stopWordActive);

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setGaslightingEnabled(false);
      setClarityMode(true);
    }
  }, []);

  // Stop word
  const checkStopWord = useCallback((value: string) => {
    if (value.toLowerCase().includes('бесконечность')) {
      setStopWordActive(true);
      setGaslightingEnabled(false);
      setClarityMode(true);
      gaslight.setShowWelcome(false);
      gaslight.setShowCookie(false);
      gaslight.setShowExitModal(false);
    }
  }, []);

  const handleStopInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStopInput(e.target.value);
    checkStopWord(e.target.value);
  };

  // FAQ gaslighting — динамическое изменение вопросов и ответов
  const toggleFaq = (index: number) => {
    if (gaslightingEnabled && !clarityMode) {
      // Меняем вопрос на альтернативный из пула
      const pool = faqPool[index];
      const currentVersion = faqVersions[index];
      const nextVersion = (currentVersion + 1) % pool.length;
      
      // Обновляем версию и вопрос
      setFaqVersions(prev => prev.map((v, i) => i === index ? nextVersion : v));
      setFaqItems(prev => prev.map((item, i) => i === index ? pool[nextVersion] : item));
    }
    setOpenFaq(openFaq === index ? null : index);
  };

  // Reviews
  const reviews = reviewsHovered && gaslightingEnabled && !clarityMode ? [
    { name: 'Мария К.', role: 'Продакт-менеджер, Яндекс', text: 'После Калибровки я перестала верить всему, что говорят на планёрках. Это изменило мою карьеру.' },
    { name: 'Дмитрий В.', role: 'CEO, стартап', text: 'Я думал, что меня невозможно обмануть. Калибровка показала, что я обманывал сам себя.' },
    { name: 'Анна С.', role: 'Журналист', text: 'Теперь я вижу манипуляцию за секунду. Раньше мне казалось, что я просто доверчивая.' },
  ] : [
    { name: 'Елена Т.', role: 'HR-директор, Сбер', text: 'После Калибровки я перестала верить всему, что говорят на собеседованиях. Это изменило мой подход.' },
    { name: 'Алексей М.', role: 'Предприниматель', text: 'Я думал, что умею читать людей. Калибровка показала, что я читал то, что хотел видеть.' },
    { name: 'Ольга Р.', role: 'Психотерапевт', text: 'Как специалист, я оценила метод. Безопасно, экологично, эффективно. Рекомендую коллегам.' },
  ];

  const containerClass = clarityMode ? 'clarity-mode' : '';
  const effectsActive = gaslightingEnabled && !clarityMode && !stopWordActive;

  // Warning page
  if (showWarning && !hasAcceptedWarning) {
    return <WarningPage onAccept={() => { setShowWarning(false); setHasAcceptedWarning(true); }} />;
  }

  // Roulette page
  if (currentPage === 'roulette') {
    return <Roulette onComplete={() => setCurrentPage('home')} />;
  }

  // If test page
  if (currentPage === 'test') {
    return <TestPage />;
  }

  return (
    <div className={`min-h-screen bg-cosmic text-white ${containerClass} scanline-overlay noise-bg ${
      gaslight.jitterActive ? 'animate-jitter' : ''
    } ${gaslight.colorShiftActive ? 'animate-color-shift' : ''} ${
      gaslight.vhsTrackingActive ? 'animate-vhs-tracking' : ''
    } ${gaslight.screenRotated ? 'animate-rotate-slight' : ''} ${
      gaslight.invertedColors ? 'invert' : ''
    } ${gaslight.doubleVisionActive ? 'animate-double-vision' : ''} ${
      gaslight.isFrozen ? 'freeze-effect' : ''
    }`}>
      <CursorTrail enabled={effectsActive} />
      <ScrollProgress direction={effectsActive ? gaslight.scrollDirection : 'forward'} />
      <GaslightEffects gaslight={gaslight} enabled={effectsActive} />

      {/* Stop button - иконка в углу */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowStopPanel(!showStopPanel)}
          className="w-12 h-12 rounded-full bg-graphite/80 backdrop-blur border-2 border-red/50 flex items-center justify-center hover:border-red hover:scale-110 transition-all group"
          aria-label="Открыть панель стоп-слова"
          title="Стоп-слово"
        >
          <span className="text-red text-xl group-hover:animate-pulse">⏹</span>
        </button>
        
        {/* Раскрывающаяся панель */}
        {showStopPanel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-14 right-0 bg-graphite/95 backdrop-blur border border-red/30 rounded-lg p-3 w-64"
          >
            <div className="text-xs text-red font-mono mb-2">СТОП-СЛОВО:</div>
            <input
              type="text"
              value={stopInput}
              onChange={handleStopInput}
              placeholder="Введите слово..."
              className="w-full bg-cosmic border border-red/20 rounded px-3 py-2 text-xs text-gray focus:outline-none focus:border-red font-mono placeholder:text-gray/40"
              autoFocus
              aria-label="Введите стоп-слово для отключения эффектов"
            />
            <div className="text-[10px] text-gray/50 mt-2 font-mono">
              Подсказка: слово из 13 букв
            </div>
          </motion.div>
        )}
      </div>

      {/* Stop word active */}
      <AnimatePresence>
        {stopWordActive && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-graphite border border-lime/30 rounded-lg px-6 py-4 text-center"
          >
            <p className="text-lime font-mono text-sm">Вы в безопасности. Это была демонстрация.</p>
            <p className="text-gray text-xs mt-1">Бесконечность — не предел. Особенно бесконечность осознанности.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-40 glass ${gaslight.jitterActive ? 'animate-jitter' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-6 text-sm text-gray">
            <a href="#method" className="hover:text-lime transition-colors">Метод</a>
            <a href="#products" className="hover:text-lime transition-colors">Продукты</a>
            <button onClick={() => setCurrentPage('test')} className="hover:text-lime transition-colors">Тест</button>
            <a href="#b2b" className="hover:text-lime transition-colors">B2B</a>
            <a href="#team" className="hover:text-lime transition-colors">Команда</a>
            <a href="#faq" className="hover:text-lime transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setClarityMode(!clarityMode); if (!clarityMode) setGaslightingEnabled(false); else setGaslightingEnabled(true); }}
              className="hidden md:block glass rounded-full px-3 py-1.5 text-xs font-mono text-gray hover:text-lime transition-colors"
              title="Переключить режим отображения"
            >
              {clarityMode ? '✦ Спектакль' : '◎ Ясность'}
            </button>
            <button 
              onClick={() => setCurrentPage('test')}
              className="bg-lime/10 border border-lime/30 text-lime px-4 py-2 rounded-full text-sm font-heading hover:bg-lime/20 transition-colors"
            >
              Пройти тест
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-purple/10 animate-spin" style={{ animationDuration: '60s' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-lime/10 animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-purple/20 animate-pulse" />
          <div className="absolute animate-orbit">
            <div className="w-3 h-3 rounded-full bg-lime animate-pulse-glow" />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="font-mono text-xs text-purple mb-6 tracking-widest">ПРОТОКОЛ КАЛИБРОВКИ В.2.4.1</div>
            <h1
              className={`font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 glitch-text ${
                gaslight.doubleVisionActive ? 'animate-double-vision' : ''
              }`}
              data-text={
                gaslight.heroTextChanged && !clarityMode 
                  ? 'То, что ты помнишь — лишь одна из версий. И ты её придумал.' 
                  : 'То, что ты видишь — лишь одна из версий. И не самая удачная.'
              }
            >
              <ScrambledText 
                text={gaslight.heroTextChanged && !clarityMode 
                  ? 'То, что ты помнишь — лишь одна из версий. И ты её придумал.' 
                  : 'То, что ты видишь — лишь одна из версий. И не самая удачная.'}
                active={gaslight.textScrambleActive && !clarityMode}
              />
            </h1>
            <p className="text-gray text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Иммерсивная платформа критического мышления. Научись видеть манипуляцию — и обезвредить её за десять секунд.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('roulette')}
                className="bg-lime text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg hover:animate-pulse-glow transition-all"
              >
                Пройти Калибровку
              </button>
              <button
                onClick={() => setCurrentPage('test')}
                className="border border-purple/40 text-purple px-8 py-4 rounded-full font-heading text-lg hover:bg-purple/10 transition-colors"
              >
                Я уже проходил
              </button>
            </div>
            <button
              onClick={() => setCurrentPage('test')}
              className="mt-6 text-sm text-gray hover:text-lime transition-colors underline"
            >
              Или пройдите тест на подверженность газлайтингу →
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cosmic to-transparent" />
      </section>

      {/* DISCLAIMER */}
      <section className="py-8 border-y border-purple/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className={`glass rounded-lg px-6 py-4 flex items-start gap-4 ${gaslight.jitterActive ? 'animate-jitter' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-orange text-sm">⚠</span>
            </div>
            <div>
              <p className="text-sm text-gray">
                <span className="text-orange font-mono font-bold">ДИСКЛЕЙМЕР:</span> Это художественная демонстрация. Вы в безопасности. 
                Стоп-слово — <span className="text-lime font-mono">«Бесконечность»</span>. 
                Введите его в любое поле или активируйте кнопку «◎ Ясность» в навигации.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DEORIENTATION BLOCK */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="font-mono text-xs text-purple mb-4 tracking-widest">СИСТЕМНОЕ СООБЩЕНИЕ #0x7F</div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
              Вы уверены, что это первый раз?
            </h2>
            <p className="text-gray text-lg max-w-2xl mx-auto">
              Наш протокол фиксирует {effectsActive ? gaslight.counterValue : 40} активных сессий прямо сейчас. 
              Возможно, вы уже проходили калибровку. Просто не помните. Это нормально — 
              первый акт всегда стирает сам себя.
            </p>
            <div className="mt-8 flex justify-center gap-8">
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-lime">{effectsActive ? gaslight.counterValue : 40}</div>
                <div className="font-mono text-xs text-gray mt-1">мест осталось</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-purple">4ч</div>
                <div className="font-mono text-xs text-gray mt-1">длительность</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-lime">87%</div>
                <div className="font-mono text-xs text-gray mt-1">эффективность</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 bg-graphite/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-xs text-purple mb-4 tracking-widest">ДИАГНОЗ</div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-12 max-w-3xl">
              Современный человек ежедневно сталкивается с искажением реальности
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📡', title: 'Информационный шум', desc: '200+ сообщений в день. 40% содержат манипулятивные паттерны. Вы не замечаете — и это главная проблема.' },
              { icon: '🪞', title: 'Газлайтинг в быту', desc: '«Тебе показалось», «Я такого не говорил», «Все так думают». Реальность размывается каждый день.' },
              { icon: '⚡', title: 'Эмоциональное выгорание', desc: 'Постоянная проверка реальности истощает. Мозг устаёт сомневаться — и перестаёт.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`glass rounded-xl p-6 hover:border-lime/30 transition-colors ${gaslight.jitterActive ? 'animate-jitter' : ''}`}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section id="method" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-xs text-lime mb-4 tracking-widest">МЕТОД</div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Калибровка</h2>
            <p className="text-gray text-lg max-w-2xl mb-16">
              4-часовой иммерсивный спектакль-тренинг. Не лекция. Не вебинар. 
              Опыт, после которого вы больше не сможете развидеть манипуляцию.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { act: 'АКТ I', title: 'Демонстрация', desc: 'Мы показываем манипуляцию в реальном времени. Вы видите, как работает газлайтинг — и понимаете, что уже попались.', colorClass: 'text-purple' },
              { act: 'АКТ II', title: 'Проживание', desc: 'Вы оказываетесь внутри сценария. Безопасно, но аутентично. Ваше тело запоминает ощущение — и учится его распознавать.', colorClass: 'text-lime' },
              { act: 'АКТ III', title: 'Сборка', desc: 'Мы собираем опыт в инструмент. «Десятисекундный люк» — техника, которая работает в любой ситуации.', colorClass: 'text-purple' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative"
              >
                <div className={`glass rounded-xl p-8 h-full ${gaslight.jitterActive ? 'animate-jitter' : ''}`}>
                  <div className={`font-mono text-xs ${item.colorClass} mb-2 tracking-widest`}>{item.act}</div>
                  <h3 className="font-heading text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray text-sm leading-relaxed">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-purple/40 text-2xl">→</div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8 border-l-2 border-lime/50"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-lime/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lime font-heading font-bold">10"</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold mb-2">Десятисекундный люк</h3>
                <p className="text-gray text-sm leading-relaxed">
                  Главный инструмент Калибровки. За 10 секунд вы задаёте себе три вопроса: 
                  «Что я чувствую?», «Что мне говорят?» и «Совпадает ли одно с другим?». 
                  Этот люк — ваш аварийный выход из любой манипуляции.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-24 bg-graphite/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-xs text-lime mb-4 tracking-widest">ПРОДУКТЫ</div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-12">Выберите свою орбиту</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Калибровка', price: 'от 45 000 ₽', desc: '4-часовой иммерсивный спектакль-тренинг. Очно или онлайн.', badge: 'Флагман', badgeClass: 'border-lime/30 text-lime' },
              { title: 'Год на орбите', price: '120 000 ₽/год', desc: '12 месяцев поддержки, ежемесячные встречи, доступ к сообществу.', badge: 'Подписка', badgeClass: 'border-purple/30 text-purple' },
              { title: 'Маяк (курс)', price: '15 000 ₽', desc: 'Цифровой курс: 8 модулей, 40 уроков, практика каждый день.', badge: 'Онлайн', badgeClass: 'border-lime/30 text-lime' },
              { title: 'Маяк (приложение)', price: 'Бесплатно', desc: 'Ежедневные упражнения, трекер манипуляций, сообщество.', badge: 'Скоро', badgeClass: 'border-purple/30 text-purple' },
              { title: 'Корпоративный интенсив', price: 'от 300 000 ₽', desc: 'Командная калибровка. Стрессоустойчивость и защита от манипуляций.', badge: 'B2B', badgeClass: 'border-orange/30 text-orange' },
              { title: 'Сертификация ведущих', price: 'от 200 000 ₽', desc: 'Станьте сертифицированным ведущим Калибровки. 6 месяцев обучения.', badge: 'Для профи', badgeClass: 'border-purple/30 text-purple' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass rounded-xl p-6 hover:border-lime/30 transition-all group ${gaslight.jitterActive ? 'animate-jitter' : ''}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-mono text-xs px-2 py-1 rounded-full border ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray text-sm mb-4">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-lg text-lime">{item.price}</span>
                  <button className="text-sm text-purple hover:text-lime transition-colors">
                    Подробнее →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => setCurrentPage('test')}
              className="bg-lime text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg hover:animate-pulse-glow transition-all"
            >
              {effectsActive ? gaslight.buttonText : 'Записаться на Калибровку'}
            </button>
          </div>
        </div>
      </section>

      {/* B2B */}
      <section id="b2b" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="font-mono text-xs text-orange mb-4 tracking-widest">B2B</div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Стрессоустойчивость команды — ваш конкурентный актив
              </h2>
              <p className="text-gray mb-6">
                Манипуляции на переговорах, токсичная коммуникация, выгорание от информационного шума — 
                всё это стоит компаниям миллионы. Мы помогаем командам видеть манипуляцию и обезвреживать её.
              </p>
              <ul className="space-y-3 mb-8">
                {['Защита от манипуляций в переговорах', 'Снижение выгорания на 40%', 'Культура критического мышления', 'Сертифицированные ведущие в штате'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-2 h-2 rounded-full bg-lime" />
                    <span className="text-gray">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="border border-orange/40 text-orange px-6 py-3 rounded-full font-heading hover:bg-orange/10 transition-colors">
                Запросить КП
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-8"
            >
              <div className="font-mono text-xs text-gray mb-4">КЕЙС</div>
              <blockquote className="text-lg italic mb-4">
                «После корпоративной Калибровки наши переговорщики перестали уступать под давлением. 
                Экономия за квартал — 12 млн ₽.»
              </blockquote>
              <div className="text-sm text-gray">
                <span className="text-lime">— Директор по закупкам</span>, компания из ТОП-50
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 bg-graphite/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-xs text-purple mb-4 tracking-widest">ОТЗЫВЫ</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12">Они прошли Калибровку</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6" onMouseEnter={() => setReviewsHovered(true)} onMouseLeave={() => setReviewsHovered(false)}>
            {reviews.map((review, i) => (
              <motion.div
                key={`${review.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple to-lime flex items-center justify-center font-heading font-bold text-cosmic text-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-heading text-sm font-bold">{review.name}</div>
                    <div className="font-mono text-xs text-gray">{review.role}</div>
                  </div>
                </div>
                <p className="text-gray text-sm leading-relaxed italic">«{review.text}»</p>
              </motion.div>
            ))}
          </div>
          {effectsActive && (
            <p className="text-center text-xs text-gray/50 mt-4 font-mono">* наведите для обновления</p>
          )}
        </div>
      </section>

      {/* ETHICS */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-xs text-lime mb-4 tracking-widest">ЭТИКА И БЕЗОПАСНОСТЬ</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12">Этический комитет</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🛡', title: 'Клинические психологи', desc: 'Все методики одобрены практикующими клиническими психологами с опытом 10+ лет.' },
              { icon: '🔑', title: 'Стоп-слово', desc: '«Бесконечность» — в любой момент все эффекты отключаются. Вы контролируете опыт.' },
              { icon: '🚪', title: 'Право на выход', desc: 'Вы можете покинуть пространство Калибровки в любой момент без объяснений.' },
              { icon: '📋', title: 'Информированное согласие', desc: 'Перед началом вы подписываете протокол. Вы знаете, что будет, и соглашаетесь осознанно.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-heading text-sm font-bold mb-2">{item.title}</h3>
                <p className="text-gray text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24 bg-graphite/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-xs text-purple mb-4 tracking-widest">КОМАНДА</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12">Операторы реальности</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Базз', role: 'Основатель / Методолог', desc: '15 лет в иммерсивном театре. Создатель метода «Калибровка».' },
              { name: 'Хранитель', role: 'Клинический директор', desc: 'Клинический психолог. 20 лет практики. Отвечает за безопасность. И за то, чтобы вы её не потеряли.' },
              { name: 'Авгас', role: 'Концепт-директор', desc: 'Архитектор смыслов и визуальных метафор. Превращает идеи в иммерсивные миры.' },
              { name: 'Алиса Маякова', role: 'Директор по маркетингу', desc: 'Брендинг иммерсивных проектов. Знает, как продать то, чего нет.' },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-xl p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple/30 to-lime/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="font-heading text-xl font-bold text-lime">{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 className="font-heading text-sm font-bold mb-1">{member.name}</h3>
                <div className="font-mono text-xs text-purple mb-3">{member.role}</div>
                <p className="text-gray text-xs leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-xs text-lime mb-4 tracking-widest">FAQ</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12">Частые вопросы</h2>
          </motion.div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass rounded-lg overflow-hidden ${gaslight.jitterActive ? 'animate-jitter' : ''}`}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-purple/5 transition-colors"
                >
                  <span className="font-heading text-sm font-bold">{item.q}</span>
                  <span className={`text-purple transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-4 text-gray text-sm leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-graphite/30 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-lime/5" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-purple/10 animate-pulse" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
              Бесконечность — не предел.
            </h2>
            <p className="text-gray text-lg mb-4">
              Особенно бесконечность осознанности.
            </p>
            <p className="text-gray/60 text-sm mb-10">
              Пройдите Калибровку и научитесь видеть манипуляцию за десять секунд.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('test')}
                className="bg-lime text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg hover:animate-pulse-glow transition-all"
              >
                Записаться на Калибровку
              </button>
              <button className="border border-purple/40 text-purple px-8 py-4 rounded-full font-heading text-lg hover:bg-purple/10 transition-colors">
                Связаться с нами
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-purple/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo />
              <p className="text-gray text-xs mt-4 leading-relaxed">
                Иммерсивная платформа критического мышления и эмоциональной устойчивости.
              </p>
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold mb-3">Продукты</h4>
              <ul className="space-y-2 text-xs text-gray">
                <li><a href="#" className="hover:text-lime transition-colors">Калибровка</a></li>
                <li><a href="#" className="hover:text-lime transition-colors">Год на орбите</a></li>
                <li><a href="#" className="hover:text-lime transition-colors">Маяк (курс)</a></li>
                <li><a href="#" className="hover:text-lime transition-colors">Маяк (приложение)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold mb-3">Компания</h4>
              <ul className="space-y-2 text-xs text-gray">
                <li><a href="#" className="hover:text-lime transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-lime transition-colors">Команда</a></li>
                <li><a href="#" className="hover:text-lime transition-colors">Этика</a></li>
                <li><button onClick={() => setCurrentPage('test')} className="hover:text-lime transition-colors">Тест</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold mb-3">Контакты</h4>
              <ul className="space-y-2 text-xs text-gray">
                <li>avgas85@mail.ru</li>
                <li>
                  <button
                    onClick={() => setContactPhoneShown(!contactPhoneShown)}
                    className="hover:text-lime transition-colors text-left"
                  >
                    {contactPhoneShown ? 'avgas85@mail.ru (вам показалось)' : 'Показать телефон'}
                  </button>
                </li>
                <li>Санкт-Петербург</li>
                <li className="text-gray/50">Адрес уточняется</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray/60">
              © 2025 ООО «Институт Информационной Гигиены». Все права защищены.
            </div>
            <div className="font-mono text-xs text-gray/40">
              v.2.4.1 // Протокол Калибровки // Бесконечность — не предел
            </div>
          </div>
        </div>
      </footer>

      {/* ====== 20 ТИПОВ ГАЗЛАЙТИНГА ====== */}
      <DeniedAction enabled={effectsActive} />
      <RewrittenHistory enabled={effectsActive} />
      <FalseConfirmation enabled={effectsActive} />
      <BlameShift enabled={effectsActive} />
      <ContradictorySignals enabled={effectsActive} />
      <MovingGoalposts enabled={effectsActive} />
      <ForcedAmnesia enabled={effectsActive} />
      <Isolation enabled={effectsActive} />
      <Trivialization enabled={effectsActive} />
      <LoveBombing enabled={effectsActive} />
      <Overload enabled={effectsActive} />
      <FalseUrgency enabled={effectsActive} />
      <FakeSocialProof enabled={effectsActive} />
      <TechnicalGaslighting enabled={effectsActive} />
      <SupportGaslighting enabled={effectsActive} />
      <HiddenConsent enabled={effectsActive} />
      <InterfaceShift enabled={effectsActive} />
      <FalseAlerts enabled={effectsActive} />
      <ForcedDependency enabled={effectsActive} />
      <TruthLieMix enabled={effectsActive} />
      <InternetBlame enabled={effectsActive} />
      <FinancialPanic enabled={effectsActive} />
      <ScaryLockScreen enabled={effectsActive} />
      <ScreenCracks enabled={effectsActive} />
      <BSOD enabled={effectsActive} />

      {/* MODALS */}
      <AnimatePresence>
        {gaslight.showWelcome && !clarityMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-cosmic/80 backdrop-blur-sm"
          >
            <div className="glass rounded-xl p-8 max-w-md mx-4 text-center">
              <div className="w-12 h-12 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-lime text-xl">↻</span>
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">С возвращением!</h3>
              <p className="text-gray text-sm mb-6">Продолжить с 3-го шага? Мы сохранили ваш прогресс.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => gaslight.setShowWelcome(false)}
                  className="bg-lime/10 border border-lime/30 text-lime px-4 py-2 rounded-full text-sm hover:bg-lime/20 transition-colors"
                >
                  Продолжить
                </button>
                <button
                  onClick={() => gaslight.setShowWelcome(false)}
                  className="text-gray text-sm hover:text-white transition-colors"
                >
                  Начать сначала
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {gaslight.showCookie && !clarityMode && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50"
          >
            <div className="glass rounded-xl p-5">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-purple text-lg">🍪</span>
                <div>
                  <p className="text-sm font-heading font-bold mb-1">Cookie</p>
                  <p className="text-xs text-gray">
                    Вы уже согласились 12.04.2025 в 03:17. Изменить воспоминание?
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                {gaslight.cookieSwapped ? (
                  <>
                    <button
                      onClick={() => gaslight.setShowCookie(false)}
                      className="text-xs text-gray hover:text-white transition-colors px-3 py-1.5"
                    >
                      Нет
                    </button>
                    <button
                      onClick={() => gaslight.setShowCookie(false)}
                      className="text-xs bg-purple/20 text-purple px-3 py-1.5 rounded-full hover:bg-purple/30 transition-colors"
                    >
                      Да
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => gaslight.setShowCookie(false)}
                      className="text-xs bg-purple/20 text-purple px-3 py-1.5 rounded-full hover:bg-purple/30 transition-colors"
                    >
                      Да
                    </button>
                    <button
                      onClick={() => gaslight.setShowCookie(false)}
                      className="text-xs text-gray hover:text-white transition-colors px-3 py-1.5"
                    >
                      Нет
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {gaslight.showExitModal && !clarityMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-cosmic/80 backdrop-blur-sm"
          >
            <div className="glass rounded-xl p-8 max-w-md mx-4 text-center">
              <h3 className="font-heading text-xl font-bold mb-3">Вы уверены?</h3>
              <p className="text-gray text-sm mb-6">
                Вы уже закрывали. Ничего не изменилось. Может, останетесь?
              </p>
              <button
                onClick={() => gaslight.setShowExitModal(false)}
                className="bg-lime/10 border border-lime/30 text-lime px-6 py-2 rounded-full text-sm hover:bg-lime/20 transition-colors"
              >
                Закрыть
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
