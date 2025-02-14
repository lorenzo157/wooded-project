import React, { createContext, useContext, useState, useEffect, FC } from "react";
import axios from "axios";

// Define los tipos para el usuario y el contexto
type User = {
  [x: string]: string;
  idUser: string;
  userName: string;
  email: string;
};

type AuthContextType = {
  user?: User;
  signup: (email: string, password: string) => Promise<any>; // Agregamos signup
  login: (email: string, password: string) => Promise<void>;
  passwordReset: (email: string) => void;
  logout: () => void;
  loading: boolean;
  userCity?:any;
};

const AuthContext = createContext<Partial<AuthContextType>>({});
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(false);


  // Función de inicio de sesión
  const login = async (email: string, password: string) => {
    logout();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { access_token, userName, idUser } = response.data.result;
      const newUser: User = {
        idUser: idUser,
        userName,
        email,
      };

      localStorage.setItem("access_token", access_token); // Guarda el token
      setUser(newUser); // Establece al usuario en el estado
    } catch (error) {
      console.error("Error en el inicio de sesión", error);
      throw new Error("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  // Función de cierre de sesión
  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("access_token");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // Simula la recuperación del usuario usando el token.
      setUser({
        idUser: "1", // Podrías recuperar esta información llamando a tu backend en un futuro
        userName: "Usuario Guardado",
        email: "email@example.com",
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
