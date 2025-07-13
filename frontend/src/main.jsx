import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode >
    <div className="text-center text-white w-full font-bold text-2xl mb-10 mt-10" >
      React App with Tailwind CSS and Supabase
    </div>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>

  </StrictMode>,
)
