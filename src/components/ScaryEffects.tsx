import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BSODProps {
  enabled: boolean;
}

export function BSOD({ enabled }: BSODProps) {
  const [showBSOD, setShowBSOD] = useState(false);
  const [showLockScreen, setShowLockScreen] = useState(false);
  const [showCracks, setShowCracks] = useState(false);
  const [showBIOS, setShowBIOS] = useState(false);

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

    // Черный экран смерти (BIOS) - раз в 2 минуты с 3% вероятности
    const biosInterval = setInterval(() => {
      if (Math.random() > 0.97) {
        setShowBIOS(true);
        setTimeout(() => setShowBIOS(false), 4000);
      }
    }, 120000);

    return () => {
      clearInterval(bsodInterval);
      clearInterval(lockInterval);
      clearInterval(cracksInterval);
      clearInterval(biosInterval);
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

      {/* Черный экран смерти (BIOS) */}
      <AnimatePresence>
        {showBIOS && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] bg-black flex flex-col justify-start p-8 font-mono"
          >
            <div className="text-white text-sm space-y-2">
              <p className="text-green-400">American Megatrends BIOS v2.68</p>
              <p>Copyright (C) 1985-2025 American Megatrends Inc.</p>
              <p>&nbsp;</p>
              <p>BIOS Date: 12/25/2025 Ver: 2.68</p>
              <p>Processor: Intel(R) Core(TM) i9-14900K @ 6.00GHz</p>
              <p>Speed: 6.00 GHz</p>
              <p>&nbsp;</p>
              <p>Press DEL to run SETUP</p>
              <p>Press F12 to boot from network</p>
              <p>Press F8 for BBS Popup</p>
              <p>&nbsp;</p>
              <p className="text-yellow-400">Initializing USB Controllers ... Done</p>
              <p className="text-yellow-400">480MB OK</p>
              <p>&nbsp;</p>
              <p className="text-red-500 animate-pulse">AUTO-DETECTING PRIMARY MASTER ... GASLIGHTER_CLUB</p>
              <p className="text-red-500 animate-pulse">AUTO-DETECTING PRIMARY SLAVE ... REALITY_DISTORTION</p>
              <p className="text-red-500 animate-pulse">AUTO-DETECTING SECONDARY MASTER ... MANIPULATION_ENGINE</p>
              <p>&nbsp;</p>
              <p className="text-cyan-400">Memory Test: 16384MB OK</p>
              <p>&nbsp;</p>
              <p className="text-white">Booting from Hard Disk...</p>
              <p className="text-red-600 animate-pulse font-bold">ERROR: Reality not found</p>
              <p className="text-red-600 animate-pulse font-bold">ERROR: Sanity check failed</p>
              <p className="text-red-600 animate-pulse font-bold">ERROR: Trust module corrupted</p>
              <p>&nbsp;</p>
              <p className="text-yellow-300">Press any key to continue...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
