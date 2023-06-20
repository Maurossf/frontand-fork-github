import { ToastContainer as ToastContainerB } from "react-bootstrap";
import { Toast } from "./Toast/index";
export function ToastContainer({ messages }) {
  return (
    <ToastContainerB position="bottom-center">
      {" "}
      {messages?.map((message) => {
        return (
          <Toast
            key={message.id}
            id={message.id}
            title={message.title}
            message={message.message}
            type={message.type}
          />
        );
      })}{" "}
    </ToastContainerB>
  );
}
