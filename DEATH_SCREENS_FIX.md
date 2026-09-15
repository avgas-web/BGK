# Исправление экранов смерти и добавление системных сообщений

## ✅ Все задачи выполнены

### 1. Исправлены экраны смерти (BSOD и BIOS)

**Что было исправлено:**

#### Проблема:
- BSOD показывался 3 секунды вместо 2 секунд
- BIOS показывался 4 секунды вместо 2 секунд
- Не было возможности закрыть экраны досрочно

#### Решение:

**1. Изменены таймауты:**

**Было:**
```typescript
setTimeout(() => setShowBSOD(false), 3000); // 3 секунды
setTimeout(() => setShowBIOS(false), 4000); // 4 секунды
```

**Стало:**
```typescript
setTimeout(() => setShowBSOD(false), 2000); // 2 секунды
setTimeout(() => setShowBIOS(false), 2000); // 2 секунды
```

**2. Добавлен обработчик нажатия клавиш:**

```typescript
// Обработчик нажатия клавиш для закрытия
useEffect(() => {
  const handleKeyPress = () => {
    if (showBSOD) setShowBSOD(false);
    if (showBIOS) setShowBIOS(false);
  };
  
  if (showBSOD || showBIOS) {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleKeyPress);
  }
  
  return () => {
    window.removeEventListener('keydown', handleKeyPress);
    window.removeEventListener('click', handleKeyPress);
  };
}, [showBSOD, showBIOS]);
```

**Файл:** `src/components/ScaryEffects.tsx` (строки 10-46)

**Эффект:**
- Экраны смерти теперь показываются ровно 2 секунды
- Можно закрыть досрочно нажатием любой клавиши или кликом мыши
- Улучшен пользовательский опыт

---

### 2. Добавлены манипулятивные фразы на экране интро

**Что было добавлено:**

На экране с предложением теста (интро) добавлен компонент `SystemMessage`, который плавно показывает системные сообщения в стиле газлайтинга.

**Компонент SystemMessage:**

```typescript
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
```

**Манипулятивные фразы:**
1. "Инициализация протокола калибровки..."
2. "Сканирование нейронных связей..."
3. "Обнаружены аномалии в восприятии..."
4. "Загрузка модулей газлайтинга..."
5. "Подготовка к тестированию..."
6. "Калибровка сенсоров реальности..."
7. "Проверка стабильности психики..."
8. "Активация защитных механизмов..."

**Визуальный эффект:**
- Стеклянная карточка с фиолетовой рамкой
- Пульсирующий индикатор (фиолетовая точка)
- Моноширинный шрифт
- Плавное появление и исчезновение (0.5 секунды)
- Смена сообщения каждые 3 секунды
- Циклический показ всех сообщений

**Файл:** `src/pages/TestPage.tsx` (строки 9-46, 461-478)

**Эффект:**
- Создаёт атмосферу технологического газлайтинга
- Усиливает ощущение подготовки к тесту
- Добавляет манипулятивный контекст
- Плавно появляется и исчезает, не отвлекая

---

## 📊 Технические детали

### Экраны смерти

**BSOD (Синий экран смерти):**
- Цвет: #0078D7 (синий Windows)
- Длительность: 2 секунды
- Закрытие: автоматическое (2 сек) или по нажатию клавиши/клику
- Вероятность появления: 5% при ответе на вопрос

