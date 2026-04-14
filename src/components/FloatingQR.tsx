import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QR_URL = 'https://angulos-de-euler.vercel.app/';

// QR image via QR Server API — white dots on dark background
const QR_IMAGE_SRC =
  'https://api.qrserver.com/v1/create-qr-code/' +
  '?size=200x200' +
  '&data=' + encodeURIComponent(QR_URL) +
  '&color=ffffff' +
  '&bgcolor=0b1220' +
  '&qzone=1' +
  '&format=svg';

const FloatingQR = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="qr-panel"
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/12 p-4 flex flex-col items-center gap-3
                       shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            style={{
              background: 'rgba(11,18,32,0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Label */}
            <p className="text-[10px] uppercase tracking-[0.26em] text-accent/80 font-semibold">
              Abrir en tu celular
            </p>

            {/* QR image */}
            <div
              className="rounded-xl overflow-hidden border border-white/10"
              style={{ width: 160, height: 160, background: '#0b1220' }}
            >
              <img
                src={QR_IMAGE_SRC}
                alt="QR para abrir angulos-de-euler.vercel.app"
                width={160}
                height={160}
                style={{ display: 'block', imageRendering: 'pixelated' }}
              />
            </div>

            {/* URL caption */}
            <p
              className="text-[10px] text-slate-500 font-medium tracking-wide truncate max-w-[160px]"
              title={QR_URL}
            >
              angulos-de-euler.vercel.app
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? 'Cerrar QR' : 'Escanea para abrir en celular'}
        className="flex items-center gap-2 rounded-2xl border border-white/15 px-4 py-2.5
                   text-xs font-semibold text-white shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                   transition-colors"
        style={{
          background: open
            ? 'rgba(94,234,212,0.15)'
            : 'rgba(15,23,42,0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: open ? 'rgba(94,234,212,0.35)' : 'rgba(255,255,255,0.12)',
          color: open ? '#5eead4' : '#e2e8f0',
        }}
      >
        {/* QR icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 14h2v2h-2z" />
          <path d="M18 14h3" />
          <path d="M14 18h2" />
          <path d="M18 18h3" />
          <path d="M14 21v-3" />
          <path d="M21 18v3" />
        </svg>
        {open ? 'Cerrar' : 'Escanear QR'}
      </motion.button>
    </div>
  );
};

export default FloatingQR;
