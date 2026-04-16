import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onOpenTerms, onOpenPrivacy }) {
  const { t } = useLanguage();
  return (
    <footer className="bg-dark text-base pt-24 pb-12 px-8 rounded-t-[3rem] md:rounded-t-[4rem] relative z-40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 border-b border-white/10 pb-20">
        <div className="max-w-sm">
          <div className="font-outfit font-bold tracking-widest uppercase text-2xl flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            {t("Método Nexus", "NEXUS Method")}
          </div>
          <p className="font-sans text-white/50 text-base leading-relaxed">
            {t(
              "El instrumento definitivo para optimizar tu salud a través del rigor de la naturaleza.",
              "The ultimate instrument to optimize your health through the rigor of nature."
            )}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-16 md:gap-24 font-outfit text-base">
          <div className="flex flex-col gap-6">
            <div className="font-telemetry text-accent uppercase text-xs tracking-widest font-bold mb-2">Social</div>
            <a href="https://www.instagram.com/stretchlifetime/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a>
            <a href="mailto:info@stretchlifetime.com" className="hover:text-accent transition-colors">{t("Contacto", "Contact")}</a>
          </div>
          <div className="flex flex-col gap-6">
            <div className="font-telemetry text-accent uppercase text-xs tracking-widest font-bold mb-2">{t("Legal", "Legal")}</div>
            <button onClick={onOpenTerms} className="hover:text-accent transition-colors text-left">{t("Términos", "Terms")}</button>
            <button onClick={onOpenPrivacy} className="hover:text-accent transition-colors text-left">{t("Privacidad", "Privacy")}</button>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mt-10 text-xs font-telemetry tracking-widest text-white/40">
        <div className="mb-6 md:mb-0">© {new Date().getFullYear()} {t("MÉTODO NEXUS. TODOS LOS DERECHOS.", "NEXUS METHOD. ALL RIGHTS RESERVED.")}</div>
        <div className="flex items-center gap-4 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-sm">
          <span className="uppercase text-[10px]">{t("Sistema Operativo", "Operating System")}</span>
          <span className="text-white/20">|</span>
          <span className="text-white flex items-center gap-2 uppercase text-[10px] font-bold">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             {t("Activo", "Active")}
          </span>
        </div>
      </div>
    </footer>
  )
}
