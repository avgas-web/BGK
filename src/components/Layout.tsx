import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { GaslightEffects } from './GaslightEffects';
import SafeZoneButton from './SafeZoneButton';

interface LayoutProps {
  children: ReactNode;
  gaslight: any;
  effectsActive: boolean;
  clarityMode: boolean;
  setClarityMode: (value: boolean) => void;
  setGaslightingEnabled: (value: boolean) => void;
  stopWordActive: boolean;
  stopInput: string;
  setStopInput: (value: string) => void;
  showStopPanel: boolean;
  setShowStopPanel: (value: boolean) => void;
  checkStopWord: (value: string) => void;
  onNavigate: (page: string) => void;
}

export default function Layout({
  children,
  gaslight,
  effectsActive,
  clarityMode,
  setClarityMode,
  setGaslightingEnabled,
  stopWordActive,
  stopInput,
  setStopInput,
  showStopPanel,
  setShowStopPanel,
  checkStopWord,
  onNavigate,
}: LayoutProps) {
  const containerClass = clarityMode ? 'clarity-mode' : '';

  return (
    <div className={`min-h-screen bg-cosmic text-white ${containerClass} scanline-overlay noise-bg ${
      gaslight.jitterActive ? 'animate-jitter' : ''
    } ${gaslight.colorShiftActive ? 'animate-color-shift' : ''}`}>
      <GaslightEffects effects={gaslight} />

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
          <button onClick={() => onNavigate('home')} className="flex items-center gap-3">
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
          </button>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray">
            <button onClick={() => onNavigate('method')} className="hover:text-lime transition-colors">Метод</button>
            <button onClick={() => onNavigate('products')} className="hover:text-lime transition-colors">Продукты</button>
            <button onClick={() => onNavigate('test')} className="hover:text-lime transition-colors">Тест</button>
            <button onClick={() => onNavigate('roulette')} className="hover:text-orange transition-colors">🎰 Рулетка</button>
            <button onClick={() => onNavigate('b2b')} className="hover:text-lime transition-colors">B2B</button>
            <button onClick={() => onNavigate('team')} className="hover:text-lime transition-colors">Команда</button>
            <button onClick={() => onNavigate('faq')} className="hover:text-lime transition-colors">FAQ</button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('test')} className="bg-lime/10 border border-lime/30 text-lime px-4 py-2 rounded-full text-sm font-heading">
              Тест
            </button>
            <button onClick={() => onNavigate('roulette')} className="bg-orange/10 border border-orange/30 text-orange px-4 py-2 rounded-full text-sm font-heading">
              🎰 Рулетка
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      {children}

      {/* Footer */}
      <footer className="py-12 border-t border-purple/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
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
              <p className="text-gray text-xs leading-relaxed">
                Иммерсивная платформа критического мышления и эмоциональной устойчивости.
              </p>
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold mb-3">Продукты</h4>
              <ul className="space-y-2 text-xs text-gray">
                <li><button onClick={() => onNavigate('products')} className="hover:text-lime transition-colors">Калибровка</button></li>
                <li><button onClick={() => onNavigate('products')} className="hover:text-lime transition-colors">Год на орбите</button></li>
                <li><button onClick={() => onNavigate('products')} className="hover:text-lime transition-colors">Маяк (курс)</button></li>
                <li><button onClick={() => onNavigate('products')} className="hover:text-lime transition-colors">Маяк (приложение)</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold mb-3">Компания</h4>
              <ul className="space-y-2 text-xs text-gray">
                <li><button onClick={() => onNavigate('method')} className="hover:text-lime transition-colors">Метод</button></li>
                <li><button onClick={() => onNavigate('team')} className="hover:text-lime transition-colors">Команда</button></li>
                <li><button onClick={() => onNavigate('ethics')} className="hover:text-lime transition-colors">Этика</button></li>
                <li><button onClick={() => onNavigate('test')} className="hover:text-lime transition-colors">Тест</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold mb-3">Контакты</h4>
              <ul className="space-y-2 text-xs text-gray">
                <li>avgas85@mail.ru</li>
                <li>Санкт-Петербург</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray/60">
              © 2025 ООО «Институт Информационной Гигиены». Все права защищены.
            </div>
            <div className="font-mono text-xs text-gray/40">
              v.2.4.1 // Протокол Калибровки // Бесконечность — не предел
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
