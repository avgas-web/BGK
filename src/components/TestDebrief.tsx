import { motion } from 'framer-motion';

interface Manipulation {
  type: string;
  name: string;
  description: string;
  count: number;
  wikiLink: string;
}

interface DebriefProps {
  manipulations: Manipulation[];
  onBackToHome: () => void;
  onRetakeTest: () => void;
}

export default function TestDebrief({ manipulations, onBackToHome, onRetakeTest }: DebriefProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="font-mono text-xs text-lime mb-4 tracking-widest">РАЗБОР ПОЛЁТОВ</div>
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
        Что происходило во время теста
      </h2>
      <p className="text-gray text-lg mb-8 max-w-2xl mx-auto">
        В течение этого сеанса над вами были проведены следующие манипуляции. 
        Это не обвинение — это демонстрация того, как легко можно потерять уверенность в себе.
      </p>

      {/* Список манипуляций */}
      <div className="glass rounded-xl p-6 mb-8 text-left">
        <h3 className="font-heading text-xl font-bold mb-4 text-lime">
          Обнаружено манипуляций: {manipulations.length}
        </h3>
        <div className="space-y-4">
          {manipulations.map((manip, index) => (
            <motion.div
              key={manip.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-l-2 border-purple/50 pl-4 py-2"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading font-bold text-white">{manip.name}</span>
                    <span className="text-xs text-gray/60 font-mono">
                      ×{manip.count}
                    </span>
                  </div>
                  <p className="text-sm text-gray">{manip.description}</p>
                </div>
                <a
                  href={manip.wikiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple hover:text-lime transition-colors whitespace-nowrap flex items-center gap-1"
                >
                  Как противостоять →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Статистика */}
      <div className="glass rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="font-heading text-3xl font-bold text-lime">
              {manipulations.reduce((sum, m) => sum + m.count, 0)}
            </div>
            <div className="font-mono text-xs text-gray">всего воздействий</div>
          </div>
          <div>
            <div className="font-heading text-3xl font-bold text-purple">
              {manipulations.length}
            </div>
            <div className="font-mono text-xs text-gray">типов манипуляций</div>
          </div>
          <div>
            <div className="font-heading text-3xl font-bold text-orange">
              {Math.round((manipulations.reduce((sum, m) => sum + m.count, 0) / 15) * 100)}%
            </div>
            <div className="font-mono text-xs text-gray">вопросов затронуто</div>
          </div>
          <div>
            <div className="font-heading text-3xl font-bold text-lime">
              {manipulations.filter(m => m.count > 2).length}
            </div>
            <div className="font-mono text-xs text-gray">повторных воздействий</div>
          </div>
        </div>
      </div>

      {/* Рефлексия */}
      <div className="glass rounded-xl p-6 border-l-2 border-lime/50 mb-8 text-left">
        <h3 className="font-heading text-xl font-bold mb-4 text-lime">
          Вопросы для саморефлексии
        </h3>
        <div className="space-y-3 text-gray text-sm">
          <p className="italic">
            «Сколько раз вы усомнились в себе, хотя были правы?»
          </p>
          <p className="italic">
            «Когда вопрос менялся — вы поверили, что он всегда был таким?»
          </p>
          <p className="italic">
            «Как часто в реальной жизни интерфейс вокруг вас меняется — а вы продолжаете делать вид, что всё нормально?»
          </p>
          <p className="italic">
            «Что вы чувствуете, когда вам говорят "тебе показалось" — и вы начинаете сомневаться?»
          </p>
        </div>
      </div>

      {/* Полезные ресурсы */}
      <div className="glass rounded-xl p-6 mb-8 text-left">
        <h3 className="font-heading text-xl font-bold mb-4 text-purple">
          Как противостоять газлайтингу в реальной жизни
        </h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="https://ru.wikipedia.org/wiki/Газлайтинг" target="_blank" rel="noopener noreferrer" className="text-purple hover:text-lime transition-colors">
              → Газлайтинг — Википедия
            </a>
          </li>
          <li>
            <a href="https://ru.wikipedia.org/wiki/Когнитивное_искажение" target="_blank" rel="noopener noreferrer" className="text-purple hover:text-lime transition-colors">
              → Когнитивные искажения — Википедия
            </a>
          </li>
          <li>
            <a href="https://ru.wikipedia.org/wiki/Критическое_мышление" target="_blank" rel="noopener noreferrer" className="text-purple hover:text-lime transition-colors">
              → Критическое мышление — Википедия
            </a>
          </li>
          <li>
            <a href="https://ru.wikipedia.org/wiki/Эмоциональный_интеллект" target="_blank" rel="noopener noreferrer" className="text-purple hover:text-lime transition-colors">
              → Эмоциональный интеллект — Википедия
            </a>
          </li>
          <li>
            <a href="https://ru.wikipedia.org/wiki/Манипуляция_(психология)" target="_blank" rel="noopener noreferrer" className="text-purple hover:text-lime transition-colors">
              → Психологическая манипуляция — Википедия
            </a>
          </li>
        </ul>
      </div>

      {/* Главный вывод */}
      <div className="glass rounded-xl p-8 mb-8">
        <p className="text-lg mb-4">
          Главный вывод этого теста — <span className="text-lime font-bold">его нет</span>.
        </p>
        <p className="text-gray text-sm mb-4">
          Или он есть — но вы должны сделать его сами. 
          Мы показали, как это работает. Остальное — ваш выбор.
        </p>
        <p className="text-gray/60 text-xs font-mono">
          Если во время теста вы почувствовали дезориентацию — это и есть ответ.
        </p>
      </div>

      {/* Кнопки действий */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onBackToHome}
          className="bg-lime text-cosmic px-6 py-3 rounded-full font-heading font-bold hover:animate-pulse-glow transition-all"
        >
          Вернуться на главную
        </button>
        <button
          onClick={onRetakeTest}
          className="border border-purple/40 text-purple px-6 py-3 rounded-full font-heading hover:bg-purple/10 transition-colors"
        >
          Пройти ещё раз
        </button>
      </div>

      <p className="text-xs text-gray/40 mt-8 font-mono">
        * При повторном прохождении манипуляции могут отличаться. Или не могут. Решайте сами.
      </p>
    </motion.div>
  );
}

export type { Manipulation };
