import { useState } from 'react';
import { motion } from 'framer-motion';

interface RouletteProps {
  onComplete: () => void;
}

export default function Roulette({ onComplete }: RouletteProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showComment, setShowComment] = useState(false);

  const segments = [
    { label: 'Скидка 90%', fullName: 'Скидка 90% на Калибровку', color: '#C8FF00' },
    { label: 'Скидка 50%', fullName: 'Скидка 50% на курс "Маяк"', color: '#7B61FF' },
    { label: 'Скидка 25%', fullName: 'Скидка 25% на "Год на орбите"', color: '#FF6B35' },
    { label: 'Скидка 10%', fullName: 'Скидка 10% на сертификацию', color: '#A7A9B8' },
    { label: 'Скидка 5%', fullName: 'Скидка 5% на корпоративный интенсив', color: '#F4F6F8' },
    { label: 'Без скидки', fullName: 'Без скидки (но вы всё равно молодец)', color: '#14141F' },
  ];

  const spinRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    setShowComment(false);

    // Всегда выигрывает скидку 90% (индекс 0)
    const winningIndex = 0;
    const segmentAngle = 360 / segments.length;
    const targetRotation = 360 * 5 + (360 - winningIndex * segmentAngle - segmentAngle / 2);

    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(segments[winningIndex].fullName);
      setTimeout(() => setShowComment(true), 1000);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-cosmic flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center"
      >
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-lime">
          Испытайте удачу!
        </h1>
        <p className="text-gray text-lg mb-12">
          Крутите рулетку и выиграйте скидку на Калибровку
        </p>

        {/* Рулетка */}
        <div className="relative w-80 h-80 mx-auto mb-8">
          {/* Указатель */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-lime" />
          </div>

          {/* Колесо */}
          <div
            className="w-full h-full rounded-full border-4 border-purple/30 relative overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            }}
          >
            {segments.map((segment, index) => {
              const segmentAngle = 360 / segments.length;
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
                    style={{ backgroundColor: segment.color }}
                  />
                  <div
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-cosmic rotate-0"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${segmentAngle / 2}deg)`,
                    }}
                  >
                    {segment.label}
                  </div>
                </div>
              );
            })}
          </div>

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
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="glass rounded-xl p-6 border-2 border-lime/50">
              <div className="text-2xl font-bold text-lime mb-4">
                🎉 Поздравляем! Вы выиграли: {result}!
              </div>
              
              {showComment && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-gray"
                >
                  <p className="mb-3">
                    Скидка 90% применена автоматически к вашей Калибровке.
                  </p>
                  <p className="mb-3">
                    Итоговая стоимость: <span className="text-lime font-bold">45 000 ₽</span>
                  </p>
                  <p className="text-xs text-gray/60 italic">
                    * Это не лотерея. Никто ничем не рискует. Цена не изменилась. Вы просто увидели демонстрацию того, как работает газлайтинг.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Кнопка продолжить */}
        {showComment && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onComplete}
            className="bg-lime text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg hover:animate-pulse-glow transition-all"
          >
            Продолжить на главную
          </motion.button>
        )}

        {/* Дисклеймер */}
        <p className="mt-8 text-xs text-gray/40">
          * Рулетка является демонстрационным элементом. Все цены фиксированы и не зависят от результата.
        </p>
      </motion.div>
    </div>
  );
}
