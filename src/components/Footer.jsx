import { ArrowUp } from 'lucide-react';
import { journey } from '../content/journey.js';
import './Footer.css';

// Silhuetas das plataformas usadas no footer do Creative Space.
const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/danieli-dutra/', path: 'M6.5 8.2A1.7 1.7 0 1 0 6.5 4.8a1.7 1.7 0 0 0 0 3.4ZM5 9.5h3v9.5H5V9.5Zm4.8 0h2.9v1.3h.04c.4-.8 1.4-1.7 2.9-1.7 3.1 0 3.7 2 3.7 4.7V19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4V19h-3V9.5Z' },
  { name: 'GitHub', href: 'https://github.com/danieli-dutra', path: 'M12 2.5a9.5 9.5 0 0 0-3 18.5c.48.09.66-.21.66-.46v-1.62c-2.69.58-3.26-1.3-3.26-1.3-.44-1.15-1.08-1.46-1.08-1.46-.88-.6.07-.59.07-.59.97.07 1.48 1 1.48 1 .86 1.47 2.25 1.04 2.8.8.09-.62.34-1.04.61-1.28-2.15-.24-4.41-1.08-4.41-4.8 0-1.06.38-1.93 1-2.61-.1-.25-.43-1.24.1-2.58 0 0 .82-.26 2.68 1a9.3 9.3 0 0 1 4.88 0c1.86-1.26 2.68-1 2.68-1 .53 1.34.2 2.33.1 2.58.62.68 1 1.55 1 2.61 0 3.73-2.27 4.56-4.43 4.8.35.3.65.87.65 1.76v2.69c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z' },
  { name: 'Behance', href: 'https://www.behance.net/danieli-dutra', path: 'M9.8 11.1c.8-.4 1.3-1.1 1.3-2 0-1.7-1.4-2.7-3.5-2.7H3v9.2h4.9c2.3 0 3.7-1.1 3.7-3 0-1.1-.6-1.9-1.8-2.5ZM5.2 8.2h2.1c.8 0 1.3.3 1.3 1s-.5 1-1.3 1H5.2V8.2Zm2.2 5.6H5.2v-2.1h2.2c.9 0 1.4.4 1.4 1.1s-.5 1-1.4 1ZM15.7 9.1c-2.3 0-3.9 1.5-3.9 3.8s1.6 3.8 4 3.8c1.9 0 3.3-.9 3.7-2.4h-1.9c-.3.6-.9.9-1.7.9-1.1 0-1.8-.6-1.9-1.7h5.7v-.5c0-2.4-1.6-3.9-4-3.9Zm-1.7 3c.2-.9.8-1.4 1.7-1.4s1.5.5 1.6 1.4H14Zm.3-4.7h3.2v1h-3.2v-1Z' },
];

export default function Footer() {
  return <footer className="journey-footer">
    <div className="shell journey-footer__inner">
      <div className="journey-footer__signature"><span className="journey-footer__monogram" aria-hidden="true">d<span>·</span></span><div><strong>{journey.brand}</strong><p>{journey.subtitle}</p></div></div>
      <ul className="journey-footer__social" aria-label="Redes profissionais">
        {socialLinks.map(link => <li key={link.name}><a href={link.href} target="_blank" rel="noopener noreferrer">
          <span className="journey-footer__icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d={link.path} /></svg></span>
          <span>{link.name}</span><span className="journey-footer__sr-only"> (abre em nova aba)</span>
        </a></li>)}
      </ul>
    </div>
    <div className="shell journey-footer__bottom"><p>© 2026 Dani Dutra</p><a className="journey-footer__back" href="#quem-sou">Voltar ao início<ArrowUp size={16} aria-hidden="true" /></a></div>
  </footer>;
}
