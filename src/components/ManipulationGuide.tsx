import { motion } from 'framer-motion';

interface Manipulation {
  type: string;
  name: string;
  description: string;
  impact: string;
  essence: string;
  wikiLink: string;
}

const manipulations: Manipulation[] = [
  { type: 'answer_confirmation', name: 'Подтверждение ответа', description: 'Окно с требованием подтвердить ответ', impact: 'Сомнение в выборе, давление', essence: 'Система заставляет подтверждать выбор, создавая неуверенность', wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг' },
  { type: 'question_rewrite', name: 'Переписывание вопроса', description: 'Вопрос изменился после ответа', impact: 'Сомнение в памяти', essence: 'Система изменяет вопрос после ответа, заставляя сомневаться в памяти', wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг' },
  { type: 'answer_change', name: 'Изменение ответа', description: 'Ответ изменён без ведома', impact: 'Потеря контроля', essence: 'Система изменяет ответ без ведома, создавая беспомощность', wikiLink: 'https://ru.wikipedia.org/wiki/Когнитивное_искажение' },
  { type: 'mockery', name: 'Насмешка', description: 'Оскорбительное сообщение', impact: 'Снижение самооценки', essence: 'Система оскорбляет интеллектуальные способности, снижая самооценку', wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг' },
  { type: 'bsod_screen', name: 'Скример BSOD', description: 'Синий экран смерти', impact: 'Страх, отвлечение', essence: 'Внезапное пугающее изображение вызывает стресс', wikiLink: 'https://ru.wikipedia.org/wiki/Скример' },
  { type: 'bios_screen', name: 'Скример BIOS', description: 'Чёрный экран BIOS', impact: 'Страх, отвлечение', essence: 'Внезапное пугающее изображение вызывает стресс', wikiLink: 'https://pikabu.ru/story/ochevidnyie_veshchi_strakh_i_kak_s_nim_rabotat_8753262' },
  { type: 'dishonesty_accusation', name: 'Обвинение в нечестности', description: 'Обвинение при возврате', impact: 'Чувство вины', essence: 'Система обвиняет в нечестности при возврате к вопросу', wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг' },
  { type: 'memory_manipulation', name: 'Манипуляция памятью', description: 'Внушение ложных воспоминаний', impact: 'Сомнение в памяти', essence: 'Система внушает ложные воспоминания о событиях', wikiLink: 'https://ru.wikipedia.org/wiki/Ложные_воспоминания' },
  { type: 'test_crash', name: 'Краш теста', description: 'Тест "сломался"', impact: 'Разочарование', essence: 'Система имитирует сбой, заставляя начинать заново', wikiLink: 'https://ru.wikipedia.org/wiki/Техническая_манипуляция' }
];

interface ManipulationGuideProps {
  onClose: () => void;
}

export default function ManipulationGuide({ onClose }: ManipulationGuideProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-cosmic/95 backdrop-blur-sm overflow-y-auto"
    >
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="font-mono text-xs text-lime mb-1 tracking-widest">СПРАВОЧНИК МАНИПУЛЯЦИЙ</div>
              <h1 className="font-heading text-2xl font-bold text-white">
                Манипуляции на сайте
              </h1>
            </div>
            <button
              onClick={onClose}
              className="bg-red/20 border border-red/50 text-red px-3 py-1.5 rounded-lg hover:bg-red/30 transition-colors text-sm"
            >
              Закрыть
            </button>
          </div>

          {/* Introduction */}
          <div className="glass rounded-xl p-4 mb-6">
            <h2 className="font-heading text-lg font-bold text-lime mb-2">Что такое газлайтинг?</h2>
            <p className="text-gray text-xs leading-relaxed">
              Газлайтинг — форма психологической манипуляции, заставляющая жертву сомневаться в восприятии реальности. 
              Цель — заставить сомневаться в себе и стать зависимым от манипулятора.
            </p>
          </div>

          {/* Manipulations list */}
          <div className="grid gap-3">
            {manipulations.map((manip, index) => (
              <motion.div
                key={manip.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-lg p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading text-sm font-bold text-white truncate">
                        {manip.name}
                      </h3>
                      <a
                        href={manip.wikiLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-purple hover:text-lime transition-colors flex-shrink-0"
                      >
                        ↗
                      </a>
                    </div>
                    <p className="text-gray text-xs leading-relaxed mb-1">
                      {manip.description}
                    </p>
                    <p className="text-gray/70 text-xs">
                      <span className="text-orange font-semibold">Воздействие:</span> {manip.impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 glass rounded-lg p-4">
            <h2 className="font-heading text-sm font-bold text-lime mb-2">Как противостоять?</h2>
            <ul className="space-y-1 text-gray text-xs">
              <li>• <strong>Доверяйте ощущениям</strong> — если кажется неправильным, так и есть</li>
              <li>• <strong>Ведите записи</strong> — проверяйте память по записям</li>
              <li>• <strong>Обсуждайте с другими</strong> — получайте объективную оценку</li>
              <li>• <strong>Устанавливайте границы</strong> — не позволяйте их нарушать</li>
              <li>• <strong>Обращайтесь за помощью</strong> — к психологу или психотерапевту</li>
            </ul>
          </div>

          {/* Close button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={onClose}
              className="bg-lime/20 border border-lime/50 text-lime px-6 py-2 rounded-lg hover:bg-lime/30 transition-colors font-bold text-sm"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
