import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: string;
}

// variaveis vindas do usuario
interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: string;
  signIn(credentials: SignInCredentials): Promise<void>; // definindo que signIn vai receber as credenciais do usuario
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData); // {} as auth -> força o contexto a iniciar vazio

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Gobarber:token');
    const user = localStorage.getItem('@Gobarber:user');

    // se já exister token e user no localstorage, será o estado inicial
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    // senão será vazio
    return {} as AuthState;
  });

  // função para autenticação do usuario
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;
    // armazenando dados no localStorage
    localStorage.setItem('@Gobarber:token', token);
    localStorage.setItem('@Gobarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');
    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
