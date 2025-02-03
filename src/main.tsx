import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-toastify/ReactToastify.css'
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
import Coord from './pages/Coords/index.tsx'
import Config from './pages/config/index.tsx'
import Teacher from './pages/Teacher/index.tsx'
import HomeTeacher from './pages/Teacher/Home/index.tsx'
import TeacherAgenda from './pages/Teacher/Agenda/index.tsx'
import TeacherDash from './pages/Teacher/DashBoar/index.tsx'
import TeacherProfile from './pages/Teacher/Profile/index.tsx'
import HomeCoord from './pages/Coord/index.tsx'
import HomeScrennCoord from './pages/Coord/Home/index.tsx'
import CoordProfile from './pages/Coord/Profile/index.tsx'
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
        path: "/teachers",
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
      {
        path: "/cords",
        element: <Coord />,
      },
      {
        path: "/config",
        element: <Config />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/teacher",
    element: <Teacher />,
    children: [
      {
        path: "/teacher",
        element: <HomeTeacher />,
      },
      {
        path: "mehours",
        element: <TeacherAgenda />,
      },
      {
        path: "merelatory",
        element: <TeacherDash />,
      },
      {
        path: "profile",
        element: <TeacherProfile />,
      },
    ],
  },
  {
    path: "/coord",
    element: <HomeCoord />,
    children: [
      {
        path: "/coord",
        element: <HomeScrennCoord />,
      },
      
      {
        path: "profile",
        element: <CoordProfile />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes}>
    </RouterProvider>
  </StrictMode>
);
