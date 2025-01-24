import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from './pages/home/index.tsx'
import Users from './pages/users/index.tsx'
import QRCodeReader from './componets/QrCode/index.tsx'
import CreateTeache from './componets/CreateTeacher/index.tsx'
import UserDetails from './pages/UserDetails/index.tsx'
import Profile from './pages/Profile/index.tsx'
import Agenda from './pages/Agenda/index.tsx'
import Login from './pages/Login/index.tsx'
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/teacher",
        element: <Users />,
      },
      {
        path: "/details",
        element: <UserDetails />,
      },
      {
        path: "/createTeaher",
        element: <CreateTeache />,
      },
      {
        path: "/read",
        element: <QRCodeReader />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/agenda",
        element: <Agenda />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}>
    </RouterProvider>
  </StrictMode>,
)
