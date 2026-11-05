import { useEffect, useState } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { journey as j } from './content/journey.js';
import Reveal from './components/Reveal.jsx';
import JourneyMap from './components/JourneyMap.jsx';
import ProductVideo from './components/ProductVideo.jsx';
import ProcessCycle from './components/ProcessCycle.jsx';
import ConnectionCloud from './components/ConnectionCloud.jsx';
import Footer from './components/Footer.jsx';
import Repertoire from './components/Repertoire.jsx';
import D2BGallery from './components/D2BGallery.jsx';
import './components/Purpose.css';
import './components/Contribution.css';

function Label({ index }) {
  return <p className="chapter-label"><span aria-hidden="true" />{j.sections[index].short}</p>;
}

function Next({ index }) {
  return <a className="next" href={`#${j.sections[index].id}`}>
    <span>{j.next}</span><strong>{j.sections[index].short}</strong><ArrowUpRight aria-hidden="true" />
  </a>;
}

function Navigation() {
  const [active, setActive] = useState(j.sections[0].id);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const cursor = window.innerHeight * 0.22;
      let current = j.sections[0].id;
      for (const section of j.sections) {
        if (document.getElementById(section.id).getBoundingClientRect().top <= cursor) current = section.id;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return <nav aria-label={j.navigation}>{j.sections.map(section =>
    <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined}>
      <span aria-hidden="true" />{section.short}
    </a>
  )}</nav>;
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
      <div className="chapter-bottom"><p className="bridge">{j.transition}</p><Next index={1} /></div>
    </div>
  </section>;
}

function Purpose() {
  return <section id={j.sections[1].id} className="purpose chapter" aria-labelledby="purpose-title">
    <div className="shell">
      <Label index={1} />
      <h2 className="display-title" id="purpose-title">{j.sections[1].title}</h2>
      <article className="origin">
        <div className="origin-copy"><p className="eyebrow">{j.origin.label}</p><h3>{j.origin.name}</h3>
          {j.origin.paragraphs.map(text => <p key={text}>{text}</p>)}
          <a className="editorial-link" href={j.origin.manual} target="_blank" rel="noopener noreferrer">{j.origin.manualLabel}<ArrowUpRight size={19} aria-hidden="true" /></a>
        </div>
        <D2BGallery images={j.origin.gallery} />
      </article>
      <article className="current-product product-editorial">
        <div className="product-copy">
          <p className="eyebrow">{j.current.label}</p><h3><img className="product-logo" src="/images/junta-ai-logo.svg" alt={j.current.name} width="1200" height="400" loading="lazy" /></h3>
          <p className="product-premise">{j.current.premise}</p>
          {j.current.paragraphs.map(text => <p className="product-description" key={text}>{text}</p>)}
          <ul className="product-roles" aria-label="Áreas de atuação e colaboração">{j.current.roles.map(role => <li key={role}>{role}</li>)}</ul>
          <div className="product-philosophy"><h4>{j.current.philosophyTitle}</h4><p>{j.current.philosophy}</p></div>
        </div>
        <Reveal className="product-stage"><ProductVideo /></Reveal>
      </article>
      <div className="chapter-bottom purpose-ending"><p className="purpose-conclusion">{j.purposeConclusion[0]}<span>{j.purposeConclusion[1]}</span></p></div>
    </div>
  </section>;
}

function Contribution() {
  return <section id={j.sections[2].id} className="contribution chapter" aria-labelledby="contribution-title">
    <div className="shell">
      <Label index={2} /><h2 className="display-title" id="contribution-title">{j.sections[2].title}<em>{j.sections[2].emphasis}</em></h2>
      <div className="contribution-layout">
        <div className="perspectives">
          <p className="eyebrow">{j.evidenceLabel}</p>
          <p className="perspectives-premise">{j.perspectivesPremise[0]}<span>{j.perspectivesPremise[1]}</span></p>
          <svg className="knowledge-convergence" viewBox="0 0 520 126" role="img" aria-labelledby="knowledge-title">
            <title id="knowledge-title">Arte, branding e pessoas se conectam a dados, código e inteligência artificial.</title>
            <path d="M90 24 C210 24 280 102 414 102" />
            <path d="M110 63 C218 63 302 24 414 24" />
            <path d="M100 102 C220 102 286 63 414 63" />
            <circle cx="252" cy="63" r="3" />
            <text x="0" y="29">Arte</text><text x="0" y="68">Branding</text><text x="0" y="107">Pessoas</text>
            <text className="knowledge-destination" x="520" y="29">Dados</text><text className="knowledge-destination" x="520" y="68">Código</text><text className="knowledge-destination" x="520" y="107">IA</text>
          </svg>
          <div className="perspective-concepts">{j.perspectiveConcepts.map((item, index) => <article className="perspective-concept" key={item.title} tabIndex={0} aria-labelledby={`concept-title-${index}`} aria-describedby={`concept-text-${index}`}>
            <span className="perspective-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div><h3 id={`concept-title-${index}`}>{item.title}</h3><p id={`concept-text-${index}`}>{item.text}</p></div>
          </article>)}</div>
        </div>
        <ProcessCycle />
      </div>
    </div>
  </section>;
}

export default function App() {
  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#conteudo">{j.skip}</a>
    <header className="site-header shell"><a className="brand" href="#quem-sou"><b aria-hidden="true">d<span>·</span></b><span>{j.subtitle}</span></a><Navigation /></header>
    <main id="conteudo"><Identity /><Purpose /><Contribution /><ConnectionCloud /></main>
    <Footer />
  </MotionConfig>;
}
