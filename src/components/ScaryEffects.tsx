import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BSODProps {
  enabled: boolean;
}

export function BSOD({ enabled }: BSODProps) {
  const [showBSOD, setShowBSOD] = useState(false);
  const [showLockScreen, setShowLockScreen] = useState(false);
  const [showCracks, setShowCracks] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // BSOD - раз в минуту с 5% вероятности
    const bsodInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setShowBSOD(true);
        setTimeout(() => setShowBSOD(false), 3000);
      }
    }, 60000);

    // Экран блокировки - раз в минуту с 5% вероятности
    const lockInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setShowLockScreen(true);
        setTimeout(() => setShowLockScreen(false), 2000);
      }
    }, 60000);

    // Трещины на экране - раз в минуту с 5% вероятности
    const cracksInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setShowCracks(true);
        setTimeout(() => setShowCracks(false), 4000);
      }
    }, 60000);

    return () => {
      clearInterval(bsodInterval);
      clearInterval(lockInterval);
      clearInterval(cracksInterval);
    };
  }, [enabled]);

  return (
    <>
      {/* BSOD */}
      <AnimatePresence>
        {showBSOD && (
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
        )}
      </AnimatePresence>

      {/* Экран блокировки */}
      <AnimatePresence>
        {showLockScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-8xl mb-6 animate-pulse">🔒</div>
              <h1 className="text-3xl font-bold text-red mb-4 animate-pulse">
                ДОСТУП ЗАБЛОКИРОВАН
              </h1>
              <p className="text-gray text-lg mb-2">
                Ваши действия зафиксированы
              </p>
              <p className="text-gray/60 text-sm font-mono">
                ERROR: 0x{Math.floor(Math.random() * 9999).toString(16).toUpperCase()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Трещины на экране */}
      <AnimatePresence>
        {showCracks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] pointer-events-none"
          >
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="crack">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
                  <feDisplacementMap in="SourceGraphic" scale="20" />
                </filter>
              </defs>
              <path
                d="M 100 100 L 300 200 L 500 150 L 700 300"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                fill="none"
                filter="url(#crack)"
              />
              <path
                d="M 200 400 L 400 350 L 600 500 L 800 450"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
                fill="none"
                filter="url(#crack)"
              />
              <path
                d="M 50 600 L 250 550 L 450 700 L 650 650"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.5"
                fill="none"
                filter="url(#crack)"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
