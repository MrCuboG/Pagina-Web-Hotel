import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Calendar, Users, Bed, CreditCard, User, Mail, Phone, MapPin, ShieldCheck, CheckCircle2, ChevronRight, ArrowLeft, Info, Receipt } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const fallbackRooms = [
  { label: 'Suite Principal', price: 2500 },
  { label: 'Suite Romántica', price: 1800 },
  { label: 'Familiar', price: 2200 },
  { label: 'Presidential Suite', price: 4500 }
];

export function Reservations() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    roomType: location.state?.roomName || fallbackRooms[0].label,
    roomPrice: location.state?.price || fallbackRooms[0].price,
    guests: '2',
    fullName: user?.username || '',
    email: user?.email || '',
    phone: '',
    address: '',
    specialRequests: '',
    paymentMethod: 'card' as 'card' | 'paypal',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: ''
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reservationId, setReservationId] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoom = fallbackRooms.find(r => r.label === e.target.value);
    if (selectedRoom) {
      setFormData({
        ...formData,
        roomType: selectedRoom.label,
        roomPrice: selectedRoom.price
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCardNumberFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    setFormData({ ...formData, cardNumber: value });
  };

  const handleExpiryFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setFormData({ ...formData, cardExpiry: value });
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

  const nights = calculateNights();
  const subtotal = nights * formData.roomPrice;
  const taxesIVA = subtotal * 0.16;
  const taxesISH = subtotal * 0.03;
  const total = subtotal + taxesIVA + taxesISH;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
       alert("Inicia sesión para poder realizar una prueba de reserva (Prueba DB)");
       return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reservaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          roomType: formData.roomType,
          guests: parseInt(formData.guests),
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          specialRequests: formData.specialRequests,
          total
        })
      });

      const data = await response.json();

      if (!response.ok) {
         alert("Error DB: " + data.message);
         return;
      }

      setReservationId(data.reservationId);
      setShowConfirmation(true);
      window.scrollTo(0, 0);

    } catch (err) {
       console.error("Fetch DB error:", err);
       alert("Error de conexión al servidor DB");
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        {/* Confetti effect placeholder */}
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative">
          <div className="h-32 bg-gradient-to-br from-purple-800 to-indigo-900 absolute top-0 w-full" />

          <div className="relative pt-16 px-8 pb-8 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10 border-4 border-gray-50">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>

            <h2 className="text-3xl font-serif text-gray-900 mb-2">¡Reserva Confirmada!</h2>
            <p className="text-gray-500 mb-8">Tu estancia de lujo te está esperando.</p>

            <div className="border border-dashed border-gray-300 rounded-2xl p-6 bg-gray-50 text-left mb-8 relative">
              {/* Ticket cutouts */}
              <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white rounded-full border-r border-gray-200" />
              <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white rounded-full border-l border-gray-200" />

              <div className="text-sm text-gray-500 mb-1">CÓDIGO DE RESERVA</div>
              <div className="text-2xl font-mono font-bold text-purple-900 mb-6">{reservationId}</div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Llegada</div>
                  <div className="font-medium text-gray-900 mt-1">{new Date(formData.checkIn).toLocaleDateString('es-MX', { timeZone: 'UTC', day: 'numeric', month: 'short' })}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Salida</div>
                  <div className="font-medium text-gray-900 mt-1">{new Date(formData.checkOut).toLocaleDateString('es-MX', { timeZone: 'UTC', day: 'numeric', month: 'short' })}</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl transition-all font-medium flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-700 mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Volver</span>
        </button>

        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-2">Completar Reservación</h1>
          <p className="text-gray-500">Estás a un paso de asegurar tu estancia en Quinta Dalam.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column - Form */}
          <div className="lg:col-span-8 space-y-10">

            {/* Section 1: Tu Viaje */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-sm">1</span>
                Tu Viaje
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Llegada</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salida</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      min={formData.checkIn || new Date().toISOString().split('T')[0]}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Si no vino con state (alguien entro por url), mostrar selector */}
                {!location.state?.roomName && (
                  <div className="col-span-1 md:col-span-2 mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona la habitación</label>
                    <div className="relative">
                      <Bed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <select
                        value={formData.roomType}
                        onChange={handleRoomChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all appearance-none"
                      >
                        {fallbackRooms.map(r => (
                          <option key={r.label} value={r.label}>{r.label} - ${r.price}/noche</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Huéspedes</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all appearance-none"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'huésped' : 'huéspedes'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Datos del Huesped */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-sm">2</span>
                Tus Datos
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Como aparece en tu identificación"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="tu@email.com"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+52 (443) 123-4567"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Solicitudes Especiales (Opcional)</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Celebraciones especiales, requerimientos dietéticos u horarios de llegada..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Pago */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-sm">3</span>
                Método de Pago
              </h2>

              <div className="flex gap-4 mb-8">
                <label className={`cursor-pointer flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${formData.paymentMethod === 'card' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} className="hidden" />
                  <CreditCard size={24} className={formData.paymentMethod === 'card' ? 'text-purple-700' : 'text-gray-400'} />
                  <span className={`mt-2 text-sm font-medium ${formData.paymentMethod === 'card' ? 'text-purple-900' : 'text-gray-500'}`}>Tarjeta</span>
                </label>
                <label className={`cursor-pointer flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${formData.paymentMethod === 'paypal' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleChange} className="hidden" />
                  <svg className={`w-6 h-6 ${formData.paymentMethod === 'paypal' ? 'fill-purple-700' : 'fill-gray-400'}`} viewBox="0 0 24 24"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" /></svg>
                  <span className={`mt-2 text-sm font-medium ${formData.paymentMethod === 'paypal' ? 'text-purple-900' : 'text-gray-500'}`}>PayPal</span>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número de Tarjeta</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberFormat}
                        placeholder="0000 0000 0000 0000"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiración</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleExpiryFormat}
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                          setFormData({ ...formData, cardCvc: val });
                        }}
                        placeholder="123"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Titular</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="Como aparece en la tarjeta"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'paypal' && (
                <div className="text-center p-8 border border-gray-200 rounded-xl bg-gray-50">
                  <p className="text-gray-600">Serás redirigido a PayPal para completar tu pago de forma segura después de confirmar tu reservación.</p>
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              {/* Room Image Placeholder / Title */}
              <div className="h-48 bg-gradient-to-br from-purple-800 to-indigo-900 relative">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full mb-2 inline-block">Hotel Quinta Dalam</span>
                  <h3 className="text-2xl font-serif text-white">{formData.roomType}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Llegada</p>
                      <p className="font-medium text-gray-900">
                        {formData.checkIn ? new Date(formData.checkIn).toLocaleDateString('es-MX', { timeZone: 'UTC', day: 'numeric', month: 'short' }) : '---'}
                      </p>
                    </div>
                    <div className="w-1/2">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Salida</p>
                      <p className="font-medium text-gray-900">
                        {formData.checkOut ? new Date(formData.checkOut).toLocaleDateString('es-MX', { timeZone: 'UTC', day: 'numeric', month: 'short' }) : '---'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Huéspedes</p>
                    <p className="font-medium text-gray-900">{formData.guests} {parseInt(formData.guests) === 1 ? 'huésped' : 'huéspedes'}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <Receipt size={18} />
                    Detalles del Precio
                  </h4>

                  {nights > 0 ? (
                    <>
                      <div className="flex justify-between text-gray-600">
                        <span>${formData.roomPrice.toLocaleString()} x {nights} {nights === 1 ? 'noche' : 'noches'}</span>
                        <span>${subtotal.toLocaleString('es-MX')}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span className="flex items-center gap-1">IVA (16%) <Info size={12} className="text-gray-400" /></span>
                        <span>${taxesIVA.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span className="flex items-center gap-1">Impuesto Estatal (3%)</span>
                        <span>${taxesISH.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                      </div>

                      <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-100">
                        <span>Total (MXN)</span>
                        <span>${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">Selecciona tus fechas para calcular el total.</p>
                  )}
                </div>

                <div className="mb-6 flex items-start gap-3 bg-green-50 p-4 rounded-xl">
                  <ShieldCheck size={20} className="text-green-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-green-800 leading-relaxed">
                    Pagos cifrados y seguros. Usamos tecnología de punta para proteger tu información.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={nights === 0}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${nights === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-purple-900 hover:bg-purple-800 text-white shadow-xl hover:shadow-purple-900/30 active:scale-[0.98]'}`}
                >
                  <ShieldCheck size={18} />
                  Confirmar y Guardar en DB (Modo Prueba)
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
