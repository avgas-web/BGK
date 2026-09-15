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
          <div className="font-mono text-xs text-lime mb-4 tracking-widest">ПРОДУКТЫ</div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-12">Выберите свою орбиту</h1>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Калибровка', price: 'от 45 000 ₽', desc: '4-часовой иммерсивный спектакль-тренинг. Очно или онлайн.', badge: 'Флагман', badgeClass: 'border-lime/30 text-lime' },
            { title: 'Год на орбите', price: '120 000 ₽/год', desc: '12 месяцев поддержки, ежемесячные встречи, доступ к сообществу.', badge: 'Подписка', badgeClass: 'border-purple/30 text-purple' },
            { title: 'Маяк (курс)', price: '15 000 ₽', desc: 'Цифровой курс: 8 модулей, 40 уроков, практика каждый день.', badge: 'Онлайн', badgeClass: 'border-lime/30 text-lime' },
            { title: 'Маяк (приложение)', price: 'Бесплатно', desc: 'Ежедневные упражнения, трекер манипуляций, сообщество.', badge: 'Скоро', badgeClass: 'border-purple/30 text-purple' },
            { title: 'Корпоративный интенсив', price: 'от 300 000 ₽', desc: 'Командная калибровка. Стрессоустойчивость и защита от манипуляций.', badge: 'B2B', badgeClass: 'border-orange/30 text-orange' },
            { title: 'Сертификация ведущих', price: 'от 200 000 ₽', desc: 'Станьте сертифицированным ведущим Калибровки. 6 месяцев обучения.', badge: 'Для профи', badgeClass: 'border-purple/30 text-purple' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
              <div className="flex items-center justify-between">
                <span className="font-heading text-lg text-lime">{item.price}</span>
                <button className="text-sm text-purple hover:text-lime transition-colors">
                  Подробнее →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
