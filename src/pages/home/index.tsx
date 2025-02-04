import { FaArrowCircleLeft, FaArrowCircleRight, FaUser } from "react-icons/fa";
import "./index.css";
import { DashBoard, getAllLatest } from "../../services/admin";
import Loader from "../../componets/Loader";
import { useEffect, useState } from "react";
export default function Home() {
  const [isLoad, setLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [lastpage, setLastPage] = useState(1);
  const [last, setLast] = useState<IPresence[]>([]);
  const [dashBoardData, setDashBoard] = useState<{
    total_teacher: number;
    total_coord: number;
  }>();
  useEffect(() => {
    setLoad(true);
    async function dashBoard() {
      const response = await DashBoard();
      setDashBoard(response);
    }
    dashBoard();
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);

  useEffect(() => {
    //get latest presences
    async function get() {
      const response = await getAllLatest(page);
      if (response?.lastpage == 0) {
        response.lastpage = 1;
      }
      setLast(response?.data);
      setLastPage(response?.lastpage);
    }
    get();
    const interval = setInterval(() => {
      get();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [page]);
  interface IPresence {
    name: string;
    date: string;
    status: string;
  }
  return (
    <section id="home">
      {isLoad ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
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
          <article>
            {Array.isArray(last) && last?.length > 0 && (
              <h1>Últimos resistros</h1>
            )}
          </article>
          <span>
            {Array.isArray(last) && last?.length > 0 ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <td>Data</td>
                      <td>Professor</td>
                      <td>Status</td>
                    </tr>
                  </thead>
                  <tbody>
                    {last.map((user, index) => (
                      <tr key={index}>
                        <td>{user.date}</td>
                        <td>{user.name}</td>
                        <td
                          style={{
                            color:
                              user?.status == "1"
                                ? "green"
                                : user.status == "2"
                                ? "red"
                                : "orange",
                          }}
                        >
                          {user?.status == "1"
                            ? "Presente"
                            : user.status == "2"
                            ? "Ausente"
                            : "Pendente"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <footer>
                  <p>
                    {page} de {lastpage}{" "}
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
                  </span>
                </footer>
              </>
            ) : (
              <h1>Sem Registros Cadastrados</h1>
            )}
          </span>
        </>
      )}
    </section>
  );
}
