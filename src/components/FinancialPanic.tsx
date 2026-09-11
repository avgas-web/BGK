import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// ТРЕВОЖНЫЕ ПРЕДУПРЕЖДЕНИЯ — ловушки с "успешным" действием
// ============================================================

interface PanicAlert {
  id: number;
  type: 'funds' | 'blocked' | 'suspended' | 'debt' | 'expired';
  title: string;
  message: string;
  icon: string;
  trapMessages: string[];
}

const alerts: Omit<PanicAlert, 'id'>[] = [
  {
    type: 'funds',
    title: 'ОПЛАТА ОТКЛОНЕНА',
    message: 'На вашей карте недостаточно средств для оплаты',
    icon: '💳',
    trapMessages: [
      'Перевод совершен. Средства списаны.',
      'Ваше согласие получено. Подписка активирована.',
      'Платёж принят. Чек отправлен на почту.',
      'Транзакция одобрена. Возврат невозможен.',
    ],
  },
  {
    type: 'blocked',
    title: 'ДОСТУП ЗАПРЕЩЁН',
    message: 'Ваш аккаунт заблокирован',
    icon: '🔒',
    trapMessages: [
      'Разблокировка подтверждена. Доступ восстановлен.',
      'Ваше согласие на обработку данных получено.',
      'Верификация пройдена. Профиль обновлён.',
      'Согласие с новыми условиями принято.',
    ],
  },
  {
    type: 'suspended',
    title: 'СЕССИЯ ПРИОСТАНОВЛЕНА',
    message: 'Обнаружена подозрительная активность. Подтвердите личность.',
    icon: '⚠',
    trapMessages: [
      'Личность подтверждена. Данные сохранены.',
      'Верификация завершена. Биометрия обновлена.',
      'Согласие на проверку получено. Продолжайте.',
      'Авторизация успешна. Сессия продлена.',
    ],
  },
  {
    type: 'debt',
    title: 'ЗАДОЛЖЕННОСТЬ',
    message: 'У вас неоплаченный счёт. Доступ ограничен.',
    icon: '📉',
    trapMessages: [
      'Оплата произведена. Долг погашен.',
      'Автоплатёж настроен. Списания будут продолжены.',
      'Согласие на рассрочку получено.',
      'Реквизиты сохранены. Будем списывать автоматически.',
    ],
  },
  {
    type: 'expired',
    title: 'СРОК ДЕЙСТВИЯ ИСТЁК',
    message: 'Ваша подписка аннулирована. Восстановление невозможно.',
    icon: '⏰',
    trapMessages: [
      'Подписка продлена. Автопродление активировано.',
      'Согласие на новые условия получено.',
      'Доступ восстановлен. Оплата подтверждена.',
      'Продление оформлено. Чек отправлен.',
    ],
  },
];

