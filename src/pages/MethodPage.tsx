import { motion } from 'framer-motion';

export default function MethodPage() {
  return (
    <div className="min-h-screen bg-cosmic text-white pt-20">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-xs text-lime mb-4 tracking-widest">МЕТОД</div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-8">Калибровка</h1>
          <p className="text-gray text-lg max-w-3xl mb-16 leading-relaxed">
            «Калибровка» — это 4-часовой иммерсивный спектакль-тренинг, построенный на трёх актах. 
            Это не тренинг, не театр, не терапия и не лекция. Это иммерсивная платформа, которая соединяет 
            edutainment, клиническую психологию, иммерсивный театр, бизнес-тренинг, комьюнити и цифровые практики.
          </p>
          <p className="text-gray text-lg max-w-3xl mb-16 leading-relaxed">
            <span className="text-lime font-bold">УТП:</span> за 4 часа участник не просто узнаёт о манипуляциях — 
            он проживает их в безопасной среде и выходит с конкретным навыком.
          </p>
        </motion.div>

        {/* Три акта */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Три акта трансформации</h2>
            <p className="text-gray text-lg">Каждый акт — это шаг от знания к навыку</p>
          </motion.div>

          {/* Акт 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-xl p-8 mb-8 border-l-4 border-purple"
          >
            <div className="flex items-start gap-6">
              <div className="text-6xl font-heading font-bold text-purple/30">I</div>
              <div className="flex-1">
                <h3 className="font-heading text-2xl font-bold mb-4 text-purple">Акт 1 — Демонстрация</h3>
                <p className="text-gray mb-4 leading-relaxed">
                  Участники наблюдают за реалистичной манипуляцией над подставными лицами. 
                  Сразу после — научный разбор: что произошло, какие приёмы использовались, 
                  как тело и мозг реагировали.
                </p>
                <div className="bg-graphite/50 rounded-lg p-4 border-l-2 border-purple/50">
                  <p className="text-sm text-gray">
                    <span className="text-purple font-bold">Задача:</span> снять розовые очки. 
                    Показать, что манипуляция — это не абстракция, а технология.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Акт 2 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-xl p-8 mb-8 border-l-4 border-lime"
          >
            <div className="flex items-start gap-6">
              <div className="text-6xl font-heading font-bold text-lime/30">II</div>
              <div className="flex-1">
                <h3 className="font-heading text-2xl font-bold mb-4 text-lime">Акт 2 — Проживание</h3>
                <p className="text-gray mb-4 leading-relaxed">
                  В парах и индивидуально участники сталкиваются с собственными уязвимостями 
                  и «внутренними голосами». Боль под контролем психологов превращается в катарсис.
                </p>
                <div className="bg-graphite/50 rounded-lg p-4 border-l-2 border-lime/50">
                  <p className="text-sm text-gray">
                    <span className="text-lime font-bold">Задача:</span> перевести знание в опыт. 
                    Не рассказать, а дать почувствовать.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Акт 3 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-xl p-8 mb-8 border-l-4 border-purple"
          >
            <div className="flex items-start gap-6">
              <div className="text-6xl font-heading font-bold text-purple/30">III</div>
              <div className="flex-1">
                <h3 className="font-heading text-2xl font-bold mb-4 text-purple">Акт 3 — Сборка</h3>
                <p className="text-gray mb-4 leading-relaxed">
                  Выдача конкретного нейробиологического инструмента — «Десятисекундный люк». 
                  Практическая тренировка.
                </p>
                <div className="bg-graphite/50 rounded-lg p-4 border-l-2 border-purple/50">
                  <p className="text-sm text-gray">
                    <span className="text-purple font-bold">Задача:</span> участник выходит с навыком, 
                    а не просто с инсайтом.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Научная основа */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">Научная основа</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Экспозиционная терапия', desc: 'Безопасное столкновение с триггерами под контролем специалистов' },
              { title: 'Практики осознанности', desc: 'Техники возвращения в "здесь и сейчас"' },
              { title: 'Нейробиология стресса', desc: 'Понимание того, как мозг реагирует на манипуляции' },
              { title: 'Когнитивно-поведенческие подходы', desc: 'Работа с автоматическими мыслями и убеждениями' },
              { title: 'Групповая динамика', desc: 'Сила коллективного опыта и поддержки' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <h3 className="font-heading text-lg font-bold mb-2 text-lime">{item.title}</h3>
                <p className="text-gray text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-gray mt-6 text-sm">
            <span className="text-lime font-bold">В команде — клинические психологи</span> с опытом работы 10+ лет.
          </p>
        </motion.div>

        {/* Безопасность */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">Безопасность</h2>
          <div className="glass rounded-xl p-8 border-l-4 border-orange">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '🔑', title: 'Стоп-слово', desc: '«Бесконечность» — в любой момент все эффекты отключаются' },
                { icon: '👨‍⚕️', title: 'Дежурный психолог', desc: 'Клинический психолог присутствует на протяжении всего тренинга' },
                { icon: '🚪', title: 'Право на выход', desc: 'Вы можете покинуть пространство в любой момент с полным возвратом' },
                { icon: '📋', title: 'Информированное согласие', desc: 'Вы знаете, что будет, и соглашаетесь осознанно' },
                { icon: '🔍', title: 'Предварительный скрининг', desc: 'Проверка противопоказаний перед участием' },
                { icon: '🔞', title: 'Возраст 18+', desc: 'Участие только для совершеннолетних' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="font-heading font-bold mb-1">{item.title}</h3>
                    <p className="text-gray text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-orange/20">
              <p className="text-sm text-gray">
                <span className="text-orange font-bold">Противопоказания:</span> острые состояния, 
                ПТСР без сопровождения, кризис.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Десятисекундный люк */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-8 border-l-4 border-lime mb-24"
        >
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-lime/10 flex items-center justify-center flex-shrink-0">
              <span className="text-lime font-heading text-3xl font-bold">10"</span>
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-2xl font-bold mb-4 text-lime">Десятисекундный люк</h3>
              <p className="text-gray mb-4 leading-relaxed">
                Главный инструмент Калибровки. За 10 секунд вы задаёте себе три вопроса:
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-lime/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lime font-bold">1</span>
                  </div>
                  <p className="text-gray">«Что я чувствую?»</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-lime/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lime font-bold">2</span>
                  </div>
                  <p className="text-gray">«Что мне говорят?»</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-lime/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lime font-bold">3</span>
                  </div>
                  <p className="text-gray">«Совпадает ли одно с другим?»</p>
                </div>
              </div>
              <p className="text-gray leading-relaxed">
                Этот люк — ваш аварийный выход из любой манипуляции. 
                Работает в любой ситуации: на переговорах, в отношениях, в соцсетях.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Призыв к действию */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl font-bold mb-6">Готовы пройти Калибровку?</h2>
          <p className="text-gray mb-8">
            Присоединяйтесь к следующей группе. Осталось всего несколько мест.
          </p>
          <button className="bg-lime text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg hover:scale-105 transition-transform">
            Записаться на Калибровку — 50 000 ₽
          </button>
        </motion.div>
      </div>
    </div>
  );
}
