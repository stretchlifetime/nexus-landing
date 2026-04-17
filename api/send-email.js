import { Resend } from 'resend';

const MANUAL_MAP = {
  explorer: {
    es: 'manual-explorer-es-x9u2v8.pdf',
    en: 'manual-explorer-en-q7w4p1.pdf'
  },
  foundation: {
    es: 'manual-foundation-es-m1n3b5.pdf',
    en: 'manual-foundation-en-z6x8c2.pdf'
  },
  performance: {
    es: 'manual-performance-es-h4g7j9.pdf',
    en: 'manual-performance-en-k2l5m3.pdf'
  },
  structure: {
    es: 'manual-structure-es-w8z1y4.pdf',
    en: 'manual-structure-en-a5s2d3.pdf'
  }
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, profile, intent, lang } = req.body;
  const profileKey = profile.toLowerCase();
  const pdfFile = MANUAL_MAP[profileKey]?.[lang] || `manual-${profileKey}-${lang}.pdf`;

  try {
    const isBook = intent === 'book';
    const subject = isBook 
      ? (lang === 'es' ? '¡Tu manual NEXUS ya está listo!' : 'Your NEXUS manual is ready!')
      : (lang === 'es' ? 'Bienvenido a NEXUS support' : 'Welcome to NEXUS support');

    const data = await resend.emails.send({
      from: 'NEXUS <info@stretchlifetime.com>',
      to: [email],
      subject: subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
          <h1 style="color: #BA4E2B;">NEXUS</h1>
          <p style="font-size: 18px;">${lang === 'es' ? '¡Hola!' : 'Hello!'}</p>
          <p>${lang === 'es' 
              ? `Gracias por confiar en el Método NEXUS. Has adquirido el acceso para el perfil <strong>${profile}</strong>.` 
              : `Thank you for trusting the NEXUS Method. You have acquired access for the <strong>${profile}</strong> profile.`}
          </p>
          
          ${isBook ? `
            <p>${lang === 'es' 
                ? 'Puedes descargar tu manual directamente desde el siguiente enlace (o desde la pantalla de confirmación en la web):' 
                : 'You can download your manual directly from the following link (or from the confirmation screen on the web):'}
            </p>
            <a href="https://www.stretchlifetime.com/manuals/${pdfFile}" 
               style="display: inline-block; background: #BA4E2B; color: white; padding: 15px 25px; text-decoration: none; border-radius: 10px; font-weight: bold; margin-top: 10px;">
               ${lang === 'es' ? 'Descargar Manual' : 'Download Manual'}
            </a>
          ` : `
            <p>${lang === 'es' 
                ? 'En las próximas 24 horas, nuestro equipo se pondrá en contacto contigo para comenzar con tu asesoramiento personalizado.' 
                : 'Within the next 24 hours, our team will contact you to begin your personalized advisory.'}
            </p>
          `}

          <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999;">
            © 2026 Stretch Lifetime - NEXUS Method. info@stretchlifetime.com
          </p>
        </div>
      `,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
}
