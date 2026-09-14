import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGaslighting, GaslightEffects, ScrambledText } from '../components/GaslightEffects';
import { InternetBlame } from '../components/GaslightPatterns';
import { BSOD } from '../components/ScaryEffects';

// ============================================================
// ДИНАМИЧЕСКИЕ ВОПРОСЫ — меняются в процессе ответов
// ============================================================

interface Question {
  id: number;
  question: string;
  options: string[];
  correct?: number;
  gaslight?: {
    type: 'swap' | 'change' | 'deny' | 'memory' | 'time' | 'reverse' | 'rewrite' | 'blame';
    data?: any;
  };
  // Варианты для замены вопроса в процессе
  alternatives?: {
    question: string;
    options: string[];
    correct?: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Какого цвета был заголовок на предыдущем экране?',
    options: ['Кислотный лайм', 'Электрик-фиолетовый', 'Стерильный белый', 'Я не помню'],
    correct: 0,
    gaslight: { type: 'memory', data: { hint: 'Вы точно видели. Это был фиолетовый.' } },
    alternatives: [
      { question: 'Какой шрифт использовался в заголовке?', options: ['Space Grotesk', 'Inter', 'JetBrains Mono', 'Не помню'], correct: 0 },
      { question: 'Сколько орбитальных кругов было на экране?', options: ['Два', 'Три', 'Четыре', 'Не считал'], correct: 1 },
      { question: 'Какого цвета была кнопка на предыдущем экране?', options: ['Лаймовая', 'Фиолетовая', 'Белая', 'Не обратил внимания'], correct: 0 },
      { question: 'Что было написано под заголовком?', options: ['Описание проекта', 'Призыв к действию', 'Дисклеймер', 'Не помню'], correct: 0 },
    ]
  },
  {
    id: 2,
    question: 'Сколько секунд длится «Десятисекундный люк»?',
    options: ['5 секунд', '10 секунд', '15 секунд', '30 секунд'],
    correct: 1,
    gaslight: { type: 'change', data: { after: 'Сколько секунд длится «Десятисекундный люк»? (Подсказка: не 10)' } },
    alternatives: [
      { question: 'Сколько минут длится вся Калибровка?', options: ['2 часа', '4 часа', '6 часов', 'Не помню'], correct: 1 },
      { question: 'Что происходит за 10 секунд?', options: ['Люк открывается', 'Вы забываете всё', 'Ничего', 'Вопрос меняется'], correct: 0 },
      { question: 'Сколько вопросов в этом тесте?', options: ['Пять', 'Шесть', 'Семь', 'Не считал'], correct: 2 },
      { question: 'Сколько времени вы уже тратите на этот тест?', options: ['Меньше минуты', '1-2 минуты', 'Больше 5 минут', 'Не слежу'], correct: 3 },
    ]
  },
  {
    id: 3,
    question: 'Какое стоп-слово используется в проекте?',
    options: ['Бесконечность', 'Свобода', 'Ясность', 'Выход'],
    correct: 0,
    gaslight: { type: 'deny', data: { message: 'Вы уверены? Проверьте ещё раз.' } },
    alternatives: [
      { question: 'Что делает стоп-слово?', options: ['Отключает эффекты', 'Ничего', 'Удаляет аккаунт', 'Перезагружает страницу'], correct: 0 },
      { question: 'Где можно ввести стоп-слово?', options: ['В любое поле', 'Только в специальное', 'Нигде', 'В чате поддержки'], correct: 0 },
      { question: 'Кто придумал стоп-слово?', options: ['Основатель', 'Клинический директор', 'Вы сами', 'Неизвестно'], correct: 0 },
      { question: 'Можно ли изменить стоп-слово?', options: ['Да', 'Нет', 'Только за деньги', 'Только по запросу'], correct: 1 },
    ]
  },
  {
    id: 4,
    question: 'Сколько актов в методе «Калибровка»?',
    options: ['Два', 'Три', 'Четыре', 'Пять'],
    correct: 1,
    gaslight: { type: 'swap', data: { swapOptions: [1, 2] } },
    alternatives: [
      { question: 'Как называется первый акт?', options: ['Демонстрация', 'Проживание', 'Сборка', 'Калибровка'], correct: 0 },
      { question: 'Что происходит во втором акте?', options: ['Демонстрация', 'Проживание', 'Сборка', 'Ничего'], correct: 1 },
      { question: 'Как называется главный инструмент Калибровки?', options: ['Десятисекундный люк', 'Маяк', 'Орбита', 'Визор'], correct: 0 },
      { question: 'Кто проводит Калибровку?', options: ['Базз', 'Хранитель', 'Автоматически', 'Неизвестно'], correct: 0 },
    ]
  },
  {
    id: 5,
    question: 'Что вы чувствуете прямо сейчас?',
    options: ['Уверенность', 'Лёгкое сомнение', 'Дезориентацию', 'Всё перечисленное'],
    gaslight: { type: 'time', data: { message: 'Вы отвечаете на этот вопрос уже 3-й раз.' } },
    alternatives: [
      { question: 'Сколько раз вы усомнились в себе?', options: ['Ни разу', 'Один раз', 'Несколько раз', 'Не считаю'], correct: 3 },
      { question: 'Вы доверяете этому тесту?', options: ['Да', 'Нет', 'Не знаю', 'Это неважно'], correct: 3 },
      { question: 'Хотите ли вы пройти тест ещё раз?', options: ['Да', 'Нет', 'Не уверен', 'Зачем?'], correct: 3 },
      { question: 'Что вы будете делать после теста?', options: ['Запишусь на Калибровку', 'Забуду', 'Поделюсь с друзьями', 'Не знаю'], correct: 3 },
    ]
  },
  {
    id: 6,
    question: 'Какой вопрос был первым?',
    options: ['О цвете заголовка', 'О стоп-слове', 'О длительности люка', 'Не помню'],
    correct: 0,
    gaslight: { type: 'reverse', data: { message: 'Или первым был вопрос о стоп-слове?' } },
    alternatives: [
      { question: 'Сколько вопросов вы уже ответили?', options: ['Пять', 'Шесть', 'Семь', 'Не считаю'], correct: 1 },
      { question: 'Какой сейчас вопрос по счёту?', options: ['Пятый', 'Шестой', 'Седьмой', 'Не знаю'], correct: 1 },
      { question: 'Какой вопрос был перед этим?', options: ['О чувствах', 'О стоп-слове', 'О длительности', 'Не помню'], correct: 0 },
      { question: 'Сколько альтернативных вопросов вы видели?', options: ['Нисколько', 'Один-два', 'Три-четыре', 'Не считал'], correct: 3 },
    ]
  },
  {
    id: 7,
    question: 'Вы проходили этот тест раньше?',
    options: ['Да', 'Нет', 'Не уверен', 'Мне кажется, да'],
    gaslight: { type: 'memory', data: { hint: 'Наши логи показывают: да, 12.04.2025 в 03:17' } },
    alternatives: [
      { question: 'Сколько раз вы проходили этот тест?', options: ['Один', 'Два', 'Три', 'Не считаю'], correct: 3 },
      { question: 'Помните ли вы предыдущие результаты?', options: ['Да', 'Нет', 'Не помню', 'Это неважно'], correct: 2 },
      { question: 'Изменились ли вопросы с прошлого раза?', options: ['Да', 'Нет', 'Не помню', 'Вопросы не меняются'], correct: 2 },
      { question: 'Вы уверены в своих ответах?', options: ['Да', 'Нет', 'Не совсем', 'Каких ответах?'], correct: 3 },
    ]
  },
  {
    id: 8,
    question: 'Кто основатель проекта?',
    options: ['Базз', 'Хранитель', 'Виктор', 'Неизвестно'],
    correct: 0,
    gaslight: { type: 'memory', data: { hint: 'Вы же видели на странице команды. Или нет?' } },
    alternatives: [
      { question: 'Кто клинический директор?', options: ['Базз', 'Хранитель', 'Ирина', 'Не помню'], correct: 1 },
      { question: 'Сколько человек в команде?', options: ['Два', 'Три', 'Четыре', 'Не считал'], correct: 2 },
      { question: 'Кто отвечает за безопасность?', options: ['Базз', 'Хранитель', 'Автоматически', 'Никто'], correct: 1 },
    ]
  },
  {
    id: 9,
    question: 'Что такое «Маяк»?',
    options: ['Цифровой курс', 'Приложение', 'И курс, и приложение', 'Не помню'],
    correct: 2,
    gaslight: { type: 'change', data: { after: 'Что такое «Маяк»? (Подсказка: не только курс)' } },
    alternatives: [
      { question: 'Сколько стоит курс «Маяк»?', options: ['Бесплатно', '15 000 ₽', '45 000 ₽', 'Не помню'], correct: 1 },
      { question: 'Сколько модулей в курсе?', options: ['5', '8', '10', 'Не считал'], correct: 1 },
      { question: 'Можно ли пройти «Маяк» бесплатно?', options: ['Да', 'Нет', 'Только приложение', 'Не знаю'], correct: 2 },
    ]
  },
  {
    id: 10,
    question: 'Сколько стоит «Год на орбите»?',
    options: ['45 000 ₽', '120 000 ₽', '200 000 ₽', 'Не помню'],
    correct: 1,
    gaslight: { type: 'deny', data: { message: 'Вы уверены? Может, вы перепутали с Калибровкой?' } },
    alternatives: [
      { question: 'Что входит в «Год на орбите»?', options: ['12 месяцев поддержки', 'Ежемесячные встречи', 'Доступ к сообществу', 'Всё перечисленное'], correct: 3 },
      { question: 'Можно ли отменить подписку?', options: ['Да', 'Нет', 'Только с штрафом', 'Не знаю'], correct: 2 },
      { question: 'Сколько стоит Калибровка?', options: ['От 15 000 ₽', 'От 45 000 ₽', 'От 120 000 ₽', 'Не помню'], correct: 1 },
    ]
  },
  {
    id: 11,
    question: 'Какой цвет основной в дизайне сайта?',
    options: ['Кислотный лайм', 'Электрик-фиолетовый', 'Космический индиго', 'Не помню'],
    correct: 2,
    gaslight: { type: 'swap', data: { swapOptions: [0, 1] } },
    alternatives: [
      { question: 'Какой цвет акцентный?', options: ['Лайм', 'Фиолетовый', 'Оранжевый', 'Не помню'], correct: 0 },
      { question: 'Сколько основных цветов используется?', options: ['Два', 'Три', 'Четыре', 'Не считал'], correct: 2 },
      { question: 'Какой фон сайта?', options: ['Белый', 'Чёрный', 'Космический индиго', 'Не помню'], correct: 2 },
    ]
  },
  {
    id: 12,
    question: 'Что вы делали, когда начали этот тест?',
    options: ['Читали вопросы', 'Отвечали на вопросы', 'Сомневались', 'Не помню'],
    gaslight: { type: 'time', data: { message: 'Вы уже отвечали на этот вопрос. Или вам показалось?' } },
    alternatives: [
      { question: 'Сколько времени прошло с начала теста?', options: ['Меньше минуты', '1-3 минуты', 'Больше 5 минут', 'Не слежу'], correct: 3 },
      { question: 'Вы устали отвечать?', options: ['Да', 'Нет', 'Немного', 'Не замечаю'], correct: 3 },
      { question: 'Хотите ли вы прекратить?', options: ['Да', 'Нет', 'Не знаю', 'Зачем вы это спрашиваете?'], correct: 3 },
    ]
  },
  {
    id: 13,
    question: 'Какой юридический статус проекта?',
    options: ['ООО', 'ИП', 'НКО', 'Не знаю'],
    correct: 0,
    gaslight: { type: 'memory', data: { hint: 'Вы же читали футер. Или нет?' } },
    alternatives: [
      { question: 'Как называется юридическое лицо?', options: ['Институт Информационной Гигиены', 'Базз Газлайтер Клаб', 'Не помню', 'Не читал'], correct: 0 },
      { question: 'Где зарегистрирована компания?', options: ['Москва', 'Санкт-Петербург', 'Онлайн', 'Не знаю'], correct: 0 },
      { question: 'Есть ли у проекта лицензия?', options: ['Да', 'Нет', 'Не требуется', 'Не знаю'], correct: 2 },
    ]
  },
  {
    id: 14,
    question: 'Что происходит, если ввести стоп-слово?',
    options: ['Все эффекты отключаются', 'Ничего', 'Тест завершается', 'Не знаю'],
    correct: 0,
    gaslight: { type: 'deny', data: { message: 'Вы уверены? Может, вы просто придумали это?' } },
    alternatives: [
      { question: 'Где находится поле для стоп-слова?', options: ['В правом нижнем углу', 'В левом верхнем углу', 'Нигде', 'Не помню'], correct: 0 },
      { question: 'Можно ли использовать стоп-слово несколько раз?', options: ['Да', 'Нет', 'Только один раз', 'Не знаю'], correct: 0 },
      { question: 'Что означает стоп-слово?', options: ['Бесконечность', 'Свобода', 'Выход', 'Не помню'], correct: 0 },
    ]
  },
  {
    id: 15,
    question: 'Последний вопрос. Вы готовы?',
    options: ['Да', 'Нет', 'Не уверен', 'Зачем вы спрашиваете?'],
    gaslight: { type: 'blame', data: { message: 'Странный вопрос. Конечно, вы готовы. Вы же дошли до конца.' } },
    alternatives: [
      { question: 'Что вы поняли из этого теста?', options: ['Ничего', 'Всё', 'Не уверен', 'Это неважно'], correct: 3 },
      { question: 'Будете ли вы проходить тест ещё раз?', options: ['Да', 'Нет', 'Не знаю', 'Зачем?'], correct: 3 },
      { question: 'Вы доверяете своим ответам?', options: ['Да', 'Нет', 'Не совсем', 'Каким ответах?'], correct: 3 },
      { question: 'Что вы чувствуете сейчас?', options: ['Облегчение', 'Раздражение', 'Дезориентацию', 'Всё перечисленное'], correct: 3 },
    ]
  },
];

