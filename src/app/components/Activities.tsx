import { Heart, Sparkles, Wine, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import bodaImg from "../../imports/Boda.jpeg";
import albercaImg from "../../imports/alberca.jpeg";
import restauranteImg from "../../imports/restaurante.jpeg";

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
            src={bodaImg}
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
          {/* Alberca */}
          <div className="card-primary rounded-2xl overflow-hidden group">
            <div className="h-64 overflow-hidden">
              <img 
                src={albercaImg}
                alt="Disfruta de nuestra alberca" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Wine size={24} />
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-3">Alberca Climatizada</h3>
              <p className="text-muted-foreground mb-6">
                Disfruta de nuestra alberca climatizada, un oasis de relajación donde podrás nadar bajo el cielo abierto o simplemente descansar junto al agua en un ambiente de tranquilidad absoluta.
              </p>
              <button 
                onClick={() => navigate('/reservations')}
                className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all"
              >
                Reservar <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Restaurante */}
          <div className="card-primary rounded-2xl overflow-hidden group">
            <div className="h-64 overflow-hidden">
              <img 
                src={restauranteImg}
                alt="Alta Gastronomía en Quinta Dalam" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-3">Alta Gastronomía</h3>
              <p className="text-muted-foreground mb-6">
                Disfruta de nuestra alta gastronomía, donde cada platillo es una obra maestra que combina ingredientes frescos y técnicas culinarias innovadoras para ofrecerte una experiencia gastronómica inigualable.
              </p>
              <button 
                onClick={() => navigate('/reservations')}
                className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all"
              >
                Reservar mesa <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}