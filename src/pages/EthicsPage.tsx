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
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-12">Этический комитет</h1>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '🛡', title: 'Клинические психологи', desc: 'Все методики одобрены практикующими клиническими психологами с опытом 10+ лет.' },
            { icon: '🔑', title: 'Стоп-слово', desc: '«Бесконечность» — в любой момент все эффекты отключаются. Вы контролируете опыт.' },
            { icon: '🚪', title: 'Право на выход', desc: 'Вы можете покинуть пространство Калибровки в любой момент без объяснений.' },
            { icon: '📋', title: 'Информированное согласие', desc: 'Перед началом вы подписываете протокол. Вы знаете, что будет, и соглашаетесь осознанно.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 text-center"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-heading text-sm font-bold mb-2">{item.title}</h3>
              <p className="text-gray text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
