import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const DiagnosticDeck = () => {
  const { t } = useLanguage();
  const [cards, setCards] = useState([
    { id: 1, text: t("Ahorro de horas", "Hours saved") },
    { id: 2, text: t("Automatización", "Automation") },
    { id: 3, text: t("Resultados medibles", "Measurable results") },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary/[0.03] rounded-[2rem] p-8 h-96 flex items-center justify-center relative overflow-hidden border border-primary/10">
      <h3 className="absolute top-8 left-8 font-outfit font-bold text-xl text-primary z-10">{t("Baraja Diagnóstica", "Diagnostic Deck")}</h3>
      <div className="relative w-64 h-40">
        {cards.map((card, idx) => {
          return (
            <div 
              key={card.id}
              className="absolute top-0 left-0 w-full h-full bg-white rounded-2xl shadow-xl flex items-center justify-center p-6 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] border border-gray-100"
              style={{
                transform: `translateY(${idx * 15}px) scale(${1 - idx * 0.05})`,
                zIndex: 3 - idx,
                opacity: 1 - idx * 0.3
              }}
            >
              <span className="font-outfit font-bold text-lg text-primary">{card.text}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const LiveTelemetry = () => {
  const { lang, t } = useLanguage();
  const [text, setText] = useState('');
  
  // Create messages array based on language
  const messages = lang === 'es' ? 
    ["Optimizando tu organismo...", "Generando protocolo...", "Ajustando biorritmos...", "Sincronizando salud mental..."] :
    ["Optimizing your organism...", "Generating protocol...", "Adjusting biorhythms...", "Synchronizing mental health..."];
  
  useEffect(() => {
    let msgIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const currentMsg = messages[msgIdx];
      
      if (!isDeleting && charIdx <= currentMsg.length) {
        setText(currentMsg.substring(0, charIdx));
        charIdx++;
        timeout = setTimeout(type, 80);
      } else if (isDeleting && charIdx >= 0) {
        setText(currentMsg.substring(0, charIdx));
        charIdx--;
        timeout = setTimeout(type, 40);
      } else if (charIdx > currentMsg.length) {
        isDeleting = true;
        timeout = setTimeout(type, 1500);
      } else if (charIdx < 0) {
        isDeleting = false;
        msgIdx = (msgIdx + 1) % messages.length;
        timeout = setTimeout(type, 500);
      }
    };

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-dark rounded-[2rem] p-8 h-96 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
      <div className="flex justify-between items-center w-full">
         <h3 className="font-outfit font-bold text-xl text-base z-10">{t("Telemetría", "Telemetry")}</h3>
         <div className="flex items-center gap-2 bg-primary/20 px-3 py-1.5 rounded-full border border-primary/30">
            <div className="w-2h-2 p-1 rounded-full bg-accent animate-pulse"></div>
            <span className="text-accent text-xs font-telemetry uppercase tracking-wider font-bold">{t("En vivo", "Live")}</span>
         </div>
      </div>
      <div className="font-telemetry text-base text-lg leading-relaxed h-full flex flex-col justify-end mt-4">
         <div className="text-primary opacity-80 mb-2">~ /sistema/nexus</div>
         <div className="flex items-center">
            <span className="text-gray-300">{text}</span>
            <span className="inline-block w-2.5 h-6 bg-accent opacity-80 ml-1 animate-[pulse_1s_infinite]">&nbsp;</span>
         </div>
      </div>
    </div>
  );
}

const AgendaProtocol = () => {
  const { t } = useLanguage();
  const cursorRef = useRef(null);
  const wrapperRef = useRef(null);
  const days = [t('L','M'), t('M','T'), t('X','W'), t('J','T'), t('V','F'), t('S','S'), t('D','S')];
  const [activeDay, setActiveDay] = useState(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      
      tl.set(cursorRef.current, { x: 260, y: 300, opacity: 0 })
      .to(cursorRef.current, { opacity: 1, duration: 0.3 })
      .to(cursorRef.current, { x: 140, y: 155, duration: 1.2, ease: 'power3.inOut' })
      .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1, onStart: () => setActiveDay(3) })
      .to(cursorRef.current, { x: 215, y: 250, duration: 1, ease: 'power2.inOut', delay: 0.6 })
      .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1, onStart: () => setActiveDay(null) })
      .to(cursorRef.current, { x: 280, y: 300, opacity: 0, duration: 0.8, ease: 'power2.inOut', delay: 0.4 });
      
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white rounded-[2rem] p-8 h-96 border border-gray-100 flex flex-col relative overflow-hidden shadow-xl" ref={wrapperRef}>
      <h3 className="font-outfit font-bold text-xl text-primary mb-12">{t("Agenda Protocolo", "Protocol Schedule")}</h3>
      
      <div className="grid grid-cols-7 gap-2 mb-8">
        {days.map((day, i) => (
          <div 
            key={i} 
            className={`aspect-square rounded-lg flex items-center justify-center font-outfit text-sm font-bold transition-all duration-300 ${activeDay === i ? 'bg-primary text-base transform -translate-y-1 shadow-md' : 'bg-base text-primary/60'}`}
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="mt-auto self-end">
        <div className={`px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${activeDay === null ? 'bg-base text-primary/50' : 'bg-primary text-base shadow-lg'}`}>
          {t("Guardar", "Save")}
        </div>
      </div>

      <svg 
        ref={cursorRef}
        xmlns="http://www.w3.org/2000/svg" 
        className="absolute top-0 left-0 w-8 h-8 text-accent drop-shadow-lg z-50 pointer-events-none" 
        fill="currentColor" 
        viewBox="0 0 24 24"
        style={{ transformOrigin: 'top left' }}
      >
        <path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2.9-3.2-7.4-4.4 4.7z"/>
      </svg>
    </div>
  )
}

export default function Features() {
  return (
    <section className="py-24 px-4 md:px-8 bg-base relative z-20" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <DiagnosticDeck />
          <LiveTelemetry />
          <AgendaProtocol />
        </div>
      </div>
    </section>
  )
}
