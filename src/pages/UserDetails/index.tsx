/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./index.css";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaCalendar,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { deleteTeacherByid , getAllTeacherPresence, type IVacation } from "../../services/teacher";
import { Vacation } from "../../services/teacher";
import { toast } from "react-toastify";
import Loader from "../../componets/Loader";

export default function UserDetails() {
  interface ITeacher {
    id: number;
    name: string;
    lastname: string;
    email: string;
    status: number;
    qrcodeurl: string;
    vocation_date: string;
    created_at: string;
  }
  interface IPresence {
    data: Presence[];
    missings: number;
    presence: number;
    lastpage:number;
  }
  interface Presence{
    date : string,
    type : string,
    status : string
  }
  const user: ITeacher = JSON.parse(String(sessionStorage.getItem("user")));
  const [AddFeria, setAddFeria] = useState(false);
  const [presence, setPresence] = useState<IPresence>({
    data : [],
    lastpage : 1,
    missings : 0,
    presence : 0
  });

  const teacher_id = user.id as number;
  const [page , setPage ] = useState<number>(1)
  const [ load , setLoad] = useState(true)
  const [date , setDate] = useState("")
  useEffect(()=>{
    async function getPresence() {
      const data = await getAllTeacherPresence(page , teacher_id)
      data.lastpage = data.lastpage == 0 ? 1 : data.lastpage;
      setPresence(data)
    }
    getPresence()
    setTimeout(()=>{
      setLoad(false)
    },2500)
  },[page])
  useEffect(() => {
    if (user == null) {
      history.back();
      return;
    }
  }, [user]);
  return (
    <section id="userdetails">
      {load ? (
        <div id="ll">
          <Loader />
        </div>
      ) : (
        <>
          {AddFeria && (
            <div id="feria">
              <form onSubmit={async(e)=>{
                e.preventDefault()
                const array = date.split("-")
                array.reverse()
                const defDate = array.join("/")
                const data : IVacation = {
                  id : user.id,
                  status : 3,
                  vacation : defDate
                }
                const response = await Vacation(data)
                if (response?.error) {
                  toast.error(response?.error);
                  return
                }
                toast.success("Professor em férias")

              }}>
                <h2>Férias</h2>
                <label>Data do Final</label>
                <input type="date" required onChange={(e)=>{
                  setDate(e.target.value)
                }} />
                <div>
                  <button type="submit">Add Férias</button>
                  <button
                    onClick={() => {
                      setAddFeria(false);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          <aside>
            <span>
              <FaUser />
            </span>
            <h2>{user.name + " " + user.lastname}</h2>
            <p>Data Cadastro : {user.created_at}</p>
            <p>Email : {user.email}</p>
            <p>
              Estatus :{" "}
              {user.status == 1
                ? "Ativo"
                : user.status == 2
                ? "Desativo"
                : "Em Férias"}
            </p>
            {user.vocation_date && <p>{user.vocation_date}</p>}
            <div>
              <button
                onClick={async () => {
                  await deleteTeacherByid(user.id);
                  toast.success("Professor eliminado");
                  history.back();
                  return;
                }}
                style={{
                  backgroundColor: "var(--red)",
                }}
              >
                <FaTrash />
                Remover
              </button>
              <button
                onClick={() => {
                  setAddFeria(true);
                }}
              >
                <FaCalendar />
                Add Férias
              </button>
            </div>
          </aside>
          <article>
            <div>
              <header>
                <h1>Faltas : {presence?.missings}</h1>
                <h1>Presenças : {presence?.presence}</h1>
              </header>
              <div>
                <table>
                  <thead>
                    <tr>
                      <td>Data</td>
                      <td>Status</td>
                    </tr>
                  </thead>
                  <tbody>
                    {presence?.data?.map((data) => (
                      <tr>
                        <td>{data?.date}</td>
                        <td>
                          <p
                            style={{
                              backgroundColor:
                                data?.status == "1" ? "var(--blue2)": data.status == "3" ? "orange" : "var(--red)",
                            }}
                          >
                            {data?.status == "3" ? "Pendente" : data?.status == "1" ? "Presente" : "Ausente"}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <span>
                  <p>
                    {page} de {presence.lastpage}
                  </p>

                  <span>
                    <button
                      onClick={() => {
                        if (page == 1) {
                          return;
                        }
                        setPage((prev) => prev - 1);
                      }}
                    >
                      <FaArrowAltCircleLeft />
                    </button>
                    <button
                      onClick={() => {
                        if (presence?.lastpage > page) {
                          setPage((prev) => prev + 1);
                          return;
                        }
                        setPage(presence?.lastpage);
                      }}
                    >
                      <FaArrowAltCircleRight />
                    </button>
                  </span>
                </span>
              </div>
            </div>
          </article>
        </>
      )}
    </section>
  );
}
