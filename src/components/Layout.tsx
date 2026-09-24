import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { GaslightEffects } from './GaslightEffects';
import UrgencyTimer from './UrgencyTimer';
import BonusSystem from './BonusSystem';
import { ErrorBoundary } from './ErrorBoundary';
import PrivacyPolicy from './PrivacyPolicy';
import SupportChat from './SupportChat';

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
  const [showPhoneGaslight, setShowPhoneGaslight] = useState(false);
  const [showHelpEmail, setShowHelpEmail] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showSupportChat, setShowSupportChat] = useState(false);
  const containerClass = clarityMode ? 'clarity-mode' : '';

  return (
    <div className={`min-h-screen bg-cosmic text-white ${containerClass} scanline-overlay noise-bg ${
      gaslight.jitterActive ? 'animate-jitter' : ''
    } ${gaslight.colorShiftActive ? 'animate-color-shift' : ''}`}>
      {/* Оборачиваем эффекты в ErrorBoundary для защиты от падений */}
      <ErrorBoundary fallback={<div className="fixed inset-0 pointer-events-none" />}>
        <GaslightEffects effects={gaslight} />
      </ErrorBoundary>

      {/* Таймер обратного отсчёта с продлением */}
      {effectsActive && (
        <ErrorBoundary fallback={<div />}>
          <UrgencyTimer />
        </ErrorBoundary>
      )}

      {/* Система бонусов с обновлением условий */}
      {effectsActive && (
        <ErrorBoundary fallback={<div />}>
          <BonusSystem />
        </ErrorBoundary>
      )}

      {/* Политика конфиденциальности */}
      {showPrivacyPolicy && (
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      )}

      {/* Кнопки в правом нижнем углу */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Кнопка службы поддержки */}
        <motion.button
          onClick={() => setShowSupportChat(true)}
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="group relative w-16 h-16 rounded-full bg-purple/90 backdrop-blur border-4 border-purple flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(123,97,255,0.5)]"
          aria-label="Открыть службу поддержки"
        >
          <span className="text-white text-2xl">💬</span>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            ПОДДЕРЖКА
          </span>
        </motion.button>

        {/* Кнопка стоп-слова */}
        <motion.button
          onClick={() => setShowStopPanel(!showStopPanel)}
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 30px rgba(255,59,59,0.5)',
              '0 0 50px rgba(255,59,59,0.8)',
              '0 0 30px rgba(255,59,59,0.5)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="group relative w-20 h-20 rounded-full bg-red/90 backdrop-blur border-4 border-red flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Открыть панель стоп-слова"
        >
          <span className="text-white text-3xl font-bold">⏹</span>
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap font-bold shadow-lg">
            🛑 СТОП-СЛОВО
          </span>
        </motion.button>
        {showStopPanel && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-24 right-0 bg-graphite/95 backdrop-blur border-2 border-red/50 rounded-lg p-4 w-80 shadow-[0_0_40px_rgba(255,59,59,0.4)]"
          >
            <div className="text-base text-red font-mono mb-3 font-bold">🛑 СТОП-СЛОВО:</div>
            <input
              type="text"
              value={stopInput}
              onChange={(e) => { setStopInput(e.target.value); checkStopWord(e.target.value); }}
              placeholder="Введите слово..."
              className="w-full bg-cosmic border-2 border-red/50 rounded px-4 py-3 text-base text-gray focus:outline-none focus:border-red font-mono"
              autoFocus
            />
            <div className="text-sm text-gray mt-2">
              💡 Подсказка: <span className="text-lime font-bold">бесконечность</span>
            </div>
            <div className="text-xs text-gray/60 mt-2">
              Введите стоп-слово для отключения всех эффектов
            </div>
          </motion.div>
        )}
      </div>

      {/* Служба поддержки */}
      <SupportChat 
        isOpen={showSupportChat} 
        onClose={() => setShowSupportChat(false)} 
      />

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
            <button
              onClick={() => {
                setClarityMode(!clarityMode);
                setGaslightingEnabled(!clarityMode);
              }}
              className="ml-4 px-3 py-1 rounded-full text-xs font-mono border border-purple/30 hover:border-lime/50 transition-colors"
            >
              {clarityMode ? '✦ Спектакль' : '◎ Тишина'}
            </button>
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
                <li>
                  <button
                    onClick={() => setShowPhoneGaslight(!showPhoneGaslight)}
                    className="hover:text-lime transition-colors"
                  >
                    {showPhoneGaslight ? 'avgas85@mail.ru (вам показалось)' : 'Показать телефон'}
                  </button>
                </li>
                <li>Санкт-Петербург</li>
                <li>
                  <a href="mailto:avgas85@mail.ru" className="hover:text-lime transition-colors">
                    avgas85@mail.ru
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setShowHelpEmail(!showHelpEmail)}
                    className="text-orange hover:text-lime transition-colors"
                  >
                    {showHelpEmail ? 'avgas85@mail.ru' : '🆘 Психологическая помощь'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowPrivacyPolicy(true)}
                    className="text-purple hover:text-lime transition-colors"
                  >
                    📄 Политика конфиденциальности
                  </button>
                </li>
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
