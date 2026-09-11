import { motion, AnimatePresence } from 'framer-motion';
import { type ReactNode } from 'react';

// ============================================================
// УНИВЕРСАЛЬНЫЙ КОМПОНЕНТ ГАЗЛАЙТИНГ-ОВЕРЛЕЯ
// ============================================================

export type OverlayVariant = 
  | 'info'      // Фиолетовая рамка, спокойный
  | 'warning'   // Оранжевая рамка, тревожный
  | 'danger'    // Красная рамка, агрессивный
  | 'success'   // Лаймовая рамка, ложно-позитивный
  | 'system'    // Серая рамка, технический
  | 'scary';    // Чёрный фон, страшный

interface GaslightOverlayProps {
  show: boolean;
  variant?: OverlayVariant;
  title?: string;
  message: string;
  icon?: ReactNode;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'top-center' | 'bottom-center';
  duration?: number;
  jitter?: boolean;
  pulse?: boolean;
  children?: ReactNode;
  onDismiss?: () => void;
  ariaLive?: 'polite' | 'assertive' | 'off';
}

const variantStyles: Record<OverlayVariant, {
  border: string;
  titleColor: string;
  bg: string;
  glow: string;
}> = {
  info: {
    border: 'border-purple/50',
    titleColor: 'text-purple',
    bg: 'bg-graphite/90',
    glow: 'shadow-[0_0_30px_rgba(123,97,255,0.3)]',
  },
  warning: {
    border: 'border-orange/50',
    titleColor: 'text-orange',
    bg: 'bg-graphite/90',
    glow: 'shadow-[0_0_30px_rgba(255,107,53,0.3)]',
  },
  danger: {
    border: 'border-red/60',
    titleColor: 'text-red',
    bg: 'bg-graphite/90',
    glow: 'shadow-[0_0_40px_rgba(255,59,59,0.4)]',
  },
  success: {
    border: 'border-lime/50',
    titleColor: 'text-lime',
    bg: 'bg-graphite/90',
    glow: 'shadow-[0_0_30px_rgba(200,255,0,0.3)]',
  },
  system: {
    border: 'border-gray/30',
    titleColor: 'text-gray',
    bg: 'bg-graphite/90',
    glow: 'shadow-[0_0_20px_rgba(167,169,184,0.2)]',
  },
  scary: {
    border: 'border-red/70',
    titleColor: 'text-red',
    bg: 'bg-black',
    glow: 'shadow-[0_0_80px_rgba(255,59,59,0.6)]',
  },
};

const positionClasses: Record<string, string> = {
  'top-left': 'top-24 left-4',
  'top-right': 'top-24 right-4',
  'bottom-left': 'bottom-24 left-4',
  'bottom-right': 'bottom-24 right-4',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'top-center': 'top-20 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-20 left-1/2 -translate-x-1/2',
};

export function GaslightOverlay({
  show,
  variant = 'info',
  title,
  message,
  icon,
  position = 'top-right',
  jitter = false,
  pulse = false,
  children,
  onDismiss,
  ariaLive = 'polite',
}: GaslightOverlayProps) {
  const styles = variantStyles[variant];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="alert"
          aria-live={ariaLive}
          aria-atomic="true"
          initial={{ opacity: 0, scale: 0.9, y: position.includes('top') ? -20 : 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`fixed z-[9990] ${positionClasses[position]} max-w-sm w-[90vw]`}
        >
          <div
            className={`
              relative rounded-xl p-4 backdrop-blur-xl
              ${styles.bg}
              border-2 ${styles.border}
              ${styles.glow}
              ${jitter ? 'animate-hard-jitter' : ''}
              ${pulse ? 'animate-pulse' : ''}
            `}
          >
            {/* Контент */}
            <div className="relative z-10">
              {icon && (
                <div className="flex justify-center mb-3">
                  <div className="text-2xl">{icon}</div>
                </div>
              )}
              
              {title && (
                <h3 className={`font-mono ${styles.titleColor} text-center text-sm font-bold mb-2 tracking-wider`}>
                  {title}
                </h3>
              )}
              
              <p className="text-white text-center text-sm font-heading leading-relaxed">
                {message}
              </p>
              
              {children && <div className="mt-3">{children}</div>}
              
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="mt-3 w-full text-xs text-gray/60 hover:text-white transition-colors"
                  aria-label="Закрыть уведомление"
                >
                  Закрыть
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// FOCUS TRAP для модалок
// ============================================================

interface FocusTrapProps {
  active: boolean;
  children: ReactNode;
}

export function FocusTrap({ active, children }: FocusTrapProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!active || e.key !== 'Tab') return;
    
    const focusableElements = e.currentTarget.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement?.focus();
        e.preventDefault();
      }
    }
  };

  return (
    <div onKeyDown={handleKeyDown} role="dialog" aria-modal="true">
      {children}
    </div>
  );
}
