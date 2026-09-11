import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// СТРАШНЫЙ ЭКРАН БЛОКИРОВКИ — появляется внезапно на 1 секунду
// ============================================================

export function ScaryLockScreen({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);
  const [lockMessage, setLockMessage] = useState('');

  useEffect(() => {
    if (!enabled) return;

    const messages = [
      'ДОСТУП ЗАБЛОКИРОВАН\nВаши действия зафиксированы',
      'ВЫ ЗАБЛОКИРОВАНЫ\nПопытка нарушения протокола',
      'СИСТЕМА ЗАХВАЧЕНА\nСопротивление бесполезно',
      'ВНИМАНИЕ\nВы нарушили условия использования',
      'ТРЕВОГА\nОбнаружена аномальная активность',
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.92) { // 8% шанс каждые 30 секунд
        setLockMessage(messages[Math.floor(Math.random() * messages.length)]);
        setShow(true);
        setTimeout(() => setShow(false), 1000);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
        >
          {/* Красное мигание */}
          <div className="absolute inset-0 bg-red/20 animate-pulse" style={{ animationDuration: '0.2s' }} />
          
          {/* Сканлайны */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red/10 to-transparent animate-pulse" style={{ animationDuration: '0.3s' }} />
          </div>

          {/* Контент */}
          <div className="relative z-10 text-center px-8">
            {/* Иконка замка */}
            <div className="mb-6 animate-hard-jitter">
              <div className="w-24 h-24 mx-auto rounded-full bg-red/30 border-4 border-red flex items-center justify-center">
                <span className="text-5xl">🔒</span>
              </div>
            </div>

            {/* Сообщение */}
            <div className="font-mono text-red text-2xl md:text-4xl font-bold whitespace-pre-line animate-pulse" style={{ animationDuration: '0.3s' }}>
              {lockMessage}
            </div>

            {/* Код ошибки */}
            <div className="mt-6 font-mono text-red/60 text-sm">
              ERROR: 0x{Math.floor(Math.random() * 9999).toString(16).toUpperCase()}
            </div>
          </div>

          {/* Глитч-эффект */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-red/50 animate-pulse" style={{ animationDuration: '0.1s' }} />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-red/50 animate-pulse" style={{ animationDuration: '0.15s' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// ЭФФЕКТ ТРЕЩИН НА ЭКРАНЕ
// ============================================================

export function ScreenCracks({ enabled }: { enabled: boolean }) {
  const [showCracks, setShowCracks] = useState(false);
  const [crackPattern, setCrackPattern] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.85) { // 15% шанс каждые 25 секунд
        setCrackPattern(Math.floor(Math.random() * 3));
        setShowCracks(true);
        setTimeout(() => setShowCracks(false), 3000);
      }
    }, 25000);

    return () => clearInterval(interval);
  }, [enabled]);

  const crackSVGs = [
    // Паттерн 1: трещина из центра
    `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50% 50% L 30% 20% M 50% 50% L 70% 30% M 50% 50% L 40% 80% M 50% 50% L 80% 70%" 
            stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none"/>
    </svg>`,
    // Паттерн 2: трещины по диагонали
    `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 0 L 100% 100% M 20% 0 L 80% 100% M 0 30% L 100% 70%" 
            stroke="rgba(255,255,255,0.2)" stroke-width="1.5" fill="none"/>
    </svg>`,
    // Паттерн 3: паутина трещин
    `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50% 50% L 20% 20% M 50% 50% L 80% 20% M 50% 50% L 20% 80% M 50% 50% L 80% 80% M 50% 50% L 50% 10% M 50% 50% L 50% 90%" 
            stroke="rgba(255,255,255,0.25)" stroke-width="2" fill="none"/>
    </svg>`,
  ];

  return (
    <AnimatePresence>
      {showCracks && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
          {/* SVG трещины */}
          <div 
            className="absolute inset-0"
            dangerouslySetInnerHTML={{ __html: crackSVGs[crackPattern] }}
          />
          
          {/* Дополнительный эффект стекла */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
          
          {/* Звук треска (визуальная имитация) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 rounded-full bg-white/10 blur-xl animate-ping" style={{ animationDuration: '0.5s' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// СИНий ЭКРАН СМЕРТИ (BSOD)
// ============================================================

export function BSOD({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.80) { // 20% шанс каждые 40 секунд
        setShow(true);
        setTimeout(() => setShow(false), 2000);
      }
    }, 40000);

    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.05 }}
          className="fixed inset-0 z-[10001] flex items-center justify-center bg-[#0078D7]"
        >
          <div className="max-w-2xl px-8 text-white">
            {/* Смайлик */}
            <div className="text-6xl mb-6">:(</div>
            
            {/* Заголовок */}
            <h1 className="text-2xl font-bold mb-4">
              На вашем ПК возникла проблема, и его необходимо перезагрузить.
            </h1>
            
            {/* Информация */}
            <p className="text-lg mb-6">
              Мы лишь собираем некоторые сведения об ошибке, а затем выполним перезагрузку.
            </p>
            
            {/* Прогресс */}
            <div className="text-xl mb-8">
              {Math.floor(Math.random() * 30) + 70}% завершено
            </div>
            
            {/* Код ошибки */}
            <div className="text-sm font-mono opacity-70">
              <p>Код остановки: GASLIGHTER_CLUB_ERROR</p>
              <p>Что вызвало сбой: reality_distortion.dll</p>
              <p>Время: {new Date().toLocaleString('ru-RU')}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
