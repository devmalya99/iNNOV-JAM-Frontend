
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "../Context/ThemeContext.jsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from 'react-query'; 
import { AuthProvider } from "./../Context/AuthContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
  
  <BrowserRouter>
    
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    
  </BrowserRouter>
 
  </QueryClientProvider>
);
