import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { NEXUS_PRICING } from '../config/pricing';
import { MANUAL_MAP } from '../config/manuals';

export default function Checkout() {
  const { t, lang } = useLanguage();
  const { state } = useLocation();
  const navigate = useNavigate();
  const profile = state?.profile || "Foundation";
  const intent = state?.intent || "book";
  const price = state?.product?.price || NEXUS_PRICING[intent] || NEXUS_PRICING.book;

  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [email, setEmail] = useState('');
  const [langPref, setLangPref] = useState(lang);
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!email) return;

    // Send email via our new API
    try {
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          profile,
          intent,
          lang: langPref
        })
      }).then(res => {
        console.log("Status envío email:", res.status);
        return res.json();
      }).then(data => {
        console.log("Respuesta servidor email:", data);
      }).catch(err => {
        console.error("Error en el fetch de email:", err);
      });
    } catch (err) {
      console.error("Error enviando email:", err);
    }

    setIsSuccess(true);
    
    const prevData = JSON.parse(localStorage.getItem('nexus_sales') || '[]');
    prevData.push({
      date: new Date().toISOString(),
      email,
      profile,
      intent,
      price,
      paymentMethod,
      langPref: intent === 'book' ? langPref : null,
      gender: intent !== 'book' ? gender : null,
      dob: intent !== 'book' ? dob : null
    });
    localStorage.setItem('nexus_sales', JSON.stringify(prevData));
  };

  if (isSuccess) {
    const profileKey = profile.toLowerCase();
    const pdfFile = MANUAL_MAP[profileKey]?.[langPref] || `manual-${profileKey}-${langPref}.pdf`;

    return (
      <div className="min-h-screen bg-base flex items-center justify-center p-4 relative z-50">
         <div className="bg-white p-12 rounded-[2rem] shadow-2xl text-center max-w-lg">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="font-outfit font-bold text-3xl mb-4 text-primary">{t("¡Pago Completado!", "Payment Completed!")}</h2>
            <p className="text-primary/70 mb-8 font-sans leading-relaxed">
              {t("Hemos enviado los detalles a", "We have sent the details to")} <strong className="text-primary text-balance">{email}</strong>. 
              <br/><br/>
              {intent === 'book' ? t(" Ya puedes descargar tu manual interactivo a continuación:", " You can now download your interactive manual below:") : t(" Bienvenido al soporte NEXUS. En breve recibirás instrucciones por correo con los primeros pasos para acceder a tu asesoramiento.", " Welcome to NEXUS support. You will shortly receive instructions by email with the first steps to access your advisory.")}
            </p>
            {intent === 'book' && (
              <a 
                href={`/manuals/${pdfFile}`} 
                download 
                className="inline-block bg-accent text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform mb-4 w-full tracking-wide"
              >
                 {t("Descargar Manual", "Download Manual")} {profile} ({langPref === 'es' ? 'ES' : 'EN'})
              </a>
            )}
            <button onClick={() => navigate('/')} className="block mt-4 text-sm font-bold text-primary/50 underline hover:text-primary mx-auto">
               {t("Volver a la portada", "Back to Home")}
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base py-20 px-4 relative z-50">
       <button onClick={() => navigate(-1)} className="absolute top-10 left-10 font-bold opacity-60 hover:opacity-100">{t("← Atrás", "← Back")}</button>
       <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12 mt-10">
          <div className="w-full md:w-1/3 bg-dark text-white p-8 rounded-[2rem] h-fit sticky top-10">
             <h3 className="font-telemetry text-accent text-sm font-bold tracking-widest mb-8">{t("RESUMEN PEDIDO", "ORDER SUMMARY")}</h3>
             <div className="text-3xl font-outfit font-bold mb-2 leading-tight">{intent === 'book' ? `${t("Manual", "Manual")}: ${profile}` : `NEXUS ${intent === 'elite' ? 'Elite' : 'Coaching'}`}</div>
             <div className="opacity-60 text-sm">{intent === 'book' ? t('Libro digital PDF Interactivo', 'Interactive PDF Digital Book') : t('Suscripción mensual de ajuste', 'Monthly tuning subscription')}</div>
             <div className="text-5xl font-light mt-10 tracking-tighter">${price}</div>
          </div>
          
          <div className="w-full md:w-2/3 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100">
             <h2 className="font-outfit font-bold text-3xl text-primary mb-8">{t("Finalizar Transacción", "Complete Transaction")}</h2>
             <form onSubmit={handleCheckout} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold opacity-70 mb-2">{t("Email de Contacto", "Contact Email")}</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-base border border-gray-200 p-4 rounded-xl outline-none focus:border-accent transition-colors" placeholder={t("tu@email.com", "you@email.com")} />
                </div>
                
                {intent === 'book' && (
                  <div>
                    <label className="block text-sm font-bold opacity-70 mb-2">{t("Idioma del Manual (PDF)", "Manual Language (PDF)")}</label>
                    <select value={langPref} onChange={e => setLangPref(e.target.value)} className="w-full bg-base border border-gray-200 p-4 rounded-xl outline-none focus:border-accent transition-colors">
                      <option value="es">{t("Castellano", "Spanish")}</option>
                      <option value="en">{t("Inglés", "English")}</option>
                    </select>
                  </div>
                )}

                {intent !== 'book' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold opacity-70 mb-2">{t("Género", "Gender")}</label>
                      <select required value={gender} onChange={e => setGender(e.target.value)} className="w-full bg-base border border-gray-200 p-4 rounded-xl outline-none focus:border-accent transition-colors">
                        <option value="">{t("Seleccionar...", "Select...")}</option>
                        <option value="H">{t("Hombre", "Male")}</option>
                        <option value="M">{t("Mujer", "Female")}</option>
                        <option value="O">{t("Otro", "Other")}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold opacity-70 mb-2">{t("Fecha Nacimiento", "Date of Birth")}</label>
                      <input type="date" required value={dob} onChange={e => setDob(e.target.value)} className="w-full bg-base border border-gray-200 p-4 rounded-xl outline-none focus:border-accent transition-colors" />
                    </div>
                  </div>
                )}

                <div className="pt-8 border-t border-gray-100 mt-8">
                  <label className="block text-sm font-bold opacity-70 mb-4">{t("Método de Pago", "Payment Method")}</label>
                  <div className="flex gap-4">
                     <button type="button" onClick={() => setPaymentMethod('stripe')} className={`flex-1 py-4 border rounded-xl font-bold transition-all ${paymentMethod === 'stripe' ? 'border-primary bg-primary text-white scale-100 shadow-md' : 'border-gray-200 text-gray-400 hover:border-gray-300 bg-white'}`}>
                        {t("Tarjeta", "Card")}
                     </button>
                     <button type="button" onClick={() => setPaymentMethod('paypal')} className={`flex-1 py-4 border rounded-xl font-bold transition-all ${paymentMethod === 'paypal' ? 'border-[#003087] bg-[#003087] text-white scale-100 shadow-md' : 'border-gray-200 text-gray-400 hover:border-gray-300 bg-white'}`}>
                        PayPal
                     </button>
                  </div>
                </div>

                <button type="submit" className="w-full bg-accent text-white py-5 rounded-xl font-bold text-lg hover:bg-[#A34324] transition-colors mt-8 shadow-xl shadow-accent/20">
                   {t("Completar Pago Seguro", "Complete Secure Payment")} (${price})
                </button>
             </form>
          </div>
       </div>
    </div>
  )
}
