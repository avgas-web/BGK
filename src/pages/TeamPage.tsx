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
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-12">Операторы реальности</h1>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Базз', role: 'Основатель / Методолог', desc: '15 лет в иммерсивном театре. Создатель метода «Калибровка».' },
            { name: 'Хранитель', role: 'Клинический директор', desc: 'Клинический психолог. 20 лет практики. Отвечает за безопасность. И за то, чтобы вы её не потеряли.' },
            { name: 'Авгас', role: 'Концепт-директор', desc: 'Архитектор смыслов и визуальных метафор. Превращает идеи в иммерсивные миры.' },
            { name: 'Алиса Маякова', role: 'Директор по маркетингу', desc: 'Брендинг иммерсивных проектов. Знает, как продать то, чего нет.' },
          ].map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple/30 to-lime/20 mx-auto mb-4 flex items-center justify-center">
                <span className="font-heading text-xl font-bold text-lime">{member.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <h3 className="font-heading text-sm font-bold mb-1">{member.name}</h3>
              <div className="font-mono text-xs text-purple mb-3">{member.role}</div>
              <p className="text-gray text-xs leading-relaxed">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
