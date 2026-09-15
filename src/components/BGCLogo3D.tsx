import { motion } from 'framer-motion';

export default function BGCLogo3D() {
  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Черный фон */}
        <rect width="400" height="400" fill="#070712" />
        
        {/* Основной контур шлема - внешний轮廓 */}
        <path
          d="M 200 60 
             C 140 60, 100 90, 90 140
             L 85 180
             L 80 220
             L 85 260
             L 95 290
             L 110 310
             L 130 325
             L 150 335
             L 175 340
             L 200 342
             L 225 340
             L 250 335
             L 270 325
             L 290 310
             L 305 290
             L 315 260
             L 320 220
             L 315 180
             L 310 140
             C 300 90, 260 60, 200 60 Z"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="2.5"
        />

        {/* Внутренний контур шлема - сегментация */}
        <path
          d="M 200 70 
             C 145 70, 110 95, 100 140
             L 95 180
             L 92 220
             L 95 255
             L 105 285
             L 118 305
             L 135 320
             L 155 330
             L 180 335
             L 200 337
             L 220 335
             L 245 330
             L 265 320
             L 282 305
             L 295 285
             L 305 255
             L 308 220
             L 305 180
             L 300 140
             C 290 95, 255 70, 200 70 Z"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Козырек - верхняя часть */}
        <path
          d="M 130 100
             C 140 85, 160 75, 200 72
             C 240 75, 260 85, 270 100
             L 275 115
             L 270 125
             L 260 130
             L 240 133
             L 200 135
             L 160 133
             L 140 130
             L 130 125
             L 125 115 Z"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="2"
        />

        {/* Детали козырька - аэродинамические линии */}
        <path
          d="M 140 90 C 160 82, 180 78, 200 77 C 220 78, 240 82, 260 90"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="1"
          opacity="0.7"
        />
        <path
          d="M 145 95 C 165 88, 185 84, 200 83 C 215 84, 235 88, 255 95"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.8"
          opacity="0.5"
        />

        {/* Визор - трапециевидный */}
        <path
          d="M 135 145
             L 265 145
             L 275 180
             L 280 220
             L 275 255
             L 265 270
             L 135 270
             L 125 255
             L 120 220
             L 125 180 Z"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="2.5"
        />

        {/* Внутренняя рамка визора */}
        <path
          d="M 140 150
             L 260 150
             L 270 182
             L 275 220
             L 270 252
             L 260 265
             L 140 265
             L 130 252
             L 125 220
             L 130 182 Z"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Буквы "БГК" на визоре */}
        <text
          x="200"
          y="215"
          fontFamily="Arial, sans-serif"
          fontSize="48"
          fontWeight="900"
          fill="#C8FF00"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          БГК
        </text>

        {/* Контур букв для четкости */}
        <text
          x="200"
          y="215"
          fontFamily="Arial, sans-serif"
          fontSize="48"
          fontWeight="900"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="0.5"
          textAnchor="middle"
          dominantBaseline="middle"
          opacity="0.3"
        >
          БГК
        </text>

        {/* Левая антенна/рог */}
        <path
          d="M 90 140
             L 75 125
             L 65 110
             L 60 95
             L 65 85
             L 75 80
             L 85 85
             L 90 95
             L 92 110
             L 90 125 Z"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="2"
        />

        {/* Детали левой антенны */}
        <path
          d="M 75 125 L 70 115 L 68 105"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M 80 130 L 75 120 L 73 110"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <circle cx="65" cy="90" r="3" fill="none" stroke="#C8FF00" strokeWidth="1.5" />
        <circle cx="65" cy="90" r="1.5" fill="#C8FF00" />

        {/* Правая антенна/рог (симметричная) */}
        <path
          d="M 310 140
             L 325 125
             L 335 110
             L 340 95
             L 335 85
             L 325 80
             L 315 85
             L 310 95
             L 308 110
             L 310 125 Z"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="2"
        />

        {/* Детали правой антенны */}
        <path
          d="M 325 125 L 330 115 L 332 105"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M 320 130 L 325 120 L 327 110"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <circle cx="335" cy="90" r="3" fill="none" stroke="#C8FF00" strokeWidth="1.5" />
        <circle cx="335" cy="90" r="1.5" fill="#C8FF00" />

        {/* Подбородочная секция */}
        <path
          d="M 130 280
             L 270 280
             L 280 295
             L 285 310
             L 280 325
             L 270 335
             L 250 340
             L 200 342
             L 150 340
             L 130 335
             L 120 325
             L 115 310
             L 120 295 Z"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="2"
        />

        {/* Вентиляционные отверстия - горизонтальные линии */}
        <line x1="140" y1="295" x2="260" y2="295" stroke="#C8FF00" strokeWidth="1.5" />
        <line x1="145" y1="305" x2="255" y2="305" stroke="#7B61FF" strokeWidth="1.5" />
        <line x1="150" y1="315" x2="250" y2="315" stroke="#C8FF00" strokeWidth="1.5" />
        <line x1="155" y1="325" x2="245" y2="325" stroke="#7B61FF" strokeWidth="1.5" />

        {/* Вертикальные разделители вентиляционных отверстий */}
        <line x1="170" y1="290" x2="170" y2="330" stroke="#7B61FF" strokeWidth="0.8" opacity="0.6" />
        <line x1="200" y1="290" x2="200" y2="335" stroke="#C8FF00" strokeWidth="0.8" opacity="0.6" />
        <line x1="230" y1="290" x2="230" y2="330" stroke="#7B61FF" strokeWidth="0.8" opacity="0.6" />

        {/* Боковые сегменты - левая сторона */}
        <path
          d="M 90 180 L 100 180 L 105 200 L 100 220 L 90 220"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="1.5"
        />
        <path
          d="M 95 190 L 102 190 L 105 200 L 102 210 L 95 210"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* Боковые сегменты - правая сторона */}
        <path
          d="M 310 180 L 300 180 L 295 200 L 300 220 L 310 220"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="1.5"
        />
        <path
          d="M 305 190 L 298 190 L 295 200 L 298 210 L 305 210"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* Горизонтальные сегментационные линии */}
        <path
          d="M 100 160 L 135 160"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="1"
          opacity="0.7"
        />
        <path
          d="M 265 160 L 300 160"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="1"
          opacity="0.7"
        />
        <path
          d="M 95 240 L 125 240"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="1"
          opacity="0.7"
        />
        <path
          d="M 275 240 L 305 240"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="1"
          opacity="0.7"
        />

        {/* Декоративные технологичные линии - верх */}
        <path
          d="M 150 110 L 160 115 L 170 112 L 180 115"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <path
          d="M 220 115 L 230 112 L 240 115 L 250 110"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="0.8"
          opacity="0.5"
        />

        {/* Декоративные точки/индикаторы */}
        <circle cx="150" cy="120" r="2" fill="#C8FF00" />
        <circle cx="250" cy="120" r="2" fill="#C8FF00" />
        <circle cx="110" cy="200" r="2" fill="#7B61FF" />
        <circle cx="290" cy="200" r="2" fill="#7B61FF" />

        {/* Дополнительные детали на визоре */}
        <path
          d="M 135 160 L 145 165 L 145 175 L 135 180"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.8"
          opacity="0.6"
        />
        <path
          d="M 265 160 L 255 165 L 255 175 L 265 180"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.8"
          opacity="0.6"
        />
        <path
          d="M 135 240 L 145 235 L 145 225 L 135 220"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.8"
          opacity="0.6"
        />
        <path
          d="M 265 240 L 255 235 L 255 225 L 265 220"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* Центральная линия на козырьке */}
        <line x1="200" y1="75" x2="200" y2="130" stroke="#C8FF00" strokeWidth="0.8" opacity="0.5" />

        {/* Дополнительные сегменты на подбородке */}
        <path
          d="M 160 285 L 165 290 L 165 300 L 160 305"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.8"
          opacity="0.6"
        />
        <path
          d="M 240 285 L 235 290 L 235 300 L 240 305"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* Тонкие декоративные линии по всему шлему */}
        <path
          d="M 120 150 C 130 145, 140 142, 150 140"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.5"
          opacity="0.4"
        />
        <path
          d="M 250 140 C 260 142, 270 145, 280 150"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.5"
          opacity="0.4"
        />
        <path
          d="M 115 260 C 125 265, 135 268, 145 270"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.5"
          opacity="0.4"
        />
        <path
          d="M 255 270 C 265 268, 275 265, 285 260"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.5"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}
