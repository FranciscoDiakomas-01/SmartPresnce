import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaCamera,
  FaPlus,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../componets/Loader";
import { getAllTeachers, getTeacherBySearch } from "../../services/teacher";

export default function Users() {
  interface ITeacher {
    id: number;
    name: string;
    lastname: string;
    email: string;
    status: number;
    vocation_date: string;
    created_at: string;
  }
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [lastpage, setLastPage] = useState<number>(0);
  const [isLoad, setLoad] = useState(true);
  const nav = useNavigate();
  useEffect(() => {
    async function get() {
      if (search.length == 0) {
        const response = await getAllTeachers(page);
        setLastPage(response?.lastpage);
        setPage(response?.page);
        setTeachers(response?.data);
      } else {
        const response = await getTeacherBySearch(search);
        setTeachers(response?.data);
        setPage(1);
        setLastPage(1);
        return
      }
    }
    get();
    setTimeout(() => {
      setLoad(false);
    }, 2500);
  }, [page, search]);
  return (
    <section id="teachers">
      {isLoad ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <header>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                placeholder="Pesquise pelo nome , sobrenome ou email do professor"
                type="text"
                required
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button>
                <FaSearch />
              </button>
            </form>
            <div>
              <button
                onClick={() => {
                  nav("/read");
                }}
              >
                <FaCamera />
                <p>Ler Qr Code</p>
              </button>
              <button
                onClick={() => {
                  nav("/createTeaher");
                }}
              >
                <FaPlus />
                <p>Add</p>
              </button>
            </div>
          </header>
          {Array.isArray(teachers) && teachers.length > 0 ? (
            <>
              <aside>
                {teachers.map((user, index) => (
                  <div key={index}>
                    <span>
                      <FaUser />
                    </span>
                    <strong>Nome : {user.name + " " + user.lastname}</strong>
                    <p>{user.email}</p>
                    <p>
                      Estatus :{" "}
                      {user.status == 1
                        ? "Ativo"
                        : user.status == 2
                        ? "Desativo"
                        : "Em Férias"}
                    </p>
                    {user.vocation_date && <p>{user.vocation_date}</p>}
                    <button
                      onClick={() => {
                        sessionStorage.setItem("user", JSON.stringify(user));
                        nav("/details");
                      }}
                    >
                      Ver Detalhes
                    </button>
                  </div>
                ))}
              </aside>
              {!search && (
                <footer>
                  <span>
                    {page} de {lastpage}
                  </span>
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
              )}
            </>
          ) : (
            <h1
              style={{
                textAlign: "center",
                marginTop: "100px",
              }}
            >
              Nenhum Professor Cadastrado
            </h1>
          )}
        </>
      )}
    </section>
  );
}
