import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// 20 ТИПОВ ГАЗЛАЙТИНГА — паттерны, встроенные в интерфейс
// ============================================================

// Тип 1: Отрицание действий пользователя
export function DeniedAction({ enabled, onTrigger }: { enabled: boolean; onTrigger?: () => void }) {
  const [showDenial, setShowDenial] = useState(false);
  const [denialText, setDenialText] = useState('');

  useEffect(() => {
    if (!enabled) return;
    const denials = [
      'Вы не нажимали эту кнопку. Нам виднее.',
      'Это сообщение не было отправлено. Проверьте свою память.',
      'Вы не оформляли заказ. Возможно, вам приснилось.',
      'Ваша сессия сброшена. Вы сами вышли — мы зафиксировали.',
      'Корзина пуста. Вы ничего не добавляли. Или забыли?',
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setDenialText(denials[Math.floor(Math.random() * denials.length)]);
        setShowDenial(true);
        onTrigger?.();
        setTimeout(() => setShowDenial(false), 4000);
      }
    }, 25000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {showDenial && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-24 left-4 z-[9990] max-w-sm"
        >
          <div className="glass rounded-lg p-4 border-l-2 border-orange/50">
            <div className="font-mono text-xs text-orange mb-1">СИСТЕМА:</div>
            <p className="text-sm text-gray">{denialText}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Тип 2: Искажение истории / переписывание условий
export function RewrittenHistory({ enabled }: { enabled: boolean }) {
  const [showNotice, setShowNotice] = useState(false);
  const [noticeText, setNoticeText] = useState('');

  useEffect(() => {
    if (!enabled) return;
    const notices = [
      'Условия тарифа обновились. Вы согласились автоматически.',
      'Цена изменилась. Предыдущая версия больше не существует.',
      'Оферта была отредактирована. Старая версия недоступна.',
      'Правила акции пересмотрены. Новая версия — единственная верная.',
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.88) {
        setNoticeText(notices[Math.floor(Math.random() * notices.length)]);
        setShowNotice(true);
        setTimeout(() => setShowNotice(false), 5000);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {showNotice && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-24 left-4 z-[9990] max-w-sm"
        >
          <div className="glass rounded-lg p-4 border-l-2 border-purple/50">
            <div className="font-mono text-xs text-purple mb-1">ОБНОВЛЕНИЕ УСЛОВИЙ:</div>
            <p className="text-sm text-gray">{noticeText}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Тип 3: Ложные подтверждения «вы ошиблись»
export function FalseConfirmation({ enabled }: { enabled: boolean }) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!enabled) return;
    const confirmations = [
      'Мы никогда не показывали эту цену.',
      'Вы неправильно поняли условия.',
      'Такой кнопки здесь не было.',
      'Этот раздел никогда не существовал.',
      'Вам показалось. Проверьте ещё раз.',
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const msg = confirmations[Math.floor(Math.random() * confirmations.length)];
        setMessages(prev => [...prev.slice(-2), msg]);
        setTimeout(() => setMessages(prev => prev.slice(1)), 4000);
      }
    }, 22000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {messages.map((msg, i) => (
        <motion.div
          key={`${msg}-${i}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed z-[9989]"
          style={{ 
            top: `${30 + i * 15}%`, 
            right: '4%',
          }}
        >
          <div className="glass rounded-lg px-4 py-3 border-l-2 border-red/50 max-w-xs">
            <div className="font-mono text-xs text-red mb-1">ВЫ ОШИБЛИСЬ:</div>
            <p className="text-sm text-gray">{msg}</p>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

// Тип 4: Перекладывание вины на пользователя
export function BlameShift({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!enabled) return;
    const blames = [
      'Вы неправильно ввели данные. Ошибка на вашей стороне.',
      'Ваш браузер не поддерживает эту функцию. Обновите устройство.',
      'Вы невнимательно читали условия. Они были видны.',
      'Вы сами разрешили это. Галочка была установлена.',
      'Ваш интернет слишком медленный. Это не наша проблема.',
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.87) {
        setText(blames[Math.floor(Math.random() * blames.length)]);
        setShow(true);
        setTimeout(() => setShow(false), 4500);
      }
    }, 28000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9988]"
        >
          <div className="glass rounded-lg px-5 py-3 border border-orange/30 max-w-md">
            <p className="text-sm text-orange font-mono">{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Тип 5: Противоречивые сигналы
export function ContradictorySignals({ enabled, currentPrice }: { enabled: boolean; currentPrice?: number }) {
  const [showConflict, setShowConflict] = useState(false);
  const [conflictText, setConflictText] = useState('');

  useEffect(() => {
    if (!enabled) return;
    const conflicts = [
      'На странице — 45 000 ₽. В корзине — 52 000 ₽. В письме — 38 000 ₽. Где правда?',
      'Статус: «Оплачен». Потом: «Не оплачен». Потом: «В обработке».',
      'Поддержка №1: «Да». Поддержка №2: «Нет». Поддержка №3: «Не помню».',
      '«Бесплатно» — написано на баннере. «Оплата обязательна» — в форме.',
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.82) {
        setConflictText(conflicts[Math.floor(Math.random() * conflicts.length)]);
        setShowConflict(true);
        setTimeout(() => setShowConflict(false), 5000);
      }
    }, 35000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {showConflict && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-1/3 left-1/2 -translate-x-1/2 z-[9987] max-w-lg"
        >
          <div className="glass rounded-lg p-5 border border-purple/30 text-center">
            <div className="font-mono text-xs text-purple mb-2">ПРОТИВОРЕЧИЕ ОБНАРУЖЕНО:</div>
            <p className="text-sm text-gray">{conflictText}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Тип 6: Движущиеся ворота (moving goalposts)
export function MovingGoalposts({ enabled }: { enabled: boolean }) {
  const [goal, setGoal] = useState(100);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        const newP = prev + Math.random() * 15;
        if (newP >= goal * 0.9) {
          // Goalpost moves
          setGoal(g => g + 50);
          setShow(true);
          setTimeout(() => setShow(false), 3000);
          return 0;
        }
        return newP;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [enabled, goal]);

  return (
    <>
      {enabled && (
        <div className="fixed bottom-24 right-4 z-[9986] w-48">
          <div className="glass rounded-lg p-3">
            <div className="flex justify-between text-xs text-gray mb-1">
              <span>Бонус</span>
              <span>{Math.round(progress)}/{goal}%</span>
            </div>
            <div className="h-1 bg-graphite rounded-full overflow-hidden">
              <div 
                className="h-full bg-lime transition-all duration-1000"
                style={{ width: `${(progress / goal) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-40 right-4 z-[9986]"
          >
            <div className="glass rounded-lg px-4 py-2 border-l-2 border-orange/50">
              <p className="text-xs text-orange font-mono">Условия обновлены. Осталось совсем чуть-чуть!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Тип 7: Принудительная амнезия
export function ForcedAmnesia({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!enabled) return;
    const amnesia = [
      'Уведомление удалено. Сохранить было нельзя.',
      'История операций недоступна. Чеки не предусмотрены.',
      'Чат поддержки закрыт. Переписка удалена.',
      'Ваши данные не сохраняются. Это политика конфиденциальности.',
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.88) {
        setText(amnesia[Math.floor(Math.random() * amnesia.length)]);
        setShow(true);
        setTimeout(() => setShow(false), 4000);
      }
    }, 32000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          className="fixed top-1/2 right-4 z-[9985] max-w-xs"
        >
          <div className="glass rounded-lg p-4 border-l-2 border-red/50">
            <div className="font-mono text-xs text-red mb-1">АМНЕЗИЯ:</div>
            <p className="text-sm text-gray">{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Тип 8: Изоляция
export function Isolation({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        setShow(true);
        setTimeout(() => setShow(false), 5000);
      }
    }, 40000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-1/4 left-4 z-[9984] max-w-xs"
        >
          <div className="glass rounded-lg p-4 border-l-2 border-purple/50">
            <div className="font-mono text-xs text-purple mb-1">ИЗОЛЯЦИЯ:</div>
            <p className="text-sm text-gray">
              «Доверьтесь нам. Другие источники вас обманут. Только мы знаем правду.»
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Тип 9: Тривиализация
export function Trivialization({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!enabled) return;
    const trivial = [
      'Это мелочь, не стоит внимания.',
      'Все так делают. Это нормально.',
      'Вы слишком остро реагируете.',
      'Это техническая особенность, забудьте.',
      'Не преувеличивайте. Ничего страшного.',
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setText(trivial[Math.floor(Math.random() * trivial.length)]);
        setShow(true);
        setTimeout(() => setShow(false), 3500);
      }
    }, 27000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.7, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-2/3 left-1/2 -translate-x-1/2 z-[9983]"
        >
          <div className="font-mono text-sm text-gray/60 italic">
            {text}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Тип 10: Love bombing
export function LoveBombing({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!enabled) return;
    const love = [
      'Вы особенный пользователь! Только для вас — персональное предложение.',
      'Мы так рады, что вы с нами! Вот скидка 99% (действует для всех).',
      'Вы наш любимый клиент! Никому не говорите об этом.',
      'Только вы получили это предложение. Оно уникально (как и все остальные).',
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.87) {
        setText(love[Math.floor(Math.random() * love.length)]);
        setShow(true);
        setTimeout(() => setShow(false), 4000);
      }
    }, 33000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[9982] max-w-md"
        >
          <div className="glass rounded-lg p-4 border border-lime/30 text-center">
            <div className="text-2xl mb-2">💖</div>
            <p className="text-sm text-lime">{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Тип 11: Перегрузка
export function Overload({ enabled }: { enabled: boolean }) {
  const [popups, setPopups] = useState<{ id: number; text: string }[]>([]);

  useEffect(() => {
    if (!enabled) return;
    const messages = [
      'Подтвердите действие',
      'Продолжите, пожалуйста',
      'Останьтесь с нами!',
      'Вы уверены?',
      'Не уходите!',
      'Подтвердите подписку',
      'Согласитесь с условиями',
      'Продлите сессию',
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && popups.length < 4) {
        const id = Date.now();
        setPopups(prev => [...prev, { id, text: messages[Math.floor(Math.random() * messages.length)] }]);
        setTimeout(() => setPopups(prev => prev.filter(p => p.id !== id)), 3000);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [enabled, popups.length]);

  return (
    <>
      {popups.map((popup, i) => (
        <motion.div
          key={popup.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed z-[9981] glass rounded-lg p-3 border border-purple/20"
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
        >
          <p className="text-xs text-gray">{popup.text}</p>
          <button className="text-xs text-purple mt-1 hover:text-lime">OK</button>
        </motion.div>
      ))}
    </>
  );
}

// Тип 12: Ложная срочность
export function FalseUrgency({ enabled }: { enabled: boolean }) {
  const [time, setTime] = useState(300);
  const [show, setShow] = useState(false);
  const [resetCount, setResetCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          setResetCount(c => c + 1);
          return 300 + Math.floor(Math.random() * 300);
        }
        return prev - 1;
      });
    }, 1000);
    setShow(true);
    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled || !show) return null;

  const mins = Math.floor(time / 60);
  const secs = time % 60;

  return (
    <div className="fixed top-32 right-4 z-[9980]">
      <div className="glass rounded-lg p-3 border border-red/30">
        <div className="font-mono text-xs text-red mb-1">⏰ ОСТАЛОСЬ:</div>
        <div className="font-mono text-lg text-red font-bold">
          {mins}:{secs.toString().padStart(2, '0')}
        </div>
        {resetCount > 0 && (
          <div className="font-mono text-[10px] text-gray/50 mt-1">
            таймер #{resetCount + 1}
          </div>
        )}
      </div>
    </div>
  );
}

// Тип 13: Фейковое социальное доказательство
export function FakeSocialProof({ enabled }: { enabled: boolean }) {
  const [notifications, setNotifications] = useState<{ id: number; text: string }[]>([]);

  useEffect(() => {
    if (!enabled) return;
    const names = ['Иван', 'Мария', 'Алексей', 'Елена', 'Дмитрий', 'Ольга', 'Сергей', 'Анна'];
    const actions = ['только что купил', 'оформил подписку', 'прошёл калибровку', 'оставил отзыв'];
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const id = Date.now();
        const name = names[Math.floor(Math.random() * names.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        setNotifications(prev => [...prev.slice(-2), { id, text: `${name} ${action}` }]);
        setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <>
      {notifications.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed z-[9979] glass rounded-lg px-3 py-2 border border-lime/20"
          style={{ bottom: `${80 + i * 60}px`, right: '16px' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="text-xs text-gray">{n.text}</span>
          </div>
        </motion.div>
      ))}
    </>
  );
}

// Тип 14: Технический газлайтинг
export function TechnicalGaslighting({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!enabled) return;
    const tech = [
      'Ошибка 500. Попробуйте позже. (Ошибка повторяется уже 3-й раз)',
      'Действие выполнено. (На самом деле — нет)',
      'Двойное списание не отображается. Это нормально.',
      'Вы сами сменили пароль. (Это сделали мы)',
      'Сервер недоступен. Попробуйте ещё раз. (И ещё. И ещё.)',
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.88) {
        setText(tech[Math.floor(Math.random() * tech.length)]);
        setShow(true);
        setTimeout(() => setShow(false), 4000);
      }
    }, 35000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9978] max-w-sm"
        >
          <div className="glass rounded-lg p-5 border border-red/30 text-center">
            <div className="font-mono text-xs text-red mb-2">ТЕХНИЧЕСКАЯ ОШИБКА:</div>
            <p className="text-sm text-gray">{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Тип 15: Газлайтинг в поддержке
export function SupportGaslighting({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!enabled) return;
    const support = [
      'Оператор: «Вы не обращались. У нас нет записи».',
      'Оператор: «Предоставьте скриншот». (Скриншоты не принимаются)',
      'Оператор №1 → №2 → №3. Каждый говорит разное.',
      '«Ваш вопрос уже решён». (Без решения)',
      'Чат закрыт автоматически. Ваш вопрос потерян.',
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const msg = support[Math.floor(Math.random() * support.length)];
        setMessages(prev => [...prev.slice(-1), msg]);
        setShow(true);
        setTimeout(() => {
          setShow(false);
          setMessages([]);
        }, 5000);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {show && messages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-40 left-4 z-[9977] max-w-sm"
        >
          <div className="glass rounded-lg p-4 border-l-2 border-purple/50">
            <div className="font-mono text-xs text-purple mb-2">ПОДДЕРЖКА:</div>
            {messages.map((msg, i) => (
              <p key={i} className="text-sm text-gray mb-1">{msg}</p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Тип 16: Скрытое управление согласием
export function HiddenConsent({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.88) {
        setShow(true);
        setTimeout(() => setShow(false), 5000);
      }
    }, 35000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-40 left-4 z-[9976] max-w-xs"
        >
          <div className="glass rounded-lg p-4 border-l-2 border-orange/50">
            <div className="font-mono text-xs text-orange mb-2">СОГЛАСИЕ:</div>
            <div className="space-y-2 text-xs text-gray">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="accent-lime" />
                <span>Согласен с условиями (предустановлено)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="accent-lime" />
                <span>Автопродление подписки</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="accent-lime" />
                <span>Получать «важные» уведомления</span>
              </label>
              <div className="text-[10px] text-gray/50 mt-2">
                Отписаться сложнее, чем подписаться. В 7 раз.
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Тип 17: Изменение интерфейса задним числом
export function InterfaceShift({ enabled }: { enabled: boolean }) {
  const [shifted, setShifted] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setShifted(true);
        setTimeout(() => setShifted(false), 3000);
      }
    }, 40000);
    return () => clearInterval(interval);
  }, [enabled]);

  if (!shifted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9975]"
    >
      <div className="glass rounded-lg px-4 py-2 border border-purple/30">
        <p className="text-xs text-gray font-mono">
          Интерфейс обновлён. Кнопки изменили смысл. Привыкайте.
        </p>
      </div>
    </motion.div>
  );
}

// Тип 18: Ложные тревожные уведомления
export function FalseAlerts({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!enabled) return;
    const alerts = [
      '⚠ Ваш аккаунт будет удалён через 24 часа.',
      '🔒 Подозрительный вход. Смените пароль немедленно.',
      '💳 Платёж не прошёл. (Деньги уже списаны)',
      '🆔 Вы должны подтвердить личность. Без оснований.',
      '🚨 Обнаружена угроза. Действуйте сейчас.',
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setText(alerts[Math.floor(Math.random() * alerts.length)]);
        setShow(true);
        setTimeout(() => setShow(false), 4000);
      }
    }, 25000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-1/3 right-4 z-[9974] max-w-xs"
        >
          <div className="glass rounded-lg p-4 border border-red/50 animate-pulse">
            <p className="text-sm text-red font-mono">{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Тип 19: Принуждение к зависимости
export function ForcedDependency({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!enabled) return;
    const deps = [
      '🎁 +10 баллов за ежедневный вход! Не пропустите streak!',
      '⚠ Если уйдёте — потеряете 847 бонусов и 12 дней прогресса.',
      '💸 Штраф за отмену подписки: 5000 ₽.',
      '📦 Экспорт данных недоступен. Ваши данные — наши данные.',
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.87) {
        setText(deps[Math.floor(Math.random() * deps.length)]);
        setShow(true);
        setTimeout(() => setShow(false), 4500);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-1/2 left-4 z-[9973] max-w-xs"
        >
          <div className="glass rounded-lg p-4 border-l-2 border-lime/50">
            <p className="text-sm text-gray">{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Тип 20: Смешение правды и лжи
export function TruthLieMix({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!enabled) return;
    const mixes = [
      'Мы работаем с 2015 года (правда). Наши методики одобрены Минздравом (ложь).',
      '87% клиентов довольны (правда). Остальные 13% просто не поняли (ложь).',
      'Это для вашей безопасности (правда). Поэтому мы собираем все ваши данные (ложь).',
      'Мы всегда так делали (ложь). Изменения — к лучшему (правда?).',
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.88) {
        setText(mixes[Math.floor(Math.random() * mixes.length)]);
        setShow(true);
        setTimeout(() => setShow(false), 5000);
      }
    }, 38000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-40 right-4 z-[9972] max-w-xs"
        >
          <div className="glass rounded-lg p-4 border-l-2 border-purple/50">
            <div className="font-mono text-xs text-purple mb-1">ПРАВДА / ЛОЖЬ:</div>
            <p className="text-sm text-gray">{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// ОБВИНЕНИЕ В ИНТЕРНЕТЕ (при потере соединения)
// ============================================================
export function InternetBlame({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (isOffline) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isOffline, enabled]);

  // Also simulate "connection lost" periodically for demo
  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.92) {
        setShow(true);
        setTimeout(() => setShow(false), 5000);
      }
    }, 45000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-[9999] bg-cosmic/90 backdrop-blur-sm"
        >
          <div className="glass rounded-xl p-8 max-w-md mx-4 text-center border border-red/30">
            <div className="text-4xl mb-4">📡</div>
            <h3 className="font-heading text-xl font-bold text-red mb-3">
              СОЕДИНЕНИЕ ПОТЕРЯНО
            </h3>
            <p className="text-gray text-sm mb-4">
              Вы опять не оплатили интернет? Или это мы виноваты?
            </p>
            <p className="text-gray/60 text-xs mb-6 font-mono">
              Проверьте подключение. Или не проверяйте. Результат один.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShow(false)}
                className="bg-red/20 border border-red/30 text-red px-4 py-2 rounded-full text-sm hover:bg-red/30 transition-colors"
              >
                Я оплатил. Честно.
              </button>
              <button
                onClick={() => setShow(false)}
                className="text-gray text-sm hover:text-white transition-colors"
              >
                Это не я
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
