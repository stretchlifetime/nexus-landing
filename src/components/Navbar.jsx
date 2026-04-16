import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar({ onOpenQuiz }) {
  const navRef = useRef(null);
  const { lang, toggleLang, t } = useLanguage();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        onToggle: (self) => {
          if (navRef.current) {
            if (self.isActive) {
              gsap.to(navRef.current, { backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', color: '#2E4036', borderColor: 'rgba(46,64,54,0.1)', duration: 0.4, ease: 'power2.out' });
            } else {
              gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'none', color: '#FFFFFF', borderColor: 'transparent', duration: 0.4, ease: 'power2.out' });
            }
          }
        }
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-6xl pointer-events-none">
      <div
        ref={navRef}
        className="pointer-events-auto rounded-[2rem] px-8 py-4 flex justify-between items-center transition-shadow border border-transparent shadow-sm"
        style={{ color: '#ffffff' }}
      >
        <div className="font-outfit font-bold tracking-wider uppercase text-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent"></div>
          {t("Método Nexus", "NEXUS Method")}
        </div>
        <div className="hidden md:flex gap-10 text-sm font-medium">
          <a href="#manifiesto" className="hover:opacity-70 transition-opacity">{t("Manifiesto", "Manifesto")}</a>
          <a href="#archivo" className="hover:opacity-70 transition-opacity">{t("El método", "The method")}</a>
          <a href="#pricing" className="hover:opacity-70 transition-opacity">{t("Planes", "Plans")}</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleLang} className="font-telemetry text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors">
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a href="#pricing" className="bg-accent text-base px-6 py-2 rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-transform duration-300 flex items-center justify-center">
            {t("Comenzar", "Get started")}
          </a>
        </div>
      </div>
    </nav>
  );
}
