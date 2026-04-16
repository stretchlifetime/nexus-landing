import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

export default function Hero({ onOpenQuiz }) {
  const heroRef = useRef(null);
  const textContainerRef = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Fade-up stagger for elements inside text container
      gsap.from(textContainerRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2, 
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden flex flex-col justify-end bg-dark">
      <div className="absolute inset-0 z-0 flex items-center justify-center md:justify-end md:pr-20 lg:pr-32 overflow-hidden">
        <img 
          src="/hero_bg.png" 
          alt="Stretch Lifetime Nexus" 
          className="w-full h-full md:w-3/4 lg:w-2/3 object-contain opacity-[0.35] md:opacity-[0.45] mix-blend-luminosity"
          style={{ WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)', maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-[#2E4036]/50 to-[#2E4036]/20"></div>
        <div className="absolute inset-0 bg-dark/20"></div>
      </div>

      <div className="relative z-10 p-8 md:p-16 lg:p-24 max-w-7xl mx-auto w-full pb-20 md:pb-32">
        <div ref={textContainerRef} className="flex flex-col max-w-3xl">
          <span className="font-outfit font-bold text-4xl md:text-5xl lg:text-7xl tracking-tight text-base opacity-100 mb-2 md:mb-0">
            {t("La naturaleza es el", "Nature is the")}
          </span>
          <span className="font-drama italic text-7xl md:text-8xl lg:text-[9rem] leading-none tracking-tight text-accent opacity-100 drop-shadow-lg">
            {t("Algoritmo", "Algorithm")}
          </span>
          <p className="mt-8 text-base/80 max-w-md font-sans text-lg md:text-xl font-light">
            {t(
              "Integra los 5 pilares básicos de una vida saludable. Ralentiza tu reloj biológico y optimiza cuerpo y mente para un envejecimiento que nunca imaginaste.",
              "Integrate the 5 core pillars of a healthy lifestyle. Slow down your biological clock and optimize mind and body for an aging you never imagined."
            )}
          </p>
          <div className="mt-12 flex items-center gap-6 opacity-0 translate-y-8" ref={el => { if(el) el.classList.add('hero-btn') }}>
             <button onClick={() => onOpenQuiz('book')} className="bg-accent text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#A34324] hover:scale-105 transition-all shadow-xl shadow-accent/20">
                {t("Realizar Diagnóstico", "Take the Diagnostic")}
             </button>
             <a href="#archivo" className="text-white hover:text-accent font-bold underline transition-colors">
                {t("Descubre el framework", "Discover framework")}
             </a>
          </div>
        </div>
      </div>
    </section>
  );
}
