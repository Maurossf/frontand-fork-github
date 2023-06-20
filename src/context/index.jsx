import { AuthProvider } from "./Auth/index";
import { ToastProvider } from "./Toast/index";

export function AppProvider({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  );
}
