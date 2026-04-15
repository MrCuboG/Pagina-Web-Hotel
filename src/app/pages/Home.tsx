import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Header } from '../components/Header';
import { HeroCarousel } from '../components/HeroCarousel';
import { Rooms } from '../components/Rooms';
import { Activities } from '../components/Activities';
import { Services } from '../components/Services';
import { Gallery } from '../components/Gallery';
import { Reviews } from '../components/Reviews';
import { Location } from '../components/Location';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.irAContacto) {
      const scrollAlFormulario = () => {
        const element = document.getElementById('formulario-contacto');
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      };

      // Primer intento de scroll
      setTimeout(scrollAlFormulario, 150);
      // Segundo intento en caso de que las imágenes del Home desplazaran el contenido
      setTimeout(scrollAlFormulario, 800);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <HeroCarousel />
        <Rooms />
        <Activities />
        <Services />
        <Gallery />
        <Reviews />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}