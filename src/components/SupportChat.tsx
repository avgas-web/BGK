import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  isUser: boolean;
  operator?: string;
  isSystem?: boolean;
}

// 20 дурацких старославянских имён операторов
const operatorNames = [
  'Мстислав', 'Ярополк', 'Святозар', 'Ратибор', 'Всеслав',
  'Доброслав', 'Любомир', 'Тихослав', 'Бронислав', 'Владислав',
  'Ростислав', 'Болеслав', 'Казимир', 'Мирослав', 'Изяслав',
  'Судислав', 'Светозар', 'Пересвет', 'Златослав', 'Яросвет'
];

// 20 корпоративных отписок
const supportResponses = [
  'Мы понимаем, насколько это неудобно и приносим свои извинения. Мы обязательно примем меры.',
  'Благодарим за обращение. Ваш запрос передан в соответствующий отдел. Ожидайте ответа в течение 24-48 рабочих дней.',
  'Мы ценим вашу обратную связь. К сожалению, в данный момент мы не можем предоставить дополнительную информацию по вашему вопросу.',
  'Спасибо за ваше терпение. Наша команда работает над решением этой проблемы. Приносим извинения за временные неудобства.',
  'Мы понимаем вашу обеспокоенность. Ваш случай находится на рассмотрении у наших специалистов. Мы свяжемся с вами в ближайшее время.',
  'Благодарим за понимание. Мы постоянно работаем над улучшением качества наших услуг. Ваше мнение очень важно для нас.',
  'Мы признательны за ваше обращение. К сожалению, данный вопрос требует дополнительного согласования с вышестоящим руководством.',
  'Спасибо за обращение. Мы зафиксировали вашу проблему и передали её в технический отдел. Ожидайте обновления статуса.',
  'Ваш запрос зарегистрирован под номером #' + Math.floor(Math.random() * 900000 + 100000) + '. Среднее время обработки составляет 5-7 рабочих дней.',
  'Мы внимательно ознакомились с вашим обращением. К сожалению, текущая загрузка не позволяет нам оперативно решить ваш вопрос.',
  'Благодарим за сигнал. Информация передана в аналитический отдел для дальнейшей проработки. Ожидайте обратную связь.',
  'Ваше обращение находится в приоритетной очереди обработки. Просим проявить терпение — мы делаем всё возможное.',
  'Спасибо, что поделились своей проблемой. Мы передали её на рассмотрение экспертного совета. Результат будет опубликован в квартальном отчёте.',
  'Мы искренне сожалеем о возникших неудобствах. Ваш случай передан старшему менеджеру для персонального разбора.',
  'Ваше мнение очень важно для нас. Мы добавили его в базу знаний для дальнейшего анализа и улучшения сервисов.',
  'Благодарим за обращение. Ваш вопрос находится на этапе эскалации. Ожидайте решения в течение 10-15 рабочих дней.',
  'Мы понимаем ваше недовольство и приносим извинения. Ситуация находится на особом контроле у руководства.',
  'Спасибо за терпение. Мы направили ваш запрос в профильный департамент. Дополнительная информация будет предоставлена позже.',
  'Ваше обращение рассмотрено. К сожалению, в рамках текущих регламентов мы не можем предложить иное решение, кроме как ожидать.',
  'Мы ценим вашу лояльность. Ваш запрос передан в отдел по работе с клиентами высшего приоритета. Ожидайте связи.'
];

// Сообщения о передаче жалобы
const transferMessages = [
  'Передаю ваш вопрос более компетентному коллеге...',
  'Ваш случай требует экспертизы другого специалиста. Передаю...',
  'Мой текущий уровень доступа не позволяет решить ваш вопрос. Передаю старшему оператору...',
  'Для решения вашей проблемы требуется консультация другого отдела. Передаю...',
  'Ваш вопрос выходит за рамки моих полномочий. Передаю руководителю смены...',
  'Для более качественной помощи передаю ваш запрос профильному специалисту...'
];

const ratingOptions = [
  { value: 1, label: '😞 Очень плохо', color: 'text-red' },
  { value: 2, label: '😕 Плохо', color: 'text-orange' },
  { value: 3, label: '😐 Нормально', color: 'text-yellow' },
  { value: 4, label: '😊 Хорошо', color: 'text-lime' },
  { value: 5, label: '😍 Отлично', color: 'text-lime' },
];

function getRandomOperator(exclude?: string): string {
  let name = operatorNames[Math.floor(Math.random() * operatorNames.length)];
  // Гарантируем, что новый оператор отличается от текущего
  if (exclude && operatorNames.length > 1) {
    while (name === exclude) {
      name = operatorNames[Math.floor(Math.random() * operatorNames.length)];
    }
  }
  return name;
}

