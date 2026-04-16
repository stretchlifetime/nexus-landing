import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const SplitWords = ({ text, className = "" }) => {
  return text.split(' ').map((word, i) => (
    <span key={i} className={`split-word inline-block opacity-0 translate-y-6 mr-[0.25em] mb-[0.2em] ${className}`}>
      {word}
    </span>
  ));
};

export default function Manifesto() {
  const sectionRef = useRef(null);
  const { t, lang } = useLanguage();
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to('.parallax-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
      
      gsap.to('.split-word', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.05,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.text-container',
          start: 'top 75%',
        }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section ref={sectionRef} id="manifiesto" className="relative bg-dark text-base py-32 md:py-48 z-10 overflow-hidden rounded-[2rem] md:rounded-[4rem] mx-2 md:mx-4 mt-8 md:mt-12">
       <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem] md:rounded-[4rem]">
         <img className="parallax-bg w-full h-[130%] object-cover opacity-[0.15] scale-105" src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop" alt="Textura Orgánica" />
         <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/80 to-dark mix-blend-multiply"></div>
       </div>

       <div className="relative z-10 max-w-4xl mx-auto px-6 text-container flex flex-col items-center text-center">
         <h2 className="font-outfit font-light text-2xl md:text-4xl lg:text-5xl leading-[1.4] md:leading-[1.5] text-white">
            
            <div className="mb-12 opacity-80 text-xl md:text-3xl">
              <SplitWords text={t("Durante años nos han enseñado a mejorar la salud con una lista infinita de cosas por hacer. Y aun así, la mayoría sigue sin resultados duraderos.", "For years we have been taught to improve our health with an endless to-do list. And yet, most follow without lasting results.")} />
            </div>

            <div className="mb-12">
              <SplitWords text={t("El problema no es la falta de conocimiento, es el no integrarlo.", "The problem isn't a lack of knowledge, it's not integrating it.")} className="text-primary font-bold" />
            </div>

            <div className="mb-12 opacity-80 text-xl md:text-3xl">
              <SplitWords text={t("NEXUS se basa en una idea simple: la salud nace de la conexión entre cinco pilares esenciales:", "NEXUS is based on a simple idea: health is born from the connection between five essential pillars:")} />
            </div>

            <div className="mb-20 flex flex-col items-center mx-auto w-full opacity-90 text-2xl md:text-4xl font-outfit">
              <div className="flex flex-col items-start text-left gap-2 w-max">
                <div><SplitWords text={t("• Ayuno intermitente", "• Intermittent fasting")} className="font-medium" /></div>
                <div><SplitWords text={t("• Comida real", "• Real food")} className="font-medium" /></div>
                <div><SplitWords text={t("• Entrenamiento con cargas pesadas", "• Heavy resistance training")} className="font-medium" /></div>
                <div><SplitWords text={t("• Higiene de sueño", "• Sleep hygiene")} className="font-medium" /></div>
                <div><SplitWords text={t("• Vida sexual activa", "• Active sexual life")} className="font-medium" /></div>
              </div>
            </div>

            <div className="mt-12">
              <SplitWords text={t("Cuando se alinean, todo cambia:", "When they align, everything changes:")} /><br/>
              <SplitWords text={t("La energía vuelve, el cuerpo responde y la mente se aclara.", "Energy returns, the body responds, and the mind clears.")} className="text-accent font-bold font-drama italic text-4xl md:text-6xl" />
            </div>
            
         </h2>
       </div>
    </section>
  )
}
