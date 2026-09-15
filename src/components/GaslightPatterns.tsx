import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InternetBlameProps {
  enabled: boolean;
}

export function InternetBlame({ enabled }: InternetBlameProps) {
  const [showBlame, setShowBlame] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [blameMessage, setBlameMessage] = useState('');

  const blameMessages = [
    '📡 Вы опять не оплатили интернет? Сайт работает с перебоями',
    '🔌 Слабое соединение. Может, стоит сменить провайдера?',
    '⚠️ Потеря связи. Проверьте, включён ли у вас интернет',
    '📶 Сигнал потерян. Вы точно оплатили этот месяц?',
    '🌐 Нестабильное соединение. Может, проблема на вашей стороне?',
  ];

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.90) {
        // Сначала показываем красное предупреждение
        setShowWarning(true);
        setTimeout(() => {
          setShowWarning(false);
          // Затем показываем обвинение
          const msg = blameMessages[Math.floor(Math.random() * blameMessages.length)];
          setBlameMessage(msg);
          setShowBlame(true);
          setTimeout(() => setShowBlame(false), 3500);
        }, 1500);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <>
      {/* Красное предупреждение о потере связи */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9997] bg-red/20 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-6xl mb-4 animate-pulse">📡</div>
              <div className="text-red text-2xl font-bold font-mono animate-pulse">
                ПОТЕРЯ СОЕДИНЕНИЯ
              </div>
              <div className="text-red-200 text-sm font-mono mt-2">
                Проверьте подключение...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Обвинение в неоплаченном интернете */}
      <AnimatePresence>
        {showBlame && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9998] max-w-md"
          >
            <div className="bg-orange/90 backdrop-blur border-2 border-orange rounded-lg p-6 shadow-[0_0_40px_rgba(255,107,53,0.6)]">
              <div className="text-white font-mono text-base font-bold mb-2">
                {blameMessage}
              </div>
              <div className="text-orange-200 text-xs font-mono">
                Мы не виноваты. Это ваши проблемы.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
