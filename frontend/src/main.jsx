import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import { AuthProvider } from './Components/SignUp/AuthContext.jsx';
import App from './App.jsx'
import { FlashProvider } from "./Context/FlashContext";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.baseURL = "http://localhost:8080"
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <FlashProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </FlashProvider>
  </BrowserRouter>,
)
