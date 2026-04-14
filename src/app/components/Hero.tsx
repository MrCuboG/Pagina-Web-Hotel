import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, Users, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20"></div>

      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1691819989627-3e568cd2119e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Hotel Quinta Dalam"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-block mb-4 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30">
          <span className="text-primary">Bienvenido a Michoacán</span>
        </div>

        <h1 className="text-5xl md:text-7xl mb-6 text-foreground">
          Quinta Dalam
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
          Experimenta la elegancia y hospitalidad mexicana en el corazón de Michoacán
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="bg-primary hover:bg-accent text-primary-foreground px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg">
            Reservar Habitación
          </button>
          <button className="bg-white/90 hover:bg-white text-primary px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg border border-primary/20">
            Ver Galería
          </button>
        </div>

        <div className="flex flex-wrap gap-6 justify-center items-center text-foreground/80">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Calendar className="text-primary" size={20} />
            <span>Disponibilidad en tiempo real</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Users className="text-primary" size={20} />
            <span>Atención personalizada</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Sparkles className="text-primary" size={20} />
            <span>Experiencia única</span>
          </div>
        </div>
      </div>
    </section>
  );
}
