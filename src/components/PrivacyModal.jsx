import React from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function PrivacyModal({ isOpen, onClose }) {
   const { t } = useLanguage();

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm">
         <div className="bg-white text-primary w-full max-w-3xl rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-base/50">
               <h3 className="font-outfit font-bold text-xl uppercase tracking-widest">{t("Política de Privacidad", "Privacy Policy")}</h3>
               <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12 font-sans leading-relaxed text-primary/80">
               <div className="space-y-8">
                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("1. Responsable del tratamiento", "1. Data Controller")}</h4>
                     <p>{t("En cumplimiento de la normativa aplicable, se informa de que los datos personales recogidos a través de este sitio web serán tratados por:", "In compliance with applicable regulations, we inform you that the personal data collected through this website will be processed by:")}</p>
                     <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li><strong>{t("Titular:", "Owner:")}</strong> STRETCHLIFETIME LLC</li>
                        <li><strong>{t("Domicilio:", "Address:")}</strong> 5830 E 2ND ST, STE 7000 #34901 CASPER, WY 82609</li>
                        <li><strong>{t("Email de contacto:", "Contact Email:")}</strong> info@stretchlifetime.com</li>
                     </ul>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("2. Finalidad del tratamiento de datos", "2. Purpose of data processing")}</h4>
                     <p>{t("Los datos personales que el usuario facilite serán tratados con las siguientes finalidades:", "The personal data that the user provides will be processed with the following purposes:")}</p>
                     <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>{t("Gestionar la compra de productos digitales (libros)", "Manage the purchase of digital products (books)")}</li>
                        <li>{t("Gestionar la contratación de servicios de coaching (NEXUS Support)", "Manage the hiring of coaching services (NEXUS Support)")}</li>
                        <li>{t("Atender consultas o solicitudes de información", "Attend to queries or information requests")}</li>
                        <li>{t("Enviar comunicaciones relacionadas con el servicio contratado", "Send communications related to the contracted service")}</li>
                        <li>{t("Enviar información comercial (solo si el usuario lo ha autorizado)", "Send commercial information (only if the user has authorized it)")}</li>
                     </ul>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("3. Legitimación", "3. Legitimacy")}</h4>
                     <p>{t("La base legal para el tratamiento de datos es:", "The legal basis for data processing is:")}</p>
                     <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>{t("La ejecución de un contrato (compra o contratación de servicios)", "The execution of a contract (purchase or hiring of services)")}</li>
                        <li>{t("El consentimiento del usuario (formularios, suscripción a comunicaciones)", "User consent (forms, subscription to communications)")}</li>
                        <li>{t("El cumplimiento de obligaciones legales", "Compliance with legal obligations")}</li>
                     </ul>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("4. Conservación de los datos", "4. Data conservation")}</h4>
                     <p>{t("Los datos se conservarán:", "The data will be kept:")}</p>
                     <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>{t("Mientras exista una relación contractual", "While a contractual relationship exists")}</li>
                        <li>{t("Mientras el usuario no solicite su supresión", "While the user does not request its deletion")}</li>
                        <li>{t("Durante los plazos necesarios para cumplir obligaciones legales", "During the necessary periods to comply with legal obligations")}</li>
                     </ul>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("5. Destinatarios de los datos", "5. Data recipients")}</h4>
                     <p>{t("Los datos no serán cedidos a terceros, salvo obligación legal.", "The data will not be transferred to third parties, unless there is a legal obligation.")}</p>
                     <p className="mt-4">{t("No obstante, podrán ser tratados por proveedores que prestan servicios necesarios para el funcionamiento de la web, tales como:", "However, they may be processed by providers who provide services necessary for the functioning of the web, such as:")}</p>
                     <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>{t("plataformas de pago", "payment platforms")}</li>
                        <li>{t("servicios de hosting", "hosting services")}</li>
                        <li>{t("herramientas de email marketing", "email marketing tools")}</li>
                     </ul>
                     <p className="mt-4">{t("Estos proveedores actuarán como encargados del tratamiento y cumplirán la normativa aplicable.", "These providers will act as data processors and comply with the applicable regulations.")}</p>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("6. Derechos del usuario", "6. User rights")}</h4>
                     <p>{t("El usuario tiene derecho a:", "The user has the right to:")}</p>
                     <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>{t("Acceder a sus datos personales", "Access their personal data")}</li>
                        <li>{t("Solicitar la rectificación de datos inexactos", "Request the rectification of inaccurate data")}</li>
                        <li>{t("Solicitar su supresión", "Request its deletion")}</li>
                        <li>{t("Limitar u oponerse al tratamiento", "Limit or object to the processing")}</li>
                        <li>{t("Solicitar la portabilidad de sus datos", "Request the portability of their data")}</li>
                     </ul>
                     <p className="mt-4">{t("Para ejercer estos derechos puede enviar una solicitud a ", "To exercise these rights you can send a request to ")}<strong>info@stretchlifetime.com</strong></p>
                     <p className="mt-2">{t("También tiene derecho a presentar una reclamación ante la autoridad de control competente.", "You also have the right to file a claim before the competent supervisory authority.")}</p>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("7. Seguridad de los datos", "7. Data security")}</h4>
                     <p>{t("El titular adopta las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su pérdida, alteración o acceso no autorizado.", "The owner adopts the necessary technical and organizational measures to guarantee the security of personal data and avoid its loss, alteration or unauthorized access.")}</p>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("8. Datos proporcionados por el usuario", "8. Data provided by the user")}</h4>
                     <p>{t("El usuario garantiza que los datos proporcionados son:", "The user guarantees that the data provided is:")}</p>
                     <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>{t("veraces", "truthful")}</li>
                        <li>{t("exactos", "accurate")}</li>
                        <li>{t("actualizados", "updated")}</li>
                     </ul>
                     <p className="mt-4">{t("Y se compromete a comunicar cualquier modificación.", "And undertakes to communicate any modification.")}</p>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("9. Menores de edad", "9. Minors")}</h4>
                     <p>{t("Esta web no está dirigida a menores de edad.", "This website is not directed to minors.")}</p>
                     <p className="mt-2">{t("El titular no se responsabiliza de datos facilitados por menores sin autorización de sus padres o tutores.", "The owner is not responsible for data provided by minors without the authorization of their parents or guardians.")}</p>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("10. Comunicaciones comerciales", "10. Commercial communications")}</h4>
                     <p>{t("Solo se enviarán comunicaciones comerciales si el usuario ha dado su consentimiento expreso.", "Commercial communications will only be sent if the user has given express consent.")}</p>
                     <p className="mt-2">{t("El usuario podrá darse de baja en cualquier momento mediante el enlace incluido en las comunicaciones o contactando por email.", "The user may unsubscribe at any time through the link included in the communications or by contacting by email.")}</p>
                  </section>

                  <section>
                     <h4 className="font-outfit font-bold text-xl text-primary mb-4">{t("11. Modificaciones de la política de privacidad", "11. Modifications to the privacy policy")}</h4>
                     <p>{t("El titular se reserva el derecho a modificar la presente política para adaptarla a novedades legislativas o cambios en la actividad.", "The owner reserves the right to modify this policy to adapt it to legislative developments or changes in the activity.")}</p>
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
