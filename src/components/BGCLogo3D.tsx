import { motion } from 'framer-motion';

export default function BGCLogo3D() {
  return (
    <div className="relative w-64 h-64" style={{ perspective: '1000px' }}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Основной шлем/визор */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full"
          style={{ transform: 'translateZ(0px)' }}
        >
          <defs>
            <linearGradient id="helmetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14141F" />
              <stop offset="50%" stopColor="#070712" />
              <stop offset="100%" stopColor="#14141F" />
            </linearGradient>
            <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7B61FF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#C8FF00" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7B61FF" stopOpacity="0.8" />
            </linearGradient>
            <radialGradient id="glowGrad">
              <stop offset="0%" stopColor="#C8FF00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C8FF00" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Внешнее свечение */}
          <circle cx="100" cy="100" r="95" fill="url(#glowGrad)" opacity="0.3" />

          {/* Орбитальные кольца */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="#7B61FF"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="#C8FF00"
            strokeWidth="0.5"
            fill="none"
            opacity="0.4"
          />

          {/* Основа шлема */}
          <ellipse
            cx="100"
            cy="100"
            rx="60"
            ry="50"
            fill="url(#helmetGrad)"
            stroke="#7B61FF"
            strokeWidth="2"
          />

          {/* Верхняя дуга шлема */}
          <path
            d="M 40 100 Q 40 50 100 50 Q 160 50 160 100"
            fill="#14141F"
            stroke="#7B61FF"
            strokeWidth="2"
          />

          {/* Визор */}
          <path
            d="M 55 90 Q 55 70 100 70 Q 145 70 145 90 Q 145 105 100 105 Q 55 105 55 90"
            fill="url(#visorGrad)"
            stroke="#C8FF00"
            strokeWidth="1.5"
            opacity="0.9"
            filter="url(#glow)"
          />

          {/* Спираль газлайтинга внутри визора */}
          <path
            d="M 100 80 Q 110 80 110 85 Q 110 90 100 90 Q 90 90 90 85 Q 90 82 100 82 Q 105 82 105 85 Q 105 87 100 87"
            fill="none"
            stroke="#C8FF00"
            strokeWidth="1.5"
            opacity="0.8"
            filter="url(#glow)"
          />

          {/* Боковые элементы шлема */}
          <path
            d="M 40 100 L 30 105 L 35 115"
            fill="none"
            stroke="#7B61FF"
            strokeWidth="2"
          />
          <path
            d="M 160 100 L 170 105 L 165 115"
            fill="none"
            stroke="#7B61FF"
            strokeWidth="2"
          />

          {/* Нижняя часть шлема */}
          <path
            d="M 60 120 Q 100 135 140 120"
            fill="none"
            stroke="#7B61FF"
            strokeWidth="1.5"
            opacity="0.6"
          />

          {/* Луч маяка */}
          <line
            x1="100"
            y1="50"
            x2="100"
            y2="20"
            stroke="#C8FF00"
            strokeWidth="2"
            opacity="0.8"
            filter="url(#glow)"
          />
          <circle
            cx="100"
            cy="20"
            r="4"
            fill="#C8FF00"
            filter="url(#glow)"
          />

          {/* Индикатор на шлеме */}
          <circle
            cx="100"
            cy="125"
            r="3"
            fill="#C8FF00"
            filter="url(#glow)"
          />
        </svg>

        {/* Задняя грань шлема для 3D-эффекта */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full"
          style={{ transform: 'translateZ(-20px)' }}
        >
          <ellipse
            cx="100"
            cy="100"
            rx="60"
            ry="50"
            fill="#070712"
            stroke="#7B61FF"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
      </motion.div>

      {/* Буквы БГК под логотипом */}
      <motion.div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-2"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {['Б', 'Г', 'К'].map((letter, i) => (
          <motion.div
            key={i}
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.2,
            }}
          >
            <div
              className="text-5xl font-bold font-heading"
              style={{
                color: '#FF3B3B',
                transform: `translateZ(${10 - i * 3}px)`,
                textShadow: '0 0 15px rgba(255, 59, 59, 0.6)',
              }}
            >
              {letter}
            </div>
            <div
              className="absolute inset-0 text-5xl font-bold font-heading"
              style={{
                color: '#8B0000',
                transform: 'translateZ(-10px)',
              }}
            >
              {letter}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
