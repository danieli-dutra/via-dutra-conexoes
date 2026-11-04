import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';

export default function D2BGallery({ images }) {
  const ref = useRef(null);
  const visible = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [focused, setFocused] = useState(false);
  const running = visible && !reduce && !paused && !hidden && !focused;
  useEffect(() => {
    const update = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setIndex(i => (i + 1) % images.length), 5500);
    return () => clearTimeout(timer);
  }, [running, index, images.length]);
  useEffect(() => {
    if (!visible || reduce) return;
    const next = new Image();
    next.src = images[(index + 1) % images.length].src;
  }, [visible, reduce, index, images]);
  const move = direction => { setPaused(true); setIndex(i => (i + direction + images.length) % images.length); };
  return <figure ref={ref} className="d2b-gallery" aria-label="Galeria D2B Gourmet" aria-roledescription="carrossel"
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="d2b-gallery-stage" aria-live="off">
      <AnimatePresence initial={false} mode="wait">
        <motion.img key={images[index].src} src={images[index].src} alt={images[index].alt}
          width={images[index].width} height={images[index].height} loading="lazy" decoding="async"
          initial={{ opacity: reduce ? 1 : 0 }} animate={{ opacity: 1 }} exit={{ opacity: reduce ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.22 }} />
      </AnimatePresence>
    </div>
    <figcaption>
      <div aria-live={running ? 'off' : 'polite'} aria-atomic="true"><span className="gallery-position">{index + 1} / {images.length}</span><span>{images[index].caption}</span></div>
      <div className="gallery-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Imagem anterior"><ArrowLeft size={18} aria-hidden="true" /></button>
        {!reduce && <button type="button" onClick={() => setPaused(p => !p)} aria-label={paused ? 'Retomar galeria' : 'Pausar galeria'}>{paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}</button>}
        <button type="button" onClick={() => move(1)} aria-label="Próxima imagem"><ArrowRight size={18} aria-hidden="true" /></button>
      </div>
    </figcaption>
  </figure>;
}
