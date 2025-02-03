import { FaArrowCircleLeft, FaArrowCircleRight, FaArrowRight, FaSync, FaUser } from "react-icons/fa"
import './index.css'
import getDate from "./getDate"
import { DashBoard } from "../../services/admin"
import Loader from "../../componets/Loader"
import { useEffect, useState } from "react"
export default function Home(){
  const [date , setDate ] = useState(getDate())
  const [isLoad, setLoad] = useState(true);
  const [dashBoardData , setDashBoard] = useState< {
    total_teacher : number,
    total_coord : number
  }>()
  useEffect(()=> {
    setLoad(true);
    async function dashBoard() {
      const response = await DashBoard()
      setDashBoard(response)
    }
    dashBoard()
    setTimeout(( )=> {
      setLoad(false)
    } , 2000)
  }, [])

  useEffect(()=>{
    const interval = setInterval(()=>{
      setDate(getDate())
    } , 1000)
    return ()=>{
      clearInterval(interval)
    }
  })
  const last = [
    
    {
      name : "Francisco",
      lastname : "Diakomas",
      date : "10/01/2025",
      hour : "15:35:40",
      status : "Presente"
    }
  ]
  return (
    <section id="home">
      {isLoad ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <header>
            <p>{date}</p>
          </header>
          <aside>
            <span>
              <div key={2}>
                <h2>Total Professores</h2>
                <h3>
                  {dashBoardData?.total_teacher
                    ? dashBoardData?.total_teacher
                    : 0}
                </h3>
                <FaUser />
              </div>
              <div key={1}>
                <h2>Total Coordenadores</h2>
                <h3>
                  {dashBoardData?.total_coord ? dashBoardData?.total_coord : 0}
                </h3>
                <FaUser />
              </div>
            </span>
          </aside>
          <span>
            <article>
              <form>
                <label htmlFor="date">Filtre por data</label>
                <input type="date" name="date" />
                <button>
                  <FaArrowRight />
                </button>
              </form>
            </article>

            <table>
              {last.length > 0 ? (
                <>
                  <thead>
                    <tr>
                      <td>Data</td>
                      <td>Nome Professor</td>
                      <td>Status</td>
                    </tr>
                  </thead>
                  <tbody>
                    {last.map((user, index) => (
                      <tr key={index}>
                        <td>
                          {user.date + " / " + user.hour + " - " + user.hour}
                        </td>
                        <td>{user.name + " " + user.lastname}</td>
                        <td
                          style={{
                            color: user.status.includes("Pr")
                              ? "green"
                              : user.status.includes("A")
                              ? "red"
                              : "orange",
                          }}
                        >
                          {user.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <h1>Sem Registros Cadastrados</h1>
              )}
            </table>
            <footer>
              <p>1 de 1</p>
              <span>
                <button>
                  <FaSync></FaSync>
                </button>
                <button>
                  <FaArrowCircleLeft></FaArrowCircleLeft>
                </button>
                <button>
                  <FaArrowCircleRight></FaArrowCircleRight>
                </button>
              </span>
            </footer>
          </span>
        </>
      )}
    </section>
  );
}