import { useState, useSyncExternalStore } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMemoryImages } from '../content/memoryImages.js';
import './MemoryGallery.css';

const mobileQuery = '(max-width: 650px)';
function subscribeToViewport(callback) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
const isMobileViewport = () => window.matchMedia(mobileQuery).matches;

function MemoryImage({ image, experience }) {
  const [status, setStatus] = useState('loading');
  return <div className="memory-gallery__frame" data-status={status}>
    {status !== 'error' && <img src={image.src} alt={image.alt || experience.alt}
      decoding="async" loading="eager" width={image.width || 720} height={image.height || 540}
      style={{ objectFit: image.fit || experience.fit || 'cover', objectPosition: image.position || experience.position || 'center' }}
      onLoad={() => setStatus('loaded')} onError={() => setStatus('error')} />}
    {status !== 'loaded' && <div className="memory-gallery__placeholder" role={status === 'error' ? 'status' : undefined}>
      <span aria-hidden="true">↗</span>
      <p>{status === 'error' ? 'A fotografia não pôde ser carregada.' : 'Revelando este encontro…'}</p>
      {status === 'error' && <small>{image.alt || experience.alt}</small>}
    </div>}
  </div>;
}

export default function MemoryGallery({ experience }) {
  const mobile = useSyncExternalStore(subscribeToViewport, isMobileViewport, () => true);
  const reduce = useReducedMotion();
  const images = getMemoryImages(experience.images).slice(0, experience.maxImages ?? 5);
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(images.length / 2);
  const currentPage = Math.max(0, Math.min(page, pageCount - 1));
  // Limitar antes de montar evita baixar secundárias que não serão vistas no mobile.
  const visible = mobile ? images.slice(currentPage * 2, currentPage * 2 + 2) : images;
  return <figure className="memory-gallery" data-count={images.length} data-visible-count={visible.length}>
    <div className="memory-gallery__canvas">
      {visible.length ? visible.map((image, index) => <motion.div key={image.src}
        className={`memory-gallery__photo memory-gallery__photo--${index + 1}`}
        data-primary={index === 0 || undefined}
        initial={{ opacity: 0, y: reduce ? 0 : 14, scale: reduce ? 1 : 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : index * 0.055 }}>
        <div className={`memory-gallery__print memory-gallery__print--${image.format || experience.format || 'landscape'}`}>
          <MemoryImage image={image} experience={experience} />
        </div>
      </motion.div>) : <div className={`memory-gallery__pending${experience.emptyMessage ? ' memory-gallery__pending--message' : ''}`}>
        {experience.emptyMessage ? <p>{experience.emptyMessage}</p> : <><span aria-hidden="true">↗</span><p>Uma história para compartilhar.</p><small>Em breve, um registro deste encontro.</small></>}
      </div>}
    </div>
    <figcaption>{experience.caption}</figcaption>
    {mobile && pageCount > 1 && <div className="memory-gallery__pagination" role="group" aria-label="Navegação dos registros">
      <button type="button" aria-label="Registros anteriores" disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}><ChevronLeft size={18} aria-hidden="true" /></button>
      <span role="status">{currentPage * 2 + 1}–{currentPage * 2 + visible.length} de {images.length} registros</span>
      <button type="button" aria-label="Próximos registros" disabled={currentPage === pageCount - 1} onClick={() => setPage(currentPage + 1)}><ChevronRight size={18} aria-hidden="true" /></button>
    </div>}
  </figure>;
}
