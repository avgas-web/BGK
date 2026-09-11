# Полный код сайта "Базз Газлайтер Клаб"

## Структура проекта

```
buzz-gaslighter-club/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions для деплоя
├── public/
│   ├── .nojekyll                   # Отключение Jekyll
│   └── 404.html                    # SPA fallback
├── src/
│   ├── components/
│   │   ├── WarningPage.tsx         # Страница-предупреждение
│   │   ├── GaslightEffects.tsx     # Базовые эффекты газлайтинга
│   │   ├── GaslightPatterns.tsx    # 20 паттернов газлайтинга
│   │   ├── FinancialPanic.tsx      # Тревожные окна-ловушки
│   │   └── ScaryEffects.tsx        # Страшные эффекты (BSOD, трещины)
│   ├── pages/
│   │   └── TestPage.tsx            # Тест на подверженность газлайтингу
│   ├── App.tsx                     # Главный компонент
│   ├── main.tsx                    # Точка входа
│   └── index.css                   # Стили и анимации
├── index.html                      # HTML-шаблон
├── package.json                    # Зависимости
├── vite.config.js                  # Конфигурация Vite
├── tsconfig.json                   # Конфигурация TypeScript
├── README.md                       # Документация
└── FULL_SOURCE.md                  # Этот файл
```

---

## Файлы проекта

Все файлы проекта уже созданы и находятся в соответствующих директориях. Ниже приведено краткое описание каждого файла:

### Конфигурационные файлы

- **package.json** — зависимости проекта (React, Framer Motion, Tailwind CSS)
- **vite.config.js** — конфигурация Vite с `base: './'` для GitHub Pages
- **tsconfig.json** — настройки TypeScript
- **index.html** — HTML-шаблон с `<base href="./" />` и подключением шрифтов

### GitHub Pages

- **.github/workflows/deploy.yml** — автоматический деплой через GitHub Actions (Node.js 22)
- **public/.nojekyll** — отключение Jekyll
- **public/404.html** — SPA fallback для корректной работы роутинга

### Исходный код (src/)

#### main.tsx
Точка входа. Импортирует React, ReactDOM, стили и App компонент.

#### index.css
Полные стили проекта:
- CSS-переменные для цветов (cosmic, graphite, lime, purple, orange, red)
- Анимации: glitch, pulse, orbit, float, scanline, whisper, cursor-trail
- Новые анимации: jitter, hard-jitter, screen-flicker, color-shift, double-vision, crash-glitch, vhs-tracking
- Утилитарные классы: glass, scanline-overlay, cursor-trail, crash-screen
- Поддержка prefers-reduced-motion
- Режим ясности (clarity-mode)

#### App.tsx
Главный компонент сайта:
- Состояния: currentPage, showWarning, clarityMode, gaslightingEnabled, stopWordActive
- Интеграция всех газлайтинг-эффектов
- Навигация с кнопкой "Режим ясности"
- Секции: Hero, Disclaimer, Deorientation, Problem, Method, Products, B2B, Reviews, Ethics, Team, FAQ, Final CTA, Footer
- Модальные окна: Welcome back, Cookie, Exit intent
- Поле для ввода стоп-слова "бесконечность"
- Динамический FAQ с пренебрежительными ответами

#### components/WarningPage.tsx
Страница-предупреждение:
- SVG-логотип: шлем Базза Газлайтера + три большие буквы БГК
- Шлем в цветах сайта (графит, фиолетовый, лайм)
- Спираль газлайтинга внутри визора
- Луч маяка сверху
- Предупреждение о возможных эффектах
- Чекбокс согласия
- Кнопка "Войти на сайт" (активируется после согласия)
- Ссылка "Уйти с сайта"
- Юридическая информация

#### components/GaslightEffects.tsx
Базовые эффекты газлайтинга:
- useGaslighting hook — управление всеми эффектами
- GaslightEffects компонент — визуальные эффекты
- ScrambledText компонент — эффект скрамблирования текста
- Эффекты: crash screen, freeze, jitter, cursor displacement, color shift, double vision, VHS tracking, notifications, memory gaslight, screen rotation, fake loader, text scramble, inverted colors

