import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsUiChecksGrid } from "react-icons/bs";
import { LuLogOut, LuUsersRound, LuUser, LuClock } from "react-icons/lu";
import "./index.css";
import { useState } from "react";
import { FaBars, FaCog, FaExclamation } from "react-icons/fa";

export default function SideBar() {
  interface IRoutes {
    name: string;
    id: number;
    icon: React.ReactElement;
    url: string;
  }
  const nav = useNavigate();
  const routes: IRoutes[] = [
    {
      icon: <BsUiChecksGrid />,
      id: 1,
      name: "Inicial",
      url: "/",
    },
    {
      icon: <LuUser />,
      id: 53,
      name: "Coordenadores",
      url: "/cords",
    },
    {
      icon: <LuUsersRound />,
      id: 2,
      name: "Professores",
      url: "/teachers",
    },

    {
      icon: <LuClock />,
      id: 3,
      name: "Horário",
      url: "/agenda",
    },
    {
      icon: <FaCog />,
      id: 5,
      name: "Configurações",
      url: "/config",
    },
  ];

  const [active, setActive] = useState(1);
  const [open , setOpen] = useState(false)
  return (
    <>
      <nav id="header">
        <h1>SmartPresence</h1>
        <FaBars
          onClick={() => {
            setOpen(prev => !prev);
          }}
        />
      </nav>

      <nav
        id="sideBar"
        style={{
          width: open ? "50%" : "",
        }}
      >
        <div>
          <FaExclamation />
          {!open && <h1 style={{textWrap: 'nowrap'}}>SmartPresence-28AGD</h1>}
        </div>

        <ul>
          {routes.map((route) => (
            <Link
              key={route.id}
              to={route.url}
              onClick={() => {
                setActive(route.id);
                setOpen(false)
              }}
              style={{
                backgroundColor: route.id == active ? "var(--blue2)" : "",
                color: route.id == active ? "var(--white)" : "",
                transform: route.id == active ? "translateX(20px)" : "",
              }}
            >
              {route.icon}
              <p>{route.name}</p>
            </Link>
          ))}
        </ul>
        <span
          onClick={() => {
            setActive(999);
            setOpen(false)
            nav("/profile");
          }}
        >
          <div>ADM
          </div>
          <aside>
            <strong>Administrador</strong>
            <i>admin</i>
          </aside>
        </span>
        <button
          onClick={() => {
            localStorage.clear()
            sessionStorage.clear()
            nav("/login");
          }}
        >
          <LuLogOut />
          <p>Sair</p>
        </button>
      </nav>
    </>
  );
}
