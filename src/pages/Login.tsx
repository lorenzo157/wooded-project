import React, { useState, FormEvent, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../services/UserService";
import { Button } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(undefined);

    try {
      await login?.(email, password);
      const user = await getUserByEmail(email);

      if (user && user.idUser) {
        navigate(`/home/${user.idUser}`);
      } else {
        throw new Error(
          "No se encontró el usuario o no tiene un idUser válido"
        );
      }
    } catch (error) {
      console.error("Error en el proceso de inicio de sesión:", error);
      setError(
        "Credenciales incorrectas o problema al recuperar datos del usuario"
      );
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Inicia sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          textShadow="0.4px 0.4px 0.4px black"
          fontFamily="Raleway"
          bg="#1A865F"
          color="#FFFFFF"
          _hover={{ bg: "teal.500" }}
          type="submit"
        >
          Ingresar
        </Button>
      </form>
    </div>
  );
};

export default Login;
