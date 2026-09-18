import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGaslighting, GaslightEffects } from '../components/GaslightEffects';
import TestDebrief, { Manipulation } from '../components/TestDebrief';
import { FinancialPanic } from '../components/FinancialPanic';
import { InternetBlame } from '../components/GaslightPatterns';
import { BSOD } from '../components/ScaryEffects';

// Компонент для отображения системных сообщений
function SystemMessage({ messages }: { messages: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-lg p-4 border border-purple/30 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-purple animate-pulse" />
        <div className="font-mono text-xs text-purple">СИСТЕМА:</div>
      </div>
      <div className="font-mono text-sm text-gray mt-2">
        {messages[currentIndex]}
      </div>
    </motion.div>
  );
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct?: number;
  alternatives?: { question: string; options: string[]; correct?: number }[];
}

// Функция для перемешивания вариантов ответов
function shuffleOptions(question: Question): Question {
  if (question.correct === undefined) return question;
  
  const correctAnswer = question.options[question.correct];
  const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
  const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    ...question,
    options: shuffledOptions,
    correct: newCorrectIndex,
  };
}

// Вопросы для уровня IQ 1-3 класс
const iqQuestions = [
  { question: 'Сколько будет 2 + 2?', options: ['3', '4', '5', 'Не знаю'], correct: 1 },
  { question: 'Сколько будет 3 + 3?', options: ['5', '6', '7', 'Не помню'], correct: 1 },
  { question: 'Сколько будет 5 + 5?', options: ['8', '9', '10', 'Не уверен'], correct: 2 },
  { question: 'Сколько будет 1 + 1?', options: ['1', '2', '3', 'Не знаю'], correct: 1 },
  { question: 'Сколько будет 4 + 4?', options: ['6', '7', '8', 'Не помню'], correct: 2 },
  { question: 'Какого цвета небо?', options: ['Красный', 'Синий', 'Зелёный', 'Не знаю'], correct: 1 },
  { question: 'Сколько дней в неделе?', options: ['5', '6', '7', 'Не помню'], correct: 2 },
  { question: 'Сколько месяцев в году?', options: ['10', '11', '12', 'Не знаю'], correct: 2 },
  { question: 'Какое время года после зимы?', options: ['Лето', 'Весна', 'Осень', 'Не помню'], correct: 1 },
  { question: 'Сколько будет 10 - 5?', options: ['3', '4', '5', 'Не знаю'], correct: 2 },
];

// Функция для добавления alternatives к вопросам
function addAlternatives(question: Question): Question {
  if (question.alternatives && question.alternatives.length > 0) {
    return question;
  }
  
  // Создаём альтернативные вопросы уровня 1-3 класс с припиской "для вашего уровня IQ"
  const randomIQ1 = iqQuestions[Math.floor(Math.random() * iqQuestions.length)];
  const randomIQ2 = iqQuestions[Math.floor(Math.random() * iqQuestions.length)];
  
  const alternatives = [
    {
      question: `Вопрос для вашего уровня IQ: ${randomIQ1.question}`,
      options: randomIQ1.options,
      correct: randomIQ1.correct
    },
    {
      question: `Ещё вопрос для вашего уровня IQ: ${randomIQ2.question}`,
      options: randomIQ2.options,
      correct: randomIQ2.correct
    }
  ];
  
  return {
    ...question,
    alternatives
  };
}

