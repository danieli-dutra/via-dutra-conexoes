import { useEffect, useId, useRef, useState } from 'react';
import { motion, useAnimationControls, useInView, useReducedMotion } from 'motion/react';
import { brazilOutline, brazilRegions, brazilNodes, brazilConnections } from '../assets/maps/brazil.js';
import { brazilBorderMesh, brazilNeonContours } from '../assets/maps/brazil-contours.js';
import './BrazilConnections.css';

// Ordem não geográfica e durações desiguais: todas as regiões têm um patamar
// de protagonismo, sem disputar a mesma fronteira no pico de intensidade.
const spotlights = [
  { region: 'norte', duration: 4800 },
  { region: 'sudeste', duration: 5400 },
  { region: 'nordeste', duration: 4500 },
  { region: 'sul', duration: 5100 },
  { region: 'centro-oeste', duration: 5800 },
  { region: 'norte', duration: 5200 },
  { region: 'sul', duration: 4700 },
  { region: 'nordeste', duration: 5600 },
  { region: 'centro-oeste', duration: 4900 },
  { region: 'sudeste', duration: 5500 },
];

// A rede é uma metáfora: não contém dados de participantes nem do Censo.
export default function BrazilConnections({ caption, pauseLabel, resumeLabel, staticLabel }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  const [paused, setPaused] = useState(false);
  const [spotlight, setSpotlight] = useState({ index: 0, previous: null });
  const cueClock = useRef({ index: 0, remaining: spotlights[0].duration });
  const [pageVisible, setPageVisible] = useState(true);
  const id = useId();
  const clipId = `brazil-clip-${id}`;
  const glowId = `brazil-neon-${id}`;
  const running = inView && pageVisible && !paused && !reduce;

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    if (reduce) controls.set('formed');
    else if (running) controls.start('formed');
    else controls.stop();
    return () => controls.stop();
  }, [controls, reduce, running]);


  // Um update por ativação (4,5–5,8s), nunca por frame. O relógio conserva
  // o tempo restante ao pausar, ocultar a aba ou sair da viewport.
  useEffect(() => {
    if (cueClock.current.index !== spotlight.index) {
      cueClock.current = { index: spotlight.index, remaining: spotlights[spotlight.index].duration };
    }
    if (!running) return;
    const start = performance.now();
    let completed = false;
    const timer = setTimeout(() => {
      completed = true;
      setSpotlight(current => ({ index: (current.index + 1) % spotlights.length, previous: current.index }));
    }, cueClock.current.remaining);
    return () => {
      clearTimeout(timer);
      if (!completed) cueClock.current.remaining = Math.max(0, cueClock.current.remaining - (performance.now() - start));
    };
  }, [running, spotlight.index]);

  const activeCue = spotlights[spotlight.index];
  const activeRegion = brazilRegions.find(region => region.key === activeCue.region);
  const previousRegion = spotlight.previous === null ? null : brazilRegions.find(region => region.key === spotlights[spotlight.previous].region);

  return <figure ref={ref} className="brazil-connections" data-running={running} data-reduced={!!reduce} data-active-region={activeCue.region} data-cue={spotlight.index}>
    <svg viewBox="0 0 420 420" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clipId}><path d={brazilOutline} clipRule="evenodd" /></clipPath>
        <filter id={glowId} x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
      </defs>
      <path className="brazil-border-base" d={brazilBorderMesh} />
      <g className="brazil-regions">
        {brazilNeonContours.map(region => <g key={region.key} className="brazil-region brazil-region-color" data-region={region.key}
          style={{ '--region-period': `${region.period}s`, '--region-phase': `${region.phase}s` }}>
          <path className="brazil-region-halo" d={region.d} filter={`url(#${glowId})`} />
          <path className="brazil-region-core" d={region.d} />
        </g>)}
      </g>
      <g clipPath={`url(#${clipId})`}>
        <g className="brazil-flow">{brazilConnections.map((connection, index) => <g key={connection.id}>
          <path className="brazil-connection-base" d={connection.d} />
          <motion.path className="brazil-connection" d={connection.d} initial={reduce ? false : { pathLength: 0 }} animate={controls}
            variants={{ formed: { pathLength: 1 } }} transition={{ duration: reduce ? 0 : 1.3, delay: reduce ? 0 : 0.35 + index * 0.19, ease: 'easeInOut' }} />
          <path className="brazil-traveler" d={connection.d} pathLength="1" style={{ '--journey-duration': `${connection.duration}s`, '--journey-phase': `${connection.phase}s`, '--trail-size': connection.length }} />
        </g>)}
        </g>
        {brazilNodes.map((node, index) => <motion.g key={node.id} data-region={node.region} initial={reduce ? false : { opacity: 0.2 }} animate={controls}
          variants={{ formed: { opacity: 1 } }} transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.2 + index * 0.23 }}>
          <circle className="brazil-node-halo" cx={node.x} cy={node.y} r="7.2" style={{ '--node-delay': `${index * 0.8}s` }} />
          <circle className="brazil-node" cx={node.x} cy={node.y} r="4.5" />
        </motion.g>)}
      </g>

      {/* Última camada vetorial: o perímetro completo tem prioridade real no SVG. */}
      {!reduce && <g className="brazil-spotlights" pointerEvents="none">
        {previousRegion && <g key={`echo-${spotlight.previous}`} className="brazil-region-echo brazil-region-color" data-region={previousRegion.key}>
          <path className="brazil-region-core" d={previousRegion.d} />
        </g>}
        <g key={spotlight.index} className="brazil-region-spotlight brazil-region-color" data-region={activeRegion.key}
          style={{ '--spotlight-duration': `${activeCue.duration}ms` }}>
          <path className="brazil-active-isolation" d={activeRegion.d} />
          <path className="brazil-region-halo" d={activeRegion.d} filter={`url(#${glowId})`} />
          <path className="brazil-region-core" d={activeRegion.d} />
        </g>
      </g>}
    </svg>
    <div className="brazil-footer"><figcaption>{caption}</figcaption>
      <button type="button" onClick={() => setPaused(value => !value)} disabled={!!reduce}>
        {reduce ? staticLabel : paused ? resumeLabel : pauseLabel}
      </button>
    </div>
  </figure>;
}
