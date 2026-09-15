import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InternetBlameProps {
  enabled: boolean;
}

export function InternetBlame({ enabled }: InternetBlameProps) {
  const [showBlame, setShowBlame] = useState(false);
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
        const msg = blameMessages[Math.floor(Math.random() * blameMessages.length)];
        setBlameMessage(msg);
        setShowBlame(true);
        setTimeout(() => setShowBlame(false), 3500);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [enabled]);

  return (
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
  );
}
