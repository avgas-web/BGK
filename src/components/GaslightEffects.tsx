import { useState, useEffect, useRef } from 'react';
import { GASLIGHT_CONFIG, getDeviceCapabilities } from '../config/gaslightConfig';

// Хук для управления всеми газлайтинг-эффектами
export function useGaslighting(enabled: boolean) {
  const [effects, setEffects] = useState({
    showWelcome: false,
    showCookie: false,
    cookieSwapped: false,
    whisper: '',
    heroTextChanged: false,
    counterValue: 40,
    scrollDirection: 'forward' as 'forward' | 'backward',
    buttonText: 'Записаться',
    showExitModal: false,
    showCrashScreen: false,
    isFrozen: false,
    jitterActive: false,
    cursorDisplaced: false,
    colorShiftActive: false,
    doubleVisionActive: false,
    vhsTrackingActive: false,
    notification: null as { id: number; text: string; type: string } | null,
    memoryGaslight: null as string | null,
    screenRotated: false,
    fakeLoader: false,
    textScrambleActive: false,
    invertedColors: false,
    falseUrgencyTimer: null as number | null,
  });

  const timersRef = useRef<number[]>([]);
  const intervalsRef = useRef<number[]>([]);
  const isVisibleRef = useRef(true);

  // Пауза при скрытой вкладке
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
      
      if (!isVisibleRef.current) {
        timersRef.current.forEach(clearTimeout);
        intervalsRef.current.forEach(clearInterval);
        timersRef.current = [];
        intervalsRef.current = [];
      } else if (enabled) {
        initializeEffects();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [enabled]);

  const initializeEffects = () => {
    if (!enabled || !isVisibleRef.current) return;

    const capabilities = getDeviceCapabilities();
    const { timings } = GASLIGHT_CONFIG;

    // Welcome back (3s)
    timersRef.current.push(setTimeout(() => {
      setEffects(prev => ({ ...prev, showWelcome: true }));
    }, 3000));

    // Cookie banner (5s)
    timersRef.current.push(setTimeout(() => {
      setEffects(prev => ({ ...prev, showCookie: true }));
    }, 5000));

    // Hero text change (25s)
    timersRef.current.push(setTimeout(() => {
      setEffects(prev => ({ ...prev, heroTextChanged: true }));
    }, 25000));

    // Random whispers
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.65) {
        const whispers = GASLIGHT_CONFIG.phrases.whispers;
        const whisper = whispers[Math.floor(Math.random() * whispers.length)];
        setEffects(prev => ({ ...prev, whisper }));
        setTimeout(() => setEffects(prev => ({ ...prev, whisper: '' })), 3000);
      }
    }, timings.notifications.interval * capabilities.slowdownFactor));

    // Counter fluctuation
    intervalsRef.current.push(setInterval(() => {
      const change = Math.random() > 0.5 ? 1 : -1;
      setEffects(prev => ({
        ...prev,
        counterValue: Math.max(35, Math.min(45, prev.counterValue + change))
      }));
    }, 4000));

    // Scroll direction glitch
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.8) {
        setEffects(prev => ({ ...prev, scrollDirection: 'backward' as const }));
        setTimeout(() => setEffects(prev => ({ ...prev, scrollDirection: 'forward' as const })), 2000);
      }
    }, 10000));

    // Button text change
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.6) {
        setEffects(prev => ({ ...prev, buttonText: 'Вы уже записаны' }));
        setTimeout(() => setEffects(prev => ({ ...prev, buttonText: 'Записаться' })), 3000);
      }
    }, 12000));

    // Cookie button swap
    intervalsRef.current.push(setInterval(() => {
      setEffects(prev => ({ ...prev, cookieSwapped: !prev.cookieSwapped }));
    }, 8000));

    // Fake crash screen
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.95) {
        setEffects(prev => ({ ...prev, showCrashScreen: true }));
        setTimeout(() => setEffects(prev => ({ ...prev, showCrashScreen: false })), timings.crashScreen.duration);
      }
    }, timings.crashScreen.interval * capabilities.slowdownFactor));

    // Freeze frames
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.95) {
        setEffects(prev => ({ ...prev, isFrozen: true }));
        setTimeout(() => setEffects(prev => ({ ...prev, isFrozen: false })), 400);
      }
    }, timings.freeze.interval * capabilities.slowdownFactor));

    // Element jitter
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.92) {
        setEffects(prev => ({ ...prev, jitterActive: true }));
        setTimeout(() => setEffects(prev => ({ ...prev, jitterActive: false })), 300);
      }
    }, timings.jitter.interval * capabilities.slowdownFactor));

    // Cursor displacement
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.9) {
        setEffects(prev => ({ ...prev, cursorDisplaced: true }));
        setTimeout(() => setEffects(prev => ({ ...prev, cursorDisplaced: false })), 1500);
      }
    }, timings.cursorDisplace.interval * capabilities.slowdownFactor));

    // Color shift
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.93) {
        setEffects(prev => ({ ...prev, colorShiftActive: true }));
        setTimeout(() => setEffects(prev => ({ ...prev, colorShiftActive: false })), 600);
      }
    }, timings.colorShift.interval * capabilities.slowdownFactor));

    // Double vision
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.94) {
        setEffects(prev => ({ ...prev, doubleVisionActive: true }));
        setTimeout(() => setEffects(prev => ({ ...prev, doubleVisionActive: false })), 800);
      }
    }, timings.doubleVision.interval * capabilities.slowdownFactor));

    // VHS tracking
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.91) {
        setEffects(prev => ({ ...prev, vhsTrackingActive: true }));
        setTimeout(() => setEffects(prev => ({ ...prev, vhsTrackingActive: false })), 1200);
      }
    }, timings.vhsTracking.interval * capabilities.slowdownFactor));

    // Fake notifications
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.85) {
        const notifications = GASLIGHT_CONFIG.phrases.notifications;
        const n = notifications[Math.floor(Math.random() * notifications.length)];
        setEffects(prev => ({ ...prev, notification: { id: Date.now(), ...n } }));
        setTimeout(() => setEffects(prev => ({ ...prev, notification: null })), 4000);
      }
    }, timings.notifications.interval * capabilities.slowdownFactor));

    // Memory gaslight
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.88) {
        const memories = GASLIGHT_CONFIG.phrases.memoryGaslight;
        const memory = memories[Math.floor(Math.random() * memories.length)];
        setEffects(prev => ({ ...prev, memoryGaslight: memory }));
        setTimeout(() => setEffects(prev => ({ ...prev, memoryGaslight: null })), 3000);
      }
    }, timings.memoryGaslight.interval * capabilities.slowdownFactor));

    // Screen rotation
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.95) {
        setEffects(prev => ({ ...prev, screenRotated: true }));
        setTimeout(() => setEffects(prev => ({ ...prev, screenRotated: false })), 2000);
      }
    }, timings.screenRotate.interval * capabilities.slowdownFactor));

    // Fake loader
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.92) {
        setEffects(prev => ({ ...prev, fakeLoader: true }));
        setTimeout(() => setEffects(prev => ({ ...prev, fakeLoader: false })), 1500);
      }
    }, timings.fakeLoader.interval * capabilities.slowdownFactor));

    // Text scramble
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.9) {
        setEffects(prev => ({ ...prev, textScrambleActive: true }));
        setTimeout(() => setEffects(prev => ({ ...prev, textScrambleActive: false })), 400);
      }
    }, timings.textScramble.interval * capabilities.slowdownFactor));

    // Inverted colors
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.96) {
        setEffects(prev => ({ ...prev, invertedColors: true }));
        setTimeout(() => setEffects(prev => ({ ...prev, invertedColors: false })), 200);
      }
    }, timings.invertedColors.interval * capabilities.slowdownFactor));

    // False urgency timer
    intervalsRef.current.push(setInterval(() => {
      if (Math.random() > 0.7) {
        const timerValue = timings.falseUrgency.start - Math.floor(Math.random() * timings.falseUrgency.start);
        setEffects(prev => ({ ...prev, falseUrgencyTimer: timerValue }));
        setTimeout(() => setEffects(prev => ({ ...prev, falseUrgencyTimer: null })), 5000);
      }
    }, 15000 * capabilities.slowdownFactor));
  };

  useEffect(() => {
    if (enabled) {
      initializeEffects();
    } else {
      setEffects({
        showWelcome: false,
        showCookie: false,
        cookieSwapped: false,
        whisper: '',
        heroTextChanged: false,
        counterValue: 40,
        scrollDirection: 'forward',
        buttonText: 'Записаться',
        showExitModal: false,
        showCrashScreen: false,
        isFrozen: false,
        jitterActive: false,
        cursorDisplaced: false,
        colorShiftActive: false,
        doubleVisionActive: false,
        vhsTrackingActive: false,
        notification: null,
        memoryGaslight: null,
        screenRotated: false,
        fakeLoader: false,
        textScrambleActive: false,
        invertedColors: false,
        falseUrgencyTimer: null,
      });
    }

    return () => {
      timersRef.current.forEach(clearTimeout);
      intervalsRef.current.forEach(clearInterval);
      timersRef.current = [];
      intervalsRef.current = [];
    };
  }, [enabled]);

  // Exit intent (desktop only)
  useEffect(() => {
    if (!enabled) return;
    
    const isMobile = getDeviceCapabilities().isMobile;
    if (isMobile) return;
    
    let shown = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        shown = true;
        setEffects(prev => ({ ...prev, showExitModal: true }));
        setTimeout(() => {
          shown = false;
        }, 30000);
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [enabled]);

  return {
    ...effects,
    setShowWelcome: (value: boolean) => setEffects(prev => ({ ...prev, showWelcome: value })),
    setShowCookie: (value: boolean) => setEffects(prev => ({ ...prev, showCookie: value })),
    setShowExitModal: (value: boolean) => setEffects(prev => ({ ...prev, showExitModal: value })),
  };
}

