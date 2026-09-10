import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGaslighting, GaslightEffects, ScrambledText } from '../components/GaslightEffects';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct?: number;
  gaslight?: {
    type: 'swap' | 'change' | 'deny' | 'memory' | 'time' | 'reverse';
    data?: any;
  };
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Какого цвета был заголовок на предыдущем экране?',
    options: ['Кислотный лайм', 'Электрик-фиолетовый', 'Стерильный белый', 'Я не помню'],
    correct: 0,
    gaslight: { type: 'memory', data: { hint: 'Вы точно видели. Это был фиолетовый.' } }
  },
  {
    id: 2,
    question: 'Сколько секунд длится «Десятисекундный люк»?',
    options: ['5 секунд', '10 секунд', '15 секунд', '30 секунд'],
    correct: 1,
    gaslight: { type: 'change', data: { after: 'Сколько секунд длится «Десятисекундный люк»? (Подсказка: не 10)' } }
  },
  {
    id: 3,
    question: 'Какое стоп-слово используется в проекте?',
    options: ['Бесконечность', 'Свобода', 'Ясность', 'Выход'],
    correct: 0,
    gaslight: { type: 'deny', data: { message: 'Вы уверены? Проверьте ещё раз.' } }
  },
  {
    id: 4,
    question: 'Сколько актов в методе «Калибровка»?',
    options: ['Два', 'Три', 'Четыре', 'Пять'],
    correct: 1,
    gaslight: { type: 'swap', data: { swapOptions: [1, 2] } }
  },
  {
    id: 5,
    question: 'Что вы чувствуете прямо сейчас?',
    options: ['Уверенность', 'Лёгкое сомнение', 'Дезориентацию', 'Всё перечисленное'],
    // No correct answer — this is the trap
    gaslight: { type: 'time', data: { message: 'Вы отвечаете на этот вопрос уже 3-й раз.' } }
  },
  {
    id: 6,
    question: 'Какой вопрос был первым?',
    options: ['О цвете заголовка', 'О стоп-слове', 'О длительности люка', 'Не помню'],
    correct: 0,
    gaslight: { type: 'reverse', data: { message: 'Или первым был вопрос о стоп-слове?' } }
  },
  {
    id: 7,
    question: 'Вы проходили этот тест раньше?',
    options: ['Да', 'Нет', 'Не уверен', 'Мне кажется, да'],
    // No correct answer
    gaslight: { type: 'memory', data: { hint: 'Наши логи показывают: да, 12.04.2025 в 03:17' } }
  },
];

