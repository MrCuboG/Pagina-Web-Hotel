import { createBrowserRouter, Navigate } from 'react-router';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Reservations } from './pages/Reservations';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserReservations } from './pages/UserReservations';
import { ProtectedRoute } from './components/ProtectedRoute';

// Componente para proteger la ruta de reservaciones (solo usuarios autenticados)
function ReservationRoute({ children }: { children: React.ReactNode }) {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" state={{ from: '/reservations' }} replace />;
  }
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/reservations',
    element: (
      <ReservationRoute>
        <Reservations />
      </ReservationRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-reservations',
    element: (
      <ReservationRoute>
        <UserReservations />
      </ReservationRoute>
    ),
  },
]);
