import { useState, useEffect } from 'react';

export default function BGCLogo3D() {
  const [rotation, setRotation] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [showKGB, setShowKGB] = useState(false);

  // Анимация вращения
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => {
        const newRotation = prev + 0.5;
        
        // Каждые 30 секунд показываем КГБ на 3 секунды
        if (newRotation % 360 === 180) {
          setShowKGB(true);
          setIsShaking(true);
          setTimeout(() => {
            setShowKGB(false);
            setIsShaking(false);
          }, 3000);
        }
        
        return newRotation % 360;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-80 h-80 ${isShaking ? 'animate-screen-shake' : ''}`}>
      {/* Разбитое стекло при показе КГБ */}
      {showKGB && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* Трещины */}
            <path d="M 200 200 L 150 100 L 120 50" stroke="#FF3B3B" strokeWidth="2" fill="none" opacity="0.8" />
            <path d="M 200 200 L 250 100 L 280 50" stroke="#FF3B3B" strokeWidth="2" fill="none" opacity="0.8" />
            <path d="M 200 200 L 100 250 L 50 280" stroke="#FF3B3B" strokeWidth="2" fill="none" opacity="0.8" />
            <path d="M 200 200 L 300 250 L 350 280" stroke="#FF3B3B" strokeWidth="2" fill="none" opacity="0.8" />
            <path d="M 200 200 L 150 300 L 120 350" stroke="#FF3B3B" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M 200 200 L 250 300 L 280 350" stroke="#FF3B3B" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M 200 200 L 100 150 L 50 120" stroke="#FF3B3B" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M 200 200 L 300 150 L 350 120" stroke="#FF3B3B" strokeWidth="1.5" fill="none" opacity="0.6" />
            
            {/* Дополнительные мелкие трещины */}
            <path d="M 150 100 L 130 80" stroke="#FF3B3B" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M 250 100 L 270 80" stroke="#FF3B3B" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M 100 250 L 80 270" stroke="#FF3B3B" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M 300 250 L 320 270" stroke="#FF3B3B" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
      )}
      
      {/* Минималистичный шлем */}
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Черный фон */}
        <rect width="400" height="400" fill="#070712" />
        
        {/* Основной контур шлема - минималистичный */}
        <path
          d="M 200 80 
             C 150 80, 120 110, 110 160
             L 105 220
             L 110 280
             L 130 320
             L 170 340
             L 200 345
             L 230 340
             L 270 320
             L 290 280
             L 295 220
             L 290 160
             C 280 110, 250 80, 200 80 Z"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="3"
        />

        {/* Козырек - простая линия */}
        <path
          d="M 140 120
             Q 200 100, 260 120"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="2.5"
        />

        {/* Визор - трапеция */}
        <path
          d="M 150 160
             L 250 160
             L 260 220
             L 250 270
             L 150 270
             L 140 220 Z"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="3"
        />

        {/* Буквы БГК или КГБ */}
        <text
          x="200"
          y="225"
          fontFamily="monospace"
          fontSize="56"
          fontWeight="bold"
          fill={showKGB ? '#FF3B3B' : '#C8FF00'}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            transition: 'fill 0.3s ease',
          }}
        >
          {showKGB ? 'КГБ' : 'БГК'}
        </text>

        {/* Боковые элементы - минималистичные */}
        <line x1="110" y1="180" x2="90" y2="160" stroke="#7B61FF" strokeWidth="2" />
        <line x1="290" y1="180" x2="310" y2="160" stroke="#7B61FF" strokeWidth="2" />

        {/* Подбородочная секция - простые линии */}
        <line x1="160" y1="300" x2="240" y2="300" stroke="#7B61FF" strokeWidth="2" />
        <line x1="165" y1="315" x2="235" y2="315" stroke="#7B61FF" strokeWidth="1.5" />
        <line x1="170" y1="330" x2="230" y2="330" stroke="#7B61FF" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
