import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer } from "../../components/ToastContainer/index";
const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const addToast = ({ title, message, type }) => {
    const id = uuidv4();
    const toast = {
      id,
      title,
      message,
      type,
      time: Date.now()
    };
    setMessages((prev) => [...prev, toast]);
    console.log([...messages, toast]);
  };

  const removeToast = (id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer messages={messages} />
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const toastContext = useContext(ToastContext);
  if (!toastContext)
    throw new Error("useToast must by used within ToastProvider");
  return toastContext;
}
