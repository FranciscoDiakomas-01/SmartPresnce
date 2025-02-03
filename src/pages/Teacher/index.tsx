import "./index.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaClock, FaHome, FaQrcode, FaUser } from "react-icons/fa";
import { useState } from "react";
import TeacherQrcode  from './componets/QrcodeDisplay'
import { FaChartBar } from "react-icons/fa6";
export default function Teacher() {
  const [active, setActive] = useState("Inicial");
  const [ showQrd , setShow]  = useState(false)
  const [ menu , setmenu ] = useState(false)
  const links = [
    {
      name: "Inicial",
      url: "/teacher",
      icon: <FaHome />,
    },
    {
      name: "Horários",
      url: "/teacher/mehours",
      icon: <FaClock />,
    },
    {
      name: "Relatório",
      url: "/teacher/merelatory",
      icon: <FaChartBar />,
    },
    {
      name: "Perfil",
      url: "/teacher/profile",
      icon: <FaUser />,
    },
  ];
  const nav = useNavigate()
  return (
    <main
      id="teacher"
    >
      {showQrd && <TeacherQrcode />}
      <header>
        <h1>SmartPresence</h1>
        <nav>
          {links.map((l) => (
            <Link
              to={l.url}
              style={{
                color: active == l.name ? "var(--blue2)" : "",
              }}
              onClick={() => {
                setActive(l.name);
              }}
            >
              {l.name}
            </Link>
          ))}

          <button
            onClick={() => {
              nav("/login");
            }}
          >
            Sair
          </button>
        </nav>
        <FaBars
          style={{
            color: menu ? "var(--blue2)" : "",
          }}
          onClick={() => {
            setmenu(true);
          }}
          id="bars"
        />
      </header>
      <nav
        id="menu"
        style={{
          width: menu ? "50%" : "0%",
        }}
      >
        {links.map((l) => (
          <Link
            to={l.url}
            style={{
              color: active == l.name ? "var(--blue2)" : "",
              backgroundColor: active == l.name ? "#ffffff0e" : "",
            }}
            onClick={() => {
              setActive(l.name);
              setmenu(false);
            }}
          >
            {l.icon}
            {l.name}
          </Link>
        ))}
        <button
          onClick={() => {
            nav("/login");
          }}
        >
          Sair
        </button>
      </nav>
      <Outlet />
      <button
        style={{
          backgroundColor: showQrd ? "var(--blue2)" : "var(--black)",
        }}
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        <FaQrcode />
      </button>
    </main>
  );
}
