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
  {
    type: 'answer_confirmation',
    name: 'Подтверждение ответа',
    description: 'Появляется окно с требованием подтвердить свой ответ',
    impact: 'Заставляет усомниться в своём выборе, создаёт дополнительное давление',
    essence: 'Манипуляция через сомнение: система заставляет вас сомневаться в своём выборе, заставляя подтверждать его. Это создаёт дополнительное давление и заставляет чувствовать неуверенность в своих решениях.',
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  },
  {
    type: 'question_rewrite',
    name: 'Переписывание вопроса',
    description: 'Вопрос изменился после вашего ответа',
    impact: 'Заставляет усомниться в памяти, сбивает с толку',
    essence: 'Манипуляция через изменение реальности: система изменяет вопрос после того, как вы на него ответили. Это заставляет вас сомневаться в своей памяти и восприятии реальности.',
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  },
  {
    type: 'answer_change',
    name: 'Изменение ответа',
    description: 'Ваш ответ был изменён без вашего ведома',
    impact: 'Потеря контроля над своими действиями, чувство беспомощности',
    essence: 'Манипуляция через потерю контроля: система изменяет ваш ответ без вашего ведома. Это создаёт чувство беспомощности и потери контроля над своими действиями.',
    wikiLink: 'https://ru.wikipedia.org/wiki/Когнитивное_искажение'
  },
  {
    type: 'mockery',
    name: 'Насмешка над пользователем',
    description: 'Появилось оскорбительное сообщение',
    impact: 'Унижает интеллектуальные способности, снижает самооценку',
    essence: 'Манипуляция через унижение: система оскорбляет ваши интеллектуальные способности, заставляя чувствовать себя некомпетентным. Это снижает самооценку и заставляет сомневаться в своих способностях.',
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  },
  {
    type: 'bsod_screen',
    name: 'Скример (синий экран смерти)',
    description: 'Внезапное появление пугающего изображения',
    impact: 'Вызывает страх и отвлечение внимания',
    essence: 'Манипуляция через страх: система внезапно показывает пугающее изображение (синий экран смерти), вызывая страх и отвлечение внимания. Это создаёт стресс и заставляет терять концентрацию.',
    wikiLink: 'https://ru.wikipedia.org/wiki/Скример'
  },
  {
    type: 'bios_screen',
    name: 'Скример (чёрный экран BIOS)',
    description: 'Внезапное появление пугающего изображения',
    impact: 'Вызывает страх и отвлечение внимания',
    essence: 'Манипуляция через страх: система внезапно показывает пугающее изображение (чёрный экран BIOS), вызывая страх и отвлечение внимания. Это создаёт стресс и заставляет терять концентрацию.',
    wikiLink: 'https://pikabu.ru/story/ochevidnyie_veshchi_strakh_i_kak_s_nim_rabotat_8753262'
  },
  {
    type: 'dishonesty_accusation',
    name: 'Обвинение в нечестности',
    description: 'При возврате на предыдущий вопрос появилось обвинение в нечестной сдаче теста',
    impact: 'Заставляет усомниться в своих действиях, создаёт чувство вины',
    essence: 'Манипуляция через обвинение: система обвиняет вас в нечестности при попытке вернуться к предыдущему вопросу. Это создаёт чувство вины и заставляет сомневаться в своих действиях.',
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  }
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="font-mono text-xs text-lime mb-2 tracking-widest">СПРАВОЧНИК МАНИПУЛЯЦИЙ</div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-white">
                Справочник по манипуляциям
              </h1>
              <p className="text-gray text-sm mt-2">
                Этот справочник доступен только в режиме ясности
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-red/20 border border-red/50 text-red px-4 py-2 rounded-lg hover:bg-red/30 transition-colors"
            >
              Закрыть
            </button>
          </div>

          {/* Introduction */}
          <div className="glass rounded-xl p-6 mb-8">
            <h2 className="font-heading text-xl font-bold text-lime mb-4">
              Что такое газлайтинг?
            </h2>
            <p className="text-gray text-sm leading-relaxed mb-4">
              Газлайтинг — это форма психологической манипуляции, при которой манипулятор заставляет жертву сомневаться в своём восприятии реальности, памяти или здравом смысле. 
              Цель газлайтинга — заставить жертву сомневаться в себе и стать более зависимой от манипулятора.
            </p>
            <p className="text-gray text-sm leading-relaxed">
              В этом справочнике собраны основные типы манипуляций, которые применяются в тесте. 
              Изучение этих манипуляций поможет вам распознавать их в реальной жизни и противостоять им.
            </p>
          </div>

          {/* Manipulations list */}
          <div className="space-y-6">
            {manipulations.map((manip, index) => (
              <motion.div
                key={manip.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold text-white mb-2">
                      {manip.name}
                    </h3>
                    <p className="text-gray text-sm mb-4">
                      {manip.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-heading text-sm font-bold text-orange mb-2">
                      Воздействие:
                    </h4>
                    <p className="text-gray text-sm leading-relaxed">
                      {manip.impact}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading text-sm font-bold text-purple mb-2">
                      Суть манипуляции:
                    </h4>
                    <p className="text-gray text-sm leading-relaxed">
                      {manip.essence}
                    </p>
                  </div>

                  <div>
                    <a
                      href={manip.wikiLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-purple hover:text-lime transition-colors"
                    >
                      Подробнее на Wikipedia →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 glass rounded-xl p-6">
            <h2 className="font-heading text-xl font-bold text-lime mb-4">
              Как противостоять манипуляциям?
            </h2>
            <ul className="space-y-3 text-gray text-sm">
              <li className="flex items-start gap-2">
                <span className="text-lime mt-1">•</span>
                <span><strong>Доверяйте своим ощущениям:</strong> Если что-то кажется неправильным, скорее всего, так и есть.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime mt-1">•</span>
                <span><strong>Ведите записи:</strong> Записывайте важные события и разговоры, чтобы иметь возможность проверить свою память.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime mt-1">•</span>
                <span><strong>Обсуждайте с другими:</strong> Обсуждайте свои сомнения с доверенными людьми, чтобы получить объективную оценку ситуации.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime mt-1">•</span>
                <span><strong>Устанавливайте границы:</strong> Чётко обозначайте свои границы и не позволяйте манипулятору их нарушать.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime mt-1">•</span>
                <span><strong>Обращайтесь за помощью:</strong> Если вы чувствуете, что не справляетесь, обратитесь к психологу или психотерапевту.</span>
              </li>
            </ul>
          </div>

          {/* Close button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onClose}
              className="bg-lime/20 border border-lime/50 text-lime px-8 py-3 rounded-lg hover:bg-lime/30 transition-colors font-bold"
            >
              Закрыть справочник
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
