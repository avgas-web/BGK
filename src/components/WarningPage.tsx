import { useState } from 'react';
import { motion } from 'framer-motion';
import BGCLogo3D from './BGCLogo3D';

interface WarningPageProps {
  onAccept: () => void;
}

export default function WarningPage({ onAccept }: WarningPageProps) {
  const [checked, setChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  return (
    <div className="min-h-screen bg-cosmic text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* 3D Логотип */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-24"
        >
          <BGCLogo3D />
        </motion.div>

        {/* Предупреждение */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-8 border border-orange/30"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-orange/20 border-2 border-orange/50 flex items-center justify-center">
              <span className="text-orange text-3xl">⚠</span>
            </div>
          </div>

          <h1 className="font-heading text-2xl md:text-3xl font-bold text-center mb-4 text-orange">
            ПРЕДУПРЕЖДЕНИЕ
          </h1>

          <div className="space-y-4 text-gray mb-6">
            <p className="text-sm leading-relaxed">
              Вы собираетесь войти на сайт <span className="text-lime font-bold">«Базз Газлайтер Клаб»</span> — 
              иммерсивную платформу, которая использует художественные приёмы газлайтинга в образовательных целях.
            </p>
            
            <div className="bg-graphite/50 rounded-lg p-4 border-l-2 border-orange/50">
              <p className="text-sm font-bold text-orange mb-2">Сайт может вызывать:</p>
              <ul className="space-y-1.5 text-sm text-gray">
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-0.5">•</span>
                  <span>Лёгкую тревогу и дезориентацию</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-0.5">•</span>
                  <span>Сомнение в собственных воспоминаниях</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-0.5">•</span>
                  <span>Ощущение потери контроля над интерфейсом</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange mt-0.5">•</span>
                  <span>Визуальные эффекты, имитирующие сбои</span>
                </li>
              </ul>
            </div>

            <div className="bg-graphite/50 rounded-lg p-4 border-l-2 border-lime/50">
              <p className="text-sm font-bold text-lime mb-2">Важно знать:</p>
              <ul className="space-y-1.5 text-sm text-gray">
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-0.5">✓</span>
                  <span>Это художественная демонстрация, а не реальная угроза</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-0.5">✓</span>
                  <span>Вы в безопасности. Сайт не собирает данные и не блокирует выход</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-0.5">✓</span>
                  <span>В любой момент можно отключить эффекты стоп-словом «Бесконечность»</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime mt-0.5">✓</span>
                  <span>Доступен «Режим ясности» — спокойная версия без эффектов</span>
                </li>
              </ul>
            </div>

            {/* Age Gate */}
            <div className="bg-red/10 rounded-lg p-4 border-l-2 border-red/50">
              <p className="text-sm font-bold text-red mb-2">⚠️ Возрастное ограничение:</p>
              <p className="text-sm text-gray mb-2">
                Этот сайт содержит элементы психологического воздействия и предназначен только для лиц <strong className="text-white">старше 18 лет</strong>.
              </p>
              <p className="text-xs text-gray/80">
                Если вам меньше 18 лет, пожалуйста, покиньте сайт.
              </p>
            </div>

            <p className="text-xs text-gray/60 italic">
              Не рекомендуется людям с повышенной тревожностью, эпилепсией, 
              чувствительностью к визуальным эффектам или психическими расстройствами.
            </p>
          </div>

          <label className="flex items-start gap-3 mb-4 cursor-pointer group">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-1 w-5 h-5 rounded accent-lime cursor-pointer"
            />
            <span className="text-sm text-gray group-hover:text-white transition-colors">
              Я понимаю, что сайт содержит элементы газлайтинга в художественных целях. 
              Я предупреждён о возможных эффектах и добровольно продолжаю. 
              Мне больше 18 лет.
            </span>
          </label>

          <label className="flex items-start gap-3 mb-6 cursor-pointer group">
            <input
              type="checkbox"
              checked={privacyChecked}
              onChange={(e) => setPrivacyChecked(e.target.checked)}
              className="mt-1 w-5 h-5 rounded accent-lime cursor-pointer"
            />
            <span className="text-sm text-gray group-hover:text-white transition-colors">
              Я ознакомлен(а) с <span className="text-lime font-semibold">Политикой конфиденциальности</span> и даю согласие на обработку моих данных в соответствии с ней.
            </span>
          </label>

          <button
            onClick={onAccept}
            disabled={!checked || !privacyChecked}
            className={`w-full py-4 rounded-full font-heading font-bold text-lg transition-all ${
              checked && privacyChecked
                ? 'bg-lime text-cosmic hover:animate-pulse-glow cursor-pointer'
                : 'bg-graphite text-gray/40 cursor-not-allowed'
            }`}
          >
            {checked && privacyChecked ? 'Я согласен. Войти на сайт' : 'Подтвердите оба согласия выше'}
          </button>

          <div className="mt-6 text-center">
            <a
              href="https://www.google.com"
              className="text-xs text-gray/50 hover:text-gray transition-colors"
            >
              Я передумал. Уйти с сайта →
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center text-xs text-gray/40 font-mono"
        >
          <p>ООО «Институт Информационной Гигиены»</p>
          <p className="mt-1">avgas85@mail.ru</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-center text-[10px] text-gray/30 leading-relaxed max-w-xl mx-auto"
        >
          <p>
            Информация, представленная на данном сайте, носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями статьи 437 ГК РФ. Отправляя сведения через любую электронную форму на этом сайте, вы даете согласие на обработку ваших персональных данных.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
