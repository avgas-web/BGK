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
          <p className="text-gray text-lg max-w-2xl mb-16">
            4-часовой иммерсивный спектакль-тренинг. Не лекция. Не вебинар. 
            Опыт, после которого вы больше не сможете развидеть манипуляцию.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { act: 'АКТ I', title: 'Демонстрация', desc: 'Мы показываем манипуляцию в реальном времени. Вы видите, как работает газлайтинг — и понимаете, что уже попались.', colorClass: 'text-purple' },
            { act: 'АКТ II', title: 'Проживание', desc: 'Вы оказываетесь внутри сценария. Безопасно, но аутентично. Ваше тело запоминает ощущение — и учится его распознавать.', colorClass: 'text-lime' },
            { act: 'АКТ III', title: 'Сборка', desc: 'Мы собираем опыт в инструмент. «Десятисекундный люк» — техника, которая работает в любой ситуации.', colorClass: 'text-purple' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative"
            >
              <div className="glass rounded-xl p-8 h-full">
                <div className={`font-mono text-xs ${item.colorClass} mb-2 tracking-widest`}>{item.act}</div>
                <h3 className="font-heading text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray text-sm leading-relaxed">{item.desc}</p>
              </div>
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 text-purple/40 text-2xl">→</div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass rounded-xl p-8 border-l-2 border-lime/50"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-lime/10 flex items-center justify-center flex-shrink-0">
              <span className="text-lime font-heading font-bold">10"</span>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold mb-2">Десятисекундный люк</h3>
              <p className="text-gray text-sm leading-relaxed">
                Главный инструмент Калибровки. За 10 секунд вы задаёте себе три вопроса: 
                «Что я чувствую?», «Что мне говорят?» и «Совпадает ли одно с другим?». 
                Этот люк — ваш аварийный выход из любой манипуляции.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