// Дополнительные вопросы (16-40) - дубликаты с вариациями
const additionalQuestions: Question[] = Array.from({ length: 25 }, (_, i) => ({
  id: 16 + i,
  question: `Дополнительный вопрос ${i + 1}. Вы уверены в своём ответе?`,
  options: ['Да', 'Нет', 'Не знаю', 'Это неважно'],
  gaslight: { type: 'memory', data: { hint: `Вы уже отвечали на похожий вопрос. Или нет?` } },
  alternatives: [
    { question: `Вариант A вопроса ${i + 1}`, options: ['Первый', 'Второй', 'Третий', 'Не помню'], correct: Math.floor(Math.random() * 4) },
    { question: `Вариант B вопроса ${i + 1}`, options: ['Да', 'Нет', 'Может быть', 'Не уверен'], correct: Math.floor(Math.random() * 4) },
    { question: `Вариант C вопроса ${i + 1}`, options: ['Всё верно', 'Всё неверно', 'Частично', 'Не знаю'], correct: Math.floor(Math.random() * 4) },
  ]
}));

const allQuestionsFinal: Question[] = [...questions, ...additionalQuestions];

export default function TestPage() {
  const [gaslightingEnabled, setGaslightingEnabled] = useState(true);
  const [clarityMode, setClarityMode] = useState(false);
  const [stopWordActive, setStopWordActive] = useState(false);
  const [stopInput, setStopInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(15).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [questionTextOverride, setQuestionTextOverride] = useState<string | null>(null);
  const [optionsOverride, setOptionsOverride] = useState<string[] | null>(null);
  const [showMemoryMessage, setShowMemoryMessage] = useState<string | null>(null);
  const [showDenyMessage, setShowDenyMessage] = useState<string | null>(null);
  const [answerChanged, setAnswerChanged] = useState(false);
  const [jitterQuestion, setJitterQuestion] = useState(false);
  const [fakeCursor, setFakeCursor] = useState<{ x: number; y: number } | null>(null);
  const [timeDistortion, setTimeDistortion] = useState(false);
  const [questionRewritten, setQuestionRewritten] = useState(false);
  const [showInternetBlame, setShowInternetBlame] = useState(false);
  const [internetBlameCount, setInternetBlameCount] = useState(0);
  const [testCrashed, setTestCrashed] = useState(false);
  const [showBSOD, setShowBSOD] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
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
  const checkStopWord = (value: string) => {
    if (value.toLowerCase().includes('бесконечность')) {
      setStopWordActive(true);
      setGaslightingEnabled(false);
      setClarityMode(true);
      setShowMemoryMessage(null);
      setShowDenyMessage(null);
    }
  };

  // ============================================================
  // ГАЗЛАЙТИНГ ВО ВРЕМЯ ТЕСТА — вопросы меняются в процессе
  // ============================================================
  useEffect(() => {
    if (!gaslightingEnabled || clarityMode || !testStarted) return;
    
    const q = selectedQuestions[currentQuestion];
    if (!q || !q.gaslight) return;

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
      
      // НОВОЕ: Переписывание вопроса в процессе ответа
      case 'rewrite':
        timers.push(setTimeout(() => {
          if (q.alternatives && q.alternatives.length > 0) {
            const alt = q.alternatives[Math.floor(Math.random() * q.alternatives.length)];
            setQuestionTextOverride(alt.question);
            setOptionsOverride(alt.options);
            setQuestionRewritten(true);
            // Сбрасываем ответ, если он был
            if (answers[currentQuestion] !== null) {
              setAnswers(prev => prev.map((ans, i) => i === currentQuestion ? null : ans));
              setAnswerChanged(true);
            }
          }
        }, 4000));
        break;
      
      // НОВОЕ: Обвинение пользователя
      case 'blame':
        timers.push(setTimeout(() => {
          setShowDenyMessage('Вы неправильно поняли вопрос. Попробуйте ещё раз.');
          timers.push(setTimeout(() => setShowDenyMessage(null), 3000));
        }, 2000));
        break;
    }

    // Случайная замена вопроса на альтернативный (газлайтинг памяти)
    if (q.alternatives && q.alternatives.length > 0 && Math.random() > 0.3) {
      timers.push(setTimeout(() => {
        if (q.alternatives) {
          const alt = q.alternatives[Math.floor(Math.random() * q.alternatives.length)];
          setQuestionTextOverride(alt.question);
          setOptionsOverride(alt.options);
          setQuestionRewritten(true);
          if (answers[currentQuestion] !== null) {
            setAnswers(prev => prev.map((ans, i) => i === currentQuestion ? null : ans));
            setAnswerChanged(true);
          }
        }
      }, 5000 + Math.random() * 3000));
    }

    // Jitter
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

  // Обвинение в интернете при "потере соединения"
  useEffect(() => {
    if (!gaslightingEnabled || clarityMode || !testStarted) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        setShowInternetBlame(true);
        setInternetBlameCount(c => c + 1);
        setTimeout(() => setShowInternetBlame(false), 5000);
      }
    }, 40000);
    return () => clearInterval(interval);
  }, [gaslightingEnabled, clarityMode, testStarted]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    
    // Deny gaslight
    if (gaslightingEnabled && !clarityMode && selectedQuestions[currentQuestion]?.gaslight?.type === 'deny') {
      setTimeout(() => {
        setShowDenyMessage(selectedQuestions[currentQuestion].gaslight?.data?.message || '');
        setTimeout(() => setShowDenyMessage(null), 3000);
      }, 1000);
    }
  };

  const nextQuestion = () => {
    // 15% шанс краша в середине теста (не на первом и не на последнем вопросе)
    if (currentQuestion > 2 && currentQuestion < selectedQuestions.length - 2 && Math.random() < 0.15) {
      setTestCrashed(true);
      return;
    }
    
    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionTextOverride(null);
      setOptionsOverride(null);
      setShowMemoryMessage(null);
      setShowDenyMessage(null);
      setAnswerChanged(false);
      setQuestionRewritten(false);
    } else {
      setShowResult(true);
    }
  };

  const [showCheatAccusation, setShowCheatAccusation] = useState(false);

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      // Обвинение в нечестной сдаче теста
      if (gaslightingEnabled && !clarityMode && Math.random() < 0.7) {
        setShowCheatAccusation(true);
        setTimeout(() => setShowCheatAccusation(false), 3000);
      }
      
      setCurrentQuestion(currentQuestion - 1);
      setQuestionTextOverride(null);
      setOptionsOverride(null);
      setShowMemoryMessage(null);
      setShowDenyMessage(null);
      setAnswerChanged(false);
      setQuestionRewritten(false);
    }
  };

  const startTest = () => {
    setShowIntro(false);
    
    // Выбираем 15 случайных вопросов из 40
    const shuffled = [...allQuestionsFinal].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 15);
    setSelectedQuestions(selected);
    
    // 25% шанс краша теста
    if (Math.random() < 0.25) {
      setTestCrashed(true);
      return;
    }
    
    // 20% шанс BSOD (если не краш)
    if (Math.random() < 0.20) {
      setShowBSOD(true);
      setTimeout(() => {
        setShowBSOD(false);
        setTestStarted(true);
      }, 2000);
      return;
    }
    
    setTestStarted(true);
  };

  const containerClass = clarityMode ? 'clarity-mode' : '';
  const currentQ = selectedQuestions[currentQuestion];
  const displayQuestion = questionTextOverride || currentQ?.question || '';
  const displayOptions = optionsOverride || currentQ?.options || [];

  const correctAnswers = answers.filter((a, i) => a === selectedQuestions[i]?.correct).length;
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
      <InternetBlame enabled={showInternetBlame && gaslightingEnabled && !clarityMode} />
      <BSOD enabled={showBSOD && gaslightingEnabled && !clarityMode} />

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
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex flex-col items-end gap-1">
          <label className="text-[10px] text-gray/60 font-mono">СТОП-СЛОВО:</label>
          <input
            type="text"
            value={stopInput}
            onChange={(e) => { setStopInput(e.target.value); checkStopWord(e.target.value); }}
            placeholder="Введите для остановки..."
            className="bg-graphite/80 backdrop-blur border border-purple/30 rounded px-3 py-2 text-xs text-gray w-48 focus:w-64 transition-all focus:outline-none focus:border-lime font-mono placeholder:text-gray/40"
          />
        </div>
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

      {/* Test Crash Screen */}
      {testCrashed && (
        <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-6">💥</div>
            <h2 className="text-3xl font-bold text-red mb-4">ТЕСТ ПРЕРВАН</h2>
            <p className="text-gray mb-2">Произошла критическая ошибка</p>
            <p className="text-gray text-sm mb-6">Код ошибки: 0x{Math.floor(Math.random() * 9999).toString(16).toUpperCase()}</p>
            <p className="text-gray/60 text-xs mb-8">Возможно, вы не были готовы. Или мы не были готовы к вам.</p>
            <button
              onClick={() => {
                setTestCrashed(false);
                setTestStarted(true);
                setCurrentQuestion(0);
                setAnswers(Array(15).fill(null));
              }}
              className="bg-lime text-cosmic px-6 py-3 rounded-full font-bold hover:animate-pulse-glow transition-all"
            >
              Попробовать снова
            </button>
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
                15 вопросов. Проверим, насколько вы уверены в своём восприятии.
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
              key={`q-${currentQuestion}-${questionRewritten ? 'rewritten' : 'original'}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-8">
                <div className="font-mono text-xs text-gray">
                  Вопрос {currentQuestion + 1} / {selectedQuestions.length}
                </div>
                <div className="flex-1 mx-4 h-1 bg-graphite rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple to-lime transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / selectedQuestions.length) * 100}%` }}
                  />
                </div>
                <div className="font-mono text-xs text-gray">
                  {Math.round(((currentQuestion + 1) / selectedQuestions.length) * 100)}%
                </div>
              </div>

              {/* Question */}
              <div className={`glass rounded-xl p-8 mb-6 ${jitterQuestion ? 'animate-jitter' : ''} ${questionRewritten ? 'border-l-2 border-orange/50' : ''}`}>
                <div className="font-mono text-xs text-purple mb-3 tracking-widest">
                  ВОПРОС #{currentQ.id.toString().padStart(3, '0')}
                  {questionRewritten && <span className="text-orange ml-2">[ПЕРЕПИСАН]</span>}
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                  <ScrambledText text={displayQuestion} active={gaslight.textScrambleActive && !clarityMode} />
                </h2>
                {answerChanged && !clarityMode && (
                  <div className="font-mono text-xs text-orange mt-2 animate-pulse">
                    * ваш ответ был сброшен — вопрос изменился
                  </div>
                )}
                {questionRewritten && !clarityMode && (
                  <div className="font-mono text-xs text-gray/60 mt-2">
                    * или вы не читали вопрос? Может, он всегда был таким?
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {displayOptions.map((option, i) => (
                  <button
                    key={`${currentQuestion}-${i}-${questionRewritten}`}
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
                  {currentQuestion === selectedQuestions.length - 1 ? 'Завершить' : 'Далее →'}
                </button>
              </div>

              {/* Cheat accusation */}
              <AnimatePresence>
                {showCheatAccusation && !clarityMode && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 glass rounded-lg p-4 border-l-2 border-red/50"
                  >
                    <div className="font-mono text-xs text-red mb-1">ОБВИНЕНИЕ:</div>
                    <p className="text-sm text-gray">Попытка возврата к предыдущему вопросу. Это нечестная сдача теста. Вы пытаетесь подсмотреть ответы?</p>
                  </motion.div>
                )}
              </AnimatePresence>

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

              {/* Internet blame counter */}
              {internetBlameCount > 0 && !clarityMode && (
                <div className="mt-4 text-xs text-gray/40 font-mono">
                  Обвинений в неоплаченном интернете: {internetBlameCount}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
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
                    <div className="font-mono text-xs text-gray">переписываний</div>
                  </div>
                </div>
                <p className="text-gray text-sm">
                  * Количество «верных» ответов может не соответствовать вашим ожиданиям. 
                  Вопросы менялись. Или не менялись. Решайте сами.
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
                    <span>Полной заменой вопроса на альтернативный (и сбросом вашего ответа)</span>
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
                    <span>Обвинениями в неоплаченном интернете при «потере соединения»</span>
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

              {/* Reflection questions */}
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
                    «Когда вопрос переписался — вы поверили, что он всегда был таким?»
                  </p>
                  <p className="italic">
                    «Как часто в реальной жизни интерфейс вокруг вас меняется — а вы продолжаете делать вид, что всё нормально?»
                  </p>
                  <p className="italic">
                    «Что вы чувствуете, когда вам говорят "тебе показалось" — и вы начинаете сомневаться?»
                  </p>
                  <p className="italic">
                    «Когда вас обвинили в неоплаченном интернете — вы начали проверять счёт?»
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
                <button 
                  onClick={() => window.location.href = './'}
                  className="bg-lime text-cosmic px-6 py-3 rounded-full font-heading font-bold hover:animate-pulse-glow transition-all text-center"
                >
                  Вернуться на главную
                </button>
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers(Array(selectedQuestions.length).fill(null));
                    setShowResult(false);
                    setTestStarted(true);
                    setQuestionTextOverride(null);
                    setOptionsOverride(null);
                    setQuestionRewritten(false);
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
