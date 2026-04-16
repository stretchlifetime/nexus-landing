import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-24 px-4 md:px-8 bg-base relative z-30 mb-8 md:mb-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
        <div className="w-full md:w-1/2 rounded-[3rem] overflow-hidden shadow-2xl relative group bg-black/5">
          <img
            src="/nexus_health_team.png"
            className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-105"
            alt="Profesionales Método Nexus"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent pointer-events-none"></div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="font-outfit font-bold text-5xl md:text-7xl text-primary mb-8 tracking-tight">
            {t("Quiénes somos", "Who we are")}
          </h2>
          <div className="font-sans text-primary/80 space-y-6 text-lg md:text-xl leading-relaxed font-light">
            <p>
              {t(
                "Somos un equipo de profesionales de la salud, médicos y biomédicos que decidimos romper con los mitos tradicionales y las soluciones genéricas del modelo actual.",
                "We are a team of health professionals, doctors, and bio-scientists who decided to break the traditional myths and generic solutions of the current model."
              )}
            </p>
            <p>
              {t(
                "Tras años de experiencia clínica y resultados empíricos, hemos desarrollado un marco integral basado puramente en métodos fundamentales, humanos y naturales rigurosamente testeados.",
                "After years of clinical experience and empirical results, we have developed a holistic framework based purely on tested fundamental, human, and natural methods."
              )}
            </p>
            <p className="font-medium text-primary">
              {t(
                "Nuestro objetivo no es solo tratar síntomas, sino expandir radicalmente el tiempo de vida funcional y saludable de cada individuo.",
                "Our goal isn't just treating symptoms, but radically expanding the functional, healthy lifespan of each individual."
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
