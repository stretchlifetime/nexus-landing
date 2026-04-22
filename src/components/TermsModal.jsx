import React from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TermsModal({ isOpen, onClose }) {
   const { t } = useLanguage();

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm">
         <div className="bg-white text-primary w-full max-w-3xl rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-base/50">
               <h3 className="font-outfit font-bold text-xl uppercase tracking-widest">{t("Términos Legales", "Legal Terms")}</h3>
               <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12 font-sans leading-relaxed text-primary/80">
               <div className="space-y-8">
                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("1. Identificación del titular", "1. Owner Identification")}</h4>
                     <p>{t("En cumplimiento con la normativa vigente, se informa que el presente sitio web es propiedad de:", "In compliance with current regulations, we inform you that this website is owned by:")}</p>
                     <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li><strong>{t("Titular:", "Owner:")}</strong> STRETCHLIFETIME LLC</li>
                        <li><strong>{t("Domicilio:", "Address:")}</strong> 5830 E 2ND ST, STE 7000 #34901 CASPER, WY 82609</li>
                        <li><strong>{t("Email de contacto:", "Contact Email:")}</strong> info@stretchlifetime.com</li>
                     </ul>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("2. Objeto", "2. Object")}</h4>
                     <p>{t("El presente documento regula:", "This document regulates:")}</p>
                     <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>{t("el acceso y uso del sitio web", "website access and use")}</li>
                        <li>{t("la compra de productos digitales (libros)", "the purchase of digital products (books)")}</li>
                        <li>{t("la contratación de servicios de acompañamiento (NEXUS Support / Coaching)", "the hiring of accompanying services (NEXUS Support / Coaching)")}</li>
                     </ul>
                     <p className="mt-2">{t("El acceso a la web implica la aceptación de estos términos.", "Access to the web implies acceptance of these terms.")}</p>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("3. Descripción de los servicios", "3. Description of services")}</h4>
                     <p>{t("A través de esta web se ofrecen:", "Through this website, the following are offered:")}</p>
                     <div className="mt-4 space-y-4">
                        <div>
                           <p className="font-bold underline">{t("Productos digitales", "Digital products")}</p>
                           <ul className="list-disc ml-6 mt-1">
                              <li>{t("Libros en formato digital basados en el método NEXUS", "Books in digital format based on the NEXUS method")}</li>
                           </ul>
                        </div>
                        <div>
                           <p className="font-bold underline">{t("Servicios de acompañamiento", "Accompanying services")}</p>
                           <ul className="list-disc ml-6 mt-1">
                              <li>{t("Programas de coaching y soporte personalizado en hábitos de salud", "Coaching programs and personalized support in health habits")}</li>
                              <li>{t("Planes basados en los pilares del método NEXUS", "Plans based on the pillars of the NEXUS method")}</li>
                           </ul>
                        </div>
                     </div>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("4. Naturaleza del servicio", "4. Nature of the service")}</h4>
                     <p>{t("Los contenidos y servicios ofrecidos no constituyen en ningún caso asesoramiento médico, diagnóstico clínico ni tratamiento sanitario.", "The contents and services offered do not constitute in any case medical advice, clinical diagnosis or health treatment.")}</p>
                     <p className="mt-2 text-sm italic border-l-4 border-accent pl-4 py-2 bg-accent/5">{t("El método NEXUS se basa en: hábitos de vida, bienestar general y mejora del estilo de vida.", "The NEXUS method is based on: lifestyle habits, general wellness and improvement of lifestyle.")}</p>
                     <p className="mt-4">{t("El usuario es responsable de:", "The user is responsible for:")}</p>
                     <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>{t("consultar con un profesional sanitario si tiene alguna condición médica", "consulting with a health professional if they have any medical condition")}</li>
                        <li>{t("aplicar las recomendaciones bajo su propio criterio", "applying the recommendations under their own criteria")}</li>
                     </ul>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("5. Condiciones de compra", "5. Purchase conditions")}</h4>
                     <div className="space-y-4">
                        <div>
                           <p className="font-bold">{t("Productos digitales", "Digital products")}</p>
                           <ul className="list-disc ml-6 mt-1">
                              <li>{t("El acceso al libro se concede tras la compra", "Access to the book is granted after purchase")}</li>
                              <li>{t("El format será digital (PDF)", "The format will be digital (PDF)")}</li>
                              <li>{t("No se permite la distribución, copia o reventa", "No distribution, copying or resale is allowed")}</li>
                           </ul>
                        </div>
                        <div>
                           <p className="font-bold">{t("Servicios de suscripción", "Subscription services")}</p>
                           <ul className="list-disc ml-6 mt-1">
                              <li>{t("Se facturan de forma mensual o según condiciones indicadas", "They are billed monthly or according to indicated conditions")}</li>
                              <li>{t("Incluyen el nivel de soporte contratado", "Include the level of contracted support")}</li>
                              <li>{t("El usuario puede cancelar según las condiciones establecidas", "The user can cancel according to the established conditions")}</li>
                           </ul>
                        </div>
                     </div>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("6. Política de devoluciones", "6. Refund Policy")}</h4>
                     <div className="space-y-4">
                        <div>
                           <p className="font-bold">{t("Productos digitales", "Digital products")}</p>
                           <p>{t("Debido a su naturaleza no se admiten devoluciones una vez descargado el contenido, salvo error técnico imputable a la plataforma.", "Due to its nature, no returns are allowed once the content has been downloaded, except for technical errors attributable to the platform.")}</p>
                        </div>
                        <div>
                           <p className="font-bold">{t("Servicios de suscripción", "Subscription services")}</p>
                           <p>{t("El usuario puede cancelar futuras renovaciones. No se reembolsan periodos ya consumidos.", "The user can cancel future renewals. Already consumed periods are not reimbursed.")}</p>
                        </div>
                     </div>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("7. Responsabilidad", "7. Responsibility")}</h4>
                     <p>{t("El titular no se hace responsable de:", "The owner is not responsible for:")}</p>
                     <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>{t("el uso indebido del contenido", "improper use of content")}</li>
                        <li>{t("la interpretación personal del usuario", "the personal interpretation of the user")}</li>
                        <li>{t("resultados no obtenidos", "results not obtained")}</li>
                     </ul>
                     <p className="mt-4 italic">{t("El usuario entiende que los resultados dependen de su compromiso, contexto y adherencia.", "The user understands that the results depend on their commitment, context and adherence.")}</p>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("8. Propiedad intelectual", "8. Intellectual property")}</h4>
                     <p>{t("Todo el contenido de la web (textos, método, estructura, marca NEXUS, etc.) está protegido por derechos de propiedad intelectual.", "All the content of the website (texts, method, structure, NEXUS brand, etc.) is protected by intellectual property rights.")}</p>
                     <p className="mt-4">{t("Queda prohibido sin autorización expresa del titular:", "It is prohibited without express authorization from the owner:")}</p>
                     <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>{t("copiar, reproducir, distribuir o comercializar", "copy, reproduce, distribute or commercialize")}</li>
                     </ul>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("9. Protección de datos", "9. Data protection")}</h4>
                     <p>{t("Los datos personales serán tratados conforme a la normativa vigente en materia de protección de datos (RGPD).", "Personal data will be treated in accordance with current regulations on data protection (GDPR).")}</p>
                     <p className="mt-4">{t("El usuario puede ejercer sus derechos de acceso, rectificación, supresión y oposición mediante solicitud a ", "The user can exercise their rights of access, rectification, erasure and objection by request to ")}<strong>info@stretchlifetime.com</strong></p>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("10. Modificaciones", "10. Modifications")}</h4>
                     <p>{t("El titular se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en la web.", "The owner reserves the right to modify these terms at any time. Modifications will take effect from their publication on the web.")}</p>
                  </section>
               </div>
            </div>

            {/* Footer simple inside modal */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 text-center">
               <button onClick={onClose} className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-dark transition-colors">
                  {t("Entendido", "I Understand")}
               </button>
            </div>
         </div>
      </div>
   );
}
