
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaPlus,
  FaPowerOff,
  FaSearch,
  FaTrashAlt,
} from "react-icons/fa";
import "./index.css";
import {
  CoorddeleteByID,
  CoordtoogleStatus,
  CreateCoord,
  getAllCoord,
  getAllCoordBySearch,
} from "../../services/coord";
import { useEffect, useState, type FormEvent } from "react";
import Loader from "../../componets/Loader";
import { toast } from "react-toastify";
export default function Coord() {
  interface ICoord {
    id: number;
    status?: boolean;
    name?: string;
    lastname?: string;
    email?: string;
  }

  const [search, setSearch] = useState<string>("");
  const [add, setAdd] = useState(false);
  const [user, setUser] = useState<{
    email?: string;
    name?: string;
    lastname?: string;
  }>();
  const [coords, setCoords] = useState<ICoord[]>();
  const [page, setPage] = useState<number>(1);
  const [reload, setReload] = useState(false);
  const [lastpage, setLastPage] = useState<number>(0);
  const [isLoad, setLoad] = useState(true);
  useEffect(() => {

    async function getAll() {

      //pegar todos
      if(search.length == 0 ){
        setLoad(true);
        const response = await getAllCoord(page);
        setCoords(response?.data);
        setLastPage(response?.lastpage);
        setPage(response?.page);
        return
      }
      //pegar pelo texto de pesquisa
      else{
        const response = await getAllCoordBySearch(search);
        setCoords(response?.data);
        setLastPage(response?.lastpage);
        setPage(response?.page);
      }
    }
    getAll();
    setTimeout(() => {
      setLoad(false);
    }, 2000);

  }, [page, reload , search]);

  async function hadleOnSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user?.email || !user.lastname || !user.name) {
      toast.error("Preencha todos campos!");
      return;
    }
    setLoad(true);
    const response = await CreateCoord(user);
    setTimeout(() => {
      if (response?.msg == "created") {
        toast.success("Criado com sucesso");
      } else {
        toast.error(response?.error);
      }
      setLoad(false);
      setReload((prev) => !prev);
      setAdd(false);
      setUser({});
      return;
    }, 2000);
  }
  return (
    <section id="cors">
      {add && (
        <article>
          <form onSubmit={hadleOnSubmit}>
            <h2>Coordenador</h2>
            <article>
              <span>
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Entre com o nome"
                  autoFocus
                  value={user?.name}
                  onChange={(e) => {
                    setUser((prev) => ({ ...prev, name: e.target.value }));
                  }}
                />
              </span>
              <span>
                <label htmlFor="lastname">Sobrenome</label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Entre com o sobrenome"
                  value={user?.lastname}
                  onChange={(e) => {
                    setUser((prev) => ({ ...prev, lastname: e.target.value }));
                  }}
                />
              </span>
              <span>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Entre com o email"
                  value={user?.email}
                  onChange={(e) => {
                    setUser((prev) => ({ ...prev, email: e.target.value }));
                  }}
                />
              </span>
            </article>
            <div>
              <button type="submit">Cadastrar</button>
              <button
                type="button"
                onClick={() => {
                  setAdd(false);
                }}
              >
                Cancelar
              </button>
            </div>
            {isLoad && <Loader />}
          </form>
        </article>
      )}
      {isLoad ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <header>
            <button
              onClick={() => {
                setAdd(true);
              }}
            >
              <FaPlus />
              Add
            </button>
          </header>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              placeholder="Pesquise pelo nome , email ou sobrenome do coorenador "
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
          {Array.isArray(coords) && coords?.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <td>Nome Completo</td>
                  <td>Email</td>
                  <td>Status</td>
                  <td>Remover</td>
                </tr>
              </thead>
              <tbody>
                {coords.map((cord, index: number) => (
                  <tr key={cord.id} id={cord.id.toString()}>
                    <td>
                      {cord.name} {cord.lastname}
                    </td>
                    <td>{cord.email}</td>
                    <td>
                      <button
                        id={cord.id.toString()}
                        onClick={async () => {
                          const newList = [...coords];
                          const status = !newList[index].status;
                          newList[index].status = status;
                          const response = await CoordtoogleStatus(
                            cord.id,
                            status
                          );
                          setCoords(newList);
                          if (response?.updated) {
                            toast.success("Status Alterado!");
                            return;
                          }
                          toast.error("Erro!");
                        }}
                        style={{
                          backgroundColor: !cord.status ? "#e53d53" : "",
                        }}
                      >
                        {cord.status ? <FaPowerOff /> : <FaPowerOff />}
                        {cord.status ? "Ativo" : "Desativo"}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={async () => {
                          await CoorddeleteByID(cord.id);
                          toast.success("Deletado com sucesso!");
                          setReload((prev) => !prev);
                          return;
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1
              style={{
                textAlign: "center",
                display: "flex",
                placeSelf: "center",
                alignSelf: "center",
              }}
            >
              Nenhum Coordenador Cadastrado
            </h1>
          )}
          {Array.isArray(coords) && coords?.length > 0 && (
            <>
              {search.length <= 0 && (
                <span>
                  <p>
                    {page} de {lastpage}
                  </p>
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
                </span>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
