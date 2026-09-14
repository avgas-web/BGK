import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============ TYPES ============
export interface GaslightState {
  showWelcome: boolean;
  setShowWelcome: (v: boolean) => void;
  showCookie: boolean;
  setShowCookie: (v: boolean) => void;
  cookieSwapped: boolean;
  whisper: string;
  heroTextChanged: boolean;
  counterValue: number;
  scrollDirection: 'forward' | 'backward';
  buttonText: string;
  showExitModal: boolean;
  setShowExitModal: (v: boolean) => void;
  // New effects
  showCrashScreen: boolean;
  isFrozen: boolean;
  jitterActive: boolean;
  cursorDisplaced: boolean;
  colorShiftActive: boolean;
  doubleVisionActive: boolean;
  vhsTrackingActive: boolean;
  showNotification: { id: number; text: string; type: 'info' | 'warning' | 'system' } | null;
  showMemoryGaslight: string | null;
  screenRotated: boolean;
  fakeLoader: boolean;
  textScrambleActive: boolean;
  invertedColors: boolean;
  fakeInputText: string | null;
}

// ============ MAIN HOOK ============
export function useGaslighting(enabled: boolean) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showCookie, setShowCookie] = useState(false);
  const [cookieSwapped, setCookieSwapped] = useState(false);
  const [whisper, setWhisper] = useState('');
  const [heroTextChanged, setHeroTextChanged] = useState(false);
  const [counterValue, setCounterValue] = useState(40);
  const [scrollDirection, setScrollDirection] = useState<'forward' | 'backward'>('forward');
  const [buttonText, setButtonText] = useState('Записаться');
  const [showExitModal, setShowExitModal] = useState(false);
  
  // New effects
  const [showCrashScreen, setShowCrashScreen] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [jitterActive, setJitterActive] = useState(false);
  const [cursorDisplaced, setCursorDisplaced] = useState(false);
  const [colorShiftActive, setColorShiftActive] = useState(false);
  const [doubleVisionActive, setDoubleVisionActive] = useState(false);
  const [vhsTrackingActive, setVhsTrackingActive] = useState(false);
  const [showNotification, setShowNotification] = useState<GaslightState['showNotification']>(null);
  const [showMemoryGaslight, setShowMemoryGaslight] = useState<string | null>(null);
  const [screenRotated, setScreenRotated] = useState(false);
  const [fakeLoader, setFakeLoader] = useState(false);
  const [textScrambleActive, setTextScrambleActive] = useState(false);
  const [invertedColors, setInvertedColors] = useState(false);
  const [fakeInputText, setFakeInputText] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      // Reset all
      setShowCrashScreen(false);
      setIsFrozen(false);
      setJitterActive(false);
      setCursorDisplaced(false);
      setColorShiftActive(false);
      setDoubleVisionActive(false);
      setVhsTrackingActive(false);
      setShowNotification(null);
      setShowMemoryGaslight(null);
      setScreenRotated(false);
      setFakeLoader(false);
      setTextScrambleActive(false);
      setInvertedColors(false);
      setFakeInputText(null);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    // === WELCOME BACK (3s) ===
    timers.push(setTimeout(() => setShowWelcome(true), 3000));

    // === COOKIE BANNER (5s) ===
    timers.push(setTimeout(() => setShowCookie(true), 5000));

    // === HERO TEXT CHANGE (25s) ===
    timers.push(setTimeout(() => setHeroTextChanged(true), 25000));

    // === RANDOM WHISPERS ===
    const whispers = [
      'Ты сам это выбрал',
      'Так было всегда',
      'Ты уверен?',
      'Это не первый раз',
      'Ты уже видел это',
      'Ничего не изменилось',
      'Ты помнишь?',
      'Это тебе снилось'
    ];
    intervals.push(setInterval(() => {
      if (Math.random() > 0.65) {
        setWhisper(whispers[Math.floor(Math.random() * whispers.length)]);
        timers.push(setTimeout(() => setWhisper(''), 3000));
      }
    }, 12000));

    // === COUNTER FLUCTUATION ===
    intervals.push(setInterval(() => {
      const change = Math.random() > 0.5 ? 1 : -1;
      setCounterValue(prev => Math.max(35, Math.min(45, prev + change)));
    }, 4000));

    // === SCROLL DIRECTION GLITCH ===
    intervals.push(setInterval(() => {
      if (Math.random() > 0.8) {
        setScrollDirection('backward');
        timers.push(setTimeout(() => setScrollDirection('forward'), 2000));
      }
    }, 10000));

    // === BUTTON TEXT CHANGE ===
    intervals.push(setInterval(() => {
      if (Math.random() > 0.6) {
        setButtonText('Вы уже записаны');
        timers.push(setTimeout(() => setButtonText('Записаться'), 3000));
      }
    }, 12000));

    // === COOKIE BUTTON SWAP ===
    intervals.push(setInterval(() => {
      setCookieSwapped(prev => !prev);
    }, 8000));

    // === FAKE CRASH SCREEN ===
    const scheduleCrash = () => {
      const delay = 30000 + Math.random() * 60000; // 30-90s
      timers.push(setTimeout(() => {
        setShowCrashScreen(true);
        timers.push(setTimeout(() => setShowCrashScreen(false), 2500));
        scheduleCrash();
      }, delay));
    };
    scheduleCrash();

    // === FREEZE FRAMES ===
    intervals.push(setInterval(() => {
      if (Math.random() > 0.7) {
        setIsFrozen(true);
        timers.push(setTimeout(() => setIsFrozen(false), 400 + Math.random() * 800));
      }
    }, 15000));

    // === ELEMENT JITTER ===
    intervals.push(setInterval(() => {
      if (Math.random() > 0.75) {
        setJitterActive(true);
        timers.push(setTimeout(() => setJitterActive(false), 300 + Math.random() * 500));
      }
    }, 18000));

    // === CURSOR DISPLACEMENT ===
    intervals.push(setInterval(() => {
      if (Math.random() > 0.8) {
        setCursorDisplaced(true);
        timers.push(setTimeout(() => setCursorDisplaced(false), 1500));
      }
    }, 25000));

    // === COLOR SHIFT ===
    intervals.push(setInterval(() => {
      if (Math.random() > 0.85) {
        setColorShiftActive(true);
        timers.push(setTimeout(() => setColorShiftActive(false), 600));
      }
    }, 20000));

    // === DOUBLE VISION ===
    intervals.push(setInterval(() => {
      if (Math.random() > 0.85) {
        setDoubleVisionActive(true);
        timers.push(setTimeout(() => setDoubleVisionActive(false), 800));
      }
    }, 22000));

    // === VHS TRACKING ===
    intervals.push(setInterval(() => {
      if (Math.random() > 0.8) {
        setVhsTrackingActive(true);
        timers.push(setTimeout(() => setVhsTrackingActive(false), 1200));
      }
    }, 28000));

    // === FAKE NOTIFICATIONS ===
    const notifications = [
      { text: 'Калибровка завершена. Результаты сохранены.', type: 'system' as const },
      { text: 'Вы уже проходили тест 12.04.2025', type: 'info' as const },
      { text: 'Обнаружена аномалия восприятия', type: 'warning' as const },
      { text: 'Синхронизация памяти...', type: 'system' as const },
      { text: 'Ваш прогресс: 98%', type: 'info' as const },
      { text: 'Попытка №3 за сегодня', type: 'info' as const },
      { text: 'Сессия восстановлена', type: 'system' as const },
    ];
    intervals.push(setInterval(() => {
      if (Math.random() > 0.7) {
        const n = notifications[Math.floor(Math.random() * notifications.length)];
        setShowNotification({ id: Date.now(), ...n });
        timers.push(setTimeout(() => setShowNotification(null), 4000));
      }
    }, 20000));

    // === MEMORY GASLIGHT ===
    const memories = [
      'Вы уже нажали эту кнопку',
      'Вы читали этот абзац',
      'Вы были здесь 5 минут назад',
      'Вы уже отвечали на этот вопрос',
      'Вы уже видели этот экран',
    ];
    intervals.push(setInterval(() => {
      if (Math.random() > 0.8) {
        setShowMemoryGaslight(memories[Math.floor(Math.random() * memories.length)]);
        timers.push(setTimeout(() => setShowMemoryGaslight(null), 3000));
      }
    }, 25000));

    // === SCREEN ROTATION (very subtle) ===
    intervals.push(setInterval(() => {
      if (Math.random() > 0.9) {
        setScreenRotated(true);
        timers.push(setTimeout(() => setScreenRotated(false), 2000));
      }
    }, 40000));

    // === FAKE LOADER ===
    intervals.push(setInterval(() => {
      if (Math.random() > 0.85) {
        setFakeLoader(true);
        timers.push(setTimeout(() => setFakeLoader(false), 1500));
      }
    }, 35000));

    // === TEXT SCRAMBLE ===
    intervals.push(setInterval(() => {
      if (Math.random() > 0.85) {
        setTextScrambleActive(true);
        timers.push(setTimeout(() => setTextScrambleActive(false), 400));
      }
    }, 30000));

    // === INVERTED COLORS (rare) ===
    intervals.push(setInterval(() => {
      if (Math.random() > 0.92) {
        setInvertedColors(true);
        timers.push(setTimeout(() => setInvertedColors(false), 200));
      }
    }, 45000));

    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [enabled]);

  // === EXIT INTENT ===
  useEffect(() => {
    if (!enabled) return;
    
    // Отключаем на мобильных устройствах
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;
    
    let shown = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        shown = true;
        setShowExitModal(true);
        setTimeout(() => { shown = false; }, 30000);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [enabled]);

  return {
    showWelcome, setShowWelcome,
    showCookie, setShowCookie,
    cookieSwapped,
    whisper,
    heroTextChanged,
    counterValue,
    scrollDirection,
    buttonText,
    showExitModal, setShowExitModal,
    showCrashScreen,
    isFrozen,
    jitterActive,
    cursorDisplaced,
    colorShiftActive,
    doubleVisionActive,
    vhsTrackingActive,
    showNotification,
    showMemoryGaslight,
    screenRotated,
    fakeLoader,
    textScrambleActive,
    invertedColors,
    fakeInputText,
    setFakeInputText,
  };
}