**BIOS (Черный экран):**
- Цвет: черный (#000000)
- Длительность: 2 секунды
- Закрытие: автоматическое (2 сек) или по нажатию клавиши/клику
- Вероятность появления: 5% при ответе на вопрос

**Обработчик закрытия:**
- Слушает события `keydown` и `click`
- Активируется только когда показан BSOD или BIOS
- Очищает слушатели при размонтировании
- Закрывает оба экрана одновременно

---

### Системные сообщения

**Компонент SystemMessage:**
- Принимает массив сообщений
- Показывает одно сообщение за раз
- Плавная анимация появления/исчезновения (0.5 сек)
- Смена сообщения каждые 3 секунды
- Циклический показ (возврат к первому сообщению)

**Визуальное оформление:**
- Стеклянная карточка (glass effect)
- Фиолетовая рамка (border-purple/30)
- Пульсирующий индикатор (animate-pulse)
- Моноширинный шрифт (font-mono)
- Максимальная ширина: 2xl (672px)

**Расположение:**
- Под кнопкой "Начать тест"
- Отступ сверху: 16 (4rem = 64px)
- Центрирование по горизонтали

---

## 🎯 Психологический эффект

### Экраны смерти:
- **Шок:** Внезапное появление синего/черного экрана
- **Дезориентация:** Потеря контекста на 2 секунды
- **Облегчение:** Возможность быстро закрыть нажатием клавиши
- **Газлайтинг:** "Вам не показалось - экран действительно был"

### Системные сообщения:
- **Атмосфера:** Технологический газлайтинг
- **Подготовка:** Ощущение подготовки к тесту
- **Манипуляция:** Фразы намекают на проблемы с восприятием
- **Плавность:** Плавная анимация не отвлекает, но создаёт фон

---

## 📁 Измененные файлы

1. **src/components/ScaryEffects.tsx**
   - Изменены таймауты с 3000/4000 на 2000
   - Добавлен обработчик нажатия клавиш для закрытия
   - Добавлены useEffect для принудительного показа с таймаутом

2. **src/pages/TestPage.tsx**
   - Добавлен компонент SystemMessage
   - Добавлены манипулятивные фразы на экране интро
   - Добавлен отступ под кнопкой "Начать тест"

---

## ✅ Результат сборки

```
✓ 405 modules transformed
✓ built in 4.11s

dist/index.html                         1.23 kB
dist/assets/index-CWYI-3x_.css         49.43 kB
dist/assets/TestPage-BZq9IvXt.js       50.96 kB (увеличен из-за SystemMessage)
dist/assets/index-C9bIrvs5.js         304.73 kB
```

**Статус:** Проект успешно собирается без ошибок.

---

## 🎨 Визуальные эффекты

### Экраны смерти:

**BSOD:**
```
┌─────────────────────────────────┐
│                                 │
│  :(                             │
│                                 │
│  На вашем компьютере возникла   │
│  проблема...                    │
│                                 │
│  85% завершено                  │
│                                 │
│  Код остановки:                 │
│  GASLIGHTER_CLUB_ERROR          │
│                                 │
└─────────────────────────────────┘
```

**BIOS:**
```
┌─────────────────────────────────┐
│ American Megatrends BIOS v2.68  │
│ Copyright (C) 1985-2025         │
│                                 │
│ BIOS Date: 12/25/2025           │
│ Processor: Intel i9-14900K      │
│                                 │
│ Initializing USB ... Done       │
│ 480MB OK                        │
│                                 │
│ AUTO-DETECTING ... GASLIGHTER   │
│ AUTO-DETECTING ... REALITY      │
│                                 │
│ ERROR: Reality not found        │
│ ERROR: Sanity check failed      │
│ ERROR: Trust module corrupted   │
│                                 │
└─────────────────────────────────┘
```

### Системные сообщения:

```
┌─────────────────────────────────┐
│ ● СИСТЕМА:                      │
│                                 │
│ Инициализация протокола         │
│ калибровки...                   │
└─────────────────────────────────┘
         ↓ (через 3 секунды)
┌─────────────────────────────────┐
│ ● СИСТЕМА:                      │
│                                 │
│ Сканирование нейронных          │
│ связей...                       │
└─────────────────────────────────┘
```

---

## 🔧 Технические детали

### Обработчик закрытия:

```typescript
useEffect(() => {
  const handleKeyPress = () => {
    if (showBSOD) setShowBSOD(false);
    if (showBIOS) setShowBIOS(false);
  };
  
  if (showBSOD || showBIOS) {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleKeyPress);
  }
  
  return () => {
    window.removeEventListener('keydown', handleKeyPress);
    window.removeEventListener('click', handleKeyPress);
  };
}, [showBSOD, showBIOS]);
```

**Особенности:**
- Слушает оба события: `keydown` и `click`
- Активируется только при показе экранов
- Очищает слушатели при размонтировании
- Закрывает оба экрана одновременно

### Компонент SystemMessage:

```typescript
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
```

**Особенности:**
- Плавная анимация появления/исчезновения
- Циклический показ сообщений
- Автоматическая смена каждые 3 секунды
- Визуальный индикатор (пульсирующая точка)

---

## 🎯 Итог

✅ Экраны смерти показываются ровно 2 секунды

✅ Экраны смерти можно закрыть нажатием клавиши или кликом

✅ Добавлены манипулятивные фразы на экране интро

✅ Плавная анимация системных сообщений

✅ Циклический показ 8 различных фраз

✅ Проект успешно собирается

**Контакты:** avgas85@mail.ru

**Бесконечность — не предел. Особенно бесконечность осознанности.** ✨
