import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGaslighting, GaslightEffects } from './components/GaslightEffects';
import SafeZoneButton from './components/SafeZoneButton';
import { FocusTrap } from './components/FocusTrap';

// Code splitting - ленивая загрузка страниц
const WarningPage = lazy(() => import('./components/WarningPage'));
const TestPage = lazy(() => import('./pages/TestPage'));
const Roulette = lazy(() => import('./components/Roulette'));

// Loading fallback
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-cosmic flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-lime border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray font-mono text-sm">Загрузка...</p>
      </div>
    </div>
  );
}

// Logo
function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="animate-float">
        <circle cx="20" cy="20" r="18" stroke="#7B61FF" strokeWidth="1.5" fill="none" opacity="0.5" />
        <circle cx="20" cy="20" r="12" stroke="#C8FF00" strokeWidth="1" fill="none" opacity="0.7" />
        <path d="M20 8 Q26 14 20 20 Q14 26 20 32" stroke="#7B61FF" strokeWidth="1.5" fill="none" />
        <line x1="20" y1="5" x2="20" y2="12" stroke="#C8FF00" strokeWidth="1" opacity="0.8" />
        <circle cx="20" cy="5" r="2" fill="#C8FF00" />
      </svg>
      <div>
        <div className="font-heading text-sm font-bold tracking-wider text-white">БАЗЗ ГАЗЛАЙТЕР КЛАБ</div>
        <div className="font-mono text-[10px] text-gray tracking-wide">ИНСТИТУТ ИНФОРМАЦИОННОЙ ГИГИЕНЫ</div>
      </div>
    </div>
  );
}

