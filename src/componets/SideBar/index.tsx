import type React from "react";
import { Link } from "react-router-dom";
import { BsUiChecksGrid } from "react-icons/bs";
import { LuLogOut  , LuUsersRound , LuCalendar1 , LuUser} from "react-icons/lu";
import logo from '../../assets/IMG-20250121-WA0021(1).jpg'
import './index.css'
import { useState } from "react";

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

  const routes : IRoutes[] = [
    {
      icon : <BsUiChecksGrid/>,
      id : 1,
      name : 'Inicial',
      url : '/'
    }, {
      icon : <LuUsersRound/>,
      id : 2,
      name : 'Professores',
      url : '/teacher'
    },
    {
      icon : <LuCalendar1/>,
      id : 3,
      name : 'Horário',
      url : '/'
    },
    {
      icon :<LuUser />,
      id : 5,
      name : 'Meu Perfil',
      url : '/'
    }
  ]
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
        <h1>
          SmartPresence-28AGD
        </h1>
        <img src={logo} alt="LogoTipo" />
      </div>

      <ul>
        {
          routes.map(route  => (
            <Link key={route.id} to={route.url} onClick={()=>{
              setActive(route.id)
            }}
            style={{
              backgroundColor : route.id == active ? "var(--blue)" : "",
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
      <button>
      <LuLogOut />
      <p>
        Sair
      </p>
      </button>
    </nav>
  )
}