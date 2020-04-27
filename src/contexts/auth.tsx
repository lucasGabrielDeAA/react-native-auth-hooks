import React, {createContext, useEffect, useState, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import * as auth from '../services/auth';
import api from '../services/api';

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@AuthRN:user');
      const storagedToken = await AsyncStorage.getItem('@AuthRN:token');

      setTimeout(() => {
        if (storagedUser && storagedToken) {
          api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

          setUser(JSON.parse(storagedUser));
          setLoading(false);
        }
      }, 2000);
    }

    loadStorageData();
  }, []);

  async function signIn() {
    const {token, user: data} = await auth.signIn();

    setUser(data);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    await AsyncStorage.setItem('@AuthRN:user', JSON.stringify(data));
    await AsyncStorage.setItem('@AuthRN:token', token);
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, signIn, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
