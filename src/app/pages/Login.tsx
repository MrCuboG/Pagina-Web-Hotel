import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Lock, User, ArrowLeft } from 'lucide-react';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor ingresa usuario y contraseña');
      return;
    }

    const success = await login(username, password);
    if (success) {
      const from = (location.state as any)?.from;

      if (from === '/reservations') {
        navigate('/reservations');
      } else if (username === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left section: Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1662990782404-a5d704ea323a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZGFyayUyMGx1eHVyeSUyMGhvdGVsJTIwcm9vbSUyMG5pZ2h0fGVufDF8fHx8MTc3NjEwNjU3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Hotel Room"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-12 left-12 z-20 max-w-lg">
          <h2 className="text-4xl text-white font-serif mb-4">Experiencia Inolvidable</h2>
          <p className="text-purple-100 text-lg">
            Descubre el confort y la elegancia que solo Quinta Dalam puede ofrecerte.
          </p>
        </div>
      </div>

      {/* Right section: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-gradient-to-br from-purple-50/50 to-white relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Volver
        </button>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-serif mb-3 text-primary-darker">Quinta Dalam</h1>
            <p className="text-muted-foreground">Bienvenido de nuevo, por favor inicia sesión.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm flex items-center gap-2">
              <span className="block w-2 h-2 rounded-full bg-destructive"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-foreground font-medium text-sm">
                Usuario
              </label>
              <div className="relative group">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                  placeholder="Ingresa tu usuario"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-foreground font-medium text-sm">
                Contraseña
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn-primary py-3.5 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-border flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              ¿No tienes cuenta?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-primary hover:text-primary-dark font-medium transition-colors"
              >
                Regístrate aquí
              </button>
            </p>
          </div>

          <div className="mt-8 p-4 bg-muted/50 rounded-xl border border-border/50 text-center">
            <p className="text-xs text-muted-foreground mb-1">
              Credenciales de demostración:
            </p>
            <p className="text-xs text-foreground font-medium">
              Admin: admin / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
