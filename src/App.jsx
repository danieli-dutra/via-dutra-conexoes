import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import { journey as j } from './content/journey.js';
import JourneyMap from './components/JourneyMap.jsx';
import Repertoire from './components/Repertoire.jsx';

function Label({ index }) {
  return <p className="chapter-label"><span aria-hidden="true" />{j.sections[index].short}</p>;
}

function Identity() {
  const reduce = useReducedMotion();
  const nameMotion = { initial: reduce ? false : { y: 18 }, animate: { y: 0 }, transition: { duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] } };
  return <section id={j.sections[0].id} className="identity chapter" aria-labelledby="identity-title">
    <div className="shell">
      <div className="opening-meta"><Label index={0} /><p>{j.context}</p></div>
      <div className="identity-grid">
        <div className="identity-copy">
          <h1 id="identity-title"><motion.span className="name-first" {...nameMotion}>{j.firstName}</motion.span><motion.span {...nameMotion}>{j.lastName}<i>.</i></motion.span></h1>
          <p className="statement">{j.introduction}</p><p className="identity-description">{j.identity}</p>
          <ul className="education">{j.education.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="identity-visual">
          <div className="portrait-wrap"><img src="/images/dani.webp" alt={j.portraitAlt} width="640" height="620" fetchPriority="high" /><span>{j.subtitle}</span></div>
          <JourneyMap />
        </div>
      </div>
      <Repertoire />
    </div>
  </section>;
}


export default function App() {
  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#conteudo">{j.skip}</a>
    <header className="site-header shell">
      <a className="brand" href="#quem-sou"><b aria-hidden="true">d<span>·</span></b><span>{j.subtitle}</span></a>
      <nav aria-label={j.navigation}><a href="#quem-sou" aria-current="location"><span aria-hidden="true" />{j.sections[0].short}</a></nav>
    </header>
    <main id="conteudo"><Identity /></main>
  </MotionConfig>;
}
