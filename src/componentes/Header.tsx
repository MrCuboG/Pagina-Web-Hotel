import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur-sm shadow-md fixed w-full top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl text-primary font-bold">Quinta Dalam</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-foreground hover:text-accent transition-colors font-medium">Inicio</a>
            <a href="#habitaciones" className="text-foreground hover:text-accent transition-colors font-medium">Habitaciones</a>
            <a href="#servicios" className="text-foreground hover:text-accent transition-colors font-medium">Servicios</a>
            <a href="#galeria" className="text-foreground hover:text-accent transition-colors font-medium">Galería</a>
            <a href="#ubicacion" className="text-foreground hover:text-accent transition-colors font-medium">Ubicación</a>
            <a href="#contacto" className="text-foreground hover:text-accent transition-colors font-medium">Contacto</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-primary-foreground px-6 py-2 rounded-lg transition-all shadow-md hover:shadow-primary/20 active:scale-95">
              Reservar Ahora
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              <a href="#inicio" className="text-foreground hover:text-accent transition-colors py-2 font-medium">Inicio</a>
              <a href="#habitaciones" className="text-foreground hover:text-accent transition-colors py-2 font-medium">Habitaciones</a>
              <a href="#servicios" className="text-foreground hover:text-accent transition-colors py-2 font-medium">Servicios</a>
              <a href="#galeria" className="text-foreground hover:text-accent transition-colors py-2 font-medium">Galería</a>
              <a href="#ubicacion" className="text-foreground hover:text-accent transition-colors py-2 font-medium">Ubicación</a>
              <a href="#contacto" className="text-foreground hover:text-accent transition-colors py-2 font-medium">Contacto</a>
              <button className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-primary-foreground px-6 py-3 rounded-lg w-full font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-all mt-2">
                Reservar Ahora
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}