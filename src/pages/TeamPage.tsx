import { motion } from 'framer-motion';

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-cosmic text-white pt-20">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-xs text-purple mb-4 tracking-widest">КОМАНДА</div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-8">Операторы реальности</h1>
          <p className="text-gray text-lg max-w-3xl mb-16 leading-relaxed">
            Команда БГК — это синтез клинической психологии, иммерсивного театра, нейробиологии и бизнес-тренингов. 
            Каждый участник команды — эксперт в своей области с многолетним опытом работы.
          </p>
        </motion.div>

        {/* Ключевая команда */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { 
              name: 'Базз', 
              role: 'Основатель / Методолог', 
              desc: 'Психология, edutainment, автор тренингов. 15 лет в иммерсивном театре. Создатель метода «Калибровка».',
              expertise: ['Клиническая психология', 'Иммерсивный театр', 'Методология тренингов']
            },
            { 
              name: 'Хранитель', 
              role: 'Клинический директор', 
              desc: 'Клинический психолог, психотерапевт. 20 лет практики, группы 10+ лет. Отвечает за безопасность и научную обоснованность метода.',
              expertise: ['Психотерапия', 'Групповая динамика', 'Кризисная интервенция']
            },
            { 
              name: 'Авгас', 
              role: 'Концепт-директор', 
              desc: 'Архитектор смыслов и визуальных метафор. Превращает идеи в иммерсивные миры. Отвечает за эстетику и атмосферу.',
              expertise: ['Визуальный дизайн', 'Иммерсивные пространства', 'Брендинг']
            },
            { 
              name: 'Алиса Маякова', 
              role: 'Директор по маркетингу', 
              desc: 'Брендинг иммерсивных проектов. Знает, как продать то, чего нет. Отвечает за премиум-мероприятия и запуск.',
              expertise: ['Премиум-маркетинг', 'Запуск продуктов', 'PR и коммуникации']
            },
            { 
              name: 'Продюсер', 
              role: 'Продюсер', 
              desc: 'Площадки, логистика, спектакль. Отвечает за безупречную организацию каждого мероприятия.',
              expertise: ['Event-менеджмент', 'Логистика', 'Работа с площадками']
            },
            { 
              name: 'Комьюнити-менеджер', 
              role: 'Комьюнити-менеджер', 
              desc: 'Чат, членство, удержание. Строит и поддерживает сообщество выпускников БГК.',
              expertise: ['Community management', 'Удержание клиентов', 'Модерация']
            },
            { 
              name: 'B2B-директор', 
              role: 'B2B-директор', 
              desc: 'Корпоративные продажи. Отвечает за работу с бизнес-клиентами и корпоративные программы.',
              expertise: ['B2B продажи', 'Корпоративные тренинги', 'Работа с HR']
            },
            { 
              name: 'Методологи', 
              role: 'Методологи', 
              desc: 'Сценарии, обучение Магистров. Разрабатывают и адаптируют методологию для разных аудиторий.',
              expertise: ['Разработка сценариев', 'Обучение ведущих', 'Адаптация метода']
            },
          ].map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple/30 to-lime/20 mx-auto mb-4 flex items-center justify-center">
                <span className="font-heading text-xl font-bold text-lime">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold mb-1 text-center">{member.name}</h3>
              <div className="font-mono text-xs text-purple mb-3 text-center">{member.role}</div>
              <p className="text-gray text-xs leading-relaxed mb-4">{member.desc}</p>
              <div className="space-y-1">
                {member.expertise.map((exp, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-gray/80">
                    <span className="text-lime">•</span>
                    <span>{exp}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Этический комитет */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-8 mb-16 border-l-4 border-orange"
        >
          <h2 className="font-heading text-2xl font-bold mb-6 text-orange">Этический комитет</h2>
          <p className="text-gray mb-6 leading-relaxed">
            Для контроля безопасности и научной обоснованности создаётся Этический комитет из трёх человек. 
            Комитет имеет право вето на любые изменения методологии, несущие риск ретравматизации.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-heading font-bold mb-2 text-sm">Независимый клинический супервизор</h3>
              <p className="text-gray text-xs">Назначается инвестором. Обеспечивает независимый контроль.</p>
            </div>
            <div>
              <h3 className="font-heading font-bold mb-2 text-sm">Действующий Хранитель Метода</h3>
              <p className="text-gray text-xs">Клинический директор БГК. Отвечает за методологию.</p>
            </div>
            <div>
              <h3 className="font-heading font-bold mb-2 text-sm">Приглашённый академический эксперт</h3>
              <p className="text-gray text-xs">Внешний эксперт из академической среды. Обеспечивает научную обоснованность.</p>
            </div>
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
              { title: 'Единые стандарты', desc: 'Чек-листы, тайминг, протоколы для каждого мероприятия' },
              { title: 'Супервизия', desc: 'Регулярная супервизия ведущих клиническими психологами' },
              { title: 'Тайные гости', desc: 'Анонимная проверка качества проведения тренингов' },
              { title: 'Этический комитет', desc: 'Право вето на изменения методологии' },
              { title: 'Регулярный аудит', desc: 'Аудит методологии и протоколов безопасности' },
              { title: 'Обратная связь', desc: 'Сбор и анализ отзывов участников после каждого тренинга' },
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
          <h2 className="font-heading text-3xl font-bold mb-6">Хотите стать частью команды?</h2>
          <p className="text-gray mb-8">
            Мы всегда ищем талантливых специалистов, разделяющих наши ценности.
          </p>
          <button className="border border-lime/40 text-lime px-8 py-3 rounded-full font-heading hover:bg-lime/10 transition-colors">
            Связаться с нами →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
