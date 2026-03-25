import lago from '../assets/lago.jpeg';

import { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, Users, Sparkles } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const heroImages = [
  
  {
    url: "https://scontent.fmlm4-1.fna.fbcdn.net/v/t39.30808-6/571275208_1399777288818542_3304645827336700935_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=7NASR8KyxS4Q7kNvwElRFV0&_nc_oc=Ado0uQrnGim6PZWBUfYsUGhUWa-PKJvlvEd9pwlFR5kiHgCS6BWq3jnDeuQ3J7mU0gQ&_nc_zt=23&_nc_ht=scontent.fmlm4-1.fna&_nc_gid=hEXSsxbbXsPcBXRIm3F-nQ&_nc_ss=7a30f&oh=00_Afz--VUdEKBBJm2d2q_zEArdUxMvdx3Mt-Y8YOq67IwoqQ&oe=69C38219",
    alt: "Hotel Quinta Dalam - Habitaciones"
  },
  {
    url: lago,
    alt: "Hotel Quinta Dalam - Vista Principal"
  },
  {
    url: "https://scontent.fmlm4-1.fna.fbcdn.net/v/t39.30808-6/571105346_1399777245485213_6470789982953865444_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_ohc=t7QgktaNOkcQ7kNvwFdaNy6&_nc_oc=AdpccUXU7vSQV31vEwkjG41bw7HlTImIz34Ft25OXTpQCeQ6qk1-E2aDDo4afjPGBhM&_nc_zt=23&_nc_ht=scontent.fmlm4-1.fna&_nc_gid=7mQMkpoCzkhIG1875xfinA&_nc_ss=7a30f&oh=00_AfwFAYGIOeYD9Ub_dt9--v60LIaBVDxLe_-8j--8UrJ02g&oe=69C371BF",
    alt: "Hotel Quinta Dalam - Servicios"
  },
  {
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    alt: "Hotel Quinta Dalam - Instalaciones"
  }
];

export function HeroCarousel() {
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
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1D0B21]/40 via-[#4a3452]/20 to-[#7b5c8c]/30"></div>

      <div className="absolute inset-0 z-0">
        <Slider {...settings} className="h-full">
          {heroImages.map((image, index) => (
            <div key={index} className="h-screen">
              <ImageWithFallback
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-[#1D0B21]/20 to-[#7b5c8c]/20 backdrop-blur-sm rounded-full border border-[#7b5c8c]/30 shadow-sm">
          <span className="text-muted font-medium tracking-wide">
            Bienvenido a Michoacán
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl mb-6 text-white font-bold drop-shadow-md">
          Quinta Dalam
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-muted max-w-3xl mx-auto drop-shadow-sm">
          Experimenta la humildad y hospitalidad mexicana en el corazón de Michoacán
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button 
            className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-primary-foreground px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-xl shadow-primary/20 font-medium"
            onClick={() => document.getElementById('habitaciones')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Reservar Habitación
          </button>
          <button 
            className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-primary-foreground px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-xl shadow-primary/20 font-medium"
            onClick={() => document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Galería
          </button>
        </div>

        <div className="flex flex-wrap gap-6 justify-center items-center text-white">
          <div className="flex items-center gap-2 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-lg text-foreground border border-border shadow-sm">
            <Calendar className="text-primary" size={20} />
            <span className="font-medium">Disponibilidad en tiempo real</span>
          </div>
          <div className="flex items-center gap-2 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-lg text-foreground border border-border shadow-sm">
            <Users className="text-primary" size={20} />
            <span className="font-medium">Atención personalizada</span>
          </div>
          <div className="flex items-center gap-2 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-lg text-foreground border border-border shadow-sm">
            <Sparkles className="text-primary" size={20} />
            <span className="font-medium">Experiencia única</span>
          </div>
        </div>
      </div>

      <style>{`
        .slick-dots {
          bottom: 20px;
        }
        .slick-dots li button:before {
          color: white;
          opacity: 0.5;
          font-size: 10px;
        }
        .slick-dots li.slick-active button:before {
          color: white;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
