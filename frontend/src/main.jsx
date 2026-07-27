// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from "react-router-dom"; 
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import { AuthProvider } from './Components/SignUp/AuthContext.jsx';
// import App from './App.jsx'
// import { FlashProvider } from "./Context/FlashContext";
// import axios from "axios";
// axios.defaults.baseURL=import.meta.env.VITE_API_URL;
// // axios.defaults.baseURL = "http://localhost:8080"
// axios.defaults.withCredentials = true;

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//    <FlashProvider>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//     </FlashProvider>
//   </BrowserRouter>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { AuthProvider } from './Components/SignUp/AuthContext.jsx';
import App from './App.jsx'
import { FlashProvider } from "./Context/FlashContext";
import axios from "axios";

// In development, use relative URLs so Vite proxy handles the requests (no CORS).
// In production, use the VITE_API_URL environment variable pointing to the deployed backend.
if (import.meta.env.PROD) {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
}
// Uncomment below to run against a local backend during development:
// axios.defaults.baseURL = "http://localhost:8080";

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

