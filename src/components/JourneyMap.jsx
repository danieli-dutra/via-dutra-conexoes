import { motion, useReducedMotion } from 'motion/react';
import { journey as j } from '../content/journey.js';

export default function JourneyMap() {
  const reduce = useReducedMotion();
  return <figure className="map">
    <motion.svg viewBox="0 0 540 190" aria-hidden="true" initial="hidden" whileInView="visible" viewport={{once:true, amount:0.6}}>
      <path className="contour" d="M35 160 Q110 30 210 42 T495 125 M22 178 Q140 53 230 65 T510 143 M68 187 Q180 90 285 108 T489 164"/>
      <motion.path className="route" d="M85 140 C150 140 127 48 250 61 S340 172 453 133" variants={{hidden:{pathLength:reduce?1:0},visible:{pathLength:1}}} transition={{duration:reduce?0:1.3,ease:'easeInOut'}}/>
      {[{x:85,y:140,label:'RJ'},{x:250,y:61,label:'MG'},{x:453,y:133,label:'SP'}].map((p,i)=><motion.g key={p.label} variants={{hidden:{opacity:reduce?1:0},visible:{opacity:1}}} transition={{duration:reduce?0:0.3,delay:reduce?0:i*0.5}}><circle cx={p.x} cy={p.y} r="7"/><text x={p.x} y={p.y-24}>{p.label}</text></motion.g>)}
    </motion.svg>
    <ul className="places">{j.places.map(p=><li key={p.code}><strong>{p.name}</strong><span>{p.time}</span></li>)}</ul><figcaption>{j.mapCaption}</figcaption>
  </figure>;
}
