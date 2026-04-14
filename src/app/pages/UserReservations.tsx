import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Calendar, Search, ArrowLeft, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface Reservation {
  id: string;
  room: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  total: string;
  bookingDate: string;
}

export function UserReservations() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data for client's reservations
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 'R-7829',
      room: 'Habitación Deluxe',
      checkIn: '2026-05-12',
      checkOut: '2026-05-15',
      guests: 2,
      status: 'confirmed',
      total: '$4,500 MXN',
      bookingDate: '2026-04-01'
    },
    {
      id: 'R-3491',
      room: 'Suite Junior',
      checkIn: '2026-06-20',
      checkOut: '2026-06-25',
      guests: 3,
      status: 'pending',
      total: '$7,500 MXN',
      bookingDate: '2026-04-10'
    },
    {
      id: 'R-1102',
      room: 'Habitación Estándar',
      checkIn: '2026-02-14',
      checkOut: '2026-02-16',
      guests: 2,
      status: 'cancelled',
      total: '$2,800 MXN',
      bookingDate: '2026-01-05'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'confirmed':
        return {
          icon: <CheckCircle2 size={18} className="text-green-500" />,
          text: 'Confirmada',
          classes: 'bg-green-50 text-green-700 border-green-200'
        };
      case 'pending':
        return {
          icon: <Clock size={18} className="text-yellow-500" />,
          text: 'Pendiente de Pago',
          classes: 'bg-yellow-50 text-yellow-700 border-yellow-200'
        };
      case 'cancelled':
        return {
          icon: <XCircle size={18} className="text-red-500" />,
          text: 'Cancelada',
          classes: 'bg-red-50 text-red-700 border-red-200'
        };
      default:
        return {
          icon: <Clock size={18} className="text-gray-500" />,
          text: 'Desconocido',
          classes: 'bg-gray-50 text-gray-700 border-gray-200'
        };
    }
  };

  const filteredReservations = reservations.filter(r => {
    if (activeFilter === 'all') return true;
    const today = new Date('2026-04-13'); // Today's date mock
    const checkInDate = new Date(r.checkIn);
    
    if (activeFilter === 'upcoming') {
      return checkInDate >= today && r.status !== 'cancelled';
    } else {
      return checkInDate < today || r.status === 'cancelled';
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-white flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Volver al inicio
            </button>
            <h1 className="text-3xl md:text-4xl font-serif text-primary-darker mb-2">
              Mis Reservaciones
            </h1>
            <p className="text-muted-foreground text-lg">
              Consulta el historial y estado de tus estancias en Quinta Dalam.
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white text-muted-foreground border border-border hover:bg-muted'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setActiveFilter('upcoming')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === 'upcoming' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white text-muted-foreground border border-border hover:bg-muted'
              }`}
            >
              Próximas Estancias
            </button>
            <button
              onClick={() => setActiveFilter('past')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === 'past' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white text-muted-foreground border border-border hover:bg-muted'
              }`}
            >
              Historial
            </button>
          </div>

          {/* Reservations List */}
          <div className="space-y-6">
            {filteredReservations.length > 0 ? (
              filteredReservations.map((reservation) => {
                const status = getStatusConfig(reservation.status);
                
                return (
                  <div key={reservation.id} className="card-primary p-6 md:p-8 rounded-2xl relative overflow-hidden group">
                    <div className={`absolute top-0 left-0 w-1.5 h-full ${status.classes.split(' ')[0]}`}></div>
                    
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="text-xs font-bold text-primary tracking-wider uppercase">
                            #{reservation.id}
                          </span>
                          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${status.classes}`}>
                            {status.icon}
                            {status.text}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-serif text-foreground mb-4">
                          {reservation.room}
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Check-in</p>
                            <p className="font-medium text-foreground">{reservation.checkIn}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Check-out</p>
                            <p className="font-medium text-foreground">{reservation.checkOut}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Huéspedes</p>
                            <p className="font-medium text-foreground">{reservation.guests} Personas</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total</p>
                            <p className="font-bold text-primary">{reservation.total}</p>
                          </div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground">
                          Reservado el {reservation.bookingDate}
                        </p>
                      </div>

                      <div className="flex flex-col justify-end gap-3 md:w-48">
                        {reservation.status === 'pending' && (
                          <button className="btn-primary w-full py-2.5 rounded-xl text-white font-medium text-sm shadow-md hover:shadow-lg transition-all">
                            Pagar Ahora
                          </button>
                        )}
                        {reservation.status === 'confirmed' && (
                          <button className="bg-white border border-primary text-primary w-full py-2.5 rounded-xl font-medium text-sm hover:bg-primary/5 transition-all">
                            Ver Detalles
                          </button>
                        )}
                        {reservation.status !== 'cancelled' && (
                          <button className="text-destructive text-sm font-medium hover:text-destructive/80 transition-colors py-2">
                            Cancelar Reservación
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-border border-dashed">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                  <Calendar size={32} />
                </div>
                <h3 className="text-xl font-serif text-foreground mb-2">No hay reservaciones</h3>
                <p className="text-muted-foreground mb-6">
                  {activeFilter === 'all' 
                    ? 'Aún no tienes reservaciones en Quinta Dalam.' 
                    : 'No se encontraron reservaciones para este filtro.'}
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="btn-primary px-8 py-3 rounded-xl text-white font-medium shadow-md transition-all inline-flex items-center gap-2"
                >
                  <Search size={18} />
                  Explorar Habitaciones
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
