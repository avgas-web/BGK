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

  // Проверка достижения 5000 бонусов и сброс
  useEffect(() => {
    if (bonusPoints >= 5000) {
      setShowBurnMessage(true);
      setTimeout(() => {
        setBonusPoints(0);
        setShowBurnMessage(false);
      }, 3000);
    }
  }, [bonusPoints]);

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

      {/* Сообщение о сгорании бонусов */}
      <AnimatePresence>
        {showBurnMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9996]"
          >
            <div className="glass rounded-xl p-6 border-2 border-red/50 text-center">
              <div className="text-4xl mb-3">🔥</div>
              <h3 className="font-heading text-xl font-bold text-red mb-2">
                БОНУСЫ СГОРЕЛИ!
              </h3>
              <p className="text-gray text-sm">
                Вы достигли 5000 бонусов, но они сгорели из-за изменения условий программы.
              </p>
              <p className="text-gray/60 text-xs mt-2">
                Начисление начинается заново...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
