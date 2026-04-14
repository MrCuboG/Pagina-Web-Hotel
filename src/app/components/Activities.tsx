import { Heart, Sparkles, Wine, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Activities() {
  const navigate = useNavigate();

  return (
    <section id="actividades" className="py-24 bg-gradient-to-b from-white to-purple-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles size={16} />
            <span>Experiencias Exclusivas</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-primary-darker mb-6">Actividades y Eventos</h2>
          <p className="text-muted-foreground text-lg">
            Descubre momentos inolvidables en Quinta Dalam. Desde celebraciones magistrales hasta espacios diseñados para tu bienestar absoluto.
          </p>
        </div>

        {/* Bodas - Featured Section */}
        <div className="relative rounded-3xl overflow-hidden mb-16 shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1738669469338-801b4e9dbccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGVnYW50JTIwd2VkZGluZyUyMGRpbm5lcnxlbnwxfHx8fDE3NzYxMDY1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Bodas en Quinta Dalam" 
            className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 md:p-16 max-w-2xl">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 border border-white/30">
              <Heart className="text-white" size={32} />
            </div>
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-4">Bodas de Ensueño</h3>
            <p className="text-purple-100 text-lg md:text-xl mb-8 leading-relaxed">
              Haz de tu día especial un evento verdaderamente inolvidable. Nuestros espacios elegantes, jardines exquisitos y servicio impecable crearán el escenario perfecto para celebrar tu amor.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary px-8 py-3 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-fit"
              >
                Planear mi Boda
              </button>
            </div>
          </div>
        </div>

        {/* Other Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gastronomía */}
          <div className="card-primary rounded-2xl overflow-hidden group">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1775498017681-b95215dd704f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzc2MTA2NTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Gastronomía Gourmet" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Wine size={24} />
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-3">Alta Gastronomía</h3>
              <p className="text-muted-foreground mb-6">
                Deleita tu paladar con nuestra propuesta culinaria que fusiona la tradición michoacana con técnicas de vanguardia internacional.
              </p>
              <button 
                onClick={() => navigate('/reservations')}
                className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all"
              >
                Reservar Mesa <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Spa & Bienestar */}
          <div className="card-primary rounded-2xl overflow-hidden group">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlJTIwcmVsYXh8ZW58MXx8fHwxNzc2MDU1Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Spa y Bienestar" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-3">Spa & Bienestar Absoluto</h3>
              <p className="text-muted-foreground mb-6">
                Renuévate en nuestro santuario de relajación. Tratamientos exclusivos diseñados para equilibrar cuerpo, mente y espíritu.
              </p>
              <button 
                onClick={() => navigate('/reservations')}
                className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all"
              >
                Ver Tratamientos <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
