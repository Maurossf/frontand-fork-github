import { createContext, useContext, useState } from "react";
import { api } from "../../utils/api";
import { useToast } from "../Toast/index";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { addToast } = useToast();
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("@tccEtec:token");
    const usuario = localStorage.getItem("@tccEtec:usuario");

    if (token && usuario) return { token, usuario: JSON.parse(usuario) };

    return {};
  });

  const signIn = async ({ user, password }) => {
    try {
      const page = await api("/api/auth", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ usu_email: user, usu_senha: password })
      });

      if (parseInt(page.status, 10) !== 200)
        // throw new Error(`Erro de servidor: ${(await page.json()).error}`);
        addToast({
          title: "TCC",
          message: `Erro de servidor: ${(await page.json()).error}`,
          type: "danger"
        });

      const data = await page.json();

      const { usuario, token } = data;

      localStorage.setItem("@tccEtec:token", token);
      localStorage.setItem("@tccEtec:usuario", JSON.stringify(usuario));

      setUser({ token, usuario });
    } catch (error) {
      addToast({
        title: "TCC",
        message: `Erro de servidor: ${error.message}`,
        type: "danger"
      });
    }
  };

  const signOut = () => {
    localStorage.removeItem("@tccEtec:token");
    localStorage.removeItem("@tccEtec:usuario");
    setUser({});
  };

  return (
    <>
      <AuthContext.Provider value={{ user, signIn, signOut }}>
        {/* {user?.id ? "logado" : "não logado"}
        <button onClick={signIn}>Entrar</button>
        <button onClick={signOut}>Sair</button> */}
        {children}
      </AuthContext.Provider>
    </>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("useAuth must by used within AuthProvider");
  return authContext;
}
