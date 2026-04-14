import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import {
  LogOut, Calendar, Users, FileEdit, Menu, X, Plus, Search, Edit, Trash2, Save,
  Home as HomeIcon, MapPin, Phone, Mail, BedDouble, CheckCircle2, AlertCircle, PieChart, CreditCard,
  Settings
} from 'lucide-react';

interface Reservation {
  id: string;
  guestName: string;
  room: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  total: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
}

interface NewUser {
  username: string;
  password: string;
  role: 'admin' | 'user';
}

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<'overview' | 'reservations' | 'cms' | 'users'>('overview');
  const [activeCmsTab, setActiveCmsTab] = useState<'info' | 'contact' | 'rooms'>('info');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Data mocks
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 'R-7829', guestName: 'María González', room: 'Habitación Deluxe', checkIn: '2026-05-12', checkOut: '2026-05-15', guests: 2, status: 'confirmed', total: '$4,500 MXN', paymentStatus: 'paid'
    },
    {
      id: 'R-3491', guestName: 'Carlos Ramírez', room: 'Suite Junior', checkIn: '2026-06-20', checkOut: '2026-06-25', guests: 3, status: 'pending', total: '$7,500 MXN', paymentStatus: 'pending'
    },
    {
      id: 'R-1102', guestName: 'Ana Martínez', room: 'Habitación Estándar', checkIn: '2026-02-14', checkOut: '2026-02-16', guests: 1, status: 'confirmed', total: '$1,800 MXN', paymentStatus: 'paid'
    }
  ]);

  const [users, setUsers] = useState([{ id: '1', username: 'admin', role: 'admin' as const }]);
  const [newUser, setNewUser] = useState<NewUser>({ username: '', password: '', role: 'user' });

  // CMS State
  const [hotelInfo, setHotelInfo] = useState({
    mision: 'Brindar una experiencia de hospitalidad inigualable, fusionando la elegancia contemporánea con la cálida tradición michoacana.',
    vision: 'Ser el hotel boutique de referencia en Michoacán, reconocido por nuestro servicio excepcional y compromiso con la excelencia.',
    about: 'Hospitalidad y elegancia mexicana en el corazón de Michoacán.'
  });

  const [contactInfo, setContactInfo] = useState({
    phone: '+52 (443) 123 4567',
    email: 'reservaciones@quintadalam.com',
    address: 'Av. Madero 123, Centro Histórico, Morelia, Michoacán'
  });

  const [roomsConfig, setRoomsConfig] = useState([
    { id: 1, name: 'Habitación Estándar', price: 1200, capacity: 2, available: 5 },
    { id: 2, name: 'Habitación Deluxe', price: 1800, capacity: 2, available: 3 },
    { id: 3, name: 'Suite Junior', price: 2500, capacity: 4, available: 2 },
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-700 border-green-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200'
    };
    const labels = { confirmed: 'Confirmada', pending: 'Pendiente', cancelled: 'Cancelada' };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getPaymentBadge = (status: string) => {
    const styles = {
      paid: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      refunded: 'bg-slate-100 text-slate-700 border-slate-200'
    };
    const labels = { paid: 'Pagado', pending: 'Pendiente', refunded: 'Reembolsado' };
    return (
      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {status === 'paid' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#faf9fc] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40 h-16 flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-muted rounded-lg text-foreground">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <Settings size={18} />
            </div>
            <h1 className="text-xl font-bold text-foreground hidden sm:block">Panel de Control</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-muted-foreground">Admin</p>
            <p className="text-sm font-semibold text-foreground">{user?.username}</p>
          </div>
          <button onClick={handleLogout} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors" title="Cerrar Sesión">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-border transition-transform duration-300 mt-16 lg:mt-0 flex flex-col`}>
          <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-4 mt-2">Principal</div>
            <button
              onClick={() => setActiveMenu('overview')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeMenu === 'overview' ? 'bg-primary text-white' : 'text-foreground hover:bg-muted hover:text-primary'
              }`}
            >
              <PieChart size={18} />
              Resumen Operativo
            </button>
            <button
              onClick={() => setActiveMenu('reservations')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeMenu === 'reservations' ? 'bg-primary text-white' : 'text-foreground hover:bg-muted hover:text-primary'
              }`}
            >
              <Calendar size={18} />
              Reservaciones & Pagos
            </button>

            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-4 mt-6">Administración</div>
            <button
              onClick={() => setActiveMenu('cms')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeMenu === 'cms' ? 'bg-primary text-white' : 'text-foreground hover:bg-muted hover:text-primary'
              }`}
            >
              <FileEdit size={18} />
              Gestor de Contenido
            </button>
            <button
              onClick={() => setActiveMenu('users')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeMenu === 'users' ? 'bg-primary text-white' : 'text-foreground hover:bg-muted hover:text-primary'
              }`}
            >
              <Users size={18} />
              Usuarios
            </button>
          </nav>
          
          <div className="p-4 border-t border-border">
            <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-all">
              <HomeIcon size={16} />
              Ver Sitio Web
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 lg:p-8">
          
          {/* OVERVIEW / RESUMEN OPERATIVO */}
          {activeMenu === 'overview' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-foreground mb-6">Resumen Operativo</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Ocupación Hoy</p>
                      <h3 className="text-3xl font-bold text-foreground mt-1">75%</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <BedDouble size={20} />
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">7 de 10 habitaciones ocupadas</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reservas Activas</p>
                      <h3 className="text-3xl font-bold text-foreground mt-1">{reservations.length}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <Calendar size={20} />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 font-medium">+2 nuevas esta semana</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Ingresos (Mes)</p>
                      <h3 className="text-3xl font-bold text-foreground mt-1">$45.2K</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <CreditCard size={20} />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 font-medium">+15% vs mes anterior</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pagos Pendientes</p>
                      <h3 className="text-3xl font-bold text-amber-600 mt-1">2</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <AlertCircle size={20} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Requieren seguimiento hoy</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border flex justify-between items-center">
                  <h3 className="text-lg font-bold text-foreground">Disponibilidad en Tiempo Real</h3>
                  <button className="text-sm text-primary font-medium">Ver Calendario Completo</button>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {roomsConfig.map(room => (
                      <div key={room.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white border border-border flex items-center justify-center">
                            <BedDouble size={20} className="text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{room.name}</h4>
                            <p className="text-xs text-muted-foreground">Capacidad: {room.capacity} personas</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{room.available} <span className="text-sm text-muted-foreground font-normal">disponibles</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RESERVATIONS & PAYMENTS */}
          {activeMenu === 'reservations' && (
            <div className="animate-in fade-in duration-300 h-full flex flex-col">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-foreground">Control de Reservaciones y Pagos</h2>
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar huésped, id..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-border shadow-sm flex-1 flex flex-col overflow-hidden">
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 border-b border-border text-muted-foreground sticky top-0">
                      <tr>
                        <th className="px-6 py-4 font-semibold">ID / Huésped</th>
                        <th className="px-6 py-4 font-semibold">Habitación</th>
                        <th className="px-6 py-4 font-semibold">Fechas</th>
                        <th className="px-6 py-4 font-semibold">Total</th>
                        <th className="px-6 py-4 font-semibold">Estado Reserva</th>
                        <th className="px-6 py-4 font-semibold">Estado Pago</th>
                        <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {reservations.map((reservation) => (
                        <tr key={reservation.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold text-foreground">{reservation.guestName}</p>
                            <p className="text-xs text-muted-foreground">{reservation.id}</p>
                          </td>
                          <td className="px-6 py-4 text-foreground font-medium">{reservation.room}</td>
                          <td className="px-6 py-4">
                            <p className="text-foreground">{reservation.checkIn}</p>
                            <p className="text-xs text-muted-foreground">al {reservation.checkOut}</p>
                          </td>
                          <td className="px-6 py-4 font-bold text-foreground">{reservation.total}</td>
                          <td className="px-6 py-4">{getStatusBadge(reservation.status)}</td>
                          <td className="px-6 py-4">{getPaymentBadge(reservation.paymentStatus)}</td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <button className="p-1.5 hover:bg-primary/10 rounded-md transition-colors text-primary" title="Editar">
                                <Edit size={16} />
                              </button>
                              <button className="p-1.5 hover:bg-destructive/10 rounded-md transition-colors text-destructive" title="Cancelar">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CMS / GESTOR DE CONTENIDO */}
          {activeMenu === 'cms' && (
            <div className="animate-in fade-in duration-300 max-w-4xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Gestor de Contenido (CMS)</h2>
                <button className="flex items-center gap-2 btn-primary px-4 py-2 rounded-lg text-white font-medium text-sm">
                  <Save size={16} /> Guardar Cambios
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-6">
                <div className="flex border-b border-border overflow-x-auto">
                  <button 
                    onClick={() => setActiveCmsTab('info')}
                    className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${activeCmsTab === 'info' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Misión y Visión
                  </button>
                  <button 
                    onClick={() => setActiveCmsTab('contact')}
                    className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${activeCmsTab === 'contact' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Datos de Contacto
                  </button>
                  <button 
                    onClick={() => setActiveCmsTab('rooms')}
                    className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${activeCmsTab === 'rooms' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Detalles de Habitaciones
                  </button>
                </div>

                <div className="p-6 md:p-8">
                  {activeCmsTab === 'info' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Misión del Hotel</label>
                        <textarea
                          value={hotelInfo.mision}
                          onChange={(e) => setHotelInfo({...hotelInfo, mision: e.target.value})}
                          rows={4}
                          className="w-full p-4 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Visión del Hotel</label>
                        <textarea
                          value={hotelInfo.vision}
                          onChange={(e) => setHotelInfo({...hotelInfo, vision: e.target.value})}
                          rows={4}
                          className="w-full p-4 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Texto "Acerca de Nosotros"</label>
                        <textarea
                          value={hotelInfo.about}
                          onChange={(e) => setHotelInfo({...hotelInfo, about: e.target.value})}
                          rows={3}
                          className="w-full p-4 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {activeCmsTab === 'contact' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2"><Phone size={16} /> Teléfono Principal</label>
                        <input
                          type="text"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2"><Mail size={16} /> Correo Electrónico</label>
                        <input
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2"><MapPin size={16} /> Dirección Física</label>
                        <textarea
                          value={contactInfo.address}
                          onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                          rows={2}
                          className="w-full p-4 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {activeCmsTab === 'rooms' && (
                    <div className="space-y-4">
                      {roomsConfig.map(room => (
                        <div key={room.id} className="p-4 rounded-xl border border-border bg-muted/30 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Nombre de la Habitación</label>
                            <input
                              type="text"
                              value={room.name}
                              readOnly
                              className="w-full px-3 py-2 rounded-lg border border-border bg-white font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Precio x Noche (MXN)</label>
                            <input
                              type="number"
                              value={room.price}
                              onChange={(e) => {
                                const newRooms = [...roomsConfig];
                                const index = newRooms.findIndex(r => r.id === room.id);
                                newRooms[index].price = Number(e.target.value);
                                setRoomsConfig(newRooms);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-border bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Inventario Total</label>
                            <input
                              type="number"
                              value={room.available}
                              onChange={(e) => {
                                const newRooms = [...roomsConfig];
                                const index = newRooms.findIndex(r => r.id === room.id);
                                newRooms[index].available = Number(e.target.value);
                                setRoomsConfig(newRooms);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-border bg-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* USERS / USUARIOS */}
          {activeMenu === 'users' && (
             <div className="animate-in fade-in duration-300 max-w-5xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Gestión de Usuarios Administrativos</h2>
              
              <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Plus size={20} className="text-primary" /> Agregar Nuevo Administrador
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Usuario</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Ej. recepcion_1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Contraseña</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="********"
                    />
                  </div>
                  <button className="btn-primary py-2.5 px-4 rounded-xl text-white font-medium text-sm shadow-sm">
                    Crear Usuario
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30">
                  <h3 className="font-bold text-foreground">Usuarios Registrados</h3>
                </div>
                <div className="divide-y divide-border">
                  {users.map(u => (
                    <div key={u.id} className="p-4 flex items-center justify-between hover:bg-muted/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Users size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{u.username}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
                            {u.role.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      {u.id !== '1' && (
                        <button className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
