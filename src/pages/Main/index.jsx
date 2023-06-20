import { Alert } from "react-bootstrap";
import { useToast } from "../../context/Toast/index";

export default function Main() {
  const { addToast } = useToast();

  const handleToast = (evt) => {
    evt.prevenDefault();
    addToast({ title: "titulo1", message: "message1", type: "info" });
    addToast({ title: "titulo2", message: "message2", type: "warning" });
    addToast({ title: "titulo3", message: "message3", type: "danger" });
  };

  return (
    <>
      <h1>Página Principal</h1>
      <Alert variant="danger">Teste de Mensagem</Alert>
      <button onClick={handleToast}>Criar Mensagem</button>
    </>
  );
}
