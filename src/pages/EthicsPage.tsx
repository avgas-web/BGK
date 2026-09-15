import { motion } from 'framer-motion';

export default function EthicsPage() {
  return (
    <div className="min-h-screen bg-cosmic text-white pt-20">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-xs text-lime mb-4 tracking-widest">ЭТИКА И БЕЗОПАСНОСТЬ</div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-8">Этический комитет</h1>
          <p className="text-gray text-lg max-w-3xl mb-16 leading-relaxed">
            Безопасность участников — наш главный приоритет. Для контроля безопасности и научной обоснованности 
            создаётся Этический комитет, имеющий право вето на любые изменения методологии, несущие риск ретравматизации.
          </p>
        </motion.div>

        {/* Этический комитет */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-8 mb-16 border-l-4 border-orange"
        >
          <h2 className="font-heading text-2xl font-bold mb-6 text-orange">Состав Этического комитета</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-graphite/50 rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-orange/20 flex items-center justify-center mb-4">
                <span className="text-orange text-xl">1</span>
              </div>
              <h3 className="font-heading font-bold mb-2">Независимый клинический супервизор</h3>
              <p className="text-gray text-sm">
                Назначается инвестором. Обеспечивает независимый контроль качества и безопасности методологии.
              </p>
            </div>
            <div className="bg-graphite/50 rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-orange/20 flex items-center justify-center mb-4">
                <span className="text-orange text-xl">2</span>
              </div>
              <h3 className="font-heading font-bold mb-2">Действующий Хранитель Метода</h3>
              <p className="text-gray text-sm">
                Клинический директор БГК. Отвечает за методологию и её научную обоснованность.
              </p>
            </div>
            <div className="bg-graphite/50 rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-orange/20 flex items-center justify-center mb-4">
                <span className="text-orange text-xl">3</span>
              </div>
              <h3 className="font-heading font-bold mb-2">Приглашённый академический эксперт</h3>
              <p className="text-gray text-sm">
                Внешний эксперт из академической среды. Обеспечивает научную обоснованность и соответствие стандартам.
              </p>
            </div>
          </div>
          <div className="bg-orange/10 rounded-lg p-4 border-l-2 border-orange">
            <p className="text-sm text-gray">
              <span className="text-orange font-bold">Право вето:</span> Этический комитет имеет право вето 
              на любые изменения методологии, несущие риск ретравматизации участников.
            </p>
          </div>
        </motion.div>

        {/* Протоколы безопасности */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-heading text-3xl font-bold mb-8">Протоколы безопасности</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { 
                icon: '📋', 
                title: 'Информированное согласие', 
                desc: 'Перед участием каждый участник подписывает информированное согласие, где подробно описаны все этапы тренинга, возможные эффекты и права участника.' 
              },
              { 
                icon: '🔍', 
                title: 'Предварительный скрининг', 
                desc: 'Каждый участник проходит предварительный скрининг для выявления противопоказаний: острые состояния, ПТСР без сопровождения, кризис.' 
              },
              { 
                icon: '🔑', 
                title: 'Стоп-слово', 
                desc: 'Стоп-слово «Бесконечность» — в любой момент все эффекты отключаются. Участник может остановить тренинг в любой момент без объяснения причин.' 
              },
              { 
                icon: '👨‍⚕️', 
                title: 'Дежурный психолог', 
                desc: 'Клинический психолог с опытом 10+ лет присутствует на протяжении всего тренинга и готов оказать поддержку в любой момент.' 
              },
              { 
                icon: '🚪', 
                title: 'Право на выход', 
                desc: 'Участник может покинуть пространство тренинга в любой момент с полным возвратом средств. Никаких вопросов, никаких обязательств.' 
              },
              { 
                icon: '🔞', 
                title: 'Возраст 18+', 
                desc: 'Участие только для совершеннолетних. Мы не работаем с несовершеннолетними из соображений безопасности и этики.' 
              },
              { 
                icon: '📝', 
                title: 'Разбор инцидентов', 
                desc: 'Каждый инцидент разбирается Этическим комитетом. Принимаются меры для предотвращения повторения. Прозрачность и ответственность.' 
              },
              { 
                icon: '👥', 
                title: 'Супервизия ведущих', 
                desc: 'Все ведущие проходят регулярную супервизию у клинических психологов. Контроль качества и поддержка специалистов.' 
              },
              { 
                icon: '🚫', 
                title: 'Запрет на реальные травмы', 
                desc: 'Мы не используем реальные травмы и унижение. Все упражнения — это симуляция в безопасной среде под контролем специалистов.' 
              },
              { 
                icon: '🔬', 
                title: 'Научная обоснованность', 
                desc: 'Все методики основаны на экспозиционной терапии, практиках осознанности, нейробиологии стресса и когнитивно-поведенческих подходах.' 
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold mb-2">{item.title}</h3>
                    <p className="text-gray text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Противопоказания */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-8 mb-16 border-l-4 border-red"
        >
          <h2 className="font-heading text-2xl font-bold mb-6 text-red">Противопоказания</h2>
          <p className="text-gray mb-6 leading-relaxed">
            Участие в «Калибровке» противопоказано в следующих случаях:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Острые психические состояния',
              'ПТСР без сопровождения специалиста',
              'Кризисные состояния',
              'Приём психотропных препаратов без согласования',
              'Недавние травматические события (менее 3 месяцев)',
              'Суицидальные мысли или намерения',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-red text-sm">✕</span>
                </div>
                <p className="text-gray text-sm">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-red/20">
            <p className="text-sm text-gray">
              <span className="text-red font-bold">Важно:</span> Если вы не уверены, можете ли вы участвовать, 
              проконсультируйтесь с вашим лечащим врачом или свяжитесь с нами для предварительной консультации.
            </p>
          </div>
        </motion.div>

        {/* Контроль качества */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-8 mb-16"
        >
          <h2 className="font-heading text-2xl font-bold mb-6 text-lime">Контроль качества</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Единые стандарты', desc: 'Чек-листы, тайминг, протоколы для каждого мероприятия. Все ведущие работают по единым стандартам.' },
              { title: 'Супервизия', desc: 'Регулярная супервизия ведущих клиническими психологами. Поддержка и контроль качества.' },
              { title: 'Тайные гости', desc: 'Анонимная проверка качества проведения тренингов. Независимые эксперты оценивают работу ведущих.' },
              { title: 'Этический комитет', desc: 'Право вето на изменения методологии. Контроль безопасности и научной обоснованности.' },
              { title: 'Регулярный аудит', desc: 'Аудит методологии и протоколов безопасности. Постоянное улучшение на основе обратной связи.' },
              { title: 'Обратная связь', desc: 'Сбор и анализ отзывов участников после каждого тренинга. NPS ≥ 70. Постоянное улучшение.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-lime/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lime text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold mb-1 text-sm">{item.title}</h3>
                  <p className="text-gray text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Призыв к действию */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl font-bold mb-6">Остались вопросы о безопасности?</h2>
          <p className="text-gray mb-8">
            Свяжитесь с нами, и мы ответим на все ваши вопросы о безопасности и этике.
          </p>
          <button className="border border-lime/40 text-lime px-8 py-3 rounded-full font-heading hover:bg-lime/10 transition-colors">
            Связаться с Этическим комитетом →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
