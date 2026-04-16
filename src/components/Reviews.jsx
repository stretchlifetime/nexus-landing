import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const reviews = [
  { name: "Alejandro V.", rating: 5, text: "Pensé que el ayuno era extremo, pero descubrir mi perfil 'Structure' hizo que todo encajara en mi ritmo de trabajo.", en: "I thought fasting was extreme, but discovering my 'Structure' profile made it fit perfectly into my work rhythm." },
  { name: "Marta R.", rating: 5, text: "Tener la guía Foundation ha sido clave. Resultó que estaba complicándolo todo; menos es más. Energía máxima ahora mismo.", en: "Having the Foundation guide was key. It turned out I was overcomplicating everything; less is more. Max energy right now." },
  { name: "Carlos P.", rating: 5, text: "Llevaba estancado años en el gym. El modelo de Performance me alineó el descanso con la alimentación intuitiva. Brutal.", en: "I had stalled in the gym for years. The Performance model aligned my rest with intuitive eating. Incredible." },
];

export default function Reviews() {
  const { t } = useLanguage();
  return (
    <section id="reviews" className="py-24 px-4 md:px-8 bg-dark text-base relative z-30 rounded-[3rem] mx-4 my-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-outfit font-bold text-4xl md:text-6xl mb-16 text-center text-white">
          {t("Opiniones de clientes", "Customer Reviews")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
             <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2rem] flex flex-col justify-between">
                <div className="flex gap-1 mb-6 text-accent">
                   {[...Array(rev.rating)].map((_, j) => <Star key={j} size={20} fill="currentColor" />)}
                </div>
                <p className="font-sans text-lg mb-8 italic opacity-90 text-balance">
                  "{t(rev.text, rev.en)}"
                </p>
                <div className="font-telemetry text-sm text-accent uppercase tracking-widest font-bold">
                  {rev.name}
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  )
}
