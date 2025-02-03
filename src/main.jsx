import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "../Context/ThemeContext.jsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from 'react-query'; 
import { AuthProvider } from "./../Context/AuthContext.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
  <Auth0Provider
    domain="dev-1hl2rm716rj3vt6c.us.auth0.com"
    clientId="gyOghapOk4MMKQB3YyKOb5ERKYbimWaK"
    redirectUri={window.location.origin}
  >
  <BrowserRouter>
    
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    
  </BrowserRouter>
  </Auth0Provider>
  </QueryClientProvider>
);
