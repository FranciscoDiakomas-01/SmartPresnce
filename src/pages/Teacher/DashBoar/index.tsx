
import { useEffect, useState } from "react";
import "./index.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import Loader from "../../../componets/Loader";
import { getTeacherPresence } from "../../../services/teacher";

export default function TeacherDash() {
  const [page, setPage] = useState<number>(1);
  const [lastpage, setLastpage] = useState<number>(1);
  const [load, setLoad] = useState(true);
  const [data, setData] = useState({
    total_presence: 0,
    total_missings: 0,
  });
  interface IPresence {
    id: number;
    teacher_id: number;
    date: string;
    status: number;
  }

  const [presence, setPresence] = useState<IPresence[]>([]);
  useEffect(() => {
    async function get() {
      const response = await getTeacherPresence(page);
      setPresence(response?.data);
      setData(() => ({
        total_missings: response?.missings,
        total_presence: response?.presence,
      }));
      setLastpage(response.lastpage > 0 ? response?.lastpage : 1);
    }
    get();
    const interval = setInterval(()=>{
      get()
    },1500)

    setTimeout(() => {
      setLoad(false);
    }, 2500);
    return () => {
      clearInterval(interval)
    }
  }, [page]);
  return (
    <section id="presenceTeacher">
      <article>
        {load ? (
          <Loader />
        ) : (
          <>
            <aside>
              <span>
                <h1>Presenças</h1>
                <strong>{data.total_presence}</strong>
              </span>
              <span>
                <h1>Faltas</h1>
                <strong>{data.total_missings}</strong>
              </span>
            </aside>
            <article>
              {Array.isArray(presence) && presence?.length > 0 ? (
                <div>
                  {presence.map((agenda) => (
                    <div>
                      <span>Data : {agenda.date}</span>
                      <span>
                        Status :
                        <p
                          style={{
                            color:
                              agenda.status == 1
                                ? "green"
                                : agenda.status == 2
                                ? "red"
                                : "orange",
                          }}
                        >
                          {agenda.status == 1
                            ? "Presente"
                            : agenda.status == 2
                            ? "Ausente"
                            : "Pendete"}
                        </p>
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <h1
                  style={{
                    textAlign: "center",
                  }}
                >
                  Sem Registros
                </h1>
              )}

              {Array.isArray(presence) && presence?.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <td>Data</td>
                      <td>Status</td>
                    </tr>
                  </thead>
                  <tbody>
                    {presence.map((agenda) => (
                      <tr>
                        <td>{agenda.date}</td>
                        <td
                          style={{
                            color:
                              agenda.status == 1
                                ? "green"
                                : agenda.status == 2
                                ? "red"
                                : "orange",
                          }}
                        >
                          {agenda.status == 1
                            ? "Presente"
                            : agenda.status == 2
                            ? "Ausente"
                            : "Pendete"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </article>
            <footer>
              <p>1 de 1</p>
              <div>
                <button
                  onClick={() => {
                    if (page == 1) {
                      return;
                    }
                    setPage((prev) => prev - 1);
                  }}
                >
                  <FaArrowCircleLeft></FaArrowCircleLeft>
                </button>
                <button
                  onClick={() => {
                    if (lastpage > page) {
                      setPage((prev) => prev + 1);
                      return;
                    }
                    setPage(lastpage);
                  }}
                >
                  <FaArrowCircleRight></FaArrowCircleRight>
                </button>
              </div>
            </footer>
          </>
        )}
      </article>
    </section>
  );
}
