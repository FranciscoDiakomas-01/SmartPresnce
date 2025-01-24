import { FaUser } from "react-icons/fa"
import './index.css'
export default function Home(){

  const cards = [
    {
      value : 15,
      name : "Professores On",
      icon : <FaUser/>
    },
    {
      value : 5,
      name : "Professores Off",
      icon : <FaUser/>
    },
    {
      value : 20,
      name : "Total Professores",
      icon : <FaUser/>
    }
  ]
  const last = [
    
    {
      name : "Francisco",
      lastname : "Diakomas",
      date : "10/01/2025",
      hour : "15:35:40",
      status : "On"
    },{
      name : "Francisco",
      lastname : "Diakomas",
      date : "10/01/2025",
      hour : "15:35:40",
      status : "On"
    },{
      name : "Francisco",
      lastname : "Diakomas",
      date : "10/01/2025",
      hour : "15:35:40",
      status : "On"
    },{
      name : "Francisco",
      lastname : "Diakomas",
      date : "10/01/2025",
      hour : "15:35:40",
      status : "On"
    },{
      name : "Francisco",
      lastname : "Diakomas",
      date : "10/01/2025",
      hour : "15:35:40",
      status : "On"
    },{
      name : "Francisco",
      lastname : "Diakomas",
      date : "10/01/2025",
      hour : "15:35:40",
      status : "On"
    },{
      name : "Francisco",
      lastname : "Diakomas",
      date : "10/01/2025",
      hour : "15:35:40",
      status : "On"
    },{
      name : "Francisco",
      lastname : "Diakomas",
      date : "10/01/2025",
      hour : "15:35:40",
      status : "On"
    }
  ]
  return (
    <section id="home">
      <header>
      
      <p>
        Seg , 12 , Jan 2025
      </p>
      </header>
      <aside>
        <span>
          {
            cards.map((card , index) => (
              <div key={index}>
                <h2>
                  {card.name}
                </h2>
                <h3>
                  {card.value}
                </h3>
                {
                  card.icon
                }
                
              </div>
            ))
          }
        </span>
      </aside>
      <span>
        {
          last.length > 0 && 
          <strong>Registros  Recentes</strong>
        }
        <div>
          {
            last.length > 0 ? last.map((user , index) => (
              <div key={index} > 
                <span>
                  <strong>
                    {user.name + " " + user.lastname}
                  </strong>
                  <i>
                    {
                      user.date + " / " + user.hour
                    }
                  </i>
                </span>
                <p>
                  Status : {user.status}
                </p>
              </div>
            ))

            : (
              <h1>
                Sem Registros Cadastrados
              </h1>
            )
          }
        </div>
      </span>
    </section>
  )
}