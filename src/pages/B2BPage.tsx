import { motion } from 'framer-motion';

export default function B2BPage() {
  return (
    <div className="min-h-screen bg-cosmic text-white pt-20">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-xs text-orange mb-4 tracking-widest">B2B</div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Стрессоустойчивость команды — ваш конкурентный актив
            </h1>
            <p className="text-gray mb-6">
              Манипуляции на переговорах, токсичная коммуникация, выгорание от информационного шума — 
              всё это стоит компаниям миллионы. Мы помогаем командам видеть манипуляцию и обезвреживать её.
            </p>
            <ul className="space-y-3 mb-8">
              {['Защита от манипуляций в переговорах', 'Снижение выгорания на 40%', 'Культура критического мышления', 'Сертифицированные ведущие в штате'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 rounded-full bg-lime" />
                  <span className="text-gray">{item}</span>
                </li>
              ))}
            </ul>
            <button className="border border-orange/40 text-orange px-6 py-3 rounded-full font-heading hover:bg-orange/10 transition-colors">
              Запросить КП
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-xl p-8"
          >
            <div className="font-mono text-xs text-gray mb-4">КЕЙС</div>
            <blockquote className="text-lg italic mb-4">
              «После корпоративной Калибровки наши переговорщики перестали уступать под давлением. 
              Экономия за квартал — 12 млн ₽.»
            </blockquote>
            <div className="text-sm text-gray">
              <span className="text-lime">— Директор по закупкам</span>, компания из ТОП-50
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