export default function SupportChat({ isOpen, onClose }: SupportChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showRating, setShowRating] = useState(false);
  const [chatClosed, setChatClosed] = useState(false);
  const [currentOperator, setCurrentOperator] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Выбираем случайного оператора
      const operator = getRandomOperator();
      setCurrentOperator(operator);
      
      // Автоматическое приветствие
      setMessages([
        { 
          text: `Здравствуйте! Меня зовут ${operator}. Чем могу помочь?`, 
          isUser: false,
          operator 
        }
      ]);
      
      // Автоматическое закрытие через 60 секунд
      const timer = setTimeout(() => {
        setChatClosed(true);
        setShowRating(true);
      }, 60000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Автоскролл к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue;
    // Добавляем сообщение пользователя
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInputValue('');
    setIsTyping(true);

    // Определяем: ответить или передать коллеге (30% шанс передачи)
    const shouldTransfer = Math.random() < 0.3;

    if (shouldTransfer) {
      // Сначала сообщение о передаче
      setTimeout(() => {
        const transferMsg = transferMessages[Math.floor(Math.random() * transferMessages.length)];
        setMessages(prev => [...prev, { 
          text: transferMsg, 
          isUser: false,
          operator: currentOperator
        }]);
        
        // Через 2 секунды выбираем нового оператора
        setTimeout(() => {
          const newOperator = getRandomOperator(currentOperator);
          setCurrentOperator(newOperator);
          
          // Системное сообщение о смене оператора
          setMessages(prev => [...prev, { 
            text: `⚙️ Вас соединяют с оператором ${newOperator}...`, 
            isUser: false,
            isSystem: true
          }]);
          
          // Новый оператор приветствует
          setTimeout(() => {
            setMessages(prev => [...prev, { 
              text: `Добрый день! Меня зовут ${newOperator}. Я ознакомился с вашим обращением.`, 
              isUser: false,
              operator: newOperator
            }]);
            
            // И отвечает отпиской
            setTimeout(() => {
              const randomResponse = supportResponses[Math.floor(Math.random() * supportResponses.length)];
              setMessages(prev => [...prev, { 
                text: randomResponse, 
                isUser: false,
                operator: newOperator
              }]);
              setIsTyping(false);
            }, 1500);
          }, 1500);
        }, 2000);
      }, 1000);
    } else {
      // Просто отвечаем отпиской
      setTimeout(() => {
        const randomResponse = supportResponses[Math.floor(Math.random() * supportResponses.length)];
        setMessages(prev => [...prev, { 
          text: randomResponse, 
          isUser: false,
          operator: currentOperator
        }]);
        setIsTyping(false);
      }, 1500 + Math.random() * 1500);
    }
  };

  const handleRating = (rating: number) => {
    setMessages(prev => [...prev, { text: `Вы оценили работу оператора ${currentOperator} на ${rating} из 5`, isUser: true }]);
    
    setTimeout(() => {
      const finalResponse = rating >= 4 
        ? `Спасибо за высокую оценку! ${currentOperator} рад, что смог помочь. Хорошего дня!` 
        : `Благодарим за обратную связь. Мы обязательно учтём ваши замечания в работе оператора ${currentOperator}.`;
      
      setMessages(prev => [...prev, { 
        text: finalResponse, 
        isUser: false,
        operator: currentOperator
      }]);
      
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="fixed bottom-24 left-6 z-[9999] w-96 max-w-[calc(100vw-3rem)]"
    >
      <div className="bg-graphite border-2 border-purple/50 rounded-xl shadow-[0_0_40px_rgba(123,97,255,0.3)] overflow-hidden">
        {/* Header */}
        <div className="bg-purple/20 border-b border-purple/30 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple/30 flex items-center justify-center relative">
              <span className="text-xl">💬</span>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-lime rounded-full border-2 border-graphite" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-sm">Служба поддержки</h3>
              <p className="text-xs text-gray">
                {currentOperator && (
                  <span>Оператор: <span className="text-lime font-semibold">{currentOperator}</span></span>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray hover:text-white transition-colors"
            aria-label="Закрыть чат"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-3">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-2 ${
                    msg.isUser
                      ? 'bg-lime/20 border border-lime/30 text-lime'
                      : msg.isSystem
                      ? 'bg-graphite border border-gray/30 text-gray/70 italic text-xs'
                      : 'bg-graphite border border-purple/30 text-gray'
                  }`}
                >
                  {!msg.isUser && !msg.isSystem && msg.operator && (
                    <div className="text-xs text-purple font-semibold mb-1">
                      {msg.operator}
                    </div>
                  )}
                  <p className="text-sm">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Индикатор печати */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-graphite border border-purple/30 rounded-lg px-4 py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Rating */}
          {showRating && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-graphite border border-purple/30 rounded-lg p-4"
            >
              <p className="text-sm text-gray mb-3 text-center">
                Оцените работу оператора {currentOperator}:
              </p>
              <div className="flex gap-2 justify-center">
                {ratingOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleRating(option.value)}
                    className={`flex-1 py-2 px-2 rounded-lg border border-purple/30 hover:border-purple/50 transition-colors ${option.color}`}
                  >
                    <div className="text-sm">{option.label}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {!chatClosed && !showRating && (
          <div className="border-t border-purple/30 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Введите сообщение..."
                disabled={isTyping}
                className="flex-1 bg-cosmic border border-purple/30 rounded-lg px-4 py-2 text-sm text-gray focus:outline-none focus:border-purple/50 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !inputValue.trim()}
                className="bg-purple/20 border border-purple/50 text-purple px-4 py-2 rounded-lg hover:bg-purple/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ➤
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
