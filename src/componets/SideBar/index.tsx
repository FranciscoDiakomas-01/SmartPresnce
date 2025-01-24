import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsUiChecksGrid } from "react-icons/bs";
import { LuLogOut  , LuUsersRound , LuCalendar1 , LuUser, LuCamera} from "react-icons/lu";
import './index.css'
import { useState } from "react";
import { FaExclamation } from "react-icons/fa";

export default function SideBar(){

  interface IRoutes {
    name : string,
    id : number,
    icon : React.ReactElement,
    url : string
  }
  interface IUser {
    id : number,
    name : string,
    lastname : string,
    type : string
  }
  const nav = useNavigate()
  const routes: IRoutes[] = [
    {
      icon: <BsUiChecksGrid />,
      id: 1,
      name: "Inicial",
      url: "/",
    },
    {
      icon: <LuUsersRound />,
      id: 2,
      name: "Professores",
      url: "/teacher",
    },
    {
      icon: <LuCalendar1 />,
      id: 3,
      name: "Horário",
      url: "/agenda",
    },
    {
      icon: <LuCamera />,
      id: 53,
      name: "Leitor de Qr Code",
      url: "/read",
    },
    {
      icon: <LuUser />,
      id: 5,
      name: "Meu Perfil",
      url: "/profile",
    },
  ];
  const user : IUser = {
    id : 1,
    lastname : 'Diakomas',
    name : 'Francisco',
    type : 'admin'
  } 
  const [ active , setActive ] = useState(1)
  return (

    <nav id="sideBar">
      <div>
        <FaExclamation/>
        <h1>
          SmartPresence-28AGD
        </h1>
      </div>

      <ul>
        {
          routes.map(route  => (
            <Link key={route.id} to={route.url} onClick={()=>{
              setActive(route.id)
            }}
            style={{
              backgroundColor : route.id == active ? "var(--blue2)" : "",
              color : route.id == active ? "var(--white)" : ""
            }}
            >
                {
                  route.icon
                }
                <p>
                  {
                    route.name
                  }
                </p>
            </Link>
          ))
        }
      </ul>
      <span>
        <div>
          {
            user.name?.charAt(0).toUpperCase() + user.lastname?.charAt(0).toUpperCase() 
          }
        </div>
        <aside>
          <strong>
            {user.name + " " + user.lastname}
          </strong>
          <i>
            {user.type}
          </i>
        </aside>
      </span>
      <button onClick={()=>{
        nav("/login")
      }}>
      <LuLogOut />
      <p>
        Sair
      </p>
      </button>
    </nav>
  )
}