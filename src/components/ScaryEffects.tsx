import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BSODProps {
  enabled: boolean;
}

export function BSOD({ enabled }: BSODProps) {
  const [showBSOD, setShowBSOD] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.92) {
        setShowBSOD(true);
        setTimeout(() => setShowBSOD(false), 3000);
      }
    }, 40000);

    return () => clearInterval(interval);
  }, [enabled]);

  if (!showBSOD) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] bg-[#0078D7] flex items-center justify-center"
    >
      <div className="text-white max-w-2xl px-8">
        <div className="text-6xl mb-6">:(</div>
        <h1 className="text-2xl font-bold mb-4">
          На вашем компьютере возникла проблема, и его необходимо перезагрузить.
        </h1>
        <p className="text-lg mb-6">
          Мы лишь собираем некоторые сведения об ошибке, а затем выполним перезагрузку.
        </p>
        <div className="text-xl mb-8">
          {Math.floor(Math.random() * 30) + 70}% завершено
        </div>
        <div className="text-sm opacity-80">
          <p>Код остановки: GASLIGHTER_CLUB_ERROR</p>
          <p>Что вызвало сбой: reality_distortion.dll</p>
          <p>Время: {new Date().toLocaleString('ru-RU')}</p>
        </div>
      </div>
    </motion.div>
  );
}
