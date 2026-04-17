import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, LayoutDashboard, LogOut, Globe, Book, Users, Settings, Lock, CheckCircle, Eye, RefreshCw } from 'lucide-react';
import { NEXUS_PRICING } from '../config/pricing';

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [sales, setSales] = useState([]);
  const [visits, setVisits] = useState(0);
  const [activeTab, setActiveTab] = useState('books');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      const data = JSON.parse(localStorage.getItem('nexus_sales') || '[]');
      setSales(data);
      const v = parseInt(localStorage.getItem('nexus_visits') || '0');
      setVisits(v);
    }
  }, [auth]);

  const handleExport = (data, filename) => {
    if (data.length === 0) return;

    // Define columns based on data type
    const isBook = data[0].intent === 'book';
    const headers = isBook
      ? ["Fecha", "Email", "Perfil", "Idioma", "Precio", "Metodo Pago"]
      : ["Fecha", "Email", "Genero", "Nacimiento", "Perfil", "Soporte", "Precio", "Metodo Pago"];

    const rows = data.map(item => {
      const date = new Date(item.date).toLocaleDateString();
      if (isBook) {
        return [date, item.email, item.profile, item.langPref, item.price, item.paymentMethod];
      } else {
        return [date, item.email, item.gender, item.dob, item.profile, item.intent, item.price, item.paymentMethod];
      }
    });

    const csvContent = "\ufeff" + [headers, ...rows].map(e => e.join(";")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const seedData = () => {
    const testData = [
      { date: new Date().toISOString(), email: 'maria.gonzalez@example.com', profile: 'Foundation', intent: 'book', price: NEXUS_PRICING.book, paymentMethod: 'stripe', langPref: 'es' },
      { date: new Date(Date.now() - 86400000).toISOString(), email: 'john.doe@test.com', profile: 'Performance', intent: 'book', price: NEXUS_PRICING.book, paymentMethod: 'paypal', langPref: 'en' },
      { date: new Date(Date.now() - 172800000).toISOString(), email: 'carlos.ruiz@nexus.com', gender: 'H', dob: '1990-05-15', profile: 'Structure', intent: 'coaching', price: NEXUS_PRICING.coaching, paymentMethod: 'stripe' },
      { date: new Date(Date.now() - 259200000).toISOString(), email: 'lucia.vazquez@bio.com', gender: 'M', dob: '1985-11-20', profile: 'Explorer', intent: 'elite', price: NEXUS_PRICING.elite, paymentMethod: 'stripe' },
      { date: new Date(Date.now() - 345600000).toISOString(), email: 'sergio.marquez@cloud.com', profile: 'Foundation', intent: 'book', price: NEXUS_PRICING.book, paymentMethod: 'stripe', langPref: 'es' },
    ];
    localStorage.setItem('nexus_sales', JSON.stringify(testData));
    setSales(testData);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPass.length < 4) {
      setPassError('La contraseña debe tener al menos 4 caracteres');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('Las contraseñas no coinciden');
      return;
    }
    localStorage.setItem('nexus_admin_pass', newPass);
    setPassSuccess(true);
    setNewPass('');
    setConfirmPass('');
    setPassError('');
    setTimeout(() => setPassSuccess(false), 3000);
  };

  const handleResetVisits = () => {
    if (window.confirm('¿Seguro que quieres resetear el contador de visitas a cero?')) {
      localStorage.setItem('nexus_visits', '0');
      setVisits(0);
    }
  };

  if (!auth) {
    const currentAdminPass = localStorage.getItem('nexus_admin_pass') || 'nexusadmin';
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4 relative z-50">
        <button onClick={() => navigate('/')} className="absolute top-10 left-10 font-bold opacity-60 hover:opacity-100 text-white">← Salir</button>
        <form onSubmit={e => { e.preventDefault(); if (password === currentAdminPass) setAuth(true); }} className="bg-white p-10 rounded-3xl max-w-sm w-full shadow-2xl">
          <h2 className="font-outfit font-bold text-3xl text-primary mb-2 text-center">NEXUS Mgmt</h2>
          <p className="text-center text-sm font-bold opacity-50 mb-8 font-telemetry tracking-widest">A C C E S O</p>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña..." className="w-full border-2 border-gray-200 bg-base p-4 rounded-xl mb-4 text-center focus:border-accent outline-none transition-colors" />
          {currentAdminPass === 'nexusadmin' && (
            <p className="text-xs text-gray-400 mb-8 text-center bg-gray-50 p-2 rounded-lg border border-gray-100">*(Pssst: usa <strong className="text-primary font-mono">nexusadmin</strong>)*</p>
          )}
          <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-dark transition-colors">Autenticar (2FA Simulado)</button>
        </form>
      </div>
    );
  }

  const books = sales.filter(s => s.intent === 'book');
  const subs = sales.filter(s => s.intent !== 'book');

  return (
    <div className="min-h-screen bg-base p-4 lg:p-12 font-sans text-primary relative z-50">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex justify-between items-center mb-16 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="font-outfit font-bold text-3xl flex items-center gap-4">
            <LayoutDashboard className="text-accent" /> Backoffice Central
          </h1>
          <div className="flex items-center gap-4">
            {sales.length === 0 && (
              <button onClick={seedData} className="font-bold text-sm bg-accent/10 text-accent px-6 py-3 rounded-full hover:bg-accent hover:text-white transition-all border border-accent/20">
                Generar Datos de Prueba
              </button>
            )}
            <button onClick={() => navigate('/')} className="font-bold text-sm bg-base px-6 py-3 rounded-full hover:bg-gray-200 transition-colors border border-gray-200 flex items-center gap-2">
              <Globe size={16} /> Volver a Web
            </button>
            <button onClick={() => setAuth(false)} className="bg-primary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md flex items-center gap-2 hover:bg-dark transition-colors">
              <LogOut size={16} /> Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-primary/40 text-xs font-bold uppercase tracking-widest mb-1">Total Visitas</p>
              <h3 className="text-4xl font-outfit font-bold">{visits}</h3>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl">
                <Eye size={24} />
              </div>
              <button 
                onClick={handleResetVisits}
                className="text-[10px] font-bold text-red-500 hover:text-red-700 flex items-center gap-1 opacity-60 hover:opacity-100 transition-all uppercase tracking-tighter cursor-pointer"
                title="Resetear contador"
              >
                <RefreshCw size={10} /> Resetear
              </button>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-primary/40 text-xs font-bold uppercase tracking-widest mb-1">Libros Vendidos</p>
              <h3 className="text-4xl font-outfit font-bold">{books.length}</h3>
            </div>
            <div className="bg-accent/10 text-accent p-4 rounded-2xl">
              <Book size={24} />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-primary/40 text-xs font-bold uppercase tracking-widest mb-1">Suscripciones</p>
              <h3 className="text-4xl font-outfit font-bold">{subs.length}</h3>
            </div>
            <div className="bg-green-50 text-green-600 p-4 rounded-2xl">
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('books')}
            className={`px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === 'books' ? 'bg-accent text-white shadow-lg scale-[1.02]' : 'bg-white text-primary/60 hover:text-primary hover:bg-gray-50 border border-gray-100'}`}
          >
            <Book size={20} /> Ventas de libros ({books.length})
          </button>
          <button
            onClick={() => setActiveTab('subs')}
            className={`px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === 'subs' ? 'bg-green-600 text-white shadow-lg scale-[1.02]' : 'bg-white text-primary/60 hover:text-primary hover:bg-gray-50 border border-gray-100'}`}
          >
            <Users size={20} /> Alta de suscripciones ({subs.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === 'settings' ? 'bg-gray-800 text-white shadow-lg scale-[1.02]' : 'bg-white text-primary/60 hover:text-primary hover:bg-gray-50 border border-gray-100'}`}
          >
            <Settings size={20} /> Configuración
          </button>
        </div>

        <div className="animate-[fade-in_0.4s_ease-out]">
          {activeTab === 'books' ? (
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                  <h2 className="font-outfit font-bold text-3xl text-primary flex items-center gap-3">
                    <Book className="text-accent" /> Ventas de libros
                  </h2>
                  <p className="text-primary/50 text-sm mt-1">Listado histórico de transacciones del libro interactivo.</p>
                </div>
                <button
                  onClick={() => handleExport(books, "ventas_libros")}
                  className="flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-bold hover:bg-dark transition-all shadow-lg shadow-primary/20"
                >
                  <Download size={18} /> Exportar Excel
                </button>
              </div>
              <div className="overflow-x-auto -mx-8 md:-mx-12 px-8 md:px-12">
                <table className="w-full text-left whitespace-nowrap">
                  <thead className="bg-base border-b border-gray-100 font-telemetry uppercase text-xs track-wider text-gray-500">
                    <tr>
                      <th className="p-6 font-bold">Fecha</th>
                      <th className="p-6 font-bold">Email</th>
                      <th className="p-6 font-bold">Perfil</th>
                      <th className="p-6 font-bold">Idioma</th>
                      <th className="p-6 font-bold">Coste</th>
                      <th className="p-6 font-bold">Pago</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.length === 0 && <tr><td colSpan="6" className="p-20 text-center text-gray-400 font-medium italic">No se han encontrado registros</td></tr>}
                    {books.map((b, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="p-6 font-mono text-xs opacity-70">{new Date(b.date).toLocaleDateString()}</td>
                        <td className="p-6 font-bold">{b.email}</td>
                        <td className="p-6">
                          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold">{b.profile}</span>
                        </td>
                        <td className="p-6 font-bold opacity-60 uppercase tracking-widest text-[10px]">{b.langPref}</td>
                        <td className="p-6 font-mono font-bold text-lg">${b.price}</td>
                        <td className="p-6">
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold capitalize">{b.paymentMethod}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'subs' ? (
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                  <h2 className="font-outfit font-bold text-3xl text-primary flex items-center gap-3">
                    <Users className="text-green-600" /> Alta de suscripciones
                  </h2>
                  <p className="text-primary/50 text-sm mt-1">Gestión de usuarios con soporte activo NEXUS.</p>
                </div>
                <button
                  onClick={() => handleExport(subs, "alta_suscripciones")}
                  className="flex items-center gap-3 px-6 py-3 bg-green-600 text-white rounded-2xl text-sm font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
                >
                  <Download size={18} /> Exportar Excel
                </button>
              </div>
              <div className="overflow-x-auto -mx-8 md:-mx-12 px-8 md:px-12">
                <table className="w-full text-left whitespace-nowrap">
                  <thead className="bg-base border-b border-gray-100 font-telemetry uppercase text-xs track-wider text-gray-500">
                    <tr>
                      <th className="p-6 font-bold">Alta</th>
                      <th className="p-6 font-bold">Email</th>
                      <th className="p-6 font-bold">Género</th>
                      <th className="p-6 font-bold">F. Nacimiento</th>
                      <th className="p-6 font-bold">Perfil</th>
                      <th className="p-6 font-bold">Soporte</th>
                      <th className="p-6 font-bold">Coste</th>
                      <th className="p-6 font-bold">Pago</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subs.length === 0 && <tr><td colSpan="8" className="p-20 text-center text-gray-400 font-medium italic">No se han encontrado registros</td></tr>}
                    {subs.map((s, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="p-6 font-mono text-xs opacity-70">{new Date(s.date).toLocaleDateString()}</td>
                        <td className="p-6 font-bold">{s.email}</td>
                        <td className="p-6">
                          <span className="opacity-80 block font-bold text-sm">{s.gender}</span>
                        </td>
                        <td className="p-6">
                          <span className="font-mono text-xs opacity-60 block">{s.dob}</span>
                        </td>
                        <td className="p-6">
                          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold">{s.profile}</span>
                        </td>
                        <td className="p-6 uppercase font-telemetry font-bold text-accent text-xs tracking-widest">{s.intent}</td>
                        <td className="p-6 font-mono font-bold text-lg">${s.price}</td>
                        <td className="p-6">
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold capitalize">{s.paymentMethod}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-gray-100 max-w-2xl mx-auto">
               <div className="mb-12">
                  <h2 className="font-outfit font-bold text-3xl text-primary flex items-center gap-3">
                    <Settings className="text-gray-800" /> Configuración del Sistema
                  </h2>
                  <p className="text-primary/50 text-sm mt-1">Administra el acceso y los parámetros de seguridad.</p>
               </div>

               <div className="bg-base/30 p-8 rounded-3xl border border-gray-100">
                  <h3 className="font-outfit font-bold text-xl mb-6 flex items-center gap-2">
                    <Lock size={20} className="text-primary/60" /> Cambiar Contraseña de Acceso
                  </h3>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-primary/40 mb-2 ml-1">Nueva Contraseña</label>
                        <input 
                          type="password" 
                          value={newPass}
                          onChange={e => setNewPass(e.target.value)}
                          placeholder="Mínimo 4 caracteres..."
                          className="w-full bg-white border border-gray-200 p-4 rounded-2xl outline-none focus:border-accent transition-colors"
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-primary/40 mb-2 ml-1">Confirmar Contraseña</label>
                        <input 
                          type="password" 
                          value={confirmPass}
                          onChange={e => setConfirmPass(e.target.value)}
                          placeholder="Repite la contraseña..."
                          className="w-full bg-white border border-gray-200 p-4 rounded-2xl outline-none focus:border-accent transition-colors"
                        />
                     </div>
                     
                     {passError && <p className="text-red-500 text-sm font-medium ml-1">{passError}</p>}
                     {passSuccess && (
                       <div className="bg-green-50 text-green-700 p-4 rounded-2xl flex items-center gap-3 border border-green-100 animate-bounce">
                          <CheckCircle size={20} />
                          <span className="font-bold text-sm">Contraseña actualizada correctamente</span>
                       </div>
                     )}

                     <button 
                       type="submit"
                       className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-dark transition-all mt-4"
                     >
                       Guardar Nueva Contraseña
                     </button>
                  </form>
               </div>

               <div className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                  <p className="text-amber-800 text-sm">
                    <strong>Nota:</strong> La nueva contraseña se guardará en este navegador. Si accedes desde otro dispositivo o borras la caché, la contraseña volverá a ser la de por defecto (<code className="bg-amber-100 px-1 rounded">nexusadmin</code>) hasta que la cambies de nuevo.
                  </p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
