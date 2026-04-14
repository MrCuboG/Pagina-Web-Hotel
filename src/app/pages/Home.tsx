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
      setTimeout(() => {
        const element = document.getElementById('contacto');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
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