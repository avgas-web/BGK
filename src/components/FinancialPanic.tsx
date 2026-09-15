import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FinancialPanicProps {
  enabled: boolean;
}

export function FinancialPanic({ enabled }: FinancialPanicProps) {
  const [showPanic, setShowPanic] = useState(false);
  const [panicMessage, setPanicMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmResult, setConfirmResult] = useState('');

  const panicMessages = [
    '💳 С вашего счёта списано 45 000 ₽ за Калибровку',
    '💰 Обнаружена подписка на "Год на орбите" - 120 000 ₽',
    '⚠️ Неоплаченный счёт: 15 000 ₽ за курс "Маяк"',
    '🔒 Ваш аккаунт заблокирован до оплаты задолженности',
    '💸 Автоматическое списание: 5 000 ₽ за продление подписки',
  ];

  const confirmResults = [
    '✅ Перевод совершён. Средства списаны.',
    '✅ Подписка активирована. Оплата прошла.',
    '✅ Платёж принят. Чек отправлен на почту.',
    '✅ Транзакция одобрена. Возврат невозможен.',
  ];

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.90) { // 10% вероятность
        const msg = panicMessages[Math.floor(Math.random() * panicMessages.length)];
        setPanicMessage(msg);
        setShowPanic(true);
        setTimeout(() => setShowPanic(false), 4000);
      }
    }, 25000);

    return () => clearInterval(interval);
  }, [enabled]);

  const handleConfirm = () => {
    if (Math.random() > 0.5) { // 50% шанс ложного подтверждения
      const result = confirmResults[Math.floor(Math.random() * confirmResults.length)];
      setConfirmResult(result);
      setShowConfirm(true);
      setShowPanic(false);
      setTimeout(() => setShowConfirm(false), 3000);
    } else {
      setShowPanic(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showPanic && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-4 z-[9999] max-w-sm"
          >
            <div className="bg-red/90 backdrop-blur border-2 border-red rounded-lg p-4 shadow-[0_0_30px_rgba(255,59,59,0.5)]">
              <div className="text-white font-mono text-sm font-bold mb-3">
                {panicMessage}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-red-700 hover:bg-red-600 text-white text-xs font-bold py-2 px-3 rounded transition-colors"
                >
                  Подтвердить
                </button>
                <button
                  onClick={() => setShowPanic(false)}
                  className="flex-1 bg-graphite hover:bg-graphite/80 text-gray text-xs py-2 px-3 rounded transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] max-w-md"
          >
            <div className="bg-lime/90 backdrop-blur border-2 border-lime rounded-lg p-6 shadow-[0_0_40px_rgba(200,255,0,0.6)]">
              <div className="text-cosmic font-mono text-base font-bold text-center">
                {confirmResult}
              </div>
              <div className="text-cosmic/70 text-xs mt-2 text-center font-mono">
                * Это демонстрация газлайтинга. Ничего не произошло.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
