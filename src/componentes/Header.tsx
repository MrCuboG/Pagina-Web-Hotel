import { Menu, X, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-md fixed w-full top-0 z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl text-primary">Quinta Dalam</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors">Inicio</a>
            <a href="#habitaciones" className="text-foreground hover:text-primary transition-colors">Habitaciones</a>
            <a href="#servicios" className="text-foreground hover:text-primary transition-colors">Servicios</a>
            <a href="#galeria" className="text-foreground hover:text-primary transition-colors">Galería</a>
            <a href="#ubicacion" className="text-foreground hover:text-primary transition-colors">Ubicación</a>
            <a href="#contacto" className="text-foreground hover:text-primary transition-colors">Contacto</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-linear-to-r from-[#1D0B21] to-[#4a3452] hover:from-[#2d1233] hover:to-[#5d4266] text-white px-6 py-2 rounded-lg transition-all shadow-md active:scale-95">
              Reservar Ahora
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              <a href="#inicio" className="text-foreground hover:text-primary transition-colors py-2">Inicio</a>
              <a href="#habitaciones" className="text-foreground hover:text-primary transition-colors py-2">Habitaciones</a>
              <a href="#servicios" className="text-foreground hover:text-primary transition-colors py-2">Servicios</a>
              <a href="#galeria" className="text-foreground hover:text-primary transition-colors py-2">Galería</a>
              <a href="#ubicacion" className="text-foreground hover:text-primary transition-colors py-2">Ubicación</a>
              <a href="#contacto" className="text-foreground hover:text-primary transition-colors py-2">Contacto</a>
              <button className="bg-linear-to-r from-[#1D0B21] to-[#4a3452] text-white px-6 py-3 rounded-lg w-full font-semibold shadow-lg active:scale-95 transition-transform mt-2">
                Reservar Ahora
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
