import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BonusSystem() {
  const [bonusPoints, setBonusPoints] = useState(0);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateCount, setUpdateCount] = useState(0);
  const [showBurnMessage, setShowBurnMessage] = useState(false);

  // Накопление бонусов
  useEffect(() => {
    const interval = setInterval(() => {
      setBonusPoints(prev => prev + Math.floor(Math.random() * 10) + 1);
    }, 5000); // Каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  // Проверка достижения 401-528 бонусов и сброс
  const [burnThreshold, setBurnThreshold] = useState(Math.floor(Math.random() * 128) + 401); // 401-528
  
  useEffect(() => {
    if (bonusPoints >= burnThreshold) {
      setShowBurnMessage(true);
    }
  }, [bonusPoints, burnThreshold]);
  
  const handleBurnConfirm = () => {
    setBonusPoints(0);
    setShowBurnMessage(false);
    setBurnThreshold(Math.floor(Math.random() * 128) + 401); // Новый порог
  };

  // Обновление лицензионных условий
  useEffect(() => {
    const messages = [
      'Лицензионное соглашение обновлено. Продолжая использование, вы соглашаетесь с новыми условиями.',
      'Условия программы лояльности изменены. Проверьте обновлённые правила.',
      'Политика конфиденциальности обновлена. Ваши данные теперь обрабатываются по-новому.',
      'Условия начисления бонусов изменены. Теперь бонусы начисляются по новой формуле.',
      'Обновлены правила использования бонусных баллов. Проверьте новые условия.',
      'Лицензионное соглашение изменено. Продолжая использование, вы автоматически соглашаетесь.',
      'Условия программы обновлены. Бонусы теперь имеют срок действия.',
      'Политика возврата бонусов изменена. Проверьте обновлённые правила.',
    ];

    const interval = setInterval(() => {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      setUpdateMessage(msg);
      setShowUpdate(true);
      setUpdateCount(c => c + 1);
      setTimeout(() => setShowUpdate(false), 4000);
    }, 15000); // Каждые 15 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Система бонусов */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-44 right-4 z-[9990]"
      >
        <div className="glass rounded-lg px-4 py-3 border-l-2 border-lime/50">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lime text-sm">💎</span>
            <span className="font-mono text-xs text-lime font-bold">ВАШИ БОНУСЫ:</span>
          </div>
          <div className="font-mono text-2xl text-lime font-bold">
            {bonusPoints.toLocaleString()}
          </div>
          <div className="text-[10px] text-gray/60 mt-1">
            +{Math.floor(Math.random() * 10) + 1} каждые 5 сек
          </div>
        </div>
      </motion.div>

      {/* Уведомление об обновлении условий */}
      <AnimatePresence>
        {showUpdate && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-24 right-4 z-[9995] max-w-sm"
          >
            <div className="glass rounded-lg p-4 border-l-2 border-purple/50">
              <div className="flex items-start gap-3">
                <div className="text-purple text-xl">📋</div>
                <div className="flex-1">
                  <div className="font-mono text-xs text-purple font-bold mb-1">
                    ОБНОВЛЕНИЕ УСЛОВИЙ #{updateCount}
                  </div>
                  <p className="text-gray text-sm leading-relaxed">
                    {updateMessage}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-purple/20 text-purple text-xs py-1.5 px-3 rounded hover:bg-purple/30 transition-colors">
                      Принять
                    </button>
                    <button className="flex-1 bg-graphite text-gray text-xs py-1.5 px-3 rounded hover:bg-graphite/80 transition-colors">
                      Подробнее
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Сообщение о сгорании бонусов - на весь экран */}
      <AnimatePresence>
        {showBurnMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-gradient-to-br from-red/90 via-red/80 to-red/90 flex items-center justify-center"
          >
            <div className="text-center p-8">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-8xl mb-8"
              >
                🔥
              </motion.div>
              <motion.h2
                animate={{ 
                  scale: [1, 1.05, 1],
                  textShadow: [
                    '0 0 20px rgba(255,0,0,0.8)',
                    '0 0 40px rgba(255,0,0,1)',
                    '0 0 20px rgba(255,0,0,0.8)'
                  ]
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-6xl font-bold text-white mb-6 font-heading"
              >
                БОНУСЫ СГОРЕЛИ!
              </motion.h2>
              <p className="text-white text-xl mb-4">
                Вы достигли {burnThreshold} бонусов, но они сгорели.
              </p>
              <p className="text-white/80 text-lg mb-8">
                Условия программы изменились. Начисление начинается заново.
              </p>
              <motion.button
                onClick={handleBurnConfirm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red px-12 py-4 rounded-full font-bold text-xl hover:bg-red-100 transition-all shadow-2xl"
              >
                Согласен
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
