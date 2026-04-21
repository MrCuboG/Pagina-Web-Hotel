import { useState } from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Reviews() {
  const { isAuthenticated } = useAuth();
  
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Elena Domínguez',
      role: 'Huésped Frecuente',
      avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjA3Mzg1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Nuestra estancia en Quinta Dalam fue simplemente espectacular. La atención al detalle, la comodidad de las habitaciones y la calidez del personal superaron todas nuestras expectativas.',
      rating: 5,
      date: '2 días atrás'
    },
    {
      id: 2,
      author: 'Alejandro Reyes',
      role: 'Viaje de Negocios',
      avatar: 'https://images.unsplash.com/photo-1554765345-6ad6a5417cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzU5OTg1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'El lugar perfecto para descansar después de reuniones largas. La comida del restaurante es exquisita y el internet funciona a la perfección. Muy recomendable para viajeros corporativos.',
      rating: 5,
      date: '1 semana atrás'
    },
    {
      id: 3,
      author: 'Familia Mendoza',
      role: 'Vacaciones',
      avatar: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHl8ZW58MXx8fHwxNzc2MTA2NzA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Mis hijos quedaron encantados con las instalaciones. Las actividades familiares y la seguridad del hotel nos permitieron disfrutar de unas vacaciones verdaderamente relajantes.',
      rating: 4,
      date: '1 mes atrás'
    }
  ]);

  const [newReview, setNewReview] = useState({ content: '', rating: 5 });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.content.trim()) return;

    setReviews([
      {
        id: Date.now(),
        author: 'Huésped Actual', // Podríamos tomar el nombre del user context
        role: 'Nuevo',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhhdmF0YXJ8ZW58MXx8fHwxNzc2MTA2NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        content: newReview.content,
        rating: newReview.rating,
        date: 'Justo ahora'
      },
      ...reviews
    ]);

    setNewReview({ content: '', rating: 5 });
  };

  return (
    <section id="resenas" className="py-24 bg-gradient-to-b from-purple-900/10 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <MessageSquareQuote size={16} />
            <span>Testimonios</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-primary-darker mb-6">Experiencias Memorables</h2>
          <p className="text-muted-foreground text-lg">
            Descubre lo que nuestros huéspedes dicen sobre su estancia en Quinta Dalam. Su satisfacción es nuestra mayor recompensa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {reviews.map((review) => (
            <div key={review.id} className="card-primary p-8 rounded-3xl relative">
              <div className="flex text-yellow-400 mb-6 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    fill={i < review.rating ? 'currentColor' : 'none'} 
                    className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} 
                  />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8 italic">
                "{review.content}"
              </p>
              <div className="flex items-center gap-4 mt-auto border-t border-border pt-6">
                <img 
                  src={review.avatar} 
                  alt={review.author} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h4 className="font-medium text-foreground text-sm">{review.author}</h4>
                  <p className="text-xs text-muted-foreground">{review.role} • {review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección para dejar reseña */}
        <div className="max-w-2xl mx-auto card-primary p-8 md:p-10 rounded-3xl text-center">
          <h3 className="text-2xl font-serif text-foreground mb-4">Comparte tu experiencia</h3>
          
          {isAuthenticated ? (
            <form onSubmit={handleSubmitReview} className="space-y-6 text-left mt-8">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tu calificación</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        size={28}
                        fill={star <= newReview.rating ? '#facc15' : 'none'}
                        className={star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tu comentario</label>
                <textarea
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  placeholder="Cuéntanos cómo fue tu estadía..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={!newReview.content.trim()}
                className="w-full btn-primary py-3.5 rounded-xl text-white font-medium shadow-md hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Publicar Reseña
              </button>
            </form>
          ) : (
            <div className="mt-8 p-6 bg-muted/50 rounded-2xl border border-border">
              <p className="text-muted-foreground mb-4">Inicia sesión para dejar una reseña y compartir tu experiencia con otros viajeros.</p>
              <button
                onClick={() => window.location.href = '/login'}
                className="btn-secondary px-6 py-2 rounded-xl text-primary font-medium hover:bg-card transition-colors"
              >
                Iniciar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
