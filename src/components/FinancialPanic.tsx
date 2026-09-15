import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FinancialPanicProps {
  enabled: boolean;
}

export function FinancialPanic({ enabled }: FinancialPanicProps) {
  const [showPanic, setShowPanic] = useState(false);
  const [panicMessage, setPanicMessage] = useState('');

  const panicMessages = [
    '💳 С вашего счёта списано 45 000 ₽ за Калибровку',
    '💰 Обнаружена подписка на "Год на орбите" - 120 000 ₽',
    '⚠️ Неоплаченный счёт: 15 000 ₽ за курс "Маяк"',
    '🔒 Ваш аккаунт заблокирован до оплаты задолженности',
    '💸 Автоматическое списание: 5 000 ₽ за продление подписки',
  ];

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const msg = panicMessages[Math.floor(Math.random() * panicMessages.length)];
        setPanicMessage(msg);
        setShowPanic(true);
        setTimeout(() => setShowPanic(false), 4000);
      }
    }, 25000);

    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {showPanic && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 right-4 z-[9999] max-w-sm"
        >
          <div className="bg-red/90 backdrop-blur border-2 border-red rounded-lg p-4 shadow-[0_0_30px_rgba(255,59,59,0.5)]">
            <div className="text-white font-mono text-sm font-bold">
              {panicMessage}
            </div>
            <div className="text-red-200 text-xs mt-2 font-mono">
              Нажмите для отмены... (шутка, отменить нельзя)
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
