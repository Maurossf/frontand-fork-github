import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/index";
import Logo from "../../assets/logo.png";

import { Container, Navbar, Nav } from "react-bootstrap";

export default function Header() {
  const { user, sigOut } = useAuth();
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark">
      .
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="logotipo" width="150" className="me-3" />
          GIRLL BOSS STORE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 d-flex"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Início
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              Sobre
            </Nav.Link>
          </Nav>
          <Nav>
            {user?.id ? (
              <>
                <Navbar.Brand> Olá, {user.usu_nome}</Navbar.Brand>
                <button onClick={sigOut}>Sair</button>
              </>
            ) : (
              <button onClick={() => navigate("/signin")}>Entrar</button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
