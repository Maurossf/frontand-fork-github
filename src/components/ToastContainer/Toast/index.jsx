import { Toast as ToastB } from "react-bootstrap";
import { useToast } from "../../../context/Toast/index";
import "./style.css";
export function Toast({ id, title, message, type }) {
  const { removeToast } = useToast();

  setTimeout(() => {
    removeToast(id);
  }, 5200);

  return (
    <ToastB bg={type} onClose={() => removeToast(id)}>
      <ToastB.Header>
        <strong className="me-auto">{title}</strong>
      </ToastB.Header>
      <ToastB.Body>
        {message}
        <div className="ms-auto delayToast"></div>.
      </ToastB.Body>
    </ToastB>
  );
}