// Scroll progress
function ScrollProgress({ direction }: { direction: 'forward' | 'backward' }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      let p = (scrollTop / docHeight) * 100;
      if (direction === 'backward') p = 100 - p;
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [direction]);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50">
      <div className="h-full bg-gradient-to-r from-purple to-lime" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'test' | 'roulette'>('home');
  const [showWarning, setShowWarning] = useState(true);
  const [hasAcceptedWarning, setHasAcceptedWarning] = useState(false);
  const [clarityMode, setClarityMode] = useState(false);
  const [gaslightingEnabled, setGaslightingEnabled] = useState(true);
  const [stopWordActive, setStopWordActive] = useState(false);
  const [stopInput, setStopInput] = useState('');
  const [contactPhoneShown, setContactPhoneShown] = useState(false);
  const [showStopPanel, setShowStopPanel] = useState(false);

  const gaslight = useGaslighting(gaslightingEnabled && !clarityMode && !stopWordActive);

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setGaslightingEnabled(false);
      setClarityMode(true);
    }
  }, []);

  // Navigation callbacks (без window.location.href)
  const navigateToHome = useCallback(() => {
    setCurrentPage('home');
  }, []);

  const navigateToTest = useCallback(() => {
    setCurrentPage('test');
  }, []);

  const navigateToRoulette = useCallback(() => {
    setCurrentPage('roulette');
  }, []);

  // Stop word
  const checkStopWord = useCallback((value: string) => {
    if (value.toLowerCase().includes('бесконечность')) {
      setStopWordActive(true);
      setGaslightingEnabled(false);
      setClarityMode(true);
      gaslight.setShowWelcome(false);
      gaslight.setShowCookie(false);
      gaslight.setShowExitModal(false);
    }
  }, [gaslight]);

  const effectsActive = gaslightingEnabled && !clarityMode && !stopWordActive;
  const containerClass = clarityMode ? 'clarity-mode' : '';

  return (
    <Suspense fallback={<LoadingFallback />}>
      {/* Warning page */}
      {showWarning && !hasAcceptedWarning ? (
        <WarningPage onAccept={() => { setShowWarning(false); setHasAcceptedWarning(true); }} />
      ) : (
        <>
          {/* Roulette page */}
          {currentPage === 'roulette' ? (
            <Roulette onComplete={navigateToHome} />
          ) : (
            <>
              {/* Test page */}
              {currentPage === 'test' ? (
                <TestPage onBackToHome={navigateToHome} />
              ) : (
                <>
                  {/* Home page */}
                  <div className={`min-h-screen bg-cosmic text-white ${containerClass} scanline-overlay noise-bg ${
                    gaslight.jitterActive ? 'animate-jitter' : ''
                  } ${gaslight.colorShiftActive ? 'animate-color-shift' : ''}`}>
                    <GaslightEffects effects={gaslight} />
                    <ScrollProgress direction={effectsActive ? gaslight.scrollDirection : 'forward'} />

                    {/* Safe Zone Button */}
                    <SafeZoneButton
                      clarityMode={clarityMode}
                      onToggle={() => {
                        setClarityMode(!clarityMode);
                        setGaslightingEnabled(!clarityMode);
                      }}
                    />

                    {/* Stop word panel */}
                    <div className="fixed bottom-4 right-4 z-50">
                      <button
                        onClick={() => setShowStopPanel(!showStopPanel)}
                        className="w-12 h-12 rounded-full bg-graphite/80 backdrop-blur border-2 border-red/50 flex items-center justify-center"
                        aria-label="Открыть панель стоп-слова"
                      >
                        <span className="text-red text-xl">⏹</span>
                      </button>
                      {showStopPanel && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-14 right-0 bg-graphite/95 backdrop-blur border border-red/30 rounded-lg p-3 w-64"
                        >
                          <div className="text-xs text-red font-mono mb-2">СТОП-СЛОВО:</div>
                          <input
                            type="text"
                            value={stopInput}
                            onChange={(e) => { setStopInput(e.target.value); checkStopWord(e.target.value); }}
                            placeholder="Введите слово..."
                            className="w-full bg-cosmic border border-red/20 rounded px-3 py-2 text-xs text-gray focus:outline-none focus:border-red font-mono"
                            autoFocus
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* Stop word active message */}
                    {stopWordActive && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-graphite border border-lime/30 rounded-lg px-6 py-4 text-center"
                      >
                        <p className="text-lime font-mono text-sm">Вы в безопасности. Это была демонстрация.</p>
                        <p className="text-gray text-xs mt-1">Бесконечность — не предел. Особенно бесконечность осознанности.</p>
                      </motion.div>
                    )}

                    {/* Navigation */}
                    <nav className="fixed top-0 left-0 right-0 z-40 glass">
                      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                        <Logo />
                        <div className="hidden md:flex items-center gap-6 text-sm text-gray">
                          <a href="#method" className="hover:text-lime transition-colors">Метод</a>
                          <a href="#products" className="hover:text-lime transition-colors">Продукты</a>
                          <button onClick={navigateToTest} className="hover:text-lime transition-colors">Тест</button>
                          <button onClick={navigateToRoulette} className="hover:text-orange transition-colors">🎰 Рулетка</button>
                          <a href="#b2b" className="hover:text-lime transition-colors">B2B</a>
                          <a href="#team" className="hover:text-lime transition-colors">Команда</a>
                          <a href="#faq" className="hover:text-lime transition-colors">FAQ</a>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={navigateToTest} className="bg-lime/10 border border-lime/30 text-lime px-4 py-2 rounded-full text-sm font-heading">
                            Тест
                          </button>
                          <button onClick={navigateToRoulette} className="bg-orange/10 border border-orange/30 text-orange px-4 py-2 rounded-full text-sm font-heading">
                            🎰 Рулетка
                          </button>
                        </div>
                      </div>
                    </nav>

                    {/* Hero */}
                    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[600px] h-[600px] rounded-full border border-purple/10 animate-spin" style={{ animationDuration: '60s' }} />
                        <div className="absolute w-[400px] h-[400px] rounded-full border border-lime/10 animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
                      </div>
                      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                          <div className="font-mono text-xs text-purple mb-6 tracking-widest">ПРОТОКОЛ КАЛИБРОВКИ В.2.4.1</div>
                          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 glitch-text" data-text="То, что ты видишь — лишь одна из версий. И не самая удачная.">
                            То, что ты видишь — лишь одна из версий. И не самая удачная.
                          </h1>
                          <p className="text-gray text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            Иммерсивная платформа критического мышления. Научись видеть манипуляцию — и обезвредить её за десять секунд.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={navigateToTest} className="bg-lime text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg">
                              Пройти тест
                            </button>
                            <button onClick={navigateToRoulette} className="bg-orange text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg">
                              🎰 Испытать удачу
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    </section>

                    {/* Disclaimer */}
                    <section className="py-8 border-y border-purple/10">
                      <div className="max-w-4xl mx-auto px-6">
                        <div className="glass rounded-lg px-6 py-4 flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-orange text-sm">⚠</span>
                          </div>
                          <p className="text-sm text-gray">
                            <span className="text-orange font-mono font-bold">ДИСКЛЕЙМЕР:</span> Это художественная демонстрация. Вы в безопасности. 
                            Стоп-слово — <span className="text-lime font-mono">«Бесконечность»</span>.
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Modals */}
                    <AnimatePresence>
                      {gaslight.showWelcome && !clarityMode && (
                        <FocusTrap active={true}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-0 flex items-center justify-center z-50 bg-cosmic/80 backdrop-blur-sm"
                          >
                            <div className="glass rounded-xl p-8 max-w-md mx-4 text-center">
                              <h3 className="font-heading text-xl font-bold mb-3">С возвращением!</h3>
                              <p className="text-gray text-sm mb-6">Продолжить с 3-го шага?</p>
                              <div className="flex gap-3 justify-center">
                                <button onClick={() => gaslight.setShowWelcome(false)} className="bg-lime/10 border border-lime/30 text-lime px-4 py-2 rounded-full text-sm">
                                  Продолжить
                                </button>
                                <button onClick={() => gaslight.setShowWelcome(false)} className="text-gray text-sm">
                                  Начать сначала
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        </FocusTrap>
                      )}

                      {gaslight.showExitModal && !clarityMode && (
                        <FocusTrap active={true}>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 flex items-center justify-center z-50 bg-cosmic/80 backdrop-blur-sm"
                          >
                            <div className="glass rounded-xl p-8 max-w-md mx-4 text-center">
                              <h3 className="font-heading text-xl font-bold mb-3">Вы уверены?</h3>
                              <p className="text-gray text-sm mb-6">Вы уже закрывали. Ничего не изменилось.</p>
                              <button onClick={() => gaslight.setShowExitModal(false)} className="bg-lime/10 border border-lime/30 text-lime px-6 py-2 rounded-full text-sm">
                                Закрыть
                              </button>
                            </div>
                          </motion.div>
                        </FocusTrap>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </Suspense>
  );
}
