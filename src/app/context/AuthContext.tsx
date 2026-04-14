import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email?: string;
  role: 'admin' | 'cliente';
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuario base de administrador
const ADMIN_USER: StoredUser = {
  id: '1',
  username: 'admin',
  password: 'admin123',
  role: 'admin'
};

// Obtener usuarios registrados del localStorage
const getStoredUsers = (): StoredUser[] => {
  const stored = localStorage.getItem('registeredUsers');
  return stored ? JSON.parse(stored) : [];
};

// Guardar usuarios en localStorage
const saveStoredUsers = (users: StoredUser[]) => {
  localStorage.setItem('registeredUsers', JSON.stringify(users));
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (username: string, password: string): boolean => {
    // Verificar si es el admin
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      const userData = {
        id: ADMIN_USER.id,
        username: ADMIN_USER.username,
        role: ADMIN_USER.role
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }

    // Verificar usuarios registrados
    const registeredUsers = getStoredUsers();
    const foundUser = registeredUsers.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const register = (username: string, email: string, password: string): { success: boolean; message: string } => {
    const registeredUsers = getStoredUsers();

    // Verificar si el usuario ya existe
    if (username === ADMIN_USER.username || registeredUsers.some(u => u.username === username)) {
      return { success: false, message: 'El nombre de usuario ya está en uso' };
    }

    // Verificar si el email ya existe
    if (registeredUsers.some(u => u.email === email)) {
      return { success: false, message: 'El correo electrónico ya está registrado' };
    }

    // Crear nuevo usuario como cliente
    const newUser: StoredUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
      role: 'cliente'
    };

    registeredUsers.push(newUser);
    saveStoredUsers(registeredUsers);

    return { success: true, message: 'Registro exitoso' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
