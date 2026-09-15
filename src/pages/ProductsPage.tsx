import { motion } from 'framer-motion';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-cosmic text-white pt-20">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-xs text-lime mb-4 tracking-widest">ПРОДУКТОВАЯ ЭКОСИСТЕМА</div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-8">Выберите свою орбиту</h1>
          <p className="text-gray text-lg max-w-3xl mb-16 leading-relaxed">
            Выберите продукт, который подходит именно вам. От разового интенсива до годового членства — 
            каждый продукт усиливает эффект предыдущего и создаёт устойчивый навык распознавания манипуляций.
          </p>
        </motion.div>

        {/* Логика экосистемы */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-8 mb-16 border-l-4 border-purple"
        >
          <h2 className="font-heading text-2xl font-bold mb-6 text-purple">Логика экосистемы</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-lime/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-lime font-bold">1</span>
              </div>
              <h3 className="font-heading font-bold mb-2 text-sm">Вход</h3>
              <p className="text-gray text-xs">«Калибровка» — сильный эмоциональный опыт</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-purple font-bold">2</span>
              </div>
              <h3 className="font-heading font-bold mb-2 text-sm">Удержание</h3>
              <p className="text-gray text-xs">«Год на орбите» — комьюнити и регулярная практика</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-lime/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-lime font-bold">3</span>
              </div>
              <h3 className="font-heading font-bold mb-2 text-sm">Масштаб</h3>
              <p className="text-gray text-xs">Цифровой курс и приложение «Маяк»</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-purple font-bold">4</span>
              </div>
              <h3 className="font-heading font-bold mb-2 text-sm">Школа</h3>
              <p className="text-gray text-xs">Станьте сертифицированным ведущим и проводите тренинги</p>
            </div>
          </div>
        </motion.div>

        {/* Продукты */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { 
              title: 'Калибровка', 
              price: '50 000 ₽', 
              desc: '4-часовой иммерсивный спектакль-тренинг. Основной продукт. Группа до 40 человек.',
              badge: 'Флагман', 
              badgeClass: 'border-lime/30 text-lime',
              features: ['3 акта трансформации', 'Научный разбор', 'Десятисекундный люк', 'Дежурный психолог']
            },
            { 
              title: 'Год на орбите', 
              price: '300 000 – 500 000 ₽', 
              desc: 'Годовое членство: ежемесячные сессии, чат, личные консультации, комьюнити.',
              badge: 'Членство', 
              badgeClass: 'border-purple/30 text-purple',
              features: ['Ежемесячные сессии', 'Закрытый чат', 'Личные консультации', 'Доступ к архиву']
            },
            { 
              title: 'Цифровой курс «Маяк»', 
              price: '30 000 ₽', 
              desc: '30-дневная программа практик с аудио-медитациями и вебинарами. Проходите в удобное время.',
              badge: 'Онлайн', 
              badgeClass: 'border-lime/30 text-lime',
              features: ['30 дней практики', 'Аудио-медитации', 'Вебинары с экспертами', 'Домашние задания']
            },
            { 
              title: 'Приложение «Маяк»', 
              price: '990 ₽/мес', 
              desc: 'Трекер «Люков», медитации, комьюнити. Ежедневная практика в кармане.',
              badge: 'Подписка', 
              badgeClass: 'border-purple/30 text-purple',
              features: ['Трекер «Люков»', 'Медитации', 'Комьюнити', 'Push-напоминания']
            },
            { 
              title: 'Корпоративные интенсивы', 
              price: 'от 1 000 000 ₽', 
              desc: 'Выездной тренинг «Информационная гигиена» для команд. Укрепите стрессоустойчивость вашей команды.',
              badge: 'B2B', 
              badgeClass: 'border-orange/30 text-orange',
              features: ['Выездной формат', 'Диагностика команды', 'Практические кейсы', 'Сопровождение']
            },
            { 
              title: 'Сертификация «Магистр»', 
              price: '1 000 000 ₽', 
              desc: 'Годовая программа для тех, кто хочет стать ведущим Калибровки и проводить тренинги.',
              badge: 'Сертификация', 
              badgeClass: 'border-purple/30 text-purple',
              features: ['Годовая программа', 'Супервизия', 'Право на бренд', 'Методические материалы']
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-6 hover:border-lime/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`font-mono text-xs px-2 py-1 rounded-full border ${item.badgeClass}`}>
                  {item.badge}
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray text-sm mb-4">{item.desc}</p>
              <ul className="space-y-2 mb-4">
                {item.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs text-gray">
                    <span className="text-lime">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-4 border-t border-purple/10">
                <span className="font-heading text-lg text-lime">{item.price}</span>
                <button className="text-sm text-purple hover:text-lime transition-colors">
                  Подробнее →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Призыв к действию */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl font-bold mb-6">Готовы начать?</h2>
          <p className="text-gray mb-8">
            Выберите продукт, который подходит именно вам.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-lime text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg hover:scale-105 transition-transform">
              Записаться на Калибровку
            </button>
            <button className="border border-purple/40 text-purple px-8 py-4 rounded-full font-heading text-lg hover:bg-purple/10 transition-colors">
              Связаться с нами
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