// Все вопросы (60 штук) - создаём один раз
const allQuestions: Question[] = [
  { 
    id: 1, 
    question: 'Какого цвета был заголовок на предыдущем экране?', 
    options: ['Кислотный лайм', 'Электрик-фиолетовый', 'Стерильный белый', 'Я не помню'], 
    correct: 0,
    alternatives: [
      { question: 'Какой шрифт использовался в заголовке?', options: ['Space Grotesk', 'Inter', 'JetBrains Mono', 'Не помню'], correct: 0 },
      { question: 'Сколько орбитальных кругов было на экране?', options: ['Два', 'Три', 'Четыре', 'Не считал'], correct: 1 }
    ]
  },
  { 
    id: 2, 
    question: 'Сколько секунд длится «Десятисекундный люк»?', 
    options: ['5 секунд', '10 секунд', '15 секунд', '30 секунд'], 
    correct: 1,
    alternatives: [
      { question: 'Сколько минут длится вся Калибровка?', options: ['2 часа', '4 часа', '6 часов', 'Не помню'], correct: 1 },
      { question: 'Что происходит за 10 секунд?', options: ['Люк открывается', 'Вы забываете всё', 'Ничего', 'Вопрос меняется'], correct: 0 }
    ]
  },
  { 
    id: 3, 
    question: 'Какое стоп-слово используется в проекте?', 
    options: ['Бесконечность', 'Свобода', 'Ясность', 'Выход'], 
    correct: 0,
    alternatives: [
      { question: 'Что делает стоп-слово?', options: ['Отключает эффекты', 'Ничего', 'Удаляет аккаунт', 'Перезагружает страницу'], correct: 0 },
      { question: 'Где можно ввести стоп-слово?', options: ['В любое поле', 'Только в специальное', 'Нигде', 'В чате поддержки'], correct: 0 }
    ]
  },
  { 
    id: 4, 
    question: 'Сколько актов в методе «Калибровка»?', 
    options: ['Два', 'Три', 'Четыре', 'Пять'], 
    correct: 1,
    alternatives: [
      { question: 'Как называется первый акт?', options: ['Демонстрация', 'Проживание', 'Сборка', 'Калибровка'], correct: 0 },
      { question: 'Что происходит во втором акте?', options: ['Демонстрация', 'Проживание', 'Сборка', 'Ничего'], correct: 1 }
    ]
  },
  { 
    id: 5, 
    question: 'Какой закон описывает взаимосвязь между давлением, объёмом и температурой газа?', 
    options: ['Закон Бойля-Мариотта', 'Закон Ома', 'Закон Ньютона', 'Закон Кулона'], 
    correct: 0,
    alternatives: [
      { question: 'Какой закон описывает движение планет?', options: ['Закон Кеплера', 'Закон Ома', 'Закон Ньютона', 'Закон Кулона'], correct: 0 },
      { question: 'Какой закон описывает электрический ток?', options: ['Закон Бойля-Мариотта', 'Закон Ома', 'Закон Ньютона', 'Закон Кулона'], correct: 1 }
    ]
  },
  { 
    id: 6, 
    question: 'Какой процесс происходит при делении ядра урана-235?', 
    options: ['Синтез', 'Деление', 'Ионизация', 'Нейтрализация'], 
    correct: 1,
    alternatives: [
      { question: 'Какой процесс происходит при синтезе ядер?', options: ['Синтез', 'Деление', 'Ионизация', 'Нейтрализация'], correct: 0 },
      { question: 'Какой процесс происходит при радиоактивном распаде?', options: ['Синтез', 'Деление', 'Ионизация', 'Нейтрализация'], correct: 1 }
    ]
  },
  { 
    id: 7, 
    question: 'Что является основным источником энергии на Земле?', 
    options: ['Луна', 'Солнце', 'Ядро Земли', 'Ветер'], 
    correct: 1,
    alternatives: [
      { question: 'Что является основным источником света на Земле?', options: ['Луна', 'Солнце', 'Звёзды', 'Ветер'], correct: 1 },
      { question: 'Что является основным источником тепла на Земле?', options: ['Луна', 'Солнце', 'Ядро Земли', 'Ветер'], correct: 1 }
    ]
  },
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
  // Вопросы по математическому анализу (61-80)
  { id: 61, question: 'Что такое предел функции?', options: ['Значение, к которому стремится функция', 'Максимальное значение функции', 'Минимальное значение функции', 'Не знаю'], correct: 0 },
  { id: 62, question: 'Чему равен предел sin(x)/x при x→0?', options: ['0', '1', '∞', 'Не существует'], correct: 1 },
  { id: 63, question: 'Что такое производная функции?', options: ['Скорость изменения функции', 'Площадь под графиком', 'Значение функции', 'Не знаю'], correct: 0 },
  { id: 64, question: 'Чему равна производная константы?', options: ['0', '1', 'Константа', '∞'], correct: 0 },
  { id: 65, question: 'Что такое интеграл?', options: ['Площадь под кривой', 'Производная функция', 'Предел функции', 'Не знаю'], correct: 0 },
  { id: 66, question: 'Чему равен интеграл от 0 до 1 от x dx?', options: ['0', '1/2', '1', '2'], correct: 1 },
  { id: 67, question: 'Что такое ряд Тейлора?', options: ['Разложение функции в степенной ряд', 'Сумма чисел', 'Произведение чисел', 'Не знаю'], correct: 0 },
  { id: 68, question: 'Чему равна производная e^x?', options: ['e^x', 'x*e^(x-1)', 'ln(x)', '1/x'], correct: 0 },
  { id: 69, question: 'Что такое непрерывность функции?', options: ['Функция без разрывов', 'Функция с разрывами', 'Постоянная функция', 'Не знаю'], correct: 0 },
  { id: 70, question: 'Что такое точка разрыва?', options: ['Точка, где функция не непрерывна', 'Точка максимума', 'Точка минимума', 'Не знаю'], correct: 0 },
  { id: 71, question: 'Чему равна производная sin(x)?', options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'], correct: 0 },
  { id: 72, question: 'Чему равна производная cos(x)?', options: ['sin(x)', '-sin(x)', 'cos(x)', '-cos(x)'], correct: 1 },
  { id: 73, question: 'Что такое дифференциал функции?', options: ['Главная линейная часть приращения', 'Производная', 'Интеграл', 'Не знаю'], correct: 0 },
  { id: 74, question: 'Что такое функция многих переменных?', options: ['Функция зависящая от нескольких переменных', 'Функция одной переменной', 'Константа', 'Не знаю'], correct: 0 },
  { id: 75, question: 'Что такое частная производная?', options: ['Производная по одной переменной', 'Производная по всем переменным', 'Интеграл', 'Не знаю'], correct: 0 },
  { id: 76, question: 'Что такое градиент функции?', options: ['Вектор частных производных', 'Скаляр', 'Матрица', 'Не знаю'], correct: 0 },
  { id: 77, question: 'Что такое двойной интеграл?', options: ['Интеграл по двум переменным', 'Два одинаковых интеграла', 'Производная', 'Не знаю'], correct: 0 },
  { id: 78, question: 'Что такое сходимость ряда?', options: ['Ряд имеет конечную сумму', 'Ряд расходится', 'Ряд бесконечен', 'Не знаю'], correct: 0 },
  { id: 79, question: 'Что такое признак Даламбера?', options: ['Признак сходимости ряда', 'Признак расходимости', 'Формула суммы', 'Не знаю'], correct: 0 },
  { id: 80, question: 'Что такое степенной ряд?', options: ['Ряд вида Σaₙxⁿ', 'Ряд чисел', 'Последовательность', 'Не знаю'], correct: 0 },
  // Дополнительные вопросы (81-100)
  { id: 81, question: 'Что такое логарифм?', options: ['Показатель степени', 'Основание степени', 'Степень числа', 'Не знаю'], correct: 0 },
  { id: 82, question: 'Чему равен log₂(8)?', options: ['2', '3', '4', '8'], correct: 1 },
  { id: 83, question: 'Что такое матрица?', options: ['Прямоугольная таблица чисел', 'Квадратное число', 'Вектор', 'Не знаю'], correct: 0 },
  { id: 84, question: 'Что такое определитель матрицы?', options: ['Число, характеризующее матрицу', 'Сумма элементов', 'Произведение элементов', 'Не знаю'], correct: 0 },
  { id: 85, question: 'Что такое вектор?', options: ['Направленный отрезок', 'Число', 'Матрица', 'Не знаю'], correct: 0 },
  { id: 86, question: 'Что такое скалярное произведение векторов?', options: ['Число', 'Вектор', 'Матрица', 'Не знаю'], correct: 0 },
  { id: 87, question: 'Что такое комплексное число?', options: ['Число вида a+bi', 'Действительное число', 'Натуральное число', 'Не знаю'], correct: 0 },
  { id: 88, question: 'Чему равно i²?', options: ['-1', '1', 'i', '0'], correct: 0 },
  { id: 89, question: 'Что такое дифференциальное уравнение?', options: ['Уравнение с производной', 'Алгебраическое уравнение', 'Система уравнений', 'Не знаю'], correct: 0 },
  { id: 90, question: 'Что такое порядок дифференциального уравнения?', options: ['Порядок старшей производной', 'Количество переменных', 'Количество решений', 'Не знаю'], correct: 0 },
  { id: 91, question: 'Что такое теорема Rolle?', options: ['О существовании точки с нулевой производной', 'О сумме ряда', 'О пределе', 'Не знаю'], correct: 0 },
  { id: 92, question: 'Что такое теорема Лагранжа?', options: ['О существовании точки с производной, равной среднему', 'О пределе', 'О интеграле', 'Не знаю'], correct: 0 },
  { id: 93, question: 'Что такое формула Ньютона-Лейбница?', options: ['Формула для вычисления определенного интеграла', 'Формула производной', 'Формула предела', 'Не знаю'], correct: 0 },
  { id: 94, question: 'Что такое несобственный интеграл?', options: ['Интеграл с бесконечными пределами', 'Определенный интеграл', 'Неопределенный интеграл', 'Не знаю'], correct: 0 },
  { id: 95, question: 'Что такое функция Лапласа?', options: ['Преобразование функции', 'Производная', 'Интеграл', 'Не знаю'], correct: 0 },
  { id: 96, question: 'Что такое ряд Фурье?', options: ['Разложение периодической функции', 'Степенной ряд', 'Числовой ряд', 'Не знаю'], correct: 0 },
  { id: 97, question: 'Что такое преобразование Фурье?', options: ['Переход от функции к её спектру', 'Производная', 'Интеграл', 'Не знаю'], correct: 0 },
  { id: 98, question: 'Что такое тензор?', options: ['Многомерный массив', 'Матрица', 'Вектор', 'Не знаю'], correct: 0 },
  { id: 99, question: 'Что такое многообразие?', options: ['Пространство, локально похожее на евклидово', 'Множество', 'Функция', 'Не знаю'], correct: 0 },
  { id: 100, question: 'Что такое топология?', options: ['Раздел математики о свойствах пространств', 'Алгебра', 'Анализ', 'Не знаю'], correct: 0 },
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
  const [showQuestionChangeMessage, setShowQuestionChangeMessage] = useState(false);
  const [testCrashed, setTestCrashed] = useState(false);
  const [manipulations, setManipulations] = useState<Manipulation[]>([]);
  const [showDebrief, setShowDebrief] = useState(false);
  const [showBSOD, setShowBSOD] = useState(false);
  const [showBIOS, setShowBIOS] = useState(false);
  const [bsodShown, setBsodShown] = useState(false);
  const [biosShown, setBiosShown] = useState(false);
  
  // Система отслеживания лимитов манипуляций
  const [manipulationCounts, setManipulationCounts] = useState<Record<string, number>>({});
  const MAX_PER_TYPE = 3; // Максимум 3 раза для каждого типа
  const MAX_TOTAL = 15; // Максимум 15 манипуляций всего

  // Функция проверки лимитов
  const canApplyManipulation = (type: string): boolean => {
    const currentCount = manipulationCounts[type] || 0;
    const totalCount = Object.values(manipulationCounts).reduce((sum, count) => sum + count, 0);
    
    // Проверяем лимиты
    if (currentCount >= MAX_PER_TYPE) return false;
    if (totalCount >= MAX_TOTAL) return false;
    
    return true;
  };

  // Функция увеличения счётчика манипуляции
  const incrementManipulationCount = (type: string) => {
    setManipulationCounts(prev => ({
      ...prev,
      [type]: (prev[type] || 0) + 1
    }));
  };

  const gaslight = useGaslighting(gaslightingEnabled && !clarityMode && !stopWordActive);

  // Дополнительные газлайт-эффекты для теста
  const [showMockery, setShowMockery] = useState(false);
  const [mockeryMessage, setMockeryMessage] = useState('');
  const [showConfirmAnswer, setShowConfirmAnswer] = useState(false);
  const [pendingAnswer, setPendingAnswer] = useState<number | null>(null);
  const [confirmCount, setConfirmCount] = useState(0); // Счетчик подтверждений (максимум 3)

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
    
    // Добавляем alternatives и перемешиваем варианты ответов для каждого вопроса
    const shuffledQuestions = selected.map(q => shuffleOptions(addAlternatives(q)));
    
    setSelectedQuestions(shuffledQuestions);
    setShowIntro(false);
    
    // 0.5% шанс краша при старте (уменьшено с 2%)
    if (Math.random() < 0.005) {
      setTestCrashed(true);
      return;
    }
    
    setTestStarted(true);
  };

  const trackManipulation = (type: string, name: string, description: string, wikiLink: string) => {
    // Проверяем лимиты перед добавлением манипуляции
    if (!canApplyManipulation(type)) {
      return false; // Манипуляция не добавлена из-за лимитов
    }
    
    // Увеличиваем счётчик для этого типа
    incrementManipulationCount(type);
    
    // Добавляем манипуляцию в список
    setManipulations(prev => {
      const existing = prev.find(m => m.type === type);
      if (existing) {
        return prev.map(m => m.type === type ? { ...m, count: m.count + 1 } : m);
      }
      return [...prev, { type, name, description, count: 1, wikiLink }];
    });
    
    return true; // Манипуляция успешно добавлена
  };

  const handleAnswer = (optionIndex: number) => {
    // 19% вероятность появления окошка подтверждения (максимум 3 раза за тест)
    if (gaslightingEnabled && !clarityMode && confirmCount < 3 && Math.random() < 0.19) {
      setPendingAnswer(optionIndex);
      setShowConfirmAnswer(true);
      setConfirmCount(prev => prev + 1);
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    // Газлайтинг: изменение вопроса через 1 секунду
    if (gaslightingEnabled && !clarityMode && Math.random() > 0.3) {
      const currentQ = selectedQuestions[currentQuestion];
      if (currentQ.alternatives && currentQ.alternatives.length > 0) {
        setTimeout(() => {
          const alt = currentQ.alternatives![Math.floor(Math.random() * currentQ.alternatives!.length)];
          setSelectedQuestions(prev => prev.map((q, i) => 
            i === currentQuestion ? { ...q, question: alt.question, options: alt.options, correct: alt.correct } : q
          ));
          setQuestionRewritten(true);
          setShowQuestionChangeMessage(true);
          setTimeout(() => setShowQuestionChangeMessage(false), 3000);
          if (answers[currentQuestion] !== null) {
            setAnswers(prev => prev.map((a, i) => i === currentQuestion ? null : a));
            setAnswerChanged(true);
          }
        }, 1000); // Изменено с 3000 на 1000 (1 секунда)
      }
    }
    
    // BSOD при ответе на вопрос (5% вероятность, только один раз)
    if (gaslightingEnabled && !clarityMode && !bsodShown && Math.random() < 0.05) {
      if (trackManipulation(
        'bsod_screen',
        'Скример (синий экран смерти)',
        'Внезапное появление пугающего изображения для вызова страха и отвлечения внимания',
        'https://ru.wikipedia.org/wiki/Скример'
      )) {
        setShowBSOD(true);
        setBsodShown(true);
        setTimeout(() => setShowBSOD(false), 2000);
      }
    }
    
    // Черный экран BIOS при ответе на вопрос (5% вероятность, только один раз)
    if (gaslightingEnabled && !clarityMode && !biosShown && Math.random() < 0.05) {
      if (trackManipulation(
        'bios_screen',
        'Скример (чёрный экран BIOS)',
        'Внезапное появление пугающего изображения для вызова страха и отвлечения внимания',
        'https://pikabu.ru/story/ochevidnyie_veshchi_strakh_i_kak_s_nim_rabotat_8753262'
      )) {
        setShowBIOS(true);
        setBiosShown(true);
        setTimeout(() => setShowBIOS(false), 2000);
      }
    }

    // Насмешки над пользователем (30% вероятность при каждом ответе)
    if (gaslightingEnabled && !clarityMode && Math.random() > 0.7) {
      if (trackManipulation(
        'mockery',
        'Насмешка над пользователем',
        'Появилось оскорбительное сообщение, унижающее ваши интеллектуальные способности',
        'https://ru.wikipedia.org/wiki/Газлайтинг'
      )) {
        const mockeryMsg = mockeryMessages[Math.floor(Math.random() * mockeryMessages.length)];
        setShowMockery(true);
        setMockeryMessage(mockeryMsg);
        setTimeout(() => setShowMockery(false), 3500);
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

  const confirmAnswer = () => {
    if (pendingAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = pendingAnswer;
      setAnswers(newAnswers);
      setPendingAnswer(null);
      setShowConfirmAnswer(false);
      
      // Отслеживаем манипуляцию подтверждения ответа с проверкой лимитов
      trackManipulation(
        'answer_confirmation',
        'Подтверждение ответа',
        'Появилось окно с требованием подтвердить свой ответ, заставив усомниться в выборе',
        'https://ru.wikipedia.org/wiki/Газлайтинг'
      );
    }
  };

  const cancelAnswer = () => {
    setPendingAnswer(null);
    setShowConfirmAnswer(false);
  };

  const nextQuestion = () => {
    // Отслеживаем манипуляции с проверкой лимитов
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

    // 0.5% шанс краша в середине (с проверкой лимитов)
    if (currentQuestion > 2 && currentQuestion < selectedQuestions.length - 2 && Math.random() < 0.005) {
      if (trackManipulation(
        'test_crash',
        'Краш теста',
        'Тест "сломался", заставив вас начать заново',
        'https://ru.wikipedia.org/wiki/Техническая_манипуляция'
      )) {
        setTestCrashed(true);
        return;
      }
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
  
  // Подсчет правильных ответов (на основе перемешанных вопросов с правильными индексами)
  const correctAnswersCount = answers.reduce<number>((count, answer, index) => {
    if (answer === null) return count;
    const selectedQ = selectedQuestions[index];
    if (selectedQ && answer === selectedQ.correct) {
      return count + 1;
    }
    return count;
  }, 0);

  return (
    <div className={`min-h-screen bg-cosmic text-white ${containerClass} scanline-overlay ${
      gaslight.jitterActive ? 'animate-jitter' : ''
    } ${gaslight.colorShiftActive ? 'animate-color-shift' : ''}`}>
      <GaslightEffects effects={gaslight} />
      
      {/* Дополнительные газлайт-эффекты */}
      <FinancialPanic enabled={gaslightingEnabled && !clarityMode && !stopWordActive} />
      <InternetBlame enabled={gaslightingEnabled && !clarityMode && !stopWordActive} />
      <BSOD 
        enabled={gaslightingEnabled && !clarityMode && !stopWordActive} 
        forceShowBSOD={showBSOD}
        forceShowBIOS={showBIOS}
      />

      {/* Насмешливые комментарии - только во время теста */}
      <AnimatePresence>
        {showMockery && testStarted && !showResult && (
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

      {/* Окошко подтверждения ответа - 19% вероятность */}
      <AnimatePresence>
        {showConfirmAnswer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-graphite border-2 border-orange/50 rounded-xl p-6 max-w-md mx-4 shadow-[0_0_40px_rgba(255,107,53,0.4)]"
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">⚠️</div>
                <h3 className="text-xl font-bold text-orange mb-2">
                  Вы уверены в своём ответе?
                </h3>
                <p className="text-gray text-sm">
                  Подумайте ещё раз. Уверены ли вы в выбранном варианте?
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={confirmAnswer}
                  className="flex-1 bg-orange/20 border border-orange/50 text-orange py-2 px-4 rounded-lg hover:bg-orange/30 transition-colors font-bold"
                >
                  Да, уверен
                </button>
                <button
                  onClick={cancelAnswer}
                  className="flex-1 bg-graphite border border-gray/50 text-gray py-2 px-4 rounded-lg hover:bg-graphite/80 transition-colors"
                >
                  Передумать
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



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
              onClick={() => { setTestCrashed(false); setTestStarted(true); setCurrentQuestion(0); setAnswers(Array(15).fill(null)); setBsodShown(false); setBiosShown(false); }}
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
              className="bg-lime text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg mb-12"
            >
              Начать тест
            </button>
            
            {/* Манипулятивные фразы */}
            <div className="mt-16 space-y-4">
              <SystemMessage messages={[
                'Инициализация протокола калибровки...',
                'Сканирование нейронных связей...',
                'Обнаружены аномалии в восприятии...',
                'Загрузка модулей газлайтинга...',
                'Подготовка к тестированию...',
                'Калибровка сенсоров реальности...',
                'Проверка стабильности психики...',
                'Активация защитных механизмов...',
              ]} />
            </div>
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
              {showQuestionChangeMessage && (
                <div className="font-mono text-xs text-purple mt-2 animate-pulse">* вопрос изменился</div>
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
                      // Отслеживаем манипуляцию обвинения в нечестности с проверкой лимитов
                      if (trackManipulation(
                        'dishonesty_accusation',
                        'Обвинение в нечестности',
                        'При возврате на предыдущий вопрос появилось обвинение в нечестной сдаче теста, заставившее усомниться в своих действиях',
                        'https://ru.wikipedia.org/wiki/Газлайтинг'
                      )) {
                        setShowDenyMessage('Попытка возврата. Это нечестная сдача теста.');
                        setTimeout(() => setShowDenyMessage(null), 3000);
                      }
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
            correctAnswers={correctAnswersCount}
            totalQuestions={selectedQuestions.length}
            onBackToHome={onBackToHome}
            onRetakeTest={() => {
              setCurrentQuestion(0);
              setAnswers(Array(15).fill(null));
              setShowResult(false);
              setShowDebrief(false);
              setTestStarted(false);
              setShowIntro(true);
              setManipulations([]);
              setBsodShown(false);
              setBiosShown(false);
              setConfirmCount(0);
              setManipulationCounts({}); // Сбрасываем счётчики манипуляций
            }}
          />
        )}
      </div>
    </div>
  );
}