// ============ VISUAL EFFECTS COMPONENT ============

export function GaslightEffects({ gaslight, enabled }: { 
  gaslight: ReturnType<typeof useGaslighting>;
  enabled: boolean;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Crash screen */}
      <AnimatePresence>
        {gaslight.showCrashScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="crash-screen"
          >
            <div className="relative z-10 text-center px-4">
              <div className="text-6xl mb-4 animate-hard-jitter">⚠</div>
              <div className="text-xl md:text-2xl mb-2 font-mono">CONNECTION_LOST</div>
              <div className="text-sm text-gray mb-4 font-mono">
                Нестабильное соединение. Восстановление...
              </div>
              <div className="w-48 h-1 bg-graphite mx-auto rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                  className="h-full bg-red"
                />
              </div>
              <div className="text-xs text-gray/50 mt-4 font-mono">
                error: 0x7F3A // packet_loss: 98%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Freeze overlay */}
      {gaslight.isFrozen && (
        <div className="fixed inset-0 pointer-events-none z-[9997] freeze-effect" 
             style={{ background: 'rgba(7, 7, 18, 0.3)' }} />
      )}

      {/* Fake loader */}
      <AnimatePresence>
        {gaslight.fakeLoader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9996] pointer-events-none"
          >
            <div className="glass rounded-full p-4">
              <div className="w-8 h-8 border-2 border-lime border-t-transparent rounded-full animate-spin" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fake notification */}
      <AnimatePresence>
        {gaslight.showNotification && (
          <motion.div
            key={gaslight.showNotification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-20 right-4 z-[9995] notification-toast"
          >
            <div className={`glass rounded-lg px-4 py-3 max-w-xs border-l-2 ${
              gaslight.showNotification.type === 'warning' ? 'border-orange' :
              gaslight.showNotification.type === 'system' ? 'border-purple' : 'border-lime'
            }`}>
              <div className="flex items-start gap-2">
                <span className="text-sm">
                  {gaslight.showNotification.type === 'warning' ? '⚠' : 
                   gaslight.showNotification.type === 'system' ? '◉' : 'ℹ'}
                </span>
                <div>
                  <div className="font-mono text-xs text-gray mb-0.5">СИСТЕМА</div>
                  <div className="text-sm">{gaslight.showNotification.text}</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Memory gaslight */}
      <AnimatePresence>
        {gaslight.showMemoryGaslight && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9994] pointer-events-none"
          >
            <div className="font-mono text-sm text-purple bg-graphite/80 backdrop-blur px-4 py-2 rounded-full border border-purple/30">
              {gaslight.showMemoryGaslight}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cursor displacement ghost */}
      {gaslight.cursorDisplaced && (
        <div 
          className="fixed pointer-events-none z-[9998]"
          style={{ 
            left: mousePos.x + 15, 
            top: mousePos.y - 10,
          }}
        >
          <div className="w-4 h-4 rounded-full bg-lime/50 blur-sm animate-pulse" />
        </div>
      )}

      {/* Whisper */}
      <AnimatePresence>
        {gaslight.whisper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9993]"
          >
            <span className="font-mono text-2xl text-purple animate-whisper">{gaslight.whisper}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============ TEXT SCRAMBLER ============

export function ScrambledText({ text, active }: { text: string; active: boolean }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(text.split('').map((char, i) => {
        if (i < iterations) return text[i];
        if (char === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      iterations += 1/3;
      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [active, text]);

  return <span>{display}</span>;
}
