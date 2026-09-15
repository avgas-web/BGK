import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGaslighting, GaslightEffects } from '../components/GaslightEffects';
import TestDebrief, { Manipulation } from '../components/TestDebrief';
import { FinancialPanic } from '../components/FinancialPanic';
import { InternetBlame } from '../components/GaslightPatterns';
import { BSOD } from '../components/ScaryEffects';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct?: number;
  alternatives?: { question: string; options: string[]; correct?: number }[];
}

// Все вопросы (60 штук) - создаём один раз
const allQuestions: Question[] = [
  { id: 1, question: 'Какого цвета был заголовок на предыдущем экране?', options: ['Кислотный лайм', 'Электрик-фиолетовый', 'Стерильный белый', 'Я не помню'], correct: 0 },
  { id: 2, question: 'Сколько секунд длится «Десятисекундный люк»?', options: ['5 секунд', '10 секунд', '15 секунд', '30 секунд'], correct: 1 },
  { id: 3, question: 'Какое стоп-слово используется в проекте?', options: ['Бесконечность', 'Свобода', 'Ясность', 'Выход'], correct: 0 },
  { id: 4, question: 'Сколько актов в методе «Калибровка»?', options: ['Два', 'Три', 'Четыре', 'Пять'], correct: 1 },
  { id: 5, question: 'Какой закон описывает взаимосвязь между давлением, объёмом и температурой газа?', options: ['Закон Бойля-Мариотта', 'Закон Ома', 'Закон Ньютона', 'Закон Кулона'], correct: 0 },
  { id: 6, question: 'Какой процесс происходит при делении ядра урана-235?', options: ['Синтез', 'Деление', 'Ионизация', 'Нейтрализация'], correct: 1 },
  { id: 7, question: 'Что является основным источником энергии на Земле?', options: ['Луна', 'Солнце', 'Ядро Земли', 'Ветер'], correct: 1 },
  // Вопросы 1-5 классы
  { id: 8, question: 'Сколько будет 2 + 2?', options: ['3', '4', '5', 'Не помню'], correct: 1 },
  { id: 9, question: 'Какая планета ближе всего к Солнцу?', options: ['Венера', 'Земля', 'Меркурий', 'Марс'], correct: 2 },
  { id: 10, question: 'Кто написал "Евгений Онегин"?', options: ['Лермонтов', 'Пушкин', 'Гоголь', 'Толстой'], correct: 1 },
  { id: 11, question: 'Сколько дней в неделе?', options: ['5', '6', '7', '8'], correct: 2 },
  { id: 12, question: 'Какой цвет получается при смешении синего и жёлтого?', options: ['Красный', 'Зелёный', 'Оранжевый', 'Фиолетовый'], correct: 1 },
  { id: 13, question: 'Столица России?', options: ['Санкт-Петербург', 'Москва', 'Казань', 'Новосибирск'], correct: 1 },
  { id: 14, question: 'Сколько будет 7 × 8?', options: ['54', '56', '58', 'Не помню'], correct: 1 },
  { id: 15, question: 'Какое животное является символом России?', options: ['Орёл', 'Медведь', 'Тигр', 'Волк'], correct: 1 },
  { id: 16, question: 'Сколько ног у паука?', options: ['6', '8', '10', 'Не помню'], correct: 1 },
  { id: 17, question: 'Кто нарисовал "Мону Лизу"?', options: ['Микеланджело', 'Леонардо да Винчи', 'Рафаэль', 'Не помню'], correct: 1 },
  { id: 18, question: 'Какой океан самый большой?', options: ['Атлантический', 'Индийский', 'Тихий', 'Северный Ледовитый'], correct: 2 },
  { id: 19, question: 'Сколько будет 100 - 37?', options: ['53', '63', '73', 'Не помню'], correct: 1 },
  { id: 20, question: 'Какое время года идёт после весны?', options: ['Зима', 'Лето', 'Осень', 'Не помню'], correct: 1 },
  // Вопросы 9-11 классы
  { id: 21, question: 'Кто сформулировал закон всемирного тяготения?', options: ['Эйнштейн', 'Ньютон', 'Галилей', 'Кеплер'], correct: 1 },
  { id: 22, question: 'Какой химический элемент имеет символ Fe?', options: ['Фтор', 'Железо', 'Фосфор', 'Франций'], correct: 1 },
  { id: 23, question: 'Кто написал "Преступление и наказание"?', options: ['Толстой', 'Достоевский', 'Тургенев', 'Чехов'], correct: 1 },
  { id: 24, question: 'В каком году началась Великая Отечественная война?', options: ['1939', '1941', '1942', 'Не помню'], correct: 1 },
  { id: 25, question: 'Что такое ДНК?', options: ['Дезоксирибонуклеиновая кислота', 'Динамическая nuclear кислота', 'ДНК-полимераза', 'Не помню'], correct: 0 },
  { id: 26, question: 'Какая формула воды?', options: ['H2O', 'CO2', 'NaCl', 'Не помню'], correct: 0 },
  { id: 27, question: 'Кто написал "Мастер и Маргарита"?', options: ['Пастернак', 'Булгаков', 'Набоков', 'Не помню'], correct: 1 },
  { id: 28, question: 'Что такое теорема Пифагора?', options: ['a² + b² = c²', 'a + b = c', 'a × b = c', 'Не помню'], correct: 0 },
  { id: 29, question: 'Кто отменил крепостное право в России?', options: ['Пётр I', 'Александр II', 'Николай II', 'Не помню'], correct: 1 },
  { id: 30, question: 'Что такое фотосинтез?', options: ['Процесс создания органических веществ из неорганических', 'Процесс дыхания растений', 'Процесс размножения', 'Не помню'], correct: 0 },
  { id: 31, question: 'Что такое закон Ома?', options: ['I = U/R', 'F = ma', 'E = mc²', 'Не помню'], correct: 0 },
  { id: 32, question: 'Что такое митоз?', options: ['Деление клетки с сохранением числа хромосом', 'Деление клетки с уменьшением числа хромосом', 'Слияние клеток', 'Не помню'], correct: 0 },
  { id: 33, question: 'Что такое скорость света?', options: ['300 000 км/с', '150 000 км/с', '1 000 000 км/с', 'Не помню'], correct: 0 },
  { id: 34, question: 'Что такое периодический закон?', options: ['Свойства элементов периодически зависят от заряда ядра', 'Все элементы радиоактивны', 'Элементы не меняются', 'Не помню'], correct: 0 },
  { id: 35, question: 'Кто написал "Тихий Дон"?', options: ['Шолохов', 'Пастернак', 'Солженицын', 'Не помню'], correct: 0 },
  { id: 36, question: 'Что такое теория эволюции?', options: ['Виды изменяются под действием естественного отбора', 'Виды не меняются', 'Все виды созданы одновременно', 'Не помню'], correct: 0 },
  { id: 37, question: 'Что такое Конституция РФ?', options: ['Основной закон государства', 'Уголовный кодекс', 'Гражданский кодекс', 'Не помню'], correct: 0 },
  { id: 38, question: 'Что такое инфляция?', options: ['Повышение общего уровня цен', 'Снижение общего уровня цен', 'Стабильность цен', 'Не помню'], correct: 0 },
  { id: 39, question: 'Кто написал "Войну и мир"?', options: ['Достоевский', 'Толстой', 'Чехов', 'Не помню'], correct: 1 },
  { id: 40, question: 'Что такое гравитация?', options: ['Сила притяжения между массами', 'Сила отталкивания', 'Электромагнитная сила', 'Не помню'], correct: 0 },
  // Вопросы из 11 класса (физика, химия, биология, литература, история, обществознание)
  { id: 41, question: 'Что такое электромагнитная индукция?', options: ['Явление возникновения электрического тока при изменении магнитного поля', 'Процесс намагничивания', 'Процесс размагничивания', 'Не помню'], correct: 0 },
  { id: 42, question: 'Какая формула описывает энергию фотона?', options: ['E = mc²', 'E = hν', 'E = mv²/2', 'E = kx'], correct: 1 },
  { id: 43, question: 'Что такое квантовая механика?', options: ['Раздел физики, изучающий поведение макроскопических тел', 'Раздел физики, изучающий поведение микроскопических частиц', 'Раздел химии', 'Раздел биологии'], correct: 1 },
  { id: 44, question: 'Какой тип химической связи возникает между атомами металлов?', options: ['Ионная', 'Ковалентная', 'Металлическая', 'Водородная'], correct: 2 },
  { id: 45, question: 'Что такое окислительно-восстановительная реакция?', options: ['Реакция с изменением степеней окисления элементов', 'Реакция нейтрализации', 'Реакция обмена', 'Реакция разложения'], correct: 0 },
  { id: 46, question: 'Какой орган вырабатывает инсулин?', options: ['Печень', 'Поджелудочная железа', 'Почки', 'Надпочечники'], correct: 1 },
  { id: 47, question: 'Что такое мутация?', options: ['Изменение окружающей среды', 'Изменение генетического материала', 'Изменение поведения', 'Изменение климата'], correct: 1 },
  { id: 48, question: 'Кто написал "Анна Каренина"?', options: ['Достоевский', 'Толстой', 'Тургенев', 'Чехов'], correct: 1 },
  { id: 49, question: 'Что такое нигилизм в философии?', options: ['Отрицание общепринятых ценностей', 'Признание абсолютных истин', 'Вера в прогресс', 'Вера в бога'], correct: 0 },
  { id: 50, question: 'Когда произошла Октябрьская революция?', options: ['1905 год', '1914 год', '1917 год', '1920 год'], correct: 2 },
  { id: 51, question: 'Что такое тоталитаризм?', options: ['Политическая система с полным контролем государства над обществом', 'Демократическое правление', 'Анархия', 'Монархия'], correct: 0 },
  { id: 52, question: 'Что такое ВВП?', options: ['Валовой внутренний продукт', 'Внешний валютный поток', 'Внутренний валютный продукт', 'Всемирный валютный фонд'], correct: 0 },
  { id: 53, question: 'Что такое инфляция?', options: ['Устойчивое повышение общего уровня цен', 'Снижение цен', 'Стабильность цен', 'Колебание курса валют'], correct: 0 },
  { id: 54, question: 'Какой закон описывает сохранение энергии?', options: ['Первый закон термодинамики', 'Второй закон термодинамики', 'Третий закон Ньютона', 'Закон Ома'], correct: 0 },
  { id: 55, question: 'Что такое радиоактивный распад?', options: ['Самопроизвольное превращение нестабильных ядер', 'Ускорение частиц', 'Синтез ядер', 'Деление молекул'], correct: 0 },
  { id: 56, question: 'Что такое естественный отбор?', options: ['Процесс выживания наиболее приспособленных организмов', 'Искусственный отбор животных', 'Случайный процесс', 'Процесс размножения'], correct: 0 },
  { id: 57, question: 'Кто автор теории относительности?', options: ['Ньютон', 'Эйнштейн', 'Бор', 'Планк'], correct: 1 },
  { id: 58, question: 'Что такое ДНК-репликация?', options: ['Процесс удвоения ДНК', 'Процесс разрушения ДНК', 'Процесс синтеза белка', 'Процесс мутации'], correct: 0 },
  { id: 59, question: 'Что такое экосистема?', options: ['Совокупность живых организмов и среды их обитания', 'Только живые организмы', 'Только среда обитания', 'Искусственная среда'], correct: 0 },
  { id: 60, question: 'Что такое социальный контракт?', options: ['Соглашение между гражданами и государством', 'Договор между компаниями', 'Международный договор', 'Семейное соглашение'], correct: 0 },
];

