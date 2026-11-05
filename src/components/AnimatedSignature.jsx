import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import './AnimatedSignature.css';

// Traços centrais autorais, na ordem de escrita; não são contornos de uma fonte.
const capitalD = 'M42 133 C50 113 60 72 66 51 C69 42 72 40 75 45 C79 52 67 88 55 113 C48 129 38 143 28 141 C16 138 25 115 42 100 C70 73 109 53 128 66 C153 85 125 126 94 135 C80 140 63 140 57 134 C54 131 59 126 66 124';
const penStrokes = [
  { word: 'danieli', duration: .5, d: capitalD },
  { word: 'danieli', duration: .23, d: 'M136 119 C129 105 113 116 111 129 C108 144 125 139 135 121 C140 111 140 108 139 116 L134 133 C132 146 146 133 154 124' },
  { word: 'danieli', duration: .24, d: 'M154 124 C161 108 163 110 157 125 L153 137 C164 118 179 104 180 116 C181 123 171 139 178 138 C183 137 189 130 195 124' },
  { word: 'danieli', duration: .12, d: 'M195 124 L190 137 C195 142 206 130 213 123' },
  { word: 'danieli', duration: .04, d: 'M198 108 L199 106' },
  { word: 'danieli', duration: .18, d: 'M213 123 C237 111 229 107 218 115 C207 122 209 141 222 138 C230 136 239 128 246 121' },
  { word: 'danieli', duration: .32, d: 'M246 121 C261 101 283 65 274 62 C263 57 241 111 240 131 C239 149 255 134 263 124' },
  { word: 'danieli', duration: .12, d: 'M263 124 L258 137 C263 144 277 128 286 122' },
  { word: 'danieli', duration: .04, d: 'M267 108 L268 106' },
  { word: 'dutra', duration: .5, d: capitalD, transform: 'translate(318 0)' },
  { word: 'dutra', duration: .26, d: 'M452 116 C447 128 440 141 449 139 C457 137 467 123 472 114 C467 126 463 142 471 138 C478 135 483 127 488 121' },
  { word: 'dutra', duration: .24, d: 'M488 121 C500 99 513 76 512 79 C504 95 488 127 491 135 C494 143 508 131 516 123' },
  { word: 'dutra', duration: .09, d: 'M483 108 C495 105 509 105 520 101' },
  { word: 'dutra', duration: .22, d: 'M516 123 L511 137 C518 124 526 112 531 113 C536 115 526 123 532 124 C537 124 542 119 547 116' },
  // O floreio continua o último a, sem uma linha decorativa independente.
  { word: 'dutra', duration: .63, d: 'M568 119 C561 105 545 115 542 128 C538 143 554 140 565 122 C571 111 572 109 569 118 L565 133 C563 143 578 131 587 124 C604 113 633 115 626 129 C621 143 585 150 552 151 C526 152 510 148 516 143 C525 137 551 141 566 145' },
];

let elapsed = 0;
const scheduledStrokes = penStrokes.map((stroke, index) => {
  if (index === 9) elapsed += .07; // Pequena pausa da caneta entre os nomes.
  const scheduled = { ...stroke, delay: elapsed };
  elapsed += stroke.duration;
  return scheduled;
});

export default function AnimatedSignature({ triggerRef }) {
  const signatureRef = useRef(null);
  const visible = useInView(triggerRef || signatureRef, { once: true, amount: .18 });
  const [complete, setComplete] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => { if (preference.matches) setComplete(true); };
    preference.addEventListener('change', finish);
    return () => preference.removeEventListener('change', finish);
  }, []);

  return <div className="animated-signature" ref={signatureRef} data-state={complete ? 'complete' : visible ? 'drawing' : 'idle'}>
    <svg viewBox="0 0 680 190" width="680" height="190" role="img" aria-label="Danieli Dutra"
      onAnimationEnd={event => { if (event.target.dataset.signatureLast === 'true') setComplete(true); }}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {scheduledStrokes.map((stroke, index) => <path key={index}
          className={`animated-signature__stroke animated-signature__stroke--${stroke.word}`}
          data-signature-word={stroke.word} data-signature-last={index === scheduledStrokes.length - 1 || undefined}
          d={stroke.d} transform={stroke.transform} pathLength="1"
          style={{ '--signature-delay': `${stroke.delay.toFixed(3)}s`, '--signature-duration': `${stroke.duration}s` }} />)}
      </g>
    </svg>
  </div>;
}
