import { Header } from './componentes/Header';
import { HeroCarousel } from './componentes/HeroCarousel';
import { Rooms } from './componentes/Rooms';
import { Services } from './componentes/Services';
import { Gallery } from './componentes/Gallery';
import { Location } from './componentes/Location';
import { Contact } from './componentes/Contact';
import { Footer } from './componentes/Footer';
import './styles/index.css';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <HeroCarousel />
        <Rooms />
        <Services />
        <Gallery />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}