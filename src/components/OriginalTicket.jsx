import { useEffect, useRef, useState } from 'react';
import markup from './original-ticket.html?raw';
import './OriginalTicket.css';

// Original Rob Stinson ticket; MIT notice in public/ticket-LICENSE.txt.
export default function OriginalTicket() {
  const container = useRef(null);
  const [now, setNow] = useState(Date.now);
  const daysSince = Math.max(0, Math.floor((now - Date.UTC(2026, 2, 25)) / 86400000));
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const element = container.current;
    const observer = new ResizeObserver(([entry]) => {
      const scale = entry.contentRect.width / 768;
      element.style.setProperty('--ticket-scale', scale);
      element.style.height = `${208 * scale}px`;
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={container} className="original-ticket" aria-label={`CMC Seminar, ${daysSince} days since 25 March 2026`}><div className="original-ticket-canvas" dangerouslySetInnerHTML={{ __html: markup.replace('{{DAYS_SINCE}}', String(daysSince)) }}/></div>;
}
