import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary via-secondary to-primary text-primary-foreground py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl mb-4 font-medium">Quinta Dalam</h3>
            <p className="text-primary-foreground/80">
              Hospitalidad y elegancia mexicana en el corazón de Michoacán
            </p>
          </div>

          <div>
            <h4 className="text-lg mb-4 font-medium">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-primary-foreground/80 hover:text-accent transition-colors">Inicio</a></li>
              <li><a href="#habitaciones" className="text-primary-foreground/80 hover:text-accent transition-colors">Habitaciones</a></li>
              <li><a href="#servicios" className="text-primary-foreground/80 hover:text-accent transition-colors">Servicios</a></li>
              <li><a href="#galeria" className="text-primary-foreground/80 hover:text-accent transition-colors">Galería</a></li>
              <li><a href="#ubicacion" className="text-primary-foreground/80 hover:text-accent transition-colors">Ubicación</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg mb-4 font-medium">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Política de Cancelación</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg mb-4 font-medium">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-primary-foreground/70 text-sm">
            &copy; 2026 Hotel Quinta Dalam. Todos los derechos reservados. Desarrollado con pasión en Michoacán.
          </p>
        </div>
      </div>
    </footer>
  );
}