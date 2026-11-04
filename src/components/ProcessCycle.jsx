import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Search, Compass, PencilRuler, FlaskConical, Users, RefreshCw } from 'lucide-react';
import { journey } from '../content/journey.js';
import './ProcessCycle.css';

const icons = [Search, Compass, PencilRuler, FlaskConical, Users, RefreshCw];

export default function ProcessCycle({ onHighlight }) {
  const process = journey.process;
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const active = hovered ?? focused;
  function highlight(index, kind) {
    if (kind === 'hover') setHovered(index); else setFocused(index);
    onHighlight?.(index ?? (kind === 'hover' ? focused : hovered));
  }
  return <figure className="process" aria-labelledby="process-title">
    <figcaption><p className="eyebrow">{process.label}</p><h3 id="process-title">{process.premise[0]}<span>{process.premise[1]}</span></h3></figcaption>
    <motion.div className="cycle" initial="rest" whileInView="complete" viewport={{ once: true, amount: 0.3 }}>
      <svg className="cycle-arrows" viewBox="0 0 600 600" aria-hidden="true">
        <defs><marker id="cycle-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1 L8 5 L1 9" /></marker></defs>
        <circle className="cycle-track" cx="300" cy="300" r="214" />
        {[0, 60, 120, 180, 240, 300].map((angle, index) => <g key={angle} className="cycle-connection" data-active={active === index || undefined}>
          <path className="connection-base" transform={`rotate(${angle} 300 300)`} d="M 365 96 A214 214 0 0 1 444 142" markerEnd="url(#cycle-arrow)" />
          <motion.path className="cycle-segment" transform={`rotate(${angle} 300 300)`} d="M 365 96 A214 214 0 0 1 444 142"
            variants={{ rest: { pathLength: reduce ? 1 : 0 }, complete: { pathLength: 1 } }}
            transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : index * 0.53, ease: 'easeInOut' }} />
        </g>)}
      </svg>
      <div className="cycle-center"><Users aria-hidden="true" /><strong>{process.center}</strong><span>{process.collaboration}</span></div>
      <ol className="cycle-steps">{process.steps.map((step, index) => {
        const Icon = icons[index];
        return <li className={`cycle-step step-${index}`} key={step.title} tabIndex={0}
          aria-labelledby={`step-title-${index}`} aria-describedby={`step-text-${index}`}
          data-active={active === index || undefined}
          onMouseEnter={() => highlight(index, 'hover')} onMouseLeave={() => highlight(null, 'hover')}
          onFocus={() => highlight(index, 'focus')} onBlur={() => highlight(null, 'focus')}>
          <div className="step-content"><Icon aria-hidden="true" /><strong id={`step-title-${index}`}>{step.title}</strong><p id={`step-text-${index}`}>{step.text}</p></div>
        </li>;
      })}</ol>
    </motion.div>
    <p className="cycle-return"><RefreshCw size={18} aria-hidden="true" />{process.returnLabel}</p>
  </figure>;
}
