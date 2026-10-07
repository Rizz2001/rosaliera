import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const LOCAL_STORAGE_USER_KEY = 'rosaliera_user';
const LOCAL_STORAGE_TOKEN_KEY = 'rosaliera_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("Error al cargar usuario de localStorage", e);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || null;
    } catch (e) {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sincronización con localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      }

      if (token) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      }
    } catch (e) {
      console.error("Error en persistencia de autenticación", e);
    }
  }, [user, token]);

  /**
   * Inicio de Sesión (Simulación preparada para Backend API)
   * @param {string} email 
   * @param {string} password 
   */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // AQUÍ IRÁ LA LLAMADA AL BACKEND:
      // const res = await fetch('https://api.larosaliera.com/v1/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await res.json();

      // Simulación de respuesta de backend con delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (email.trim() && password.length >= 4) {
        const mockUser = {
          id: 'usr_849201',
          name: email.split('@')[0].replace('.', ' '),
          email: email,
          phone: '0414-1234567',
          address: 'Alto Barinas Norte, Calle 5, Casa 12, Barinas',
          role: 'customer',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
        };
        const mockToken = 'jwt_token_rosaliera_sample_987654321';

        setUser(mockUser);
        setToken(mockToken);
        setLoading(false);
        return { success: true, user: mockUser };
      } else {
        throw new Error('Credenciales inválidas. Por favor verifica tu correo y contraseña.');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  /**
   * Registro de Usuario (Simulación preparada para Backend API)
   */
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      // AQUÍ IRÁ LA LLAMADA AL BACKEND API REGISTER
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newUser = {
        id: `usr_${Math.floor(100000 + Math.random() * 900000)}`,
        name: userData.name,
        cedula: userData.cedula || '',
        email: userData.email,
        phone: userData.phone || '',
        address: userData.address || 'Alto Barinas, Barinas',
        role: 'customer',
        avatarUrl: ''
      };
      const newToken = `jwt_token_rosaliera_${Date.now()}`;

      setUser(newUser);
      setToken(newToken);
      setLoading(false);
      return { success: true, user: newUser };
    } catch (err) {
      setError(err.message || 'Error en el registro de usuario');
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  /**
   * Cierre de Sesión
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
  };

  /**
   * Actualizar Perfil del Usuario
   */
  const updateProfile = (updatedData) => {
    setUser((prev) => (prev ? { ...prev, ...updatedData } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}
