import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/Auth/index";
import "./styles.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { useToast } from "../../context/Toast/index";

export default function Signin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();

  const [user, setUser] = useState("jerrold.jursch@uol.com.br");
  const [password, setPassword] = useState("U1234");
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (evt) => {
    evt.preventDefault();
    try {
      signIn({ user, password });
      navigate(from, { replace: true });
    } catch (error) {
      addToast({ title: "TCC", message: "Erro de login", type: "danger" });
      // console.log("Erro de login");
      setUser("");
      setPassword("");
    }
  };

  const handleLimpar = (evt) => {
    evt.preventDefault();
    setUser("");
    setPassword("");
  };

  return (
    <html>
      <div className="content">
        <div className="signin">
          <img src={logo} alt="logo" />
          <div>
            <h1>login</h1>
            <form className="formulario">
              <input
                value={user}
                onChange={(evt) => setUser(evt.target.value)}
                placeholder="Usuário"
              />
              <input
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
              />
              <button onClick={handleSubmit}>Acessar</button>
              <button onClick={handleLimpar}>Limpar</button>
            </form>
          </div>
          <Link to="/signup"> Cadastrar-se </Link>
        </div>
      </div>
    </html>
  );
}
