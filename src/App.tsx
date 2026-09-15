import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGaslighting, GaslightEffects } from './components/GaslightEffects';
import { FocusTrap } from './components/FocusTrap';
import Layout from './components/Layout';

// Code splitting - ленивая загрузка страниц
const WarningPage = lazy(() => import('./components/WarningPage'));
const TestPage = lazy(() => import('./pages/TestPage'));
const Roulette = lazy(() => import('./components/Roulette'));
const MethodPage = lazy(() => import('./pages/MethodPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const B2BPage = lazy(() => import('./pages/B2BPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const EthicsPage = lazy(() => import('./pages/EthicsPage'));

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

// Home page content
function HomePage({ 
  gaslight, 
  effectsActive,
  onNavigate 
}: { 
  gaslight: any; 
  effectsActive: boolean;
  onNavigate: (page: string) => void;
}) {
  return (
    <>
      <ScrollProgress direction={effectsActive ? gaslight.scrollDirection : 'forward'} />
      
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
              <button 
                onClick={() => onNavigate('test')}
                className="bg-lime text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg hover:scale-105 transition-transform"
              >
                Пройти тест
              </button>
              <button 
                onClick={() => onNavigate('roulette')}
                className="bg-orange text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg hover:scale-105 transition-transform"
              >
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

      {/* Проблема */}
      <section className="py-24 bg-graphite/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-xs text-purple mb-4 tracking-widest">ПРОБЛЕМА</div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-12 max-w-3xl">
              Современный человек ежедневно сталкивается с искажением реальности
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📡', title: 'Информационный шум', desc: '200+ сообщений в день. 40% содержат манипулятивные паттерны. Вы не замечаете — и это главная проблема.' },
              { icon: '🪞', title: 'Газлайтинг в быту', desc: '«Тебе показалось», «Я такого не говорил», «Все так думают». Реальность размывается каждый день.' },
              { icon: '⚡', title: 'Эмоциональное выгорание', desc: 'Постоянная проверка реальности истощает. Мозг устаёт сомневаться — и перестаёт.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="glass rounded-xl p-6 hover:border-lime/30 transition-colors"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Метод - кратко */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-xs text-lime mb-4 tracking-widest">МЕТОД</div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Калибровка</h2>
            <p className="text-gray text-lg max-w-2xl mb-16">
              4-часовой иммерсивный спектакль-тренинг. Не лекция. Не вебинар. 
              Опыт, после которого вы больше не сможете развидеть манипуляцию.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { act: 'АКТ I', title: 'Демонстрация', desc: 'Наблюдение за реалистичной манипуляцией с научным разбором', colorClass: 'text-purple' },
              { act: 'АКТ II', title: 'Проживание', desc: 'Столкновение с собственными уязвимостями под контролем психологов', colorClass: 'text-lime' },
              { act: 'АКТ III', title: 'Сборка', desc: 'Получение инструмента «Десятисекундный люк»', colorClass: 'text-purple' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative"
              >
                <div className="glass rounded-xl p-8 h-full">
                  <div className={`font-mono text-xs ${item.colorClass} mb-2 tracking-widest`}>{item.act}</div>
                  <h3 className="font-heading text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('method')}
              className="border border-lime/40 text-lime px-8 py-3 rounded-full font-heading hover:bg-lime/10 transition-colors"
            >
              Узнать подробнее о методе →
            </button>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="py-24 bg-graphite/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-xs text-purple mb-4 tracking-widest">РЕЗУЛЬТАТЫ</div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-12">
              Цифры говорят сами за себя
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { value: '87%', label: 'участников отмечают снижение уязвимости к манипуляциям' },
              { value: '4 часа', label: 'длительность «Калибровки»' },
              { value: '10 сек', label: 'время работы «Десятисекундного люка»' },
              { value: 'NPS 70+', label: 'оценка удовлетворённости участников' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-xl p-6 text-center"
              >
                <div className="font-heading text-4xl font-bold text-lime mb-2">{item.value}</div>
                <div className="text-gray text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Целевая аудитория */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-xs text-lime mb-4 tracking-widest">ДЛЯ КОГО</div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-12">
              Для тех, кто хочет видеть ясно
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-8"
            >
              <h3 className="font-heading text-2xl font-bold mb-4 text-lime">B2C</h3>
              <ul className="space-y-3 text-gray">
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">•</span>
                  <span>Возраст 28–50 лет</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">•</span>
                  <span>Предприниматели, топ-менеджеры, IT-специалисты</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">•</span>
                  <span>Интерес к психологии, опыт личной терапии</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-1">•</span>
                  <span>Ценят время и результат</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-8"
            >
              <h3 className="font-heading text-2xl font-bold mb-4 text-purple">B2B</h3>
              <ul className="space-y-3 text-gray">
                <li className="flex items-start gap-2">
                  <span className="text-purple mt-1">•</span>
                  <span>Компании, заинтересованные в стрессоустойчивости команд</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple mt-1">•</span>
                  <span>HR-директора, руководители, собственники</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple mt-1">•</span>
                  <span>Защита от манипуляций в переговорах</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple mt-1">•</span>
                  <span>Профилактика выгорания</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="py-24 bg-graphite/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
              Готовы увидеть ясно?
            </h2>
            <p className="text-gray text-lg mb-10 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам людей, которые уже научились распознавать манипуляции и защищать свою реальность.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('test')}
                className="bg-lime text-cosmic px-8 py-4 rounded-full font-heading font-bold text-lg hover:scale-105 transition-transform"
              >
                Пройти тест
              </button>
              <button
                onClick={() => onNavigate('products')}
                className="border border-purple/40 text-purple px-8 py-4 rounded-full font-heading text-lg hover:bg-purple/10 transition-colors"
              >
                Посмотреть продукты
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'test' | 'roulette' | 'method' | 'products' | 'team' | 'b2b' | 'faq' | 'ethics'>('home');
  const [showWarning, setShowWarning] = useState(true);
  const [hasAcceptedWarning, setHasAcceptedWarning] = useState(false);
  const [clarityMode, setClarityMode] = useState(false);
  const [gaslightingEnabled, setGaslightingEnabled] = useState(true);
  const [stopWordActive, setStopWordActive] = useState(false);
  const [stopInput, setStopInput] = useState('');
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

  // Navigation callbacks
  const navigateToHome = useCallback(() => setCurrentPage('home'), []);
  const navigateToTest = useCallback(() => setCurrentPage('test'), []);
  const navigateToRoulette = useCallback(() => setCurrentPage('roulette'), []);
  const navigateToMethod = useCallback(() => setCurrentPage('method'), []);
  const navigateToProducts = useCallback(() => setCurrentPage('products'), []);
  const navigateToTeam = useCallback(() => setCurrentPage('team'), []);
  const navigateToB2B = useCallback(() => setCurrentPage('b2b'), []);
  const navigateToFAQ = useCallback(() => setCurrentPage('faq'), []);
  const navigateToEthics = useCallback(() => setCurrentPage('ethics'), []);

  const handleNavigate = useCallback((page: string) => {
    const navigators: Record<string, () => void> = {
      home: navigateToHome,
      test: navigateToTest,
      roulette: navigateToRoulette,
      method: navigateToMethod,
      products: navigateToProducts,
      team: navigateToTeam,
      b2b: navigateToB2B,
      faq: navigateToFAQ,
      ethics: navigateToEthics,
    };
    navigators[page]?.();
  }, [navigateToHome, navigateToTest, navigateToRoulette, navigateToMethod, navigateToProducts, navigateToTeam, navigateToB2B, navigateToFAQ, navigateToEthics]);

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

  const layoutProps = {
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
    onNavigate: handleNavigate,
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'roulette':
        return <Roulette onComplete={navigateToHome} />;
      case 'test':
        return <TestPage onBackToHome={navigateToHome} />;
      case 'method':
        return <MethodPage />;
      case 'products':
        return <ProductsPage />;
      case 'team':
        return <TeamPage />;
      case 'b2b':
        return <B2BPage />;
      case 'faq':
        return <FAQPage />;
      case 'ethics':
        return <EthicsPage />;
      default:
        return <HomePage gaslight={gaslight} effectsActive={effectsActive} onNavigate={handleNavigate} />;
    }
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      {showWarning && !hasAcceptedWarning ? (
        <WarningPage onAccept={() => { setShowWarning(false); setHasAcceptedWarning(true); }} />
      ) : (
        <Layout {...layoutProps}>
          {renderPage()}
        </Layout>
      )}
    </Suspense>
  );
}
