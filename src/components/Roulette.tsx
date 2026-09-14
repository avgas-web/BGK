import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RouletteProps {
  onComplete: () => void;
}

export default function Roulette({ onComplete }: RouletteProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showGaslightComment, setShowGaslightComment] = useState(false);

  const prizes = [
    { label: 'Скидка 90%', color: '#C8FF00', probability: 0.01 },
    { label: 'Скидка 50%', color: '#7B61FF', probability: 0.05 },
    { label: 'Скидка 25%', color: '#FF6B35', probability: 0.10 },
    { label: 'Скидка 10%', color: '#A7A9B8', probability: 0.20 },
    { label: 'Бонус 5%', color: '#A7A9B8', probability: 0.30 },
    { label: 'Ничего', color: '#14141F', probability: 0.34 },
  ];

  const gaslightComments = [
    'Поздравляем! Вы выиграли скидку 90%! Но цена осталась прежней. Это не лотерея — никто ничем не рискует.',
    'Отличный результат! Скидка 90% применена автоматически. Итоговая стоимость не изменилась. Совпадение?',
    'Вы выиграли! Но не волнуйтесь — цена та же. Это просто демонстрация. Никто ничего не теряет.',
    'Победа! Скидка 90% активирована. Но цена не изменилась. Это нормально. Вы же не думали, что будет иначе?',
  ];

  const spinRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    setShowGaslightComment(false);

    // Определяем приз (всегда скидка 90% для газлайтинга)
    const selectedPrize = prizes[0]; // Всегда первый приз - скидка 90%
    
    // Вычисляем угол остановки
    const prizeIndex = prizes.indexOf(selectedPrize);
    const segmentAngle = 360 / prizes.length;
    const targetAngle = 360 - (prizeIndex * segmentAngle + segmentAngle / 2);
    const spins = 5 + Math.floor(Math.random() * 3); // 5-7 полных оборотов
    const finalRotation = rotation + spins * 360 + targetAngle;

    setRotation(finalRotation);

    // Показываем результат после анимации
    setTimeout(() => {
      setIsSpinning(false);
      setResult(selectedPrize.label);
      
      // Показываем газлайтинг-комментарий через 1 секунду
      setTimeout(() => {
        setShowGaslightComment(true);
      }, 1000);
    }, 4000);
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-cosmic flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-lime mb-4">
            Испытайте удачу!
          </h2>
          <p className="text-gray mb-8">
            Крутите рулетку и выиграйте скидку на любой курс
          </p>

          {/* Рулетка */}
          <div className="relative w-80 h-80 mx-auto mb-8">
            {/* Указатель */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-lime" />
            </div>

            {/* Колесо */}
            <motion.div
              className="w-full h-full rounded-full border-4 border-purple/30 relative overflow-hidden"
              animate={{ rotate: rotation }}
              transition={{ duration: 4, ease: [0.17, 0.67, 0.12, 0.99] }}
            >
              {prizes.map((prize, index) => {
                const segmentAngle = 360 / prizes.length;
                const rotation = index * segmentAngle;
                
                return (
                  <div
                    key={index}
                    className="absolute w-full h-full"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.tan((segmentAngle * Math.PI) / 360)}% 0%)`,
                    }}
                  >
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: prize.color }}
                    />
                    <div
                      className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-cosmic rotate-0"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${segmentAngle / 2}deg)`,
                      }}
                    >
                      {prize.label}
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Центральный круг */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-graphite border-4 border-lime flex items-center justify-center">
              <button
                onClick={spinRoulette}
                disabled={isSpinning}
                className="w-full h-full rounded-full bg-lime text-cosmic font-bold text-sm hover:bg-lime/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSpinning ? '...' : 'КРУТИТЬ'}
              </button>
            </div>
          </div>

          {/* Результат */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6"
              >
                <div className="glass rounded-xl p-6 border-2 border-lime/50">
                  <div className="text-2xl font-bold text-lime mb-2">
                    🎉 {result}!
                  </div>
                  
                  <AnimatePresence>
                    {showGaslightComment && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-gray mt-4"
                      >
                        <p className="mb-4">
                          {gaslightComments[Math.floor(Math.random() * gaslightComments.length)]}
                        </p>
                        <p className="text-xs text-gray/60 italic">
                          * Это не лотерея. Никто ничем не рискует. Цена не изменится. Вы просто увидели демонстрацию.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Кнопка продолжить */}
          {result && showGaslightComment && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleContinue}
              className="bg-lime text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg hover:animate-pulse-glow transition-all"
            >
              Продолжить
            </motion.button>
          )}

          {/* Дисклеймер */}
          <p className="mt-8 text-xs text-gray/40">
            * Рулетка является демонстрационным элементом. Все цены фиксированы и не зависят от результата.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