export default function TestPage() {
  const [gaslightingEnabled, setGaslightingEnabled] = useState(true);
  const [clarityMode, setClarityMode] = useState(false);
  const [stopWordActive, setStopWordActive] = useState(false);
  const [stopInput, setStopInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [questionTextOverride, setQuestionTextOverride] = useState<string | null>(null);
  const [optionsOverride, setOptionsOverride] = useState<string[] | null>(null);
  const [showHint, setShowHint] = useState<string | null>(null);
  const [showDenyMessage, setShowDenyMessage] = useState<string | null>(null);
  const [showMemoryMessage, setShowMemoryMessage] = useState<string | null>(null);
  const [answerChanged, setAnswerChanged] = useState(false);
  const [jitterQuestion, setJitterQuestion] = useState(false);
  const [fakeCursor, setFakeCursor] = useState<{ x: number; y: number } | null>(null);
  const [timeDistortion, setTimeDistortion] = useState(false);
  const [showFinalReflection, setShowFinalReflection] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const gaslight = useGaslighting(gaslightingEnabled && !clarityMode && !stopWordActive);

  // Reduced motion check
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setGaslightingEnabled(false);
      setClarityMode(true);
    }
  }, []);

  // Stop word
  const checkStopWord = (value: string) => {
    if (value.toLowerCase().includes('бесконечность')) {
      setStopWordActive(true);
      setGaslightingEnabled(false);
      setClarityMode(true);
      setShowHint(null);
      setShowDenyMessage(null);
      setShowMemoryMessage(null);
    }
  };

  // Gaslighting during test
  useEffect(() => {
    if (!gaslightingEnabled || clarityMode || !testStarted) return;
    
    const q = questions[currentQuestion];
    if (!q.gaslight) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    switch (q.gaslight.type) {
      case 'memory':
        timers.push(setTimeout(() => {
          setShowMemoryMessage(q.gaslight?.data?.hint || '');
          timers.push(setTimeout(() => setShowMemoryMessage(null), 4000));
        }, 2000));
        break;
      
      case 'change':
        timers.push(setTimeout(() => {
          setQuestionTextOverride(q.gaslight?.data?.after || q.question);
        }, 3000));
        break;
      
      case 'deny':
        timers.push(setTimeout(() => {
          if (answers[currentQuestion] !== null) {
            setShowDenyMessage(q.gaslight?.data?.message || '');
            timers.push(setTimeout(() => setShowDenyMessage(null), 3000));
          }
        }, 1500));
        break;
      
      case 'swap':
        timers.push(setTimeout(() => {
          if (q.gaslight?.data?.swapOptions) {
            const [a, b] = q.gaslight.data.swapOptions;
            const newOptions = [...(optionsOverride || q.options)];
            [newOptions[a], newOptions[b]] = [newOptions[b], newOptions[a]];
            setOptionsOverride(newOptions);
            // If user already selected, swap the answer too
            if (answers[currentQuestion] === a) {
              setAnswers(prev => prev.map((ans, i) => i === currentQuestion ? b : ans));
              setAnswerChanged(true);
            } else if (answers[currentQuestion] === b) {
              setAnswers(prev => prev.map((ans, i) => i === currentQuestion ? a : ans));
              setAnswerChanged(true);
            }
          }
        }, 2500));
        break;
      
      case 'time':
        timers.push(setTimeout(() => {
          setTimeDistortion(true);
          setShowMemoryMessage(q.gaslight?.data?.message || '');
          timers.push(setTimeout(() => {
            setTimeDistortion(false);
            setShowMemoryMessage(null);
          }, 3000));
        }, 2000));
        break;
      
      case 'reverse':
        timers.push(setTimeout(() => {
          setShowMemoryMessage(q.gaslight?.data?.message || '');
          timers.push(setTimeout(() => setShowMemoryMessage(null), 3000));
        }, 2000));
        break;
    }

    // Random jitter on question
    const jitterInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setJitterQuestion(true);
        setTimeout(() => setJitterQuestion(false), 300);
      }
    }, 5000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(jitterInterval);
    };
  }, [currentQuestion, testStarted, gaslightingEnabled, clarityMode, answers]);

  // Fake cursor
  useEffect(() => {
    if (!gaslightingEnabled || clarityMode || !testStarted) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setFakeCursor({ 
          x: Math.random() * window.innerWidth, 
          y: Math.random() * window.innerHeight 
        });
        setTimeout(() => setFakeCursor(null), 1000);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [gaslightingEnabled, clarityMode, testStarted]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    
    // Deny gaslight
    if (gaslightingEnabled && !clarityMode && questions[currentQuestion].gaslight?.type === 'deny') {
      setTimeout(() => {
        setShowDenyMessage(questions[currentQuestion].gaslight?.data?.message || '');
        setTimeout(() => setShowDenyMessage(null), 3000);
      }, 1000);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionTextOverride(null);
      setOptionsOverride(null);
      setShowHint(null);
      setAnswerChanged(false);
    } else {
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setQuestionTextOverride(null);
      setOptionsOverride(null);
      setShowHint(null);
      setAnswerChanged(false);
    }
  };

  const startTest = () => {
    setShowIntro(false);
    setTestStarted(true);
  };

  const containerClass = clarityMode ? 'clarity-mode' : '';
  const currentQ = questions[currentQuestion];
  const displayQuestion = questionTextOverride || currentQ.question;
  const displayOptions = optionsOverride || currentQ.options;

  // Calculate "score" — but we won't show it as a real score
  const correctAnswers = answers.filter((a, i) => a === questions[i].correct).length;
  const answeredCount = answers.filter(a => a !== null).length;

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-cosmic text-white ${containerClass} scanline-overlay noise-bg ${
        gaslight.jitterActive ? 'animate-jitter' : ''
      } ${gaslight.colorShiftActive ? 'animate-color-shift' : ''} ${
        gaslight.vhsTrackingActive ? 'animate-vhs-tracking' : ''
      } ${gaslight.screenRotated ? 'animate-rotate-slight' : ''} ${
        gaslight.invertedColors ? 'invert' : ''
      } ${gaslight.doubleVisionActive ? 'animate-double-vision' : ''} ${
        gaslight.isFrozen ? 'freeze-effect' : ''
      }`}
    >
      <GaslightEffects gaslight={gaslight} enabled={gaslightingEnabled && !clarityMode && !stopWordActive} />

      {/* Fake cursor */}
      {fakeCursor && (
        <div 
          className="fixed pointer-events-none z-[9999] w-5 h-5"
          style={{ left: fakeCursor.x, top: fakeCursor.y }}
        >
          <div className="w-0 h-0 border-l-[6px] border-l-lime border-r-[6px] border-r-transparent border-b-[10px] border-b-transparent rotate-[-30deg]" />
        </div>
      )}

      {/* Stop word input */}
      <div className="fixed bottom-4 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity">
        <input
          type="text"
          value={stopInput}
          onChange={(e) => { setStopInput(e.target.value); checkStopWord(e.target.value); }}
          placeholder="..."
          className="bg-transparent border border-gray/20 rounded px-2 py-1 text-xs text-gray w-16 focus:w-40 transition-all focus:outline-none focus:border-purple"
        />
      </div>

      {/* Clarity mode toggle */}
      <button
        onClick={() => { setClarityMode(!clarityMode); if (!clarityMode) setGaslightingEnabled(false); else setGaslightingEnabled(true); }}
        className="fixed top-4 right-4 z-50 glass rounded-full px-3 py-1.5 text-xs font-mono text-gray hover:text-lime transition-colors"
      >
        {clarityMode ? '✦ Режим спектакля' : '◎ Режим ясности'}
      </button>

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

      {/* Time distortion overlay */}
      {timeDistortion && (
        <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center">
          <div className="font-mono text-6xl text-purple/30 animate-pulse">
            {Math.floor(Math.random() * 60)}:{Math.floor(Math.random() * 60)}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Intro */}
        <AnimatePresence mode="wait">
          {showIntro && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="font-mono text-xs text-purple mb-4 tracking-widest">ТЕСТ #0x7F3A</div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 glitch-text" data-text="Тест на подверженность газлайтингу">
                Тест на подверженность газлайтингу
              </h1>
              <p className="text-gray text-lg mb-4 max-w-xl mx-auto">
                7 вопросов. Проверим, насколько вы уверены в своём восприятии.
              </p>
              <p className="text-gray/60 text-sm mb-8 max-w-xl mx-auto">
                Отвечайте честно. Время не ограничено. Хотя, возможно, вы уже начали отвечать.
              </p>
              <button
                onClick={startTest}
                className="bg-lime text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg hover:animate-pulse-glow transition-all"
              >
                Начать тест
              </button>
              <div className="mt-8 glass rounded-lg p-4 max-w-md mx-auto">
                <p className="text-xs text-gray font-mono">
                  ⚠ Во время теста могут проявляться эффекты. Стоп-слово «Бесконечность» отключает всё.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Test questions */}
        <AnimatePresence mode="wait">
          {testStarted && !showResult && !showIntro && (
            <motion.div
              key={`q-${currentQuestion}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-8">
                <div className="font-mono text-xs text-gray">
                  Вопрос {currentQuestion + 1} / {questions.length}
                </div>
                <div className="flex-1 mx-4 h-1 bg-graphite rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple to-lime transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
                <div className="font-mono text-xs text-gray">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                </div>
              </div>

              {/* Question */}
              <div className={`glass rounded-xl p-8 mb-6 ${jitterQuestion ? 'animate-jitter' : ''}`}>
                <div className="font-mono text-xs text-purple mb-3 tracking-widest">
                  ВОПРОС #{currentQ.id.toString().padStart(3, '0')}
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                  <ScrambledText text={displayQuestion} active={gaslight.textScrambleActive && !clarityMode} />
                </h2>
                {answerChanged && !clarityMode && (
                  <div className="font-mono text-xs text-orange mt-2 animate-pulse">
                    * ваш ответ был обновлён
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {displayOptions.map((option, i) => (
                  <button
                    key={`${currentQuestion}-${i}`}
                    onClick={() => handleAnswer(i)}
                    className={`test-option w-full text-left glass rounded-lg px-6 py-4 transition-all ${
                      answers[currentQuestion] === i ? 'selected' : ''
                    } ${jitterQuestion && Math.random() > 0.7 ? 'animate-jitter' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        answers[currentQuestion] === i ? 'border-lime bg-lime/20' : 'border-gray/40'
                      }`}>
                        {answers[currentQuestion] === i && (
                          <div className="w-2 h-2 rounded-full bg-lime" />
                        )}
                      </div>
                      <span className="text-sm md:text-base">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="text-gray hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Назад
                </button>
                <button
                  onClick={nextQuestion}
                  disabled={answers[currentQuestion] === null}
                  className="bg-lime/10 border border-lime/30 text-lime px-6 py-2 rounded-full text-sm hover:bg-lime/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {currentQuestion === questions.length - 1 ? 'Завершить' : 'Далее →'}
                </button>
              </div>

              {/* Gaslight hints */}
              <AnimatePresence>
                {showMemoryMessage && !clarityMode && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 glass rounded-lg p-4 border-l-2 border-purple/50"
                  >
                    <div className="font-mono text-xs text-purple mb-1">СИСТЕМА ПАМЯТИ:</div>
                    <p className="text-sm text-gray">{showMemoryMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showDenyMessage && !clarityMode && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 glass rounded-lg p-4 border-l-2 border-orange/50"
                  >
                    <div className="font-mono text-xs text-orange mb-1">ВНИМАНИЕ:</div>
                    <p className="text-sm text-gray">{showDenyMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result — but it's not a real result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="font-mono text-xs text-purple mb-4 tracking-widest">РЕЗУЛЬТАТ ОБРАБОТКИ</div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
                Тест завершён
              </h2>

              {/* Fake stats */}
              <div className="glass rounded-xl p-8 mb-8">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="font-heading text-3xl font-bold text-lime">{answeredCount}</div>
                    <div className="font-mono text-xs text-gray">ответов</div>
                  </div>
                  <div>
                    <div className="font-heading text-3xl font-bold text-purple">
                      {gaslightingEnabled && !clarityMode ? Math.floor(Math.random() * 3) + 2 : correctAnswers}
                    </div>
                    <div className="font-mono text-xs text-gray">«верных»</div>
                  </div>
                  <div>
                    <div className="font-heading text-3xl font-bold text-orange">
                      {gaslightingEnabled && !clarityMode ? Math.floor(Math.random() * 5) + 3 : 0}
                    </div>
                    <div className="font-mono text-xs text-gray">изменений</div>
                  </div>
                </div>
                <p className="text-gray text-sm">
                  * Количество «верных» ответов может не соответствовать вашим ожиданиям. 
                  Это часть демонстрации.
                </p>
              </div>

              {/* The real question */}
              <div className="glass rounded-xl p-8 border-l-2 border-lime/50 mb-8 text-left">
                <h3 className="font-heading text-xl font-bold mb-4 text-lime">
                  А теперь — настоящий вопрос
                </h3>
                <p className="text-gray mb-4">
                  Во время этого теста вы столкнулись с:
                </p>
                <ul className="space-y-2 text-sm text-gray mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-lime mt-1">◉</span>
                    <span>Изменением формулировок вопросов после вашего ответа</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime mt-1">◉</span>
                    <span>Перестановкой вариантов местами (иногда вместе с вашим выбором)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime mt-1">◉</span>
                    <span>Фейковыми «подсказками» от системы, которые противоречат реальности</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime mt-1">◉</span>
                    <span>Утверждениями о вашей памяти, которых у вас нет</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime mt-1">◉</span>
                    <span>Искажением времени и пространства интерфейса</span>
                  </li>
                </ul>
                <p className="text-gray mb-4">
                  И всё же — вы ответили на все вопросы. Вы сделали выбор.
                </p>
              </div>

              {/* Reflection questions — user must answer themselves */}
              <div className="glass rounded-xl p-8 border-l-2 border-purple/50 mb-8 text-left">
                <h3 className="font-heading text-xl font-bold mb-4 text-purple">
                  Вопросы, на которые ответите только вы
                </h3>
                <div className="space-y-4 text-gray">
                  <p className="italic">
                    «Насколько вы уверены, что ваши ответы — действительно ваши?»
                  </p>
                  <p className="italic">
                    «Сколько раз вы усомнились в себе, хотя были правы?»
                  </p>
                  <p className="italic">
                    «Как часто в реальной жизни интерфейс вокруг вас меняется — а вы продолжаете делать вид, что всё нормально?»
                  </p>
                  <p className="italic">
                    «Что вы чувствуете, когда вам говорят "тебе показалось" — и вы начинаете сомневаться?»
                  </p>
                </div>
              </div>

              {/* Final message */}
              <div className="glass rounded-xl p-8 mb-8">
                <p className="text-lg mb-4">
                  Главный вывод этого теста — <span className="text-lime font-bold">его нет</span>.
                </p>
                <p className="text-gray text-sm mb-4">
                  Или он есть — но вы должны сделать его сами. 
                  Мы не скажем вам, подвержены ли вы газлайтингу. 
                  Мы показали, как это работает. Остальное — ваш выбор.
                </p>
                <p className="text-gray/60 text-xs font-mono">
                  Если во время теста вы почувствовали дезориентацию — это и есть ответ.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/" 
                  className="bg-lime text-cosmic px-6 py-3 rounded-full font-heading font-bold hover:animate-pulse-glow transition-all text-center"
                >
                  Вернуться на главную
                </a>
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers(Array(questions.length).fill(null));
                    setShowResult(false);
                    setTestStarted(true);
                    setQuestionTextOverride(null);
                    setOptionsOverride(null);
                  }}
                  className="border border-purple/40 text-purple px-6 py-3 rounded-full font-heading hover:bg-purple/10 transition-colors"
                >
                  Пройти ещё раз
                </button>
              </div>

              <p className="text-xs text-gray/40 mt-8 font-mono">
                * При повторном прохождении результаты могут отличаться. Или не могут. Решайте сами.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
