import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, Schema, string } from "yup";
import { api } from "../../utils/api";
import "./styles.css";
import logo from "../../assets/logo.png";

export default function Signup() {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [contrasenha, setContrasenha] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let usuario = {
      usu_nome: nome.trim(),
      usu_email: email.trim(),
      usu_senha: senha.trim(),
      usu_contrasenha: contrasenha.trim()
    };

    let usuarioSchema = object({
      usu_nome: string()
        .required("Entre com o nome")
        .min(7, "Nome tem que ter no minimo 7 caracteres")
        .matches(/\s/, "O nome tem que ter pelo menos um espaço"),
      usu_email: string()
        .email("Entre com o e-mail válido")
        .required("Entre com um e-mail"),
      usu_senha: string().matches(
        /^(?=. [a-z])(?=[A-Z])(?=.*[0-9])(?=. *[!@#\$%\^&\*])(?=. {6,})/,
        "A senha tem que ter 6 caracteres: 1 Maiúsculo, 1 Minúsculo, 1 Número e 1 Caracter Especial"
      ),
      usu_contrasenha: string()
        .required("Entre com a contrasenha")
        .oneOf(
          [ref("usu_senha"), null],
          "Senha e contrasenha precisam ser iguais"
        )
    });

    try {
      await usuarioSchema.validate(usuario);
    } catch (error) {
      alert(error.message);
      return false;
    }

    return false;

    delete usuario.usu_contrasenha;
    const page = await api("/api/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(usuario)
    });

    if (parseInt(page.status, 10) !== 201)
      throw new Error(`Erro de servidor: ${(await page.json()).error}`);

    const data = page.json();
    if (data.length === 0) throw new Error("Erro de servidor");

    // return false;

    setNome("");
    setEmail("");
    setSenha("");
    setContrasenha("");

    alert("Verifique seu e-mail");
    navigate("/");
  };

  return (
    <div className="content">
      <div className="signin">
        <img src={logo} alt="logo" />
        <div>
          <h1>Cadastrar-se</h1>
          <form className="formulario">
            <input
              placeholder="Nome Completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <input
              placeholder="Contra Senha"
              type="password"
              value={contrasenha}
              onChange={(e) => setContrasenha(e.target.value)}
            />
            <button type="submit" onclick={handleSubmit}>
              Acessar
            </button>
            <button>Limpar</button>
          </form>
        </div>
        <Link to="/signin"> Voltar </Link>
      </div>
    </div>
  );
}
