import { useState } from 'react';
import { useNavigate } from 'react-router';
import Slider from 'react-slick';
import { Calendar as CalendarIcon, Users, Sparkles, Search } from 'lucide-react';
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

export function HeroCarousel() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const handleQuickReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/reservations', { state: { checkIn, checkOut, guests } });
    } else {
      navigate('/login', { state: { from: '/reservations', checkIn, checkOut, guests } });
    }
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

        <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 max-w-4xl mx-auto transform translate-y-1/2">
          <form onSubmit={handleQuickReservation} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-muted/50 rounded-xl p-3 border border-border">
              <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">Check-in</label>
              <div className="flex items-center gap-2 text-foreground">
                <CalendarIcon size={18} className="text-primary" />
                <input type="date" required value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="bg-transparent w-full focus:outline-none font-medium cursor-pointer" />
              </div>
            </div>
            <div className="flex-1 bg-muted/50 rounded-xl p-3 border border-border">
              <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">Check-out</label>
              <div className="flex items-center gap-2 text-foreground">
                <CalendarIcon size={18} className="text-primary" />
                <input type="date" required value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="bg-transparent w-full focus:outline-none font-medium cursor-pointer" />
              </div>
            </div>
            <div className="flex-1 bg-muted/50 rounded-xl p-3 border border-border">
              <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">Huéspedes</label>
              <div className="flex items-center gap-2 text-foreground">
                <Users size={18} className="text-primary" />
                <select value={guests} onChange={(e) => setGuests(e.target.value)} className="bg-transparent w-full focus:outline-none font-medium cursor-pointer">
                  <option value="1">1 Persona</option>
                  <option value="2">2 Personas</option>
                  <option value="3">3 Personas</option>
                  <option value="4">4 Personas</option>
                  <option value="5">5+ Personas</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn-primary px-8 py-4 rounded-xl text-white font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all md:w-auto h-full">
              <Search size={20} />
              <span className="md:hidden lg:inline">Buscar Disponibilidad</span>
              <span className="hidden md:inline lg:hidden">Buscar</span>
            </button>
          </form>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-8 text-white/80 pointer-events-none hidden md:flex">
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
        input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0; position: absolute; right: 0; top: 0; width: 100%; height: 100%; }
        .slick-slide img { transition: transform 10s ease-out; transform: scale(1); }
        .slick-active img { transform: scale(1.05); }
      `}</style>
    </section>
  );
}