import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// ТРЕВОЖНЫЕ ПРЕДУПРЕЖДЕНИЯ — периодически выскакивающие окна
// ============================================================

interface PanicAlert {
  id: number;
  type: 'funds' | 'blocked' | 'suspended' | 'debt' | 'expired';
  title: string;
  message: string;
  icon: string;
}

const alerts: Omit<PanicAlert, 'id'>[] = [
  {
    type: 'funds',
    title: 'ОПЛАТА ОТКЛОНЕНА',
    message: 'На вашей карте недостаточно средств для оплаты',
    icon: '💳',
  },
  {
    type: 'blocked',
    title: 'ДОСТУП ЗАПРЕЩЁН',
    message: 'Ваш аккаунт заблокирован',
    icon: '🔒',
  },
  {
    type: 'suspended',
    title: 'СЕССИЯ ПРИОСТАНОВЛЕНА',
    message: 'Обнаружена подозрительная активность. Подтвердите личность.',
    icon: '⚠',
  },
  {
    type: 'debt',
    title: 'ЗАДОЛЖЕННОСТЬ',
    message: 'У вас неоплаченный счёт. Доступ ограничен.',
    icon: '📉',
  },
  {
    type: 'expired',
    title: 'СРОК ДЕЙСТВИЯ ИСТЁК',
    message: 'Ваша подписка аннулирована. Восстановление невозможно.',
    icon: '⏰',
  },
];

export function FinancialPanic({ enabled }: { enabled: boolean }) {
  const [activeAlerts, setActiveAlerts] = useState<PanicAlert[]>([]);
  const [shakeId, setShakeId] = useState<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActiveAlerts([]);
      return;
    }

    const interval = setInterval(() => {
      // 25% шанс появления предупреждения каждые 20 секунд
      if (Math.random() > 0.75 && activeAlerts.length < 2) {
        const template = alerts[Math.floor(Math.random() * alerts.length)];
        const newAlert: PanicAlert = {
          ...template,
          id: Date.now() + Math.random(),
        };
        setActiveAlerts(prev => [...prev, newAlert]);
        setShakeId(newAlert.id);
        
        // Убираем тряску через 1 секунду
        setTimeout(() => setShakeId(null), 1000);
        
        // Автоматически убираем через 8 секунд (если пользователь не закрыл)
        setTimeout(() => {
          setActiveAlerts(prev => prev.filter(a => a.id !== newAlert.id));
        }, 8000);
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [enabled, activeAlerts.length]);

  const dismissAlert = (id: number) => {
    setActiveAlerts(prev => prev.filter(a => a.id !== id));
    // Иногда после закрытия появляется новое "ещё более тревожное"
    if (enabled && Math.random() > 0.6) {
      setTimeout(() => {
        const template = alerts[Math.floor(Math.random() * alerts.length)];
        const newAlert: PanicAlert = {
          ...template,
          id: Date.now() + Math.random(),
        };
        setActiveAlerts(prev => [...prev, newAlert]);
        setShakeId(newAlert.id);
        setTimeout(() => setShakeId(null), 1000);
        setTimeout(() => {
          setActiveAlerts(prev => prev.filter(a => a.id !== newAlert.id));
        }, 8000);
      }, 1500);
    }
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
              bg-gradient-to-br from-red/20 via-cosmic to-red/10
              border-2 border-red/60
              rounded-xl
              p-6
              max-w-md
              w-[90vw]
              shadow-[0_0_60px_rgba(255,59,59,0.4)]
              backdrop-blur-xl
              ${shakeId === alert.id ? 'animate-hard-jitter' : ''}
            `}
          >
            {/* Пульсирующий фон */}
            <div className="absolute inset-0 rounded-xl bg-red/5 animate-pulse pointer-events-none" />
            
            {/* Сканлайн */}
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red/5 to-transparent animate-pulse" />
            </div>

            {/* Содержимое */}
            <div className="relative z-10">
              {/* Иконка */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-red/20 border-2 border-red/50 flex items-center justify-center animate-pulse">
                    <span className="text-3xl">{alert.icon}</span>
                  </div>
                  {/* Мигающий индикатор */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red animate-ping" />
                </div>
              </div>

              {/* Заголовок */}
              <h3 className="font-mono text-red text-center text-lg font-bold mb-2 tracking-wider">
                {alert.title}
              </h3>

              {/* Сообщение */}
              <p className="text-white text-center text-sm mb-5 font-heading">
                {alert.message}
              </p>

              {/* Детали (фейковые) */}
              <div className="bg-cosmic/60 rounded-lg p-3 mb-4 border border-red/20">
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
                  onClick={() => dismissAlert(alert.id)}
                  className="flex-1 bg-red/20 border border-red/50 text-red px-4 py-2.5 rounded-lg text-sm font-heading font-bold hover:bg-red/30 transition-colors"
                >
                  Понятно
                </button>
                <button
                  onClick={() => dismissAlert(alert.id)}
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
        </motion.div>
      ))}
    </>
  );
}
