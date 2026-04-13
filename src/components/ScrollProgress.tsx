import { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? scrollTop / max : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-white/5">
      <div
        className="h-full origin-left bg-gradient-to-r from-[#5eead4] via-[#818cf8] to-[#f97316]"
        style={{ transform: `scaleX(${progress})`, transition: 'transform 0.05s linear' }}
      />
    </div>
  );
};

export default ScrollProgress;
