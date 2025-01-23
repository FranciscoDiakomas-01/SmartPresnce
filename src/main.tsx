import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from './pages/home/index.tsx'
import Users from './pages/users/index.tsx'
const routes = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [

      {
        path : "/",
        element : <Home/>,
      },{
        path : "/teacher",
        element : <Users/>,
      }
      
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}>
    </RouterProvider>
  </StrictMode>,
)
