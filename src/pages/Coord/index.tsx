/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaBars,  FaHome, FaQrcode, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import QrCodeReader  from './componets/QrcodeDisplay'
import isLogged from "../../services/isLogged";
import Loader from "../../componets/Loader";

export default function HomeCoord() {
  const [active, setActive] = useState("Inicial");
  const [readQrCode, setReadQrcode] = useState(false);
  const [menu, setmenu] = useState(false);
  const links = [
    {
      name: "Inicial",
      url: "/coord",
      icon: <FaHome />,
    },
    {
      name: "Perfil",
      url: "/coord/profile",
      icon: <FaUser />,
    },
  ];
  const nav = useNavigate();

  const [load, setLoad] = useState(true);
    useEffect(()=>{
      if(isLogged()){
        setTimeout(()=>{
          setLoad(false)
        },2500)
        return
      }else{
        nav("/login")
        return
      }
    }, [])
  return (
    <main id="teacher">
      {load ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          {readQrCode && <QrCodeReader />}
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
              backgroundColor: readQrCode ? "var(--blue2)" : "var(--black)",
            }}
            onClick={() => {
              setReadQrcode((prev) => !prev);
            }}
          >
            <FaQrcode />
          </button>
        </>
      )}
    </main>
  );
}
