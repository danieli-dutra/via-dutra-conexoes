import { ArrowUpRight } from 'lucide-react';
import { journey as j } from '../content/journey.js';
import Reveal from './Reveal.jsx';
import BrazilConnections from './BrazilConnections.jsx';
import './Repertoire.css';

export default function Repertoire() {
  const [esports, ibge, network] = j.experiences;
  return <div className="repertoire" aria-labelledby="repertoire-title">
    <div className="repertoire-heading">
      <p className="chapter-label"><span aria-hidden="true" />{j.repertoireLabel}</p>
      <h2 id="repertoire-title">{j.repertoire.map((line, index) => <span key={line} className={index === 1 ? 'repertoire-emphasis' : undefined}>{line}</span>)}</h2>
    </div>
    <article className="press-feature experience-0">
      <Reveal className="press-photo"><figure>
        <img src={esports.image} alt={esports.alt} width="1000" height="750" loading="lazy" />
        <figcaption>{esports.credit}</figcaption>
      </figure></Reveal>
      <div className="press-copy">
        <p className="eyebrow">{esports.name} · {esports.theme}</p>
        <h3>{esports.report.title}</h3>
        <p className="press-intro">{esports.text}</p>
        <div className="press-evidence">
          <p className="press-source">{esports.report.source}</p>
          <p>{esports.report.context}</p>
          <a href={esports.report.url} target="_blank" rel="noopener noreferrer">
            {esports.report.link}<ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
    <div className="human-connections">
      <Reveal className="census-photo"><figure>
        <img src={ibge.image} alt={ibge.alt} width="800" height="600" loading="lazy" />
        <figcaption>{ibge.name} · {j.censusCaption}</figcaption>
      </figure></Reveal>
      <article className="census-copy"><p className="eyebrow">{ibge.theme}</p><h3>{ibge.text}</h3></article>
      <article className="team-copy network-story">
        <p className="eyebrow">{network.theme}</p><h3>{network.name}</h3><p className="network-copy">{network.text}</p>
        <BrazilConnections {...network.visual} />
      </article>
    </div>
  </div>;
}
