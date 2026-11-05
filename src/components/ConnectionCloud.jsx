import { useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { connectionPhotos, connectionWords, connectionsCopy as copy } from '../content/connections.js';
import { getMemoryImages } from '../content/memoryImages.js';
import MemoryGallery from './MemoryGallery.jsx';
import AnimatedSignature from './AnimatedSignature.jsx';
import './ConnectionCloud.css';

function canRevealGallery(experience) {
  return Boolean(experience && (experience.revealWhenEmpty !== false || getMemoryImages(experience.images).length > 0));
}

export default function ConnectionCloud({ words = connectionWords, photos = connectionPhotos }) {
  const uid = useId();
  const panelId = `${uid}-photo`;
  const hintId = `${uid}-hint`;
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const [selected, setSelected] = useState(null);
  const buttons = useRef({});
  const closingRef = useRef(null);
  const reduce = useReducedMotion();
  const active = hovered ?? focused ?? selected;
  const word = words.find(item => item.id === active);
  const experience = word?.photo ? photos[word.photo] : null;
  const photo = canRevealGallery(experience) ? experience : null;
  const rows = [...new Set(words.map(item => item.row))];

  function dismiss(restoreFocus = false) {
    if (restoreFocus) buttons.current[active]?.focus({ preventScroll: true });
    setHovered(null);
    setFocused(null);
    setSelected(null);
  }

  return <section className="connections chapter" id="historias-que-se-conectam" aria-labelledby={`${uid}-title`}
    onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); dismiss(selected !== null); } }}>
    <div className="shell">
      <header className="connections__intro">
        <p className="chapter-label"><span aria-hidden="true" />{copy.eyebrow}</p>
        <h2 className="display-title" id={`${uid}-title`}>{copy.title}</h2>
        <p className="connections__description">{copy.introduction}</p>
        <p className="connections__hint" id={hintId}><span className="connections__desktop-hint">{copy.desktopHint}</span><span className="connections__touch-hint">{copy.touchHint}</span></p>
      </header>
      <div className="connection-cloud" aria-label="Palavras e experiências da minha trajetória">
        <div className="connection-cloud__words">
          {rows.map(row => <ul className={`connection-cloud__row connection-cloud__row--${row}`} key={row}>
            {words.filter(item => item.row === row).map(item => {
              const interactive = canRevealGallery(photos[item.photo]);
              const className = `connection-word connection-word--${item.level} connection-word--${item.tone}`;
              return <li key={item.id} data-word={item.id}>
                {interactive ? <button type="button" className={className} ref={node => { buttons.current[item.id] = node; }}
                  aria-controls={panelId} aria-expanded={active === item.id} aria-describedby={hintId}
                  data-active={active === item.id || undefined}
                  onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(item.id); }}
                  onPointerLeave={() => setHovered(null)}
                  onFocus={event => { if (event.target.matches(':focus-visible')) setFocused(item.id); }}
                  onBlur={() => setFocused(null)}
                  onClick={event => {
                    if (event.detail === 0 || window.matchMedia('(hover: none)').matches) {
                      setFocused(null);
                      setHovered(null);
                      setSelected(selected === item.id ? null : item.id);
                    }
                  }}>{item.label}</button>
                  : <span className={className}>{item.label}</span>}
              </li>;
            })}
          </ul>)}
        </div>
        <div className="connection-cloud__discovery" id={panelId}>
          <AnimatePresence mode="wait">
            {photo && <motion.div className="connection-cloud__reveal" key={word.photo}
              initial={{ opacity: 0, y: reduce ? 0 : 12, scale: reduce ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: reduce ? 0 : -6 }}
              transition={{ duration: reduce ? 0 : 0.22 }}>
              <MemoryGallery experience={photo} />
            </motion.div>}
          </AnimatePresence>
          {selected && <button type="button" className="connection-cloud__close" aria-label="Fechar fotografia" onClick={() => dismiss(true)}><X size={18} aria-hidden="true" /></button>}
          <p className="connections__sr-only" role="status">{photo ? `${photo.caption}${getMemoryImages(photo.images).length ? '' : '. Fotografias em breve.'}` : ''}</p>
        </div>
      </div>
      <div className="connections__closing" ref={closingRef}>
        <p className="connections__closing-lead">{copy.closing[0]}</p>
        <p className="connections__closing-intent">{copy.closing[1]}</p>
        <p className="connections__closing-emphasis">{copy.closing[2]}</p>
        <p className="connections__closing-thought">{copy.closing[3]}</p>
        <AnimatedSignature triggerRef={closingRef} />
      </div>
    </div>
  </section>;
}
