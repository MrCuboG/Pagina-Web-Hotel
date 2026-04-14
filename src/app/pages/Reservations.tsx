import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Calendar, Users, Bed, CreditCard, User, Mail, Phone, MapPin } from 'lucide-react';

const roomTypes = [
  { value: 'deluxe', label: 'Suite Deluxe', price: 2500 },
  { value: 'ejecutiva', label: 'Habitación Ejecutiva', price: 1800 },
  { value: 'familiar', label: 'Habitación Familiar', price: 2200 }
];

export function Reservations() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    roomType: 'deluxe',
    guests: '2',
    fullName: user?.username || '',
    email: user?.email || '',
    phone: '',
    address: '',
    specialRequests: ''
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);
      const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    const room = roomTypes.find(r => r.value === formData.roomType);
    return calculateNights() * (room?.price || 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Guardar la reservación en localStorage
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const newReservation = {
      id: Date.now().toString(),
      userId: user?.id,
      ...formData,
      nights: calculateNights(),
      total: calculateTotal(),
      status: 'pendiente',
      createdAt: new Date().toISOString()
    };

    reservations.push(newReservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));

    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-950 to-indigo-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-purple-200/40 text-center">
          <div className="inline-block p-4 bg-gradient-to-br from-green-600 to-green-500 rounded-full mb-4">
            <Calendar size={40} className="text-white" />
          </div>
          <h2 className="text-3xl mb-4 text-foreground">¡Reservación Exitosa!</h2>
          <p className="text-muted-foreground mb-6">
            Tu reservación ha sido confirmada. Recibirás un correo electrónico con los detalles.
          </p>
          <div className="bg-purple-50/50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-muted-foreground mb-2">Resumen de la reservación:</p>
            <p className="text-foreground"><strong>Habitación:</strong> {roomTypes.find(r => r.value === formData.roomType)?.label}</p>
            <p className="text-foreground"><strong>Check-in:</strong> {new Date(formData.checkIn).toLocaleDateString('es-MX')}</p>
            <p className="text-foreground"><strong>Check-out:</strong> {new Date(formData.checkOut).toLocaleDateString('es-MX')}</p>
            <p className="text-foreground"><strong>Noches:</strong> {calculateNights()}</p>
            <p className="text-foreground"><strong>Huéspedes:</strong> {formData.guests}</p>
            <p className="text-lg font-bold text-primary mt-2"><strong>Total:</strong> ${calculateTotal().toLocaleString('es-MX')}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-purple-900 to-purple-800 hover:from-purple-950 hover:to-purple-900 text-white py-3 rounded-lg transition-all shadow-md font-medium"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-950 to-indigo-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-purple-200/40">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl mb-4">
              <Calendar size={40} className="text-white" />
            </div>
            <h1 className="text-3xl mb-2 text-foreground">Quinta Dalam</h1>
            <p className="text-muted-foreground">Completa tu Reservación</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-foreground font-medium">
                  Fecha de Llegada
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-200/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-foreground font-medium">
                  Fecha de Salida
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-200/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Tipo de habitación y huéspedes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-foreground font-medium">
                  Tipo de Habitación
                </label>
                <div className="relative">
                  <Bed className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-200/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                  >
                    {roomTypes.map(room => (
                      <option key={room.value} value={room.value}>
                        {room.label} - ${room.price}/noche
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-foreground font-medium">
                  Número de Huéspedes
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-200/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'personas'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Información del huésped */}
            <div className="border-t border-purple-200/50 pt-6">
              <h3 className="text-xl text-foreground mb-4">Información del Huésped</h3>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-foreground font-medium">
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-200/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Juan Pérez García"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-foreground font-medium">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-200/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-foreground font-medium">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-200/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-foreground font-medium">
                    Dirección
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-200/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Calle, Número, Ciudad, Estado"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-foreground font-medium">
                    Solicitudes Especiales (Opcional)
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-purple-200/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Ej: Cama extra, preferencias alimentarias, hora de llegada tardía..."
                  />
                </div>
              </div>
            </div>

            {/* Resumen */}
            {formData.checkIn && formData.checkOut && calculateNights() > 0 && (
              <div className="bg-purple-50/50 rounded-lg p-6 border border-purple-200/40">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="text-primary" size={24} />
                  <h3 className="text-xl text-foreground">Resumen de la Reservación</h3>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>{roomTypes.find(r => r.value === formData.roomType)?.label}</span>
                    <span>${roomTypes.find(r => r.value === formData.roomType)?.price.toLocaleString('es-MX')}/noche</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Número de noches</span>
                    <span>{calculateNights()}</span>
                  </div>
                  <div className="border-t border-purple-200/50 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold text-primary">
                      <span>Total</span>
                      <span>${calculateTotal().toLocaleString('es-MX')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg transition-all font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-900 to-purple-800 hover:from-purple-950 hover:to-purple-900 text-white py-3 rounded-lg transition-all shadow-md font-medium"
              >
                Confirmar Reservación
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
