import { Menu, X, LogIn, ChevronDown, User, LogOut, FileText, LayoutDashboard } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleReservationClick = () => {
    if (isAuthenticated) {
      navigate('/reservations');
    } else {
      navigate('/login', { state: { from: '/reservations' } });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-md fixed w-full top-0 z-50 border-b border-purple-200/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-2xl font-serif text-primary tracking-wide">Quinta Dalam</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="/#inicio" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Inicio</a>
            <a href="/#habitaciones" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Habitaciones</a>
            <a href="/#actividades" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Actividades</a>
            <a href="/#servicios" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Servicios</a>
            <a href="/#galeria" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Galería</a>
            <a href="/#resenas" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Reseñas</a>
            <a href="/#contacto" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Contacto</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors py-2 font-medium"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User size={16} />
                  </div>
                  Bienvenido, {user.username}
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-border overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-border/50 bg-muted/30">
                      <p className="text-sm font-medium text-foreground">{user.username}</p>
                      <p className="text-xs text-muted-foreground">{user.role === 'admin' ? 'Administrador' : 'Huésped'}</p>
                    </div>
                    
                    <div className="py-1">
                      {user.role === 'admin' ? (
                        <button
                          onClick={() => { navigate('/admin'); setIsDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors flex items-center gap-2"
                        >
                          <LayoutDashboard size={16} />
                          Panel de Control
                        </button>
                      ) : (
                        <button
                          onClick={() => { navigate('/my-reservations'); setIsDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors flex items-center gap-2"
                        >
                          <FileText size={16} />
                          Mis Reservaciones
                        </button>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2 border-t border-border/50"
                      >
                        <LogOut size={16} />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium text-sm"
              >
                <LogIn size={18} />
                Iniciar Sesión
              </button>
            )}
            
            <button
              onClick={handleReservationClick}
              className="btn-primary text-white px-6 py-2 rounded-lg transition-all text-sm font-medium"
            >
              Reservar Ahora
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground p-2 rounded-md hover:bg-muted transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 animate-in slide-in-from-top-2 border-t border-border/50 mt-2 pt-4">
            <nav className="flex flex-col space-y-1">
              {isAuthenticated && user && (
                <div className="px-4 py-3 mb-2 bg-muted/50 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Bienvenido, {user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.role === 'admin' ? 'Administrador' : 'Huésped'}</p>
                  </div>
                </div>
              )}
              
              <a href="/#inicio" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-foreground font-medium hover:bg-muted hover:text-primary rounded-lg transition-colors">Inicio</a>
              <a href="/#habitaciones" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-foreground font-medium hover:bg-muted hover:text-primary rounded-lg transition-colors">Habitaciones</a>
              <a href="/#actividades" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-foreground font-medium hover:bg-muted hover:text-primary rounded-lg transition-colors">Actividades</a>
              <a href="/#servicios" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-foreground font-medium hover:bg-muted hover:text-primary rounded-lg transition-colors">Servicios</a>
              <a href="/#galeria" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-foreground font-medium hover:bg-muted hover:text-primary rounded-lg transition-colors">Galería</a>
              <a href="/#resenas" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-foreground font-medium hover:bg-muted hover:text-primary rounded-lg transition-colors">Reseñas</a>
              <a href="/#contacto" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-foreground font-medium hover:bg-muted hover:text-primary rounded-lg transition-colors">Contacto</a>
              
              <div className="pt-4 mt-2 border-t border-border/50 px-4 space-y-3">
                {isAuthenticated && user ? (
                  <>
                    {user.role === 'admin' ? (
                      <button
                        onClick={() => { navigate('/admin'); setIsMenuOpen(false); }}
                        className="flex items-center gap-2 w-full px-4 py-3 text-foreground font-medium hover:bg-muted hover:text-primary rounded-lg transition-colors"
                      >
                        <LayoutDashboard size={18} />
                        Panel de Control
                      </button>
                    ) : (
                      <button
                        onClick={() => { navigate('/my-reservations'); setIsMenuOpen(false); }}
                        className="flex items-center gap-2 w-full px-4 py-3 text-foreground font-medium hover:bg-muted hover:text-primary rounded-lg transition-colors"
                      >
                        <FileText size={18} />
                        Mis Reservaciones
                      </button>
                    )}
                    <button
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-4 py-3 text-destructive font-medium hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <LogOut size={18} />
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-4 py-3 text-foreground font-medium hover:bg-muted hover:text-primary rounded-lg transition-colors"
                  >
                    <LogIn size={18} />
                    Iniciar Sesión
                  </button>
                )}
                
                <button
                  onClick={() => { handleReservationClick(); setIsMenuOpen(false); }}
                  className="btn-primary text-white px-6 py-3 rounded-xl w-full font-medium shadow-md mt-2"
                >
                  Reservar Ahora
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
