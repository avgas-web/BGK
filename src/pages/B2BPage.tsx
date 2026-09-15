import { motion } from 'framer-motion';

export default function B2BPage() {
  return (
    <div className="min-h-screen bg-cosmic text-white pt-20">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-xs text-orange mb-4 tracking-widest">B2B РЕШЕНИЯ</div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-8">
            Стрессоустойчивость команды — ваш конкурентный актив
          </h1>
          <p className="text-gray text-lg max-w-3xl mb-16 leading-relaxed">
            Манипуляции на переговорах, токсичная коммуникация, выгорание от информационного шума — 
            всё это стоит компаниям миллионы. БГК помогает командам видеть манипуляцию и обезвреживать её.
          </p>
        </motion.div>

        {/* Проблема */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-8 mb-16 border-l-4 border-orange"
        >
          <h2 className="font-heading text-2xl font-bold mb-6 text-orange">Проблема, которую мы решаем</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-heading font-bold mb-3">Вызовы бизнеса:</h3>
              <ul className="space-y-2 text-gray text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-1">•</span>
                  <span>Манипуляции на переговорах с партнёрами и клиентами</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-1">•</span>
                  <span>Токсичная коммуникация внутри команд</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-1">•</span>
                  <span>Выгорание от информационного шума</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-1">•</span>
                  <span>Потеря критического мышления под давлением</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-1">•</span>
                  <span>Неверные решения из-за манипулятивного влияния</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-bold mb-3">Последствия:</h3>
              <ul className="space-y-2 text-gray text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-1">•</span>
                  <span>Финансовые потери от неудачных сделок</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-1">•</span>
                  <span>Снижение продуктивности команды</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-1">•</span>
                  <span>Высокая текучесть кадров</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-1">•</span>
                  <span>Репутационные риски</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-1">•</span>
                  <span>Потеря конкурентного преимущества</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Решение */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-heading text-3xl font-bold mb-8">Наше решение</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Защита от манипуляций в переговорах', desc: 'Команда учится распознавать манипулятивные техники и нейтрализовывать их в реальном времени.' },
              { title: 'Снижение выгорания на 40%', desc: 'Практики информационной гигиены помогают команде сохранять ясность мышления под давлением.' },
              { title: 'Культура критического мышления', desc: 'Формирование среды, где вопросы и сомнения поощряются, а не подавляются.' },
              { title: 'Сертифицированные ведущие в штате', desc: 'Возможность обучить внутренних специалистов и тиражировать метод внутри компании.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <h3 className="font-heading text-lg font-bold mb-3 text-lime">{item.title}</h3>
                <p className="text-gray text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Формат */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-8 mb-16 border-l-4 border-purple"
        >
          <h2 className="font-heading text-2xl font-bold mb-6 text-purple">Формат корпоративного интенсива</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-heading font-bold mb-2 text-sm">Длительность</h3>
              <p className="text-gray text-sm">1-3 дня выездного тренинга</p>
            </div>
            <div>
              <h3 className="font-heading font-bold mb-2 text-sm">Группа</h3>
              <p className="text-gray text-sm">До 40 участников</p>
            </div>
            <div>
              <h3 className="font-heading font-bold mb-2 text-sm">Локация</h3>
              <p className="text-gray text-sm">Москва, Санкт-Петербург или выезд</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple/20 flex items-center justify-center flex-shrink-0">
                <span className="text-purple font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-heading font-bold mb-1 text-sm">Диагностика</h3>
                <p className="text-gray text-xs">Анализ текущих вызовов команды, выявление уязвимостей</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple/20 flex items-center justify-center flex-shrink-0">
                <span className="text-purple font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-heading font-bold mb-1 text-sm">Интенсив</h3>
                <p className="text-gray text-xs">Иммерсивный тренинг с практическими кейсами из бизнеса</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple/20 flex items-center justify-center flex-shrink-0">
                <span className="text-purple font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-heading font-bold mb-1 text-sm">Сопровождение</h3>
                <p className="text-gray text-xs">Пост-тренинговая поддержка, повторные сессии, супервизия</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Кейс */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-8 mb-16"
        >
          <h2 className="font-heading text-2xl font-bold mb-6 text-lime">Кейс</h2>
          <div className="bg-graphite/50 rounded-lg p-6 mb-6">
            <blockquote className="text-lg italic mb-4 text-gray">
              «После корпоративной Калибровки наши переговорщики перестали уступать под давлением. 
              Экономия за квартал — 12 млн ₽. Команда стала более устойчивой к манипуляциям клиентов и партнёров.»
            </blockquote>
            <div className="text-sm text-gray">
              <span className="text-lime font-bold">— Директор по закупкам</span>, компания из ТОП-50
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="font-heading text-3xl font-bold text-lime mb-2">12 млн ₽</div>
              <div className="text-gray text-sm">Экономия за квартал</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-bold text-purple mb-2">40%</div>
              <div className="text-gray text-sm">Снижение выгорания</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-bold text-lime mb-2">NPS 85</div>
              <div className="text-gray text-sm">Оценка участников</div>
            </div>
          </div>
        </motion.div>

        {/* Стоимость */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-8 mb-16 border-l-4 border-orange"
        >
          <h2 className="font-heading text-2xl font-bold mb-6 text-orange">Стоимость</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-heading font-bold mb-2 text-lg">Корпоративный интенсив</h3>
              <div className="font-heading text-3xl font-bold text-orange mb-2">от 1 000 000 ₽</div>
              <p className="text-gray text-sm mb-4">
                Выездной тренинг «Информационная гигиена» для команды до 40 человек.
              </p>
              <ul className="space-y-2 text-xs text-gray">
                <li className="flex items-start gap-2">
                  <span className="text-orange">✓</span>
                  <span>Диагностика команды</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange">✓</span>
                  <span>1-3 дня тренинга</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange">✓</span>
                  <span>Практические кейсы из бизнеса</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange">✓</span>
                  <span>Пост-тренинговая поддержка</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-bold mb-2 text-lg">Сопровождение</h3>
              <div className="font-heading text-3xl font-bold text-purple mb-2">По запросу</div>
              <p className="text-gray text-sm mb-4">
                Регулярные сессии, супервизия, повторные тренинги для закрепления навыка.
              </p>
              <ul className="space-y-2 text-xs text-gray">
                <li className="flex items-start gap-2">
                  <span className="text-purple">✓</span>
                  <span>Ежемесячные сессии</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple">✓</span>
                  <span>Супервизия ведущих</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple">✓</span>
                  <span>Повторные тренинги</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple">✓</span>
                  <span>Анализ результатов</span>
                </li>
              </ul>
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
          <h2 className="font-heading text-3xl font-bold mb-6">Готовы усилить свою команду?</h2>
          <p className="text-gray mb-8">
            Свяжитесь с нами для диагностики и индивидуального предложения.
          </p>
          <button className="bg-orange text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg hover:scale-105 transition-transform">
            Запросить КП
          </button>
        </motion.div>
      </div>
    </div>
  );
}
