import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Pricing({ onOpenQuiz }) {
  const { t } = useLanguage();

  const plans = [
    { name: 'Manual PDF', price: '29', features: [t('Integración 5 pilares', '5 pillars integration'), t('Estrategia personalizada según perfil', 'Personalized strategy by profile'), t('Formato digital descargable', 'Downloadable digital format')], highlighted: false, intent: 'book', cta: t('Adquirir', 'Acquire') },
    { name: 'Coaching Support', price: '79', features: [t('Plan adaptado mensual', 'Adapted monthly plan'), t('Revisión y seguimiento por equipo', 'Team review and tracking'), t('4 consultas por mes', '4 consultations per month')], highlighted: true, intent: 'coaching', cta: t('Suscribirse', 'Subscribe') },
    { name: 'Elite Support', price: '199', features: [t('Mapeo biológico completo', 'Complete biological mapping'), t('Seguimiento semanal', 'Weekly tracking'), t('Asesoramiento 24/7 Ilimitado', 'Unlimited 24/7 support')], highlighted: false, intent: 'elite', cta: t('Suscribirse', 'Subscribe') },
  ];
  return (
    <section id="pricing" className="py-32 md:py-48 px-4 md:px-8 bg-base relative z-30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 md:mb-32">
          <h2 className="font-outfit font-bold text-5xl md:text-7xl text-primary mb-6">{t("Adquiere el método", "Acquire the method")}</h2>
          <p className="text-xl md:text-2xl text-primary/60 font-sans max-w-2xl mx-auto font-light">
            {t("Selecciona una de las 3 opciones y pulsa Adquirir/Suscribirse para comenzar con el diagnóstico de tu perfil.", "Select one of the 3 options and press Acquire/Subscribe to start your profile diagnosis.")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`p-10 md:p-12 rounded-[2rem] flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 group ${plan.highlighted ? 'bg-primary text-base shadow-2xl scale-100 md:scale-105 z-10' : 'bg-white border border-gray-100 text-primary shadow-lg'}`}>
              <div>
                <h3 className="font-telemetry text-sm font-bold uppercase tracking-widest mb-8 opacity-80">{plan.name}</h3>
                <div className="font-outfit text-5xl md:text-6xl font-bold mb-10 tracking-tight">
                  {plan.price !== 'A Medida' && <span className="text-3xl mr-1 font-light opacity-80">$</span>}
                  {plan.price}
                </div>
                <ul className="mb-12 space-y-5 font-sans text-[1rem]">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-4">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${plan.highlighted ? 'bg-accent' : 'bg-primary'}`}></div>
                      <span className="font-semibold leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => onOpenQuiz(plan.intent)} className={`w-full py-5 rounded-full font-bold tracking-widest text-sm uppercase transition-all duration-300 relative overflow-hidden ${plan.highlighted ? 'bg-accent text-white hover:bg-[#A34324]' : 'bg-primary/5 text-primary hover:bg-primary hover:text-base'}`}>
                <span className="relative z-10">{plan.cta}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
