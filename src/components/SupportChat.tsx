import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const supportResponses = [
  'Мы понимаем, насколько это неудобно и приносим свои извинения. Мы обязательно примем меры.',
  'Благодарим за обращение. Ваш запрос передан в соответствующий отдел. Ожидайте ответа в течение 24-48 рабочих дней.',
  'Мы ценим вашу обратную связь. К сожалению, в данный момент мы не можем предоставить дополнительную информацию по вашему вопросу.',
  'Спасибо за ваше терпение. Наша команда работает над решением этой проблемы. Приносим извинения за временные неудобства.',
  'Мы понимаем вашу обеспокоенность. Ваш случай находится на рассмотрении у наших специалистов. Мы свяжемся с вами в ближайшее время.',
  'Благодарим за понимание. Мы постоянно работаем над улучшением качества наших услуг. Ваше мнение очень важно для нас.',
  'Мы признательны за ваше обращение. К сожалению, данный вопрос требует дополнительного согласования с вышестоящим руководством.',
  'Спасибо за обращение. Мы зафиксировали вашу проблему и передали её в технический отдел. Ожидайте обновления статуса.',
];

const ratingOptions = [
  { value: 1, label: '😞 Очень плохо', color: 'text-red' },
  { value: 2, label: '😕 Плохо', color: 'text-orange' },
  { value: 3, label: '😐 Нормально', color: 'text-yellow' },
  { value: 4, label: '😊 Хорошо', color: 'text-lime' },
  { value: 5, label: '😍 Отлично', color: 'text-lime' },
];

export default function SupportChat({ isOpen, onClose }: SupportChatProps) {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [inputValue, setInputValue] = useState('');
  const [showRating, setShowRating] = useState(false);
  const [chatClosed, setChatClosed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Автоматическое приветствие
      setMessages([
        { text: 'Здравствуйте! Чем могу помочь?', isUser: false }
      ]);
      
      // Автоматическое закрытие через 60 секунд
      const timer = setTimeout(() => {
        setChatClosed(true);
        setShowRating(true);
      }, 60000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Добавляем сообщение пользователя
    setMessages(prev => [...prev, { text: inputValue, isUser: true }]);
    setInputValue('');

    // Автоматический ответ поддержки через 1-2 секунды
    setTimeout(() => {
      const randomResponse = supportResponses[Math.floor(Math.random() * supportResponses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
    }, 1000 + Math.random() * 1000);
  };

  const handleRating = (rating: number) => {
    setMessages(prev => [...prev, { text: `Вы оценили поддержку на ${rating} из 5`, isUser: true }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: rating >= 4 
          ? 'Спасибо за высокую оценку! Мы рады, что смогли помочь.' 
          : 'Благодарим за обратную связь. Мы обязательно учтём ваши замечания.', 
        isUser: false 
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
      className="fixed bottom-24 right-6 z-[9999] w-96 max-w-[calc(100vw-3rem)]"
    >
      <div className="bg-graphite border-2 border-purple/50 rounded-xl shadow-[0_0_40px_rgba(123,97,255,0.3)] overflow-hidden">
        {/* Header */}
        <div className="bg-purple/20 border-b border-purple/30 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple/30 flex items-center justify-center">
              <span className="text-xl">💬</span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-sm">Служба поддержки</h3>
              <p className="text-xs text-gray">Онлайн</p>
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
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.isUser
                      ? 'bg-lime/20 border border-lime/30 text-lime'
                      : 'bg-graphite border border-purple/30 text-gray'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Rating */}
          {showRating && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-graphite border border-purple/30 rounded-lg p-4"
            >
              <p className="text-sm text-gray mb-3 text-center">
                Оцените работу поддержки:
              </p>
              <div className="flex gap-2 justify-center">
                {ratingOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleRating(option.value)}
                    className={`flex-1 py-2 px-3 rounded-lg border border-purple/30 hover:border-purple/50 transition-colors ${option.color}`}
                  >
                    <div className="text-lg">{option.label}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
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
                className="flex-1 bg-cosmic border border-purple/30 rounded-lg px-4 py-2 text-sm text-gray focus:outline-none focus:border-purple/50"
              />
              <button
                onClick={handleSend}
                className="bg-purple/20 border border-purple/50 text-purple px-4 py-2 rounded-lg hover:bg-purple/30 transition-colors"
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
