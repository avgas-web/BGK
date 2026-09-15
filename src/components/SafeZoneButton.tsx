import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SafeZoneButtonProps {
  clarityMode: boolean;
  onToggle: () => void;
}

export default function SafeZoneButton({ clarityMode, onToggle }: SafeZoneButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!clarityMode) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 5000);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [clarityMode]);

  return (
    <div className="fixed bottom-4 left-4 z-[9999]">
      <div className="relative">
        <AnimatePresence>
          {(isHovered || showTooltip) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-16 left-0 bg-graphite/95 backdrop-blur border border-lime/30 rounded-lg px-4 py-3 min-w-[200px] shadow-lg"
            >
              <div className="text-xs text-lime font-mono mb-1">
                {clarityMode ? 'РЕЖИМ ЯСНОСТИ АКТИВЕН' : 'УСТАЛИ?'}
              </div>
              <p className="text-xs text-gray">
                {clarityMode 
                  ? 'Все эффекты отключены. Нажмите, чтобы вернуться.'
                  : 'Нажмите, чтобы отключить все эффекты и вернуться в спокойный режим.'}
              </p>
              <div className="text-[10px] text-gray/50 mt-2 font-mono">
                Или введите «Бесконечность» в поле справа
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onToggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className={`
            w-14 h-14 rounded-full
            flex items-center justify-center
            transition-all duration-300
            ${clarityMode 
              ? 'bg-lime/20 border-2 border-lime shadow-[0_0_20px_rgba(200,255,0,0.3)]' 
              : 'bg-graphite/80 backdrop-blur border-2 border-purple/50 hover:border-lime hover:shadow-[0_0_20px_rgba(200,255,0,0.2)]'
            }
          `}
          aria-label={clarityMode ? 'Отключить режим ясности' : 'Включить режим ясности'}
          title={clarityMode ? 'Режим ясности активен' : 'Нажмите для режима ясности'}
        >
          {clarityMode ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-lime text-2xl"
            >
              ✦
            </motion.div>
          ) : (
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-purple text-2xl"
            >
              ◎
            </motion.div>
          )}
        </button>

        {!clarityMode && (
          <div className="absolute inset-0 rounded-full pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-purple/30"
            />
          </div>
        )}
      </div>
    </div>
  );
}
