import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import Slider from 'react-slick';
import { Calendar as CalendarIcon, Users, Sparkles, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from "../../imports/lobby.jpg";
import img2 from "../../imports/entrada.jpg";
import img3 from "../../imports/paisaje.jpg";
import img4 from "../../imports/salalobby2.jpg";

const heroImages = [
  { url: img1, alt: "Hotel Quinta Dalam - Vista Principal" },
  { url: img2, alt: "Hotel Quinta Dalam - Habitaciones" },
  { url: img3, alt: "Hotel Quinta Dalam - Servicios" },
  { url: img4, alt: "Hotel Quinta Dalam - Instalaciones" }
];

function getTodayStr() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function addDays(dateStr: string, days: number): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function HeroCarousel() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const today = useMemo(() => getTodayStr(), []);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  // Min date for checkout: day after checkin (or tomorrow if no checkin)
  const minCheckOut = useMemo(() => {
    if (checkIn) return addDays(checkIn, 1);
    return addDays(today, 1);
  }, [checkIn, today]);

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCheckIn(val);
    // If existing checkout is not after new checkin, reset it
    if (checkOut && checkOut <= val) {
      setCheckOut('');
    }
  };

  const handleQuickReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return;
    if (isAuthenticated) {
      navigate('/reservations', { state: { checkIn, checkOut, guests } });
    } else {
      navigate('/login', { state: { from: '/reservations', checkIn, checkOut, guests } });
    }
  };

  const scrollToGallery = () => {
    const gallery = document.getElementById('galeria');
    if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    pauseOnHover: false,
    arrows: false
  };

  return (
    <section id="inicio" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-purple-900/40 to-black/60 z-10"></div>

      <div className="absolute inset-0 z-0">
        <Slider {...settings} className="h-full">
          {heroImages.map((image, index) => (
            <div key={index} className="h-screen outline-none">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover scale-105 transform transition-transform duration-[10000ms] ease-out"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
        <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <span className="text-white text-sm font-medium tracking-wider uppercase">Bienvenido a Michoacán</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 text-white font-serif drop-shadow-lg">
          Quinta Dalam
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-purple-50 max-w-3xl mx-auto font-light drop-shadow-md">
          Experimenta la elegancia y hospitalidad mexicana en el corazón de Michoacán
        </p>

        {/* Quick Reservation Bar */}
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 max-w-4xl mx-auto mt-8">
          <form onSubmit={handleQuickReservation} className="flex flex-col md:flex-row gap-4 items-stretch">

            {/* Check In */}
            <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200 hover:border-purple-400 transition-colors">
              <label className="block text-xs font-semibold text-purple-700 uppercase tracking-wider mb-1">Check-in</label>
              <div className="flex items-center gap-2">
                <CalendarIcon size={18} className="text-purple-600 shrink-0" />
                <input
                  type="date"
                  required
                  value={checkIn}
                  min={today}
                  onChange={handleCheckInChange}
                  className="bg-transparent w-full focus:outline-none text-gray-800 cursor-pointer date-input"
                  style={{ colorScheme: 'light' }}
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200 hover:border-purple-400 transition-colors">
              <label className="block text-xs font-semibold text-purple-700 uppercase tracking-wider mb-1">Check-out</label>
              <div className="flex items-center gap-2">
                <CalendarIcon size={18} className="text-purple-600 shrink-0" />
                <input
                  type="date"
                  required
                  value={checkOut}
                  min={minCheckOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent w-full focus:outline-none text-gray-800 cursor-pointer date-input"
                  style={{ colorScheme: 'light' }}
                />
              </div>
            </div>

            {/* Guests */}

            <div className="flex-1 min-w-[180px] bg-gray-50 rounded-xl p-3 border border-gray-200 hover:border-purple-400 transition-colors">
              <label className="block text-xs font-semibold text-purple-700 uppercase tracking-wider mb-1">Huéspedes</label>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-purple-600 shrink-0" />
                <div className="relative w-full">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-gray-800 cursor-pointer appearance-none pr-6"
                  >
                    <option value="1">1 Persona</option>
                    <option value="2">2 Personas</option>
                    <option value="3">3 Personas</option>
                    <option value="4">4 Personas</option>
                    <option value="5">5+ Personas</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary px-8 py-4 rounded-xl text-white font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all md:w-auto"
            >
              <Search size={20} />
              <span className="md:hidden lg:inline">Buscar Disponibilidad</span>
              <span className="hidden md:inline lg:hidden">Buscar</span>
            </button>
          </form>
        </div>
      </div>

      {/* Decorative floating indicators */}
        <div className="absolute bottom-24 left-0 right-0 z-20 flex justify-center gap-8 text-white/80 pointer-events-none hidden md:flex">
        <div className="flex items-center gap-2">
          <CalendarIcon size={16} />
          <span className="text-sm font-medium">Reservación inmediata</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-white/50 self-center"></div>
        <div className="flex items-center gap-2">
          <Users size={16} />
          <span className="text-sm font-medium">Atención 24/7</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-white/50 self-center"></div>
        <div className="flex items-center gap-2">
          <Sparkles size={16} />
          <span className="text-sm font-medium">Estancias únicas</span>
        </div>
      </div>

      <style>{`
        .slick-dots { bottom: 40px; z-index: 20; }
        .slick-dots li button:before { color: white; opacity: 0.4; font-size: 12px; }
        .slick-dots li.slick-active button:before { color: white; opacity: 1; }
        .slick-slide img { transition: transform 10s ease-out; transform: scale(1); }
        .slick-active img { transform: scale(1.05); }
        .date-input::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.6;
          filter: invert(30%) sepia(60%) saturate(600%) hue-rotate(240deg);
        }
        .date-input::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }
        .date-input::-webkit-datetime-edit-fields-wrapper { padding: 0; }
        .date-input::-webkit-datetime-edit { padding: 0; }
      `}</style>
    </section>
  );
}