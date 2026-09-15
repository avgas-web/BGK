import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQPage() {
  const [faqItems, setFaqItems] = useState([
    { q: 'Это реально помогает?', a: 'Да. Клинически доказано. 87% участников отмечают снижение уязвимости к манипуляциям.' },
    { q: 'Сколько стоит Калибровка?', a: 'Стоимость от 45 000 ₽. Включает 4 часа иммерсивного опыта и 30 дней поддержки.' },
    { q: 'Это опасно для психики?', a: 'Нет. Все упражнения разработаны клиническими психологами. Стоп-слово всегда с вами.' },
    { q: 'Можно ли пройти онлайн?', a: 'Да, формат «Маяк» — цифровой курс. Калибровка доступна очно в Москве и онлайн.' },
  ]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-cosmic text-white pt-20">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-xs text-lime mb-4 tracking-widest">FAQ</div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-12">Частые вопросы</h1>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-purple/5 transition-colors"
              >
                <span className="font-heading text-sm font-bold">{item.q}</span>
                <span className={`text-purple transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-gray text-sm leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
