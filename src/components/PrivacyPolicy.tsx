import { motion } from 'framer-motion';

import { useState } from 'react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export default function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
  const [showAutoAccept, setShowAutoAccept] = useState(false);

  const handleReject = () => {
    setShowAutoAccept(true);
    setTimeout(() => {
      setShowAutoAccept(false);
      onClose();
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-cosmic/95 backdrop-blur-sm overflow-y-auto"
    >
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="font-mono text-xs text-lime mb-2 tracking-widest">ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ</div>
              <h1 className="font-heading text-3xl font-bold text-white">
                Политика конфиденциальности
              </h1>
            </div>
            <button
              onClick={onClose}
              className="bg-red/20 border border-red/50 text-red px-4 py-2 rounded-lg hover:bg-red/30 transition-colors text-sm"
            >
              Закрыть
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6 text-gray">
            <div className="glass rounded-xl p-6">
              <h2 className="font-heading text-xl font-bold text-lime mb-4">1. Общие положения</h2>
              <p className="text-sm leading-relaxed mb-3">
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта «Базз Газлайтер Клаб» (далее — Сайт).
              </p>
              <p className="text-sm leading-relaxed">
                Сайт является художественным проектом, демонстрирующим механизмы психологических манипуляций в образовательных целях. Сайт не собирает, не хранит и не передаёт персональные данные пользователей третьим лицам.
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <h2 className="font-heading text-xl font-bold text-lime mb-4">2. Какие данные мы собираем</h2>
              <p className="text-sm leading-relaxed mb-3">
                <strong className="text-white">Сайт НЕ собирает:</strong>
              </p>
              <ul className="space-y-2 text-sm mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-red mt-1">✕</span>
                  <span>Персональные данные (имя, email, телефон, адрес)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red mt-1">✕</span>
                  <span>Данные о местоположении</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red mt-1">✕</span>
                  <span>Платёжную информацию</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red mt-1">✕</span>
                  <span>Данные для идентификации личности</span>
                </li>
              </ul>
              <p className="text-sm leading-relaxed mb-3">
                <strong className="text-white">Сайт может собирать:</strong>
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">✓</span>
                  <span>Технические данные (тип браузера, разрешение экрана) — исключительно для оптимизации работы сайта</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">✓</span>
                  <span>Локальные данные (localStorage) — для сохранения настроек пользователя (режим ясности, стоп-слово)</span>
                </li>
              </ul>
            </div>

            <div className="glass rounded-xl p-6">
              <h2 className="font-heading text-xl font-bold text-lime mb-4">3. Cookies</h2>
              <p className="text-sm leading-relaxed mb-3">
                Сайт использует cookies исключительно для:
              </p>
              <ul className="space-y-2 text-sm mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">✓</span>
                  <span>Сохранения настроек пользователя (режим ясности, стоп-слово)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">✓</span>
                  <span>Оптимизации работы сайта</span>
                </li>
              </ul>
              <p className="text-sm leading-relaxed">
                Cookies не используются для отслеживания пользователей, сбора персональных данных или передачи информации третьим лицам.
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <h2 className="font-heading text-xl font-bold text-lime mb-4">4. Безопасность</h2>
              <p className="text-sm leading-relaxed mb-3">
                Мы принимаем следующие меры для защиты пользователей:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">✓</span>
                  <span>Стоп-слово «Бесконечность» для немедленного отключения всех эффектов</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">✓</span>
                  <span>Режим ясности для спокойной версии сайта без газлайтинг-эффектов</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">✓</span>
                  <span>Возможность покинуть сайт в любой момент без ограничений</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">✓</span>
                  <span>Чёткое предупреждение о содержании сайта перед входом</span>
                </li>
              </ul>
            </div>

            <div className="glass rounded-xl p-6">
              <h2 className="font-heading text-xl font-bold text-lime mb-4">5. Права пользователей</h2>
              <p className="text-sm leading-relaxed mb-3">
                Вы имеете право:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">✓</span>
                  <span>Покинуть сайт в любой момент без объяснения причин</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">✓</span>
                  <span>Отключить все эффекты с помощью стоп-слова</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">✓</span>
                  <span>Включить режим ясности для спокойной версии сайта</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">✓</span>
                  <span>Очистить локальные данные через настройки браузера</span>
                </li>
              </ul>
            </div>

            <div className="glass rounded-xl p-6">
              <h2 className="font-heading text-xl font-bold text-lime mb-4">6. Контактная информация</h2>
              <p className="text-sm leading-relaxed mb-3">
                По всем вопросам, связанным с политикой конфиденциальности, обращайтесь:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple mt-1">•</span>
                  <span>Email: <a href="mailto:avgas85@mail.ru" className="text-lime hover:underline">avgas85@mail.ru</a></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple mt-1">•</span>
                  <span>Тема письма: «Политика конфиденциальности»</span>
                </li>
              </ul>
            </div>

            <div className="glass rounded-xl p-6 border-l-4 border-orange/50">
              <h2 className="font-heading text-xl font-bold text-orange mb-4">7. Важное предупреждение</h2>
              <p className="text-sm leading-relaxed mb-3">
                <strong className="text-white">Этот сайт является художественным проектом</strong> и не является медицинским, психологическим или юридическим сервисом.
              </p>
              <p className="text-sm leading-relaxed mb-3">
                Если вы испытываете психологический дискомфорт, тревогу или другие негативные эмоции, пожалуйста:
              </p>
              <ul className="space-y-2 text-sm mb-3">
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-1">•</span>
                  <span>Немедленно покиньте сайт</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-1">•</span>
                  <span>Обратитесь к квалифицированному специалисту (психологу, психотерапевту)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-1">•</span>
                  <span>Позвоните на телефон доверия: <strong className="text-white">8-800-2000-122</strong> (бесплатно по России)</span>
                </li>
              </ul>
              <p className="text-xs text-gray/60 italic">
                Администрация сайта не несёт ответственности за психологическое состояние пользователей.
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <h2 className="font-heading text-xl font-bold text-lime mb-4">8. Изменения в политике</h2>
              <p className="text-sm leading-relaxed">
                Администрация сайта оставляет за собой право вносить изменения в настоящую Политику конфиденциальности. Все изменения будут опубликованы на этой странице с указанием даты последнего обновления.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray/60 mb-4">
              Дата последнего обновления: 18.09.2026
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={onClose}
                className="bg-lime/20 border border-lime/50 text-lime px-8 py-3 rounded-lg hover:bg-lime/30 transition-colors font-bold"
              >
                Принимаю
              </button>
              <button
                onClick={handleReject}
                className="bg-red/20 border border-red/50 text-red px-8 py-3 rounded-lg hover:bg-red/30 transition-colors font-bold"
              >
                Отклонить
              </button>
            </div>
          </div>

          {/* Auto-accept message */}
          {showAutoAccept && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000] max-w-md"
            >
              <div className="bg-orange/90 backdrop-blur border-2 border-orange rounded-lg p-4 shadow-[0_0_30px_rgba(255,107,53,0.5)]">
                <p className="text-white text-sm font-mono text-center">
                  Продолжая использовать сайт, вы автоматически соглашаетесь с Политикой конфиденциальности
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
