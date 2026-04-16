import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Settings, ScanLine, Activity, ClipboardList } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const ArchiveCard = ({ title, description, color, titleColor, descColor, index, children }) => {
  const { t } = useLanguage();
  return (
    <div className={`archive-card w-full h-[100vh] sticky top-0 flex items-center justify-center p-4 md:p-12 ${color}`} style={{ zIndex: index, transformOrigin: 'top center' }}>
      <div className="max-w-6xl w-full bg-white rounded-[3rem] h-[85vh] md:h-full shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
        <div className="p-10 md:p-20 flex flex-col justify-center w-full md:w-1/2">
          <span className="font-telemetry text-accent mb-4 tracking-widest uppercase font-bold text-sm">{index === 0 ? t("Fase Inicial", "Initial Phase") : <>{t("Protocolo", "Protocol")} {index}</>}</span>
          <h2 className={`font-outfit font-bold text-4xl md:text-6xl mb-6 ${titleColor}`}>{title}</h2>
          <p className={`text-lg md:text-xl font-sans max-w-md ${descColor}`}>
            {description}
          </p>
        </div>
        <div className="w-full md:w-1/2 bg-base h-full relative flex items-center justify-center border-l border-gray-100/50">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function Archive() {
  const containerRef = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.archive-card');

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            animation: gsap.to(card, {
              scale: 0.9,
              opacity: 0.5,
              filter: 'blur(20px)',
              ease: 'none',
            })
          });
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="archivo" className="relative z-20 bg-base">
      <ArchiveCard
        index={0}
        color="bg-base pt-24"
        titleColor="text-primary"
        descColor="text-primary/70"
        title={t("Diagnóstico", "Diagnosis")}
        description={t("Responde a nuestro formulario y el algoritmo te incluirá en uno de los cuatro perfiles NEXUS del método (Foundation, Structure, Performance o Explorer)", "Complete our form and the algorithm will include you in one of the four NEXUS profiles of the method (Foundation, Structure, Performance or Explorer)")}
      >
        <ClipboardList className="w-48 h-48 md:w-64 md:h-64 text-accent/20 animate-pulse" strokeWidth={0.5} />
      </ArchiveCard>

      <ArchiveCard
        index={1}
        color="bg-base"
        titleColor="text-primary"
        descColor="text-primary/70"
        title={t("Mapeo inicial", "Initial mapping")}
        description={t("Analizamos tus bases mediante un enfoque de sistemas. Cada variable metabólica y de estilo de vida es evaluada.", "We analyze your baselines through a systems approach. Every metabolic and lifestyle variable is evaluated.")}
      >
        <Settings className="w-48 h-48 md:w-64 md:h-64 text-primary/20 animate-[spin_12s_linear_infinite]" strokeWidth={0.5} />
      </ArchiveCard>

      <ArchiveCard
        index={2}
        color="bg-dark/5"
        titleColor="text-primary"
        descColor="text-primary/70"
        title={t("Escaneo integral", "Integral scanning")}
        description={t("Se aplican protocolos de corrección. Identificamos los cuellos de botella en tu bienestar general para solucionarlos.", "Correction protocols are applied. We identify the bottlenecks in your overall wellbeing to solve them.")}
      >
        <div className="relative w-48 h-48 md:w-64 md:h-64 border border-accent/20 rounded-[2rem] overflow-hidden bg-white shadow-inner">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_20px_rgba(204,88,51,0.9)] animate-[translate_3s_ease-in-out_infinite_alternate]" style={{ animationName: 'scan' }}></div>
          <style>{`@keyframes scan { 0% { transform: translateY(0); } 100% { transform: translateY(256px); } }`}</style>
          <ScanLine className="w-full h-full p-12 text-accent/30" strokeWidth={1} />
        </div>
      </ArchiveCard>

      <ArchiveCard
        index={3}
        color="bg-base"
        titleColor="text-primary"
        descColor="text-primary/70"
        title={t("Sincronización total", "Total synchronization")}
        description={t("El método está optimizado. Tu cuerpo y mente operan en un estado ideal, ralentizando el envejecimiento al máximo.", "The method is optimized. Your mind and body operate in an ideal state, radically slowing down aging.")}
      >
        <Activity className="w-48 h-48 md:w-64 md:h-64 text-accent animate-[pulse_2s_ease-in-out_infinite]" strokeWidth={1} />
      </ArchiveCard>
    </section>
  )
}