// Компонент визуальных эффектов
export function GaslightEffects({ effects }: { effects: ReturnType<typeof useGaslighting> }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      {/* Crash screen */}
      {effects.showCrashScreen && (
        <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-hard-jitter">⚠</div>
            <div className="text-xl md:text-2xl mb-2 font-mono text-red">CONNECTION_LOST</div>
            <div className="text-sm text-gray mb-4 font-mono">Нестабильное соединение. Восстановление...</div>
            <div className="w-48 h-1 bg-graphite mx-auto rounded-full overflow-hidden">
              <div className="h-full bg-red animate-pulse" style={{ width: '100%' }} />
            </div>
            <div className="text-xs text-gray/50 mt-4 font-mono">error: 0x7F3A // packet_loss: 98%</div>
          </div>
        </div>
      )}

      {/* Freeze overlay */}
      {effects.isFrozen && (
        <div className="fixed inset-0 pointer-events-none z-[9997]" style={{ background: 'rgba(7, 7, 18, 0.3)' }} />
      )}

      {/* Fake loader */}
      {effects.fakeLoader && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9996]">
          <div className="glass rounded-full p-4">
            <div className="w-8 h-8 border-2 border-lime border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Notification */}
      {effects.notification && (
        <div className="fixed top-20 right-4 z-[9995] glass rounded-lg px-4 py-3 max-w-xs border-l-2 border-purple/50" role="status" aria-live="polite">
          <div className="flex items-start gap-2">
            <span className="text-sm">
              {effects.notification.type === 'warning' ? '⚠' : effects.notification.type === 'system' ? '◉' : 'ℹ'}
            </span>
            <div>
              <div className="font-mono text-xs text-gray mb-0.5">СИСТЕМА</div>
              <div className="text-sm">{effects.notification.text}</div>
            </div>
          </div>
        </div>
      )}

      {/* Memory gaslight */}
      {effects.memoryGaslight && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9994] font-mono text-sm text-purple bg-graphite/80 backdrop-blur px-4 py-2 rounded-full border border-purple/30" role="status" aria-live="polite">
          {effects.memoryGaslight}
        </div>
      )}

      {/* Cursor displacement ghost */}
      {effects.cursorDisplaced && (
        <div 
          className="fixed pointer-events-none z-[9998]"
          style={{ left: mousePos.x + 15, top: mousePos.y - 10 }}
        >
          <div className="w-4 h-4 rounded-full bg-lime/50 blur-sm animate-pulse" />
        </div>
      )}

      {/* Whisper */}
      {effects.whisper && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9993]" role="status" aria-live="polite">
          <span className="font-mono text-2xl text-purple animate-whisper">{effects.whisper}</span>
        </div>
      )}

      {/* False urgency timer */}
      {effects.falseUrgencyTimer !== null && (
        <div className="fixed top-32 right-4 z-[9992] glass rounded-lg px-4 py-3 border-l-2 border-orange/50" role="status" aria-live="polite">
          <div className="font-mono text-xs text-orange mb-1">⏰ ОСТАЛОСЬ:</div>
          <div className="font-mono text-lg text-orange font-bold">
            {Math.floor(effects.falseUrgencyTimer / 60)}:{(effects.falseUrgencyTimer % 60).toString().padStart(2, '0')}
          </div>
        </div>
      )}
    </>
  );
}

// Компонент скрамблирования текста
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
