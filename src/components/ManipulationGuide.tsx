import { motion } from 'framer-motion';

interface Manipulation {
  type: string;
  name: string;
  description: string;
  manifestations: string[];
  methods: string[];
  wikiLink: string;
}

const manipulations: Manipulation[] = [
  {
    type: 'denial',
    name: 'Отрицание действий',
    description: 'Манипулятор отрицает ваши действия или слова, заставляя сомневаться в своей памяти',
    manifestations: [
      '«Вы не нажимали эту кнопку»',
      '«Вы не отправляли это сообщение»',
      '«Вы не оформляли этот заказ»',
      '«Вы сами вышли из системы»'
    ],
    methods: [
      'Ведите записи своих действий',
      'Делайте скриншоты важных моментов',
      'Доверяйте своим записям, а не словам манипулятора',
      'Сохраняйте подтверждения действий'
    ],
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  },
  {
    type: 'rewrite',
    name: 'Переписывание истории',
    description: 'Манипулятор изменяет прошлые события или условия, создавая путаницу',
    manifestations: [
      '«Условия изменились, вы согласились»',
      '«Цена была другой, вы согласились»',
      '«Мы всегда так делали»',
      '«Вы сами согласились на новые условия»'
    ],
    methods: [
      'Сохраняйте оригинальные условия',
      'Фиксируйте все изменения',
      'Требуйте письменные подтверждения',
      'Не верьте на слово, проверяйте документы'
    ],
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  },
  {
    type: 'false_confirmation',
    name: 'Ложные подтверждения',
    description: 'Манипулятор создаёт ложные подтверждения ваших действий или согласий',
    manifestations: [
      '«Вы подтвердили согласие»',
      '«Вы согласились с условиями»',
      '«Вы подтвердили оплату»',
      '«Вы подписали документ»'
    ],
    methods: [
      'Внимательно читайте все подтверждения',
      'Не нажимайте кнопки автоматически',
      'Проверяйте, что именно вы подтверждаете',
      'Требуйте копии всех документов'
    ],
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  },
  {
    type: 'blame',
    name: 'Перекладывание вины',
    description: 'Манипулятор перекладывает вину на вас, заставляя чувствовать себя виноватым',
    manifestations: [
      '«Вы неправильно ввели данные»',
      '«Вы невнимательно читали»',
      '«Вы сами виноваты»',
      '«Это ваша ошибка»'
    ],
    methods: [
      'Не принимайте вину на себя без доказательств',
      'Требуйте конкретные доказательства вашей вины',
      'Проверяйте факты самостоятельно',
      'Не позволяйте манипулировать вашим чувством вины'
    ],
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  },
  {
    type: 'contradiction',
    name: 'Противоречивые сигналы',
    description: 'Манипулятор даёт противоречивую информацию, создавая путаницу',
    manifestations: [
      'Разные цены на разных страницах',
      'Противоречивые условия в разных документах',
      'Разные ответы от разных сотрудников',
      'Противоречивая информация в разных источниках'
    ],
    methods: [
      'Фиксируйте всю информацию',
      'Требуйте письменные подтверждения',
      'Сравнивайте информацию из разных источников',
      'Требуйте разъяснений противоречий'
    ],
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  },
  {
    type: 'amnesia',
    name: 'Принудительная амнезия',
    description: 'Манипулятор создаёт ситуацию, когда вы не можете подтвердить свои действия',
    manifestations: [
      '«История действий недоступна»',
      '«Чеки не сохраняются»',
      '«Переписка удалена»',
      '«Подтверждения не предусмотрены»'
    ],
    methods: [
      'Сохраняйте все подтверждения самостоятельно',
      'Делайте скриншоты важных моментов',
      'Ведите личный журнал действий',
      'Не полагайтесь на систему, сохраняйте доказательства'
    ],
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  },
  {
    type: 'isolation',
    name: 'Изоляция',
    description: 'Манипулятор изолирует вас от внешних источников информации',
    manifestations: [
      '«Доверьтесь только нам»',
      '«Другие источники вас обманут»',
      '«Только мы знаем правду»',
      '«Не верьте другим источникам»'
    ],
    methods: [
      'Проверяйте информацию из разных источников',
      'Не изолируйтесь от внешних источников',
      'Обсуждайте ситуацию с доверенными людьми',
      'Сравнивайте информацию из разных источников'
    ],
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  },
  {
    type: 'minimization',
    name: 'Преуменьшение',
    description: 'Манипулятор преуменьшает ваши чувства или проблемы',
    manifestations: [
      '«Это мелочь, не стоит внимания»',
      '«Вы слишком остро реагируете»',
      '«Все так делают, это нормально»',
      '«Не преувеличивайте»'
    ],
    methods: [
      'Доверяйте своим чувствам',
      'Не позволяйте преуменьшать ваши проблемы',
      'Настаивайте на серьёзности проблемы',
      'Не позволяйте манипулировать вашими чувствами'
    ],
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  },
  {
    type: 'love_bombing',
    name: 'Любовная бомбардировка',
    description: 'Манипулятор заваливает вас комплиментами и вниманием, чтобы создать зависимость',
    manifestations: [
      '«Вы особенный пользователь»',
      '«Только для вас персональное предложение»',
      '«Вы наш любимый клиент»',
      '«Только вы получили это предложение»'
    ],
    methods: [
      'Не верьте чрезмерным комплиментам',
      'Проверяйте, действительно ли предложение уникально',
      'Не позволяйте комплиментам влиять на решения',
      'Принимайте решения на основе фактов, а не эмоций'
    ],
    wikiLink: 'https://ru.wikipedia.org/wiki/Любовная_бомбардировка'
  },
  {
    type: 'overload',
    name: 'Информационная перегрузка',
    description: 'Манипулятор заваливает вас информацией, чтобы вы не могли разобраться',
    manifestations: [
      'Множество всплывающих окон',
      'Сложные условия с множеством пунктов',
      'Постоянные уведомления и уведомления',
      'Сложная информация, которую трудно понять'
    ],
    methods: [
      'Не принимайте решения под давлением',
      'Требуйте время на обдумывание',
      'Разбивайте информацию на части',
      'Не подписывайте ничего, не поняв полностью'
    ],
    wikiLink: 'https://ru.wikipedia.org/wiki/Информационная_перегрузка'
  },
  {
    type: 'fake_social',
    name: 'Фальшивые социальные доказательства',
    description: 'Манипулятор создаёт фальшивые социальные доказательства, чтобы создать давление',
    manifestations: [
      '«90% пользователей выбирают это»',
      '«Иван только что купил»',
      '«Тысячи пользователей уже выбрали»',
      '«Все выбирают этот вариант»'
    ],
    methods: [
      'Проверяйте социальные доказательства',
      'Не верьте статистике без источников',
      'Принимайте решения самостоятельно',
      'Не позволяйте социальному давлению влиять на решения'
    ],
    wikiLink: 'https://ru.wikipedia.org/wiki/Социальное_доказательство'
  },
  {
    type: 'technical',
    name: 'Технический газлайтинг',
    description: 'Манипулятор использует технические проблемы для манипуляции',
    manifestations: [
      '«Система сломалась, начните заново»',
      '«Техническая ошибка, повторите действие»',
      '«Сбой системы, данные потеряны»',
      '«Технические проблемы, начните сначала»'
    ],
    methods: [
      'Сохраняйте данные самостоятельно',
      'Требуйте объяснений технических проблем',
      'Не начинайте заново без выяснения причин',
      'Требуйте компенсации за потерянные данные'
    ],
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  },
  {
    type: 'support_manipulation',
    name: 'Манипуляция поддержкой',
    description: 'Манипулятор использует поддержку для манипуляции',
    manifestations: [
      '«Ваш вопрос уже решён» (без решения)',
      '«Мы не можем помочь»',
      '«Это не наша проблема»',
      '«Обратитесь в другое место»'
    ],
    methods: [
      'Требуйте конкретные решения',
      'Не принимайте отказы без объяснений',
      'Требуйте письменные ответы',
      'Обращайтесь в вышестоящие инстанции'
    ],
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  },
  {
    type: 'false_warning',
    name: 'Ложные предупреждения',
    description: 'Манипулятор создаёт ложные предупреждения для создания страха',
    manifestations: [
      '«Ваш аккаунт будет удалён»',
      '«Подозрительная активность»',
      '«Платёж не прошёл»',
      '«Вы должны подтвердить личность»'
    ],
    methods: [
      'Проверяйте предупреждения самостоятельно',
      'Не действуйте под давлением страха',
      'Требуйте доказательства предупреждений',
      'Не принимайте поспешных решений'
    ],
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  },
  {
    type: 'dependency',
    name: 'Принудительная зависимость',
    description: 'Манипулятор создаёт зависимость, чтобы удержать вас',
    manifestations: [
      '«Если уйдёте, потеряете бонусы»',
      '«Штраф за отмену»',
      '«Экспорт данных недоступен»',
      '«Вы потеряете прогресс»'
    ],
    methods: [
      'Не позволяйте создавать зависимость',
      'Требуйте возможность выхода',
      'Требуйте экспорт данных',
      'Не бойтесь потерять бонусы'
    ],
    wikiLink: 'https://ru.wikipedia.org/wiki/Газлайтинг'
  },
  {
    type: 'truth_lie_mix',
    name: 'Смесь правды и лжи',
    description: 'Манипулятор смешивает правду и ложь, чтобы запутать вас',
    manifestations: [
      'Правдивые факты с ложными выводами',
      'Правдивые детали с ложными утверждениями',
      'Правдивая информация с ложными интерпретациями',
      'Правдивые данные с ложными заключениями'
    ],
    methods: [
      'Разделяйте факты и интерпретации',
      'Проверяйте каждое утверждение отдельно',
      'Не принимайте выводы на веру',
      'Проверяйте источники информации'
    ],
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
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="font-mono text-xs text-lime mb-2 tracking-widest">СПРАВОЧНИК</div>
              <h1 className="font-heading text-3xl font-bold text-white">
                Манипуляции и защита
              </h1>
            </div>
            <button
              onClick={onClose}
              className="bg-red/20 border border-red/50 text-red px-4 py-2 rounded-lg hover:bg-red/30 transition-colors text-sm font-semibold"
            >
              Закрыть
            </button>
          </div>

          {/* Introduction */}
          <div className="glass rounded-xl p-5 mb-6">
            <h2 className="font-heading text-lg font-bold text-lime mb-3">Что такое газлайтинг?</h2>
            <p className="text-gray text-sm leading-relaxed mb-3">
              Газлайтинг — форма психологической манипуляции, при которой манипулятор заставляет жертву сомневаться в своём восприятии реальности, памяти или здравом смысле.
            </p>
            <p className="text-gray text-sm leading-relaxed">
              Ниже представлены основные типы манипуляций, их проявления и методы защиты от них.
            </p>
          </div>

          {/* Manipulations list */}
          <div className="space-y-4">
            {manipulations.map((manip, index) => (
              <motion.div
                key={manip.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-heading text-base font-bold text-white flex-1">
                    {manip.name}
                  </h3>
                  <a
                    href={manip.wikiLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple hover:text-lime transition-colors flex-shrink-0"
                    title="Подробнее на Wikipedia"
                  >
                    ↗
                  </a>
                </div>
                
                <p className="text-gray text-sm leading-relaxed mb-3">
                  {manip.description}
                </p>

                <div className="space-y-2">
                  <div>
                    <h4 className="text-xs font-semibold text-orange mb-1">Проявления:</h4>
                    <ul className="space-y-1">
                      {manip.manifestations.map((manifestation, idx) => (
                        <li key={idx} className="text-xs text-gray/80 flex items-start gap-2">
                          <span className="text-orange/60 mt-0.5">•</span>
                          <span>{manifestation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-lime mb-1">Методы защиты:</h4>
                    <ul className="space-y-1">
                      {manip.methods.map((method, idx) => (
                        <li key={idx} className="text-xs text-gray/80 flex items-start gap-2">
                          <span className="text-lime/60 mt-0.5">✓</span>
                          <span>{method}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* General recommendations */}
          <div className="mt-6 glass rounded-xl p-5">
            <h2 className="font-heading text-lg font-bold text-lime mb-3">Общие рекомендации</h2>
            <ul className="space-y-2 text-gray text-sm">
              <li className="flex items-start gap-2">
                <span className="text-lime mt-1">•</span>
                <span><strong className="text-white">Доверяйте своим ощущениям</strong> — если что-то кажется неправильным, скорее всего, так и есть</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime mt-1">•</span>
                <span><strong className="text-white">Ведите записи</strong> — фиксируйте важные события, разговоры и решения</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime mt-1">•</span>
                <span><strong className="text-white">Обсуждайте с другими</strong> — получайте объективную оценку ситуации от доверенных людей</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime mt-1">•</span>
                <span><strong className="text-white">Устанавливайте границы</strong> — чётко обозначайте свои границы и не позволяйте их нарушать</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime mt-1">•</span>
                <span><strong className="text-white">Обращайтесь за помощью</strong> — если чувствуете, что не справляетесь, обратитесь к психологу</span>
              </li>
            </ul>
          </div>

          {/* Close button */}
          <div className="mt-6 flex justify-center">
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
