import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================================
// 3D-ЛОГОТИП БГК — шлем Базза Газлайтера + объёмные 3D буквы
// ============================================================
interface BGCLogoProps {
  rotation?: number;
}

function BGCLogo({ rotation = 0 }: BGCLogoProps) {
  return (
    <div className="w-full max-w-2xl relative">
      {/* SVG-часть с шлемом */}
      <svg
        viewBox="0 0 600 350"
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Фоновое свечение */}
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#7B61FF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#070712" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="helmetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14141F" />
            <stop offset="100%" stopColor="#070712" />
          </linearGradient>
          <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B61FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#C8FF00" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7B61FF" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="beamGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#C8FF00" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C8FF00" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Фоновое свечение */}
        <rect width="600" height="350" fill="url(#bgGlow)" />

        {/* Орбитальные круги */}
        <circle cx="300" cy="180" r="140" stroke="#7B61FF" strokeWidth="1" fill="none" opacity="0.3" />
        <circle cx="300" cy="180" r="110" stroke="#C8FF00" strokeWidth="0.5" fill="none" opacity="0.4" />

        {/* Луч маяка (идёт вверх от шлема) */}
        <path
          d="M 300 80 L 295 20 L 305 20 Z"
          fill="url(#beamGrad)"
          opacity="0.7"
        />
        <circle cx="300" cy="20" r="4" fill="#C8FF00" opacity="0.9" />

        {/* Шлем Базза Газлайтера */}
        <g transform="translate(300, 180)">
          {/* Основа шлема */}
          <ellipse cx="0" cy="0" rx="80" ry="70" fill="url(#helmetGrad)" stroke="#7B61FF" strokeWidth="2" />
          
          {/* Верхняя дуга шлема */}
          <path
            d="M -80 0 Q -80 -70 0 -70 Q 80 -70 80 0"
            fill="#14141F"
            stroke="#7B61FF"
            strokeWidth="2"
          />
          
          {/* Визор */}
          <path
            d="M -60 -10 Q -60 -40 0 -40 Q 60 -40 60 -10 Q 60 10 0 10 Q -60 10 -60 -10"
            fill="url(#visorGrad)"
            stroke="#C8FF00"
            strokeWidth="1.5"
            opacity="0.9"
          />
          
          {/* Спираль газлайтинга внутри визора */}
          <path
            d="M 0 -25 Q 15 -25 15 -15 Q 15 -5 0 -5 Q -10 -5 -10 -15 Q -10 -22 0 -22 Q 8 -22 8 -15 Q 8 -10 0 -10"
            fill="none"
            stroke="#C8FF00"
            strokeWidth="1.5"
            opacity="0.8"
          />
          
          {/* Боковые элементы шлема */}
          <path
            d="M -80 0 L -95 10 L -85 20"
            fill="none"
            stroke="#7B61FF"
            strokeWidth="2"
          />
          <path
            d="M 80 0 L 95 10 L 85 20"
            fill="none"
            stroke="#7B61FF"
            strokeWidth="2"
          />
          
          {/* Нижняя часть шлема */}
          <path
            d="M -50 30 Q 0 50 50 30"
            fill="none"
            stroke="#7B61FF"
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          {/* Индикатор на шлеме */}
          <circle cx="0" cy="35" r="3" fill="#C8FF00" />
        </g>

        {/* Подпись */}
        <text
          x="300"
          y="320"
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          fill="#A7A9B8"
          textAnchor="middle"
          letterSpacing="3"
        >
          БАЗЗ ГАЗЛАЙТЕР КЛАБ
        </text>
        <text
          x="300"
          y="340"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#A7A9B8"
          textAnchor="middle"
          letterSpacing="2"
          opacity="0.7"
        >
          ИНСТИТУТ ИНФОРМАЦИОННОЙ ГИГИЕНЫ
        </text>
      </svg>

      {/* 3D буквы БГК */}
      <div 
        className="flex justify-center items-center gap-8 mt-8"
        style={{
          perspective: '1000px',
          perspectiveOrigin: 'center center',
        }}
      >
        <div
          className="relative"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: 'transform 0.05s linear',
          }}
        >
          {/* Б */}
          <div className="relative">
            {/* Задняя грань */}
            <div
              className="absolute inset-0 font-heading text-[110px] font-bold text-center"
              style={{
                color: '#8B0000',
                transform: 'translateZ(-20px)',
                textShadow: '0 0 10px rgba(139, 0, 0, 0.5)',
              }}
            >
              Б
            </div>
            {/* Боковые грани (имитация объёма) */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 font-heading text-[110px] font-bold text-center"
                style={{
                  color: `rgb(${139 + i * 5}, ${i * 2}, ${i * 2})`,
                  transform: `translateZ(${-20 + i}px)`,
                  opacity: 0.3,
                }}
              >
                Б
              </div>
            ))}
            {/* Передняя грань */}
            <div
              className="relative font-heading text-[110px] font-bold text-center"
              style={{
                color: '#FF3B3B',
                transform: 'translateZ(0px)',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              Б
            </div>
          </div>
        </div>

        <div
          className="relative"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: 'transform 0.05s linear',
          }}
        >
          {/* Г */}
          <div className="relative">
            <div
              className="absolute inset-0 font-heading text-[110px] font-bold text-center"
              style={{
                color: '#8B0000',
                transform: 'translateZ(-20px)',
                textShadow: '0 0 10px rgba(139, 0, 0, 0.5)',
              }}
            >
              Г
            </div>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 font-heading text-[110px] font-bold text-center"
                style={{
                  color: `rgb(${139 + i * 5}, ${i * 2}, ${i * 2})`,
                  transform: `translateZ(${-20 + i}px)`,
                  opacity: 0.3,
                }}
              >
                Г
              </div>
            ))}
            <div
              className="relative font-heading text-[110px] font-bold text-center"
              style={{
                color: '#FF3B3B',
                transform: 'translateZ(0px)',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              Г
            </div>
          </div>
        </div>

        <div
          className="relative"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: 'transform 0.05s linear',
          }}
        >
          {/* К */}
          <div className="relative">
            <div
              className="absolute inset-0 font-heading text-[110px] font-bold text-center"
              style={{
                color: '#8B0000',
                transform: 'translateZ(-20px)',
                textShadow: '0 0 10px rgba(139, 0, 0, 0.5)',
              }}
            >
              К
            </div>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 font-heading text-[110px] font-bold text-center"
                style={{
                  color: `rgb(${139 + i * 5}, ${i * 2}, ${i * 2})`,
                  transform: `translateZ(${-20 + i}px)`,
                  opacity: 0.3,
                }}
              >
                К
              </div>
            ))}
            <div
              className="relative font-heading text-[110px] font-bold text-center"
              style={{
                color: '#FF3B3B',
                transform: 'translateZ(0px)',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              К
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// СТРАНИЦА-ПРЕДУПРЕЖДЕНИЕ
// ============================================================
interface WarningPageProps {
  onAccept: () => void;
}

export default function WarningPage({ onAccept }: WarningPageProps) {
  const [checked, setChecked] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  
  // Анимация вращения букв
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => {
        const newRotation = prev + 1;
        
        // При достижении 180 градусов (КГБ) запускаем эффект дёрганья
        if (newRotation % 360 === 180) {
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 500);
        }
        
        return newRotation % 360;
      });
    }, 50); // 50ms = 20 FPS, полный оборот за 18 секунд
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`min-h-screen bg-cosmic text-white flex items-center justify-center p-6 ${isShaking ? 'animate-screen-shake' : ''}`}>
      <div className="max-w-2xl w-full">
        {/* Логотип */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <BGCLogo rotation={rotation} />
        </motion.div>

        {/* Предупреждение */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass rounded-xl p-8 border border-orange/30"
        >
          {/* Иконка предупреждения */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-orange/20 border-2 border-orange/50 flex items-center justify-center">
              <span className="text-orange text-3xl">⚠</span>
            </div>
          </div>

          <h1 className="font-heading text-2xl md:text-3xl font-bold text-center mb-4 text-orange">
            ПРЕДУПРЕЖДЕНИЕ
          </h1>

          <div className="space-y-4 text-gray mb-6">
            <p className="text-sm leading-relaxed">
              Вы собираетесь войти на сайт <span className="text-lime font-bold">«Базз Газлайтер Клаб»</span> — 
              иммерсивную платформу, которая использует художественные приёмы газлайтинга в образовательных целях.
            </p>
            
            <div className="bg-graphite/50 rounded-lg p-4 border-l-2 border-orange/50">
              <p className="text-sm font-bold text-orange mb-2">Сайт может вызывать:</p>
              <ul className="space-y-1.5 text-sm text-gray">
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-0.5">•</span>
                  <span>Лёгкую тревогу и дезориентацию</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-0.5">•</span>
                  <span>Сомнение в собственных воспоминаниях</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-0.5">•</span>
                  <span>Ощущение потери контроля над интерфейсом</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-0.5">•</span>
                  <span>Визуальные эффекты, имитирующие сбои</span>
                </li>
              </ul>
            </div>

            <div className="bg-graphite/50 rounded-lg p-4 border-l-2 border-lime/50">
              <p className="text-sm font-bold text-lime mb-2">Важно знать:</p>
              <ul className="space-y-1.5 text-sm text-gray">
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-0.5">✓</span>
                  <span>Это художественная демонстрация, а не реальная угроза</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-0.5">✓</span>
                  <span>Вы в безопасности. Сайт не собирает данные и не блокирует выход</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-0.5">✓</span>
                  <span>В любой момент можно отключить эффекты стоп-словом «Бесконечность»</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-0.5">✓</span>
                  <span>Доступен «Режим ясности» — спокойная версия без эффектов</span>
                </li>
              </ul>
            </div>

            <p className="text-xs text-gray/60 italic">
              Не рекомендуется людям с повышенной тревожностью, эпилепсией 
              или чувствительностью к визуальным эффектам.
            </p>
          </div>

          {/* Чекбокс согласия */}
          <label className="flex items-start gap-3 mb-6 cursor-pointer group">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-1 w-5 h-5 rounded accent-lime cursor-pointer"
            />
            <span className="text-sm text-gray group-hover:text-white transition-colors">
              Я понимаю, что сайт содержит элементы газлайтинга в художественных целях. 
              Я предупреждён о возможных эффектах и добровольно продолжаю. 
              Мне больше 18 лет.
            </span>
          </label>

          {/* Кнопка */}
          <button
            onClick={onAccept}
            disabled={!checked}
            className={`w-full py-4 rounded-full font-heading font-bold text-lg transition-all ${
              checked
                ? 'bg-lime text-cosmic hover:animate-pulse-glow cursor-pointer'
                : 'bg-graphite text-gray/40 cursor-not-allowed'
            }`}
          >
            {checked ? 'Я понимаю. Войти на сайт' : 'Подтвердите согласие выше'}
          </button>

          {/* Альтернатива */}
          <div className="mt-6 text-center">
            <a
              href="https://www.google.com"
              className="text-xs text-gray/50 hover:text-gray transition-colors"
            >
              Я передумал. Уйти с сайта →
            </a>
          </div>
        </motion.div>

        {/* Юридическая информация */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-center text-xs text-gray/40 font-mono"
        >
          <p>ООО «Институт Информационной Гигиены»</p>
          <p className="mt-1">avgas85@mail.ru</p>
        </motion.div>

        {/* Юридический дисклеймер */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-4 text-center text-[10px] text-gray/30 leading-relaxed max-w-xl mx-auto"
        >
          <p>
            Информация, представленная на данном сайте, носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями статьи 437 ГК РФ. Отправляя сведения через любую электронную форму на этом сайте, вы даете согласие на обработку ваших персональных данных.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
