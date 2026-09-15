import { useState, useEffect } from 'react';

export default function BGCLogo3D() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showCracks, setShowCracks] = useState(false);

  // Периодический переворот букв каждые 25 секунд
  useEffect(() => {
    const flipInterval = setInterval(() => {
      // Переворачиваем буквы
      setIsFlipped(true);
      setIsShaking(true);
      setShowCracks(true);
      
      // Возвращаем в нормальное состояние через 2.5 секунды
      setTimeout(() => {
        setIsFlipped(false);
        setIsShaking(false);
        setShowCracks(false);
      }, 2500);
    }, 25000);

    return () => clearInterval(flipInterval);
  }, []);

  return (
    <div className={`relative ${isShaking ? 'animate-screen-shake' : ''}`}>
      {/* Эффект разбитого стекла */}
      {showCracks && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <svg 
            viewBox="0 0 1920 1080" 
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Основные трещины из центра */}
            <path 
              d="M 960 540 L 800 300 L 700 150 L 650 50" 
              stroke="#FF3B3B" 
              strokeWidth="3" 
              fill="none" 
              opacity="0.9"
            />
            <path 
              d="M 960 540 L 1120 300 L 1220 150 L 1270 50" 
              stroke="#FF3B3B" 
              strokeWidth="3" 
              fill="none" 
              opacity="0.9"
            />
            <path 
              d="M 960 540 L 700 700 L 550 850 L 450 1000" 
              stroke="#FF3B3B" 
              strokeWidth="3" 
              fill="none" 
              opacity="0.9"
            />
            <path 
              d="M 960 540 L 1220 700 L 1370 850 L 1470 1000" 
              stroke="#FF3B3B" 
              strokeWidth="3" 
              fill="none" 
              opacity="0.9"
            />
            
            {/* Горизонтальные трещины */}
            <path 
              d="M 960 540 L 500 540 L 200 540 L 0 540" 
              stroke="#FF3B3B" 
              strokeWidth="2.5" 
              fill="none" 
              opacity="0.8"
            />
            <path 
              d="M 960 540 L 1420 540 L 1720 540 L 1920 540" 
              stroke="#FF3B3B" 
              strokeWidth="2.5" 
              fill="none" 
              opacity="0.8"
            />
            
            {/* Вертикальные трещины */}
            <path 
              d="M 960 540 L 960 200 L 960 0" 
              stroke="#FF3B3B" 
              strokeWidth="2.5" 
              fill="none" 
              opacity="0.8"
            />
            <path 
              d="M 960 540 L 960 880 L 960 1080" 
              stroke="#FF3B3B" 
              strokeWidth="2.5" 
              fill="none" 
              opacity="0.8"
            />
            
            {/* Диагональные трещины */}
            <path 
              d="M 960 540 L 600 200 L 300 0" 
              stroke="#FF3B3B" 
              strokeWidth="2" 
              fill="none" 
              opacity="0.7"
            />
            <path 
              d="M 960 540 L 1320 200 L 1620 0" 
              stroke="#FF3B3B" 
              strokeWidth="2" 
              fill="none" 
              opacity="0.7"
            />
            <path 
              d="M 960 540 L 600 880 L 300 1080" 
              stroke="#FF3B3B" 
              strokeWidth="2" 
              fill="none" 
              opacity="0.7"
            />
            <path 
              d="M 960 540 L 1320 880 L 1620 1080" 
              stroke="#FF3B3B" 
              strokeWidth="2" 
              fill="none" 
              opacity="0.7"
            />
            
            {/* Дополнительные мелкие трещины */}
            <path 
              d="M 800 300 L 750 250 L 720 200" 
              stroke="#FF3B3B" 
              strokeWidth="1.5" 
              fill="none" 
              opacity="0.6"
            />
            <path 
              d="M 1120 300 L 1170 250 L 1200 200" 
              stroke="#FF3B3B" 
              strokeWidth="1.5" 
              fill="none" 
              opacity="0.6"
            />
            <path 
              d="M 700 700 L 650 750 L 620 800" 
              stroke="#FF3B3B" 
              strokeWidth="1.5" 
              fill="none" 
              opacity="0.6"
            />
            <path 
              d="M 1220 700 L 1270 750 L 1300 800" 
              stroke="#FF3B3B" 
              strokeWidth="1.5" 
              fill="none" 
              opacity="0.6"
            />
            
            {/* Еще больше мелких трещин для реалистичности */}
            <path 
              d="M 500 540 L 450 500 L 420 450" 
              stroke="#FF3B3B" 
              strokeWidth="1" 
              fill="none" 
              opacity="0.5"
            />
            <path 
              d="M 1420 540 L 1470 580 L 1500 630" 
              stroke="#FF3B3B" 
              strokeWidth="1" 
              fill="none" 
              opacity="0.5"
            />
            <path 
              d="M 960 200 L 920 150 L 900 100" 
              stroke="#FF3B3B" 
              strokeWidth="1" 
              fill="none" 
              opacity="0.5"
            />
            <path 
              d="M 960 880 L 1000 930 L 1020 980" 
              stroke="#FF3B3B" 
              strokeWidth="1" 
              fill="none" 
              opacity="0.5"
            />
          </svg>
        </div>
      )}
      
      {/* Крупные буквы БГК / КГБ */}
      <div 
        className={`text-[200px] font-black font-heading tracking-tighter transition-all duration-300 ${
          isShaking ? 'animate-tilt' : ''
        }`}
        style={{
          color: isFlipped ? '#FF3B3B' : '#C8FF00',
          WebkitTextStroke: isFlipped ? '3px #C8FF00' : '3px #FF3B3B',
          transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)',
          textShadow: isFlipped 
            ? '0 0 30px rgba(255, 59, 59, 0.8), 0 0 60px rgba(255, 59, 59, 0.4)' 
            : '0 0 30px rgba(200, 255, 0, 0.8), 0 0 60px rgba(200, 255, 0, 0.4)',
        }}
      >
        {isFlipped ? 'КГБ' : 'БГК'}
      </div>
    </div>
  );
}