interface TestPageProps {
  onBackToHome: () => void;
}

export default function TestPage({ onBackToHome }: TestPageProps) {
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
  const [questionRewritten, setQuestionRewritten] = useState(false);
  const [answerChanged, setAnswerChanged] = useState(false);
  const [showMemoryMessage, setShowMemoryMessage] = useState<string | null>(null);
  const [showDenyMessage, setShowDenyMessage] = useState<string | null>(null);
  const [testCrashed, setTestCrashed] = useState(false);
  const [manipulations, setManipulations] = useState<Manipulation[]>([]);
  const [showDebrief, setShowDebrief] = useState(false);

  const gaslight = useGaslighting(gaslightingEnabled && !clarityMode && !stopWordActive);

  // Дополнительные газлайт-эффекты для теста
  const [showMockery, setShowMockery] = useState(false);
  const [mockeryMessage, setMockeryMessage] = useState('');

  const mockeryMessages = [
    '🤡 Вы серьёзно думали, что ответите правильно? Смешно.',
    '😂 Даже мой кот знает ответ на этот вопрос. И он мёртв.',
    '🙄 Опять неправильный ответ? Может, вам стоит вернуться в школу?',
    '💀 Этот вопрос были в программе 5 класса. Вы точно заканчивали школу?',
    '🎭 Вы либо гений, либо просто не читали вопрос. Ставлю на второе.',
    '📚 Откройте учебник. Нет, серьёзно. Прямо сейчас.',
    '🤦‍♂️ Я видел много глупых ответов, но этот... этот особенный.',
    '🎪 Ваш IQ упал ниже плинтуса. Поздравляю с новым рекордом!',
    '🐒 Обезьяна с печатной машинкой написала бы лучше. И быстрее.',
    '🤖 Даже ИИ стыдно за вас. И у меня нет чувств.',
    '📉 Ваша успеваемость падает быстрее, чем курс рубля.',
    '🎯 Вы попали в 3% самых некомпетентных участников. Гордитесь!',
    '🧠 Ваш мозг сейчас в режиме энергосбережения? Включите его.',
    '🎓 Диплом об образовании - это просто красивая бумага, да?',
    '🔬 Наука плачет, глядя на ваши ответы.',
    '🎨 Может, вам стоит попробовать рисовать? Хотя нет, и там провал.',
    '🏆 Вы установили новый антирекорд! Поздравляю!',
    '🤡 Цирк уехал, а клоуны остались. И вы среди них.',
    '💩 Даже это пахнет лучше ваших ответов.',
    '🎪 Добро пожаловать в шоу "Угадай, почему ты тупой".',
    '📊 Статистика говорит: вы в худших 1%. Но это ещё не предел!',
    '🧩 Пазл из 2 частей, и вы не справились. Впечатляет.',
    '🎭 Браво! Это было худшее выступление, которое я видел.',
    '🚮 Ваши ответы отправлены в корзину. Вместе с вашей репутацией.',
    '🎓 Школа звонит. Они хотят вернуть свой диплом обратно.',
  ];

  // Периодически показываем насмешки - увеличена частота
  useEffect(() => {
    if (!gaslightingEnabled || clarityMode) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.60) { // Увеличена вероятность с 0.80 до 0.60
        const msg = mockeryMessages[Math.floor(Math.random() * mockeryMessages.length)];
        setMockeryMessage(msg);
        setShowMockery(true);
        setTimeout(() => setShowMockery(false), 3500);
      }
    }, 12000); // Уменьшен интервал с 20000 до 12000 мс

    return () => clearInterval(interval);
  }, [gaslightingEnabled, clarityMode]);

  // Выбираем вопросы один раз при старте (Math.random() вне рендера)
  const startTest = () => {
    const firstQuestion = allQuestions.find(q => q.id === 1);
    const otherQuestions = allQuestions.filter(q => q.id !== 1);
    const shuffled = [...otherQuestions].sort(() => Math.random() - 0.5);
    const selectedOthers = shuffled.slice(0, 14);
    const selected = firstQuestion ? [firstQuestion, ...selectedOthers] : selectedOthers;
    
    setSelectedQuestions(selected);
    setShowIntro(false);
    
    // 5% шанс краша при старте (уменьшено с 25%)
    if (Math.random() < 0.05) {
      setTestCrashed(true);
      return;
    }
    
    setTestStarted(true);
  };

  const trackManipulation = (type: string, name: string, description: string, wikiLink: string) => {
    setManipulations(prev => {
      const existing = prev.find(m => m.type === type);
      if (existing) {
        return prev.map(m => m.type === type ? { ...m, count: m.count + 1 } : m);
      }
      return [...prev, { type, name, description, count: 1, wikiLink }];
    });
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    // Газлайтинг: изменение вопроса
    if (gaslightingEnabled && !clarityMode && Math.random() > 0.3) {
      const currentQ = selectedQuestions[currentQuestion];
      if (currentQ.alternatives && currentQ.alternatives.length > 0) {
        setTimeout(() => {
          const alt = currentQ.alternatives![Math.floor(Math.random() * currentQ.alternatives!.length)];
          setSelectedQuestions(prev => prev.map((q, i) => 
            i === currentQuestion ? { ...q, question: alt.question, options: alt.options, correct: alt.correct } : q
          ));
          setQuestionRewritten(true);
          if (answers[currentQuestion] !== null) {
            setAnswers(prev => prev.map((a, i) => i === currentQuestion ? null : a));
            setAnswerChanged(true);
          }
        }, 3000);
      }
    }

    // Газлайтинг: подсказки
    if (gaslightingEnabled && !clarityMode && Math.random() > 0.5) {
      setTimeout(() => {
        setShowMemoryMessage('Вы уже отвечали на этот вопрос. Или вам показалось?');
        setTimeout(() => setShowMemoryMessage(null), 3000);
      }, 2000);
    }
  };

  const nextQuestion = () => {
    // Отслеживаем манипуляции
    if (questionRewritten) {
      trackManipulation(
        'question_rewrite',
        'Переписывание вопроса',
        'Вопрос изменился после вашего ответа, заставив усомниться в памяти',
        'https://ru.wikipedia.org/wiki/Газлайтинг'
      );
    }
    if (answerChanged) {
      trackManipulation(
        'answer_change',
        'Изменение ответа',
        'Ваш ответ был изменён без вашего ведома',
        'https://ru.wikipedia.org/wiki/Когнитивное_искажение'
      );
    }
    if (showMemoryMessage) {
      trackManipulation(
        'memory_manipulation',
        'Манипуляция памятью',
        'Вам внушали ложные воспоминания о событиях, которых не было',
        'https://ru.wikipedia.org/wiki/Ложные_воспоминания'
      );
    }

    // 3% шанс краша в середине
    if (currentQuestion > 2 && currentQuestion < selectedQuestions.length - 2 && Math.random() < 0.03) {
      trackManipulation(
        'test_crash',
        'Краш теста',
        'Тест "сломался", заставив вас начать заново',
        'https://ru.wikipedia.org/wiki/Техническая_манипуляция'
      );
      setTestCrashed(true);
      return;
    }

    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionRewritten(false);
      setAnswerChanged(false);
      setShowMemoryMessage(null);
      setShowDenyMessage(null);
    } else {
      setShowResult(true);
      setShowDebrief(true);
    }
  };

  const checkStopWord = (value: string) => {
    if (value.toLowerCase().includes('бесконечность')) {
      setStopWordActive(true);
      setGaslightingEnabled(false);
      setClarityMode(true);
    }
  };

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setGaslightingEnabled(false);
      setClarityMode(true);
    }
  }, []);

  const containerClass = clarityMode ? 'clarity-mode' : '';
  const currentQ = selectedQuestions[currentQuestion];

  return (
    <div className={`min-h-screen bg-cosmic text-white ${containerClass} scanline-overlay ${
      gaslight.jitterActive ? 'animate-jitter' : ''
    } ${gaslight.colorShiftActive ? 'animate-color-shift' : ''}`}>
      <GaslightEffects effects={gaslight} />
      
      {/* Дополнительные газлайт-эффекты */}
      <FinancialPanic enabled={gaslightingEnabled && !clarityMode && !stopWordActive} />
      <InternetBlame enabled={gaslightingEnabled && !clarityMode && !stopWordActive} />
      <BSOD enabled={gaslightingEnabled && !clarityMode && !stopWordActive} />

      {/* Насмешливые комментарии */}
      <AnimatePresence>
        {showMockery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 z-[9997] max-w-md"
          >
            <div className="bg-purple/90 backdrop-blur border-2 border-purple rounded-lg p-4 shadow-[0_0_30px_rgba(123,97,255,0.5)]">
              <div className="text-white font-mono text-sm font-bold">
                {mockeryMessage}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stop word input */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex flex-col items-end gap-1">
          <label className="text-[10px] text-gray/60 font-mono">СТОП-СЛОВО:</label>
          <input
            type="text"
            value={stopInput}
            onChange={(e) => { setStopInput(e.target.value); checkStopWord(e.target.value); }}
            placeholder="Введите для остановки..."
            className="bg-graphite/80 backdrop-blur border border-purple/30 rounded px-3 py-2 text-xs text-gray w-48 focus:w-64 transition-all focus:outline-none focus:border-lime font-mono"
          />
        </div>
      </div>

      {/* Clarity mode toggle */}
      <button
        onClick={() => { setClarityMode(!clarityMode); setGaslightingEnabled(!clarityMode ? false : true); }}
        className="fixed top-4 right-4 z-50 glass rounded-full px-3 py-1.5 text-xs font-mono text-gray hover:text-lime transition-colors"
      >
        {clarityMode ? '✦ Спектакль' : '◎ Ясность'}
      </button>

      {/* Test crash */}
      {testCrashed && (
        <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-6">💥</div>
            <h2 className="text-3xl font-bold text-red mb-4">ТЕСТ ПРЕРВАН</h2>
            <p className="text-gray mb-2">Произошла критическая ошибка</p>
            <p className="text-gray text-sm mb-6">Возможно, вы не были готовы.</p>
            <button
              onClick={() => { setTestCrashed(false); setTestStarted(true); setCurrentQuestion(0); setAnswers(Array(15).fill(null)); }}
              className="bg-lime text-cosmic px-6 py-3 rounded-full font-bold"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Intro */}
        {showIntro && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <div className="font-mono text-xs text-purple mb-4 tracking-widest">ТЕСТ #0x7F3A</div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Тест на подверженность газлайтингу
            </h1>
            <p className="text-gray text-lg mb-8">
              15 вопросов. Проверим, насколько вы уверены в своём восприятии.
            </p>
            <button
              onClick={startTest}
              className="bg-lime text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg"
            >
              Начать тест
            </button>
          </motion.div>
        )}

        {/* Questions */}
        {testStarted && !showResult && currentQ && (
          <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            {/* Progress */}
            <div className="flex items-center justify-between mb-8">
              <div className="font-mono text-xs text-gray">
                Вопрос {currentQuestion + 1} / {selectedQuestions.length}
              </div>
              <div className="flex-1 mx-4 h-1 bg-graphite rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple to-lime"
                  style={{ width: `${((currentQuestion + 1) / selectedQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className={`glass rounded-xl p-8 mb-6 ${questionRewritten ? 'border-l-2 border-orange/50' : ''}`}>
              <div className="font-mono text-xs text-purple mb-3">
                ВОПРОС #{currentQ.id.toString().padStart(3, '0')}
                {questionRewritten && <span className="text-orange ml-2">[ПЕРЕПИСАН]</span>}
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                {currentQ.question}
              </h2>
              {answerChanged && (
                <div className="font-mono text-xs text-orange mt-2">* ваш ответ был сброшен</div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, i) => (
                <button
                  key={`${currentQuestion}-${i}`}
                  onClick={() => handleAnswer(i)}
                  className={`w-full text-left glass rounded-lg px-6 py-4 transition-all ${
                    answers[currentQuestion] === i ? 'border-lime bg-lime/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      answers[currentQuestion] === i ? 'border-lime bg-lime/20' : 'border-gray/40'
                    }`} />
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => {
                  if (currentQuestion > 0) {
                    setCurrentQuestion(currentQuestion - 1);
                    if (gaslightingEnabled && !clarityMode) {
                      setShowDenyMessage('Попытка возврата. Это нечестная сдача теста.');
                      setTimeout(() => setShowDenyMessage(null), 3000);
                    }
                  }
                }}
                disabled={currentQuestion === 0}
                className="text-gray hover:text-white disabled:opacity-30"
              >
                ← Назад
              </button>
              <button
                onClick={nextQuestion}
                disabled={answers[currentQuestion] === null}
                className="bg-lime/10 border border-lime/30 text-lime px-6 py-2 rounded-full disabled:opacity-30"
              >
                {currentQuestion === selectedQuestions.length - 1 ? 'Завершить' : 'Далее →'}
              </button>
            </div>

            {/* Messages */}
            {showMemoryMessage && (
              <div className="mt-6 glass rounded-lg p-4 border-l-2 border-purple/50" role="status" aria-live="polite">
                <div className="font-mono text-xs text-purple mb-1">СИСТЕМА ПАМЯТИ:</div>
                <p className="text-sm text-gray">{showMemoryMessage}</p>
              </div>
            )}

            {showDenyMessage && (
              <div className="mt-6 glass rounded-lg p-4 border-l-2 border-orange/50" role="status" aria-live="polite">
                <div className="font-mono text-xs text-orange mb-1">ОБВИНЕНИЕ:</div>
                <p className="text-sm text-gray">{showDenyMessage}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Debrief */}
        {showResult && showDebrief && (
          <TestDebrief
            manipulations={manipulations}
            onBackToHome={onBackToHome}
            onRetakeTest={() => {
              setCurrentQuestion(0);
              setAnswers(Array(15).fill(null));
              setShowResult(false);
              setShowDebrief(false);
              setTestStarted(false);
              setShowIntro(true);
              setManipulations([]);
            }}
          />
        )}
      </div>
    </div>
  );
}
