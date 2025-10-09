import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthProvider } from './store/Auth.jsx';
import { ToastContainer } from 'react-toastify';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <AuthProvider>
   <StrictMode>
      <BrowserRouter>
      
      <App />
      </BrowserRouter>
   <ToastContainer />
  </StrictMode>
 </AuthProvider>
  
)

