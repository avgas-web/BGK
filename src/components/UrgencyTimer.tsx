import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UrgencyTimer() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 минут
  const [showExtension, setShowExtension] = useState(false);
  const [extensionCount, setExtensionCount] = useState(0);

  // Обратный отсчёт
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Продление акции
          setShowExtension(true);
          setExtensionCount(c => c + 1);
          setTimeout(() => setShowExtension(false), 2000);
          return 300 + Math.floor(Math.random() * 120); // 5-7 минут
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      {/* Основной таймер */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-24 right-4 z-[9990]"
      >
        <div className="glass rounded-lg px-4 py-3 border-l-2 border-orange/50">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-orange text-sm">⏰</span>
            <span className="font-mono text-xs text-orange font-bold">ДО КОНЦА АКЦИИ:</span>
          </div>
          <div className="font-mono text-2xl text-orange font-bold">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
          {extensionCount > 0 && (
            <div className="text-[10px] text-gray/60 mt-1">
              Продлено {extensionCount} {extensionCount === 1 ? 'раз' : extensionCount < 5 ? 'раза' : 'раз'}
            </div>
          )}
        </div>
      </motion.div>

      {/* Уведомление о продлении */}
      <AnimatePresence>
        {showExtension && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9995]"
          >
            <div className="glass rounded-xl p-6 border-2 border-lime/50 text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="font-heading text-xl font-bold text-lime mb-2">
                АКЦИЯ ПРОДЛЕНА!
              </h3>
              <p className="text-gray text-sm">
                Специально для вас мы продлили акцию ещё на 5 минут!
              </p>
              <p className="text-gray/60 text-xs mt-2">
                Не упустите возможность!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
