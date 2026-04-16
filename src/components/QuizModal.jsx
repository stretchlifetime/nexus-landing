import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Activity, Layers, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function QuizModal({ isOpen, onClose, intent }) {
   const navigate = useNavigate();
   const { t, lang } = useLanguage();
   const [step, setStep] = useState(0);
   const [answers, setAnswers] = useState([]);
   const [result, setResult] = useState(null);

   // Moved inside to use the translator hook 
   const questions = [
      // Block 1
      { q: t("¿Cómo es tu día a día?", "How is your day to day?"), options: [{ text: t("Muy justo de tiempo, voy apagando fuegos", "Very short on time, putting out fires"), v: 1 }, { text: t("Bastante organizado, aunque con picos de estrés", "Fairly organized, although with stress peaks"), v: 2 }, { text: t("Bien estructurado, entreno y planifico", "Well structured, I train and plan"), v: 3 }, { text: t("Muy flexible, priorizo mi energía y rendimiento", "Very flexible, prioritizing my energy and performance"), v: 4 }] },
      { q: t("¿Cuál es tu principal motivación para cuidarte?", "What is your main motivation for taking care of yourself?"), options: [{ text: t("Encontrarme mejor y no empeorar", "Feel better and not get worse"), v: 1 }, { text: t("Tener más energía y salud a largo plazo", "Have more energy and long-term health"), v: 2 }, { text: t("Rendimiento físico y mental", "Physical and mental performance"), v: 3 }, { text: t("Optimizar mi cuerpo y mente al máximo", "Optimize my body and mind to the max"), v: 4 }] },
      // Block 2
      { q: t("¿Cómo comes actualmente?", "How do you currently eat?"), options: [{ text: t("Como puedo, intento 'no comer mal'", "I eat what I can, trying not to 'eat badly'"), v: 1 }, { text: t("Mayormente comida real, con planificación básica", "Mostly real food, with basic planning"), v: 2 }, { text: t("Planifico macros y comidas según entrenamiento", "I plan macros and meals according to training"), v: 3 }, { text: t("Ajusto mi dieta por sensaciones, métricas y fases", "I adjust my diet by sensations, metrics and phases"), v: 4 }] },
      { q: t("¿Qué relación tienes con el ayuno?", "What is your relationship with fasting?"), options: [{ text: t("Nunca lo he hecho o me genera inseguridad", "Never done it or it makes me insecure"), v: 1 }, { text: t("He probado 14–16 h y me resulta cómodo", "I've tried 14-16h and it's comfortable"), v: 2 }, { text: t("Hago ayunos largos sin problema", "I do long fasts without problem"), v: 3 }, { text: t("Experimento con OMAD, 36 h, etc.", "I experiment with OMAD, 36h, etc."), v: 4 }] },
      // Block 3
      { q: t("¿Cuántas horas duermes de media?", "How many hours do you sleep on average?"), options: [{ text: t("Menos de 6 h o muy irregulares", "Less than 6h or very irregular"), v: 1 }, { text: t("6–7 h, intento mejorar", "6-7h, trying to improve"), v: 2 }, { text: t("7–8 h de forma bastante constante", "7-8h fairly consistently"), v: 3 }, { text: t("Prioridad absoluta: ajusto todo para dormir bien", "Absolute priority: adjust everything to sleep well"), v: 4 }] },
      { q: t("¿Cómo gestionas el descanso?", "How do you manage rest?"), options: [{ text: t("Duermo cuando puedo", "I sleep when I can"), v: 1 }, { text: t("Tengo horarios más o menos estables", "I have more or less stable schedules"), v: 2 }, { text: t("Tengo rutina clara de sueño", "I have a clear sleep routine"), v: 3 }, { text: t("Monitorizo, ajusto y experimento", "I monitor, adjust and experiment"), v: 4 }] },
      // Block 4
      { q: t("¿Cuál describe mejor tu relación con el entrenamiento?", "What best describes your relationship with training?"), options: [{ text: t("Esporádico o inexistente", "Sporadic or nonexistent"), v: 1 }, { text: t("2–3 veces por semana sin mucha estructura", "2-3 times a week without much structure"), v: 2 }, { text: t("4–6 días con planificación", "4-6 days with planning"), v: 3 }, { text: t("Entreno con objetivos, ciclos y ajustes finos", "I train with goals, cycles, and fine adjustments"), v: 4 }] },
      { q: t("¿Qué pasa si una semana no entrenas?", "What happens if you don't train one week?"), options: [{ text: t("No pasa nada", "Nothing happens"), v: 1 }, { text: t("Me noto algo peor", "I feel a bit worse"), v: 2 }, { text: t("Lo noto claramente", "I notice it clearly"), v: 3 }, { text: t("Ajusto todo para que no ocurra", "I adjust everything so it doesn't happen"), v: 4 }] },
      // Block 5
      { q: t("¿Cómo reaccionas ante la incomodidad?", "How do you react to discomfort?"), options: [{ text: t("La evito si puedo", "I avoid it if I can"), v: 1 }, { text: t("La tolero si tiene sentido", "I tolerate it if it makes sense"), v: 2 }, { text: t("La acepto como parte del proceso", "I accept it as part of the process"), v: 3 }, { text: t("La busco si aporta crecimiento", "I seek it if it brings growth"), v: 4 }] },
      { q: t("¿Cómo tomas decisiones sobre tu salud?", "How do you make health decisions?"), options: [{ text: t("Por intuición o lo que encaja en mi vida", "By intuition or what fits in my life"), v: 1 }, { text: t("Informándome y aplicando lo razonable", "Informing myself and applying what's reasonable"), v: 2 }, { text: t("Basándome en experiencia y resultados", "Based on experience and results"), v: 3 }, { text: t("Probando, midiendo y optimizando", "Testing, measuring, and optimizing"), v: 4 }] },
      // Block 6
      { q: t("¿Cómo describirías tu nivel de energía general?", "How would you describe your overall energy level?"), options: [{ text: t("Bajo o irregular", "Low or irregular"), v: 1 }, { text: t("Aceptable, mejorable", "Acceptable, improvable"), v: 2 }, { text: t("Alto y bastante estable", "High and fairly stable"), v: 3 }, { text: t("Muy alto y bien gestionado", "Very high and well managed"), v: 4 }] },
      { q: t("¿Qué papel juega la sexualidad en tu vida?", "What role does sexuality play in your life?"), options: [{ text: t("Secundario, ahora no es prioridad", "Secondary, not a priority right now"), v: 1 }, { text: t("Importante, pero irregular", "Important, but irregular"), v: 2 }, { text: t("Activa y ligada a bienestar", "Active and linked to well-being"), v: 3 }, { text: t("Parte clave de mi equilibrio y energía", "Key part of my balance and energy"), v: 4 }] },
   ];

   const profilesDef = [
      { id: 'Foundation', max: 1.7, image: '/Logo_Foundation.png', title: t("Perfil Foundation", "Foundation Profile"), subtitle: t("Principiante ocupado", "Busy beginner"), text: t("Necesitas estrategias simples, sostenibles y sin fricción. El objetivo es mejorar sin añadir estrés.", "You need simple, sustainable, frictionless strategies. The goal is to improve without adding stress.") },
      { id: 'Structure', max: 2.5, image: '/Logo_Structure.png', title: t("Perfil Structure", "Structure Profile"), subtitle: t("Optimización consciente", "Conscious optimization"), text: t("Estás listo para estructurar hábitos y obtener beneficios claros sin caer en extremos.", "You are ready to structure habits and obtain clear benefits without falling into extremes.") },
      { id: 'Performance', max: 3.3, image: '/Logo_Performance.png', title: t("Perfil Performance", "Performance Profile"), subtitle: t("Alto rendimiento", "High performance"), text: t("Tu cuerpo responde bien al estímulo. Buscas progresar y aceptar disciplina.", "Your body responds well to stimulus. You seek to progress and accept discipline.") },
      { id: 'Explorer', max: 4.0, image: '/Logo_Explorer.png', title: t("Perfil Explorer", "Explorer Profile"), subtitle: "Biohacker", text: t("Te mueves cómodo en la experimentación. El reto es no sobreoptimizar.", "You are comfortable with experimentation. The challenge is not to over-optimize.") }
   ];

   if (!isOpen) return null;

   const handleAnswer = (val) => {
      const nextAnswers = [...answers, val];
      setAnswers(nextAnswers);
      if (step < questions.length - 1) {
         setStep(step + 1);
      } else {
         calculateResult(nextAnswers);
      }
   };

   const calculateResult = (finalAnswers) => {
      const total = finalAnswers.reduce((a, b) => a + b, 0);
      const avg = total / questions.length;
      let prof = profilesDef[profilesDef.length - 1];
      for (let p of profilesDef) {
         if (avg <= p.max) { prof = p; break; }
      }
      setResult(prof);
   };

   const proceedToCheckout = (productDetails) => {
      navigate('/checkout', { state: { profile: result.id, product: productDetails, intent } });
      onClose();
   };

   return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm">
         <div className="bg-white text-primary w-full max-w-2xl rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-base/50">
               <h3 className="font-outfit font-bold text-xl">{t("Diagnóstico NEXUS", "NEXUS Diagnostic")}</h3>
               <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12">
               {!result ? (
                  <div className="animate-[fade-in_0.3s_ease-out]">
                     <div className="font-telemetry text-accent text-sm font-bold tracking-widest mb-4">{t("FASE", "PHASE")} {step + 1} / {questions.length}</div>
                     <h2 className="font-outfit font-bold text-3xl md:text-4xl mb-12">{questions[step].q}</h2>
                     <div className="flex flex-col gap-4">
                        {questions[step].options.map((opt, i) => (
                           <button
                              key={i}
                              onClick={() => handleAnswer(opt.v)}
                              className="w-full text-left p-6 rounded-2xl border-2 border-base hover:border-primary hover:bg-base/20 transition-all font-sans text-lg font-medium"
                           >
                              {opt.text}
                           </button>
                        ))}
                     </div>
                  </div>
               ) : (
                  <div className="text-center animate-[fade-in_0.5s_ease-out] -mt-4 md:-mt-8">
                     <div className="flex justify-center mb-2">
                        <img src={result.image} alt={result.id} className="w-64 h-64 object-contain" />
                     </div>
                     <h2 className="font-outfit font-bold text-4xl mb-2">{result.title}</h2>
                     <h3 className="font-telemetry uppercase text-accent tracking-widest font-bold mb-6 text-sm">{result.subtitle}</h3>
                     <p className="text-lg text-primary/80 mb-12 max-w-md mx-auto">{result.text}</p>

                     {intent === 'book' && (
                        <div className="bg-base p-8 rounded-2xl border border-gray-200">
                           <h4 className="font-bold text-2xl mb-8">{t("Adquirir el manual:", "Acquire manual:")} {result.id} ($29)</h4>
                           <button onClick={() => proceedToCheckout({ type: 'book', price: 29 })} className="w-full bg-primary text-white py-4 rounded-full font-bold hover:bg-dark transition-colors">
                              {t("Comprar libro electrónico", "Buy digital eBook")}
                           </button>
                        </div>
                     )}

                     {intent === 'coaching' && (
                        <div className="bg-base p-8 rounded-2xl border border-gray-200">
                           <h4 className="font-bold text-2xl mb-4">NEXUS Coaching Support</h4>
                           <p className="text-sm opacity-80 mb-4">{t("Plan", "Plan")} {result.id} {t("+ Ajustes + 4 Consultas/mes", "+ Adjustments + 4 Consultations/mo")}</p>
                           <div className="text-4xl font-outfit font-bold mb-6"><span className="text-xl mr-1">$</span>79<span className="text-xl">/{t("mes", "mo")}</span></div>
                           <button onClick={() => proceedToCheckout({ type: 'coaching', price: 79 })} className="w-full bg-primary text-white py-4 rounded-full font-bold hover:bg-dark transition-colors">
                              {t("Suscribirse Mensualmente", "Subscribe Monthly")}
                           </button>
                        </div>
                     )}

                     {intent === 'elite' && (
                        <div className="bg-dark text-white p-8 rounded-2xl border border-gray-800 shadow-xl">
                           <h4 className="font-bold text-2xl mb-4 text-accent">NEXUS Elite Support</h4>
                           <p className="text-sm opacity-80 mb-4">{t("Plan", "Plan")} {result.id} {t("+ Adaptación Continua + Consultas Ilimitadas", "+ Cont. Adaptation + Unlimited Consultations")}</p>
                           <div className="text-4xl font-outfit font-bold mb-6"><span className="text-xl mr-1">$</span>199<span className="text-xl">/{t("mes", "mo")}</span></div>
                           <button onClick={() => proceedToCheckout({ type: 'elite', price: 199 })} className="w-full bg-accent text-white py-4 rounded-full font-bold hover:bg-[#A34324] transition-colors">
                              {t("Suscribirse (Priority)", "Subscribe (Priority)")}
                           </button>
                        </div>
                     )}
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}