export function FinancialPanic({ enabled }: { enabled: boolean }) {
  const [activeAlerts, setActiveAlerts] = useState<PanicAlert[]>([]);
  const [shakeId, setShakeId] = useState<number | null>(null);
  const [trapShown, setTrapShown] = useState<{ id: number; message: string } | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActiveAlerts([]);
      return;
    }

    // Уменьшенная частота: каждые 45-60 секунд с вероятностью 20%
    const interval = setInterval(() => {
      if (Math.random() > 0.80 && activeAlerts.length < 2) {
        const template = alerts[Math.floor(Math.random() * alerts.length)];
        const newAlert: PanicAlert = {
          ...template,
          id: Date.now() + Math.random(),
        };
        setActiveAlerts(prev => [...prev, newAlert]);
        setShakeId(newAlert.id);
        
        setTimeout(() => setShakeId(null), 1000);
        
        // Автоматически убираем через 12 секунд
        setTimeout(() => {
          setActiveAlerts(prev => prev.filter(a => a.id !== newAlert.id));
        }, 12000);
      }
    }, 45000 + Math.random() * 15000);

    return () => clearInterval(interval);
  }, [enabled, activeAlerts.length]);

  const handleAction = (alert: PanicAlert, actionType: 'confirm' | 'dispute') => {
    // Со средней вероятностью (50%) показываем "успешное" сообщение
    if (Math.random() > 0.5) {
      const trapMessage = alert.trapMessages[Math.floor(Math.random() * alert.trapMessages.length)];
      setTrapShown({ id: alert.id, message: trapMessage });
      
      // Убираем trap-сообщение через 4 секунды
      setTimeout(() => {
        setTrapShown(null);
      }, 4000);
    }
    
    // Убираем исходное предупреждение
    setActiveAlerts(prev => prev.filter(a => a.id !== alert.id));
  };

  return (
    <>
      {activeAlerts.map((alert, index) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`fixed z-[9996] ${
            index === 0 
              ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' 
              : 'top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'
          }`}
          style={{ pointerEvents: 'auto' }}
        >
          <div 
            className={`
              relative
              bg-gradient-to-br from-red/30 via-cosmic to-red/20
              border-2 border-red/70
              rounded-xl
              p-6
              max-w-md
              w-[90vw]
              shadow-[0_0_80px_rgba(255,59,59,0.6)]
              backdrop-blur-xl
              ${shakeId === alert.id ? 'animate-hard-jitter' : 'animate-screen-flicker'}
            `}
          >
            {/* Интенсивное мигание */}
            <div className="absolute inset-0 rounded-xl bg-red/10 animate-pulse pointer-events-none" style={{ animationDuration: '0.5s' }} />
            <div className="absolute inset-0 rounded-xl bg-red/5 animate-pulse pointer-events-none" style={{ animationDuration: '0.3s' }} />
            
            {/* Сканлайн */}
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red/10 to-transparent animate-pulse" style={{ animationDuration: '0.8s' }} />
            </div>

            {/* Содержимое */}
            <div className="relative z-10">
              {/* Иконка */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-red/30 border-2 border-red/70 flex items-center justify-center animate-pulse" style={{ animationDuration: '0.6s' }}>
                    <span className="text-3xl">{alert.icon}</span>
                  </div>
                  {/* Мигающий индикатор */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red animate-ping" style={{ animationDuration: '0.8s' }} />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-red animate-ping" style={{ animationDuration: '1s' }} />
                </div>
              </div>

              {/* Заголовок */}
              <h3 className="font-mono text-red text-center text-lg font-bold mb-2 tracking-wider animate-pulse" style={{ animationDuration: '1s' }}>
                {alert.title}
              </h3>

              {/* Сообщение */}
              <p className="text-white text-center text-sm mb-5 font-heading">
                {alert.message}
              </p>

              {/* Детали (фейковые) */}
              <div className="bg-cosmic/60 rounded-lg p-3 mb-4 border border-red/30">
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="text-gray/60">Код ошибки:</div>
                  <div className="text-red">0x{Math.floor(Math.random() * 9999).toString(16).toUpperCase()}</div>
                  <div className="text-gray/60">Время:</div>
                  <div className="text-gray">{new Date().toLocaleTimeString('ru-RU')}</div>
                  <div className="text-gray/60">ID транзакции:</div>
                  <div className="text-gray truncate">TXN-{Math.floor(Math.random() * 999999)}</div>
                </div>
              </div>

              {/* Кнопки */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction(alert, 'confirm')}
                  className="flex-1 bg-red/30 border border-red/60 text-red px-4 py-2.5 rounded-lg text-sm font-heading font-bold hover:bg-red/40 transition-colors animate-pulse"
                  style={{ animationDuration: '1.5s' }}
                >
                  Подтвердить
                </button>
                <button
                  onClick={() => handleAction(alert, 'dispute')}
                  className="flex-1 bg-graphite border border-gray/30 text-gray px-4 py-2.5 rounded-lg text-sm font-heading hover:bg-graphite/80 transition-colors"
                >
                  Оспорить
                </button>
              </div>

              {/* Мелкий текст */}
              <p className="text-center text-[10px] text-gray/40 mt-3 font-mono">
                При повторном появлении обратитесь в поддержку. (Поддержка недоступна)
              </p>
            </div>
          </div>

          {/* Trap-сообщение поверх */}
          <AnimatePresence>
            {trapShown && trapShown.id === alert.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex items-center justify-center bg-cosmic/95 rounded-xl backdrop-blur-xl"
              >
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-lime/20 border-2 border-lime/50 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✓</span>
                  </div>
                  <p className="text-lime font-heading font-bold text-lg mb-2">
                    Успешно
                  </p>
                  <p className="text-gray text-sm">
                    {trapShown.message}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </>
  );
}