#### components/GaslightPatterns.tsx
20 паттернов газлайтинга:
1. DeniedAction — отрицание действий пользователя
2. RewrittenHistory — переписывание истории
3. FalseConfirmation — ложные подтверждения
4. BlameShift — перекладывание вины
5. ContradictorySignals — противоречивые сигналы
6. MovingGoalposts — движущиеся ворота
7. ForcedAmnesia — принудительная амнезия
8. Isolation — изоляция
9. Trivialization — тривиализация
10. LoveBombing — love bombing
11. Overload — перегрузка
12. FalseUrgency — ложная срочность
13. FakeSocialProof — фейковое социальное доказательство
14. TechnicalGaslighting — технический газлайтинг
15. SupportGaslighting — газлайтинг в поддержке
16. HiddenConsent — скрытое управление согласием
17. InterfaceShift — изменение интерфейса
18. FalseAlerts — ложные тревожные уведомления
19. ForcedDependency — принуждение к зависимости
20. TruthLieMix — смешение правды и лжи
21. InternetBlame — обвинение в неоплаченном интернете

#### components/FinancialPanic.tsx
Тревожные окна-ловушки:
- 5 типов предупреждений (funds, blocked, suspended, debt, expired)
- Мигание, тряска, пульсация
- Ловушка при нажатии кнопки (50% шанс "успешного" сообщения)
- Фейковые технические детали

#### components/ScaryEffects.tsx
Страшные эффекты:
- ScaryLockScreen — экран блокировки (1 сек, 8% шанс)
- ScreenCracks — трещины на экране (3 сек, 15% шанс)
- BSOD — синий экран смерти (2 сек, 20% шанс)

#### pages/TestPage.tsx
Тест на подверженность газлайтингу:
- 15 вопросов с динамическими изменениями
- Каждый вопрос имеет 3-4 альтернативы
- 70% вероятность смены вопроса
- 25% вероятность краша теста
- 20% вероятность BSOD
- Мета-вопросы для саморефлексии
- Финальная рефлексия без "правильного" ответа

---

## Как использовать

### Локальная разработка

```bash
npm install
npm run dev
```

Откройте http://localhost:3000

### Сборка для продакшена

```bash
npm run build
```

Собраные файлы будут в папке `dist/`

### Деплой на GitHub Pages

1. Создайте репозиторий на GitHub
2. Запушьте код в ветку `main` или `master`
3. Перейдите в Settings → Pages
4. В разделе Source выберите GitHub Actions
5. Workflow запустится автоматически

Сайт будет доступен по адресу: `https://<username>.github.io/<repository-name>/`

---

## Ключевые особенности

### Газлайтинг-эффекты

- **20+ типов паттернов** газлайтинга
- **Динамические вопросы** в тесте (меняются в процессе)
- **Тревожные окна** с ловушками при нажатии кнопок
- **Страшные эффекты** (BSOD, трещины, экран блокировки)
- **Обвинения** в неоплаченном интернете
- **Пренебрежительные ответы** в FAQ

### Безопасность

- **Стоп-слово "бесконечность"** — отключает все эффекты
- **Режим ясности** — спокойная версия без газлайтинга
- **Поддержка prefers-reduced-motion** — автоматическое отключение анимаций
- **Страница-предупреждение** — информированное согласие

### Дизайн

- **Ретро-футуризм** + клиническая эстетика
- **Цветовая палитра**: космический индиго, графит, лайм, фиолетовый
- **Типографика**: Space Grotesk (заголовки), Inter (текст), JetBrains Mono (системные сообщения)
- **SVG-логотип**: шлем Базза Газлайтера + три большие буквы БГК

---

## Контакты

avgas85@mail.ru

---

## Лицензия

© 2025 ООО «Институт Информационной Гигиены»

---

**Бесконечность — не предел. Особенно бесконечность осознанности.**
