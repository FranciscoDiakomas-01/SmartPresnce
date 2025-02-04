import {
  FaPlus,
  FaRegEye,
  FaSearch,
} from "react-icons/fa";
import "./index.css";
import { useEffect, useState, type FormEvent } from "react";
import Loader from "../../componets/Loader";
import { getTeacherBySearch } from "../../services/teacher";
import {
  CreateCalendar,
  deleteCalendarVyId,
  getAllCalendarByTeacherId,
  getAllNames,
} from "../../services/calendar";
import { toast, ToastContainer } from "react-toastify";

export default function Agenda() {
  const [add, setAdd] = useState(false);
  const [see, setSee] = useState(false);
  const weekDays = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
  ];
  interface ITeacher {
    id: number;
    name: string;
    lastname: string;
    email: string;
  }
  interface Calendar {
    teaherid: number;
    week_day: string;
    hour_start: string;
    hour_end: string;
    id: number;
  }
  interface Teachernames {
    id: number;
    name: string;
    lastname: string;
  }
  const [TeacherCalendar, setTeacherCalendar] = useState<Calendar[]>([]);
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoad, setLoad] = useState(true);
  const [isLoad2, setLoad2] = useState(true);
  const [tecacherNames, setTeachernames] = useState<Teachernames[]>([]);
  const [calendar, setCalndas] = useState<Calendar>({
    hour_end: "",
    hour_start: "",
    teaherid: 0,
    week_day: "",
    id: 0,
  });

  const [teacherIndex, setTeacherIndex] = useState<ITeacher>({
    id: 0,
    email: "",
    lastname: "",
    name: "",
  });

  useEffect(() => {
    async function get() {
      if (search.length == 0) {
        setLoad(true);
        const response = await getAllNames();
        setTeachers(response);
        const response1 = await getAllNames();
        setTeachernames(response1);
      } else {
        const response = await getTeacherBySearch(search);
        setTeachers(response?.data);
        return;
      }
    }
    get();
    setTimeout(() => {
      setLoad(false);
    }, 2500);
  }, [add , search]);

  async function getTeacherCalendar(id: number) {
    const response = await getAllCalendarByTeacherId(id);
    setTeacherCalendar(response?.data?.data);
    setTimeout(() => {
      setLoad2(false);
    }, 2500);
    return;
  }

  async function createCalendar(e: FormEvent) {
    e.preventDefault();
    if (
      !calendar.hour_end ||
      !calendar.hour_start ||
      !calendar.teaherid ||
      !calendar.week_day
    ) {
      toast.warn("Preenche Todos os Campos");
      return;
    } else {
      const response = await CreateCalendar(calendar);
      if (response?.data == "inserted") {
        toast.success("Criado com sucesso");
      } else {
        toast.error("Dados inválidos");
        return
      }
      setTimeout(() => {
        setLoad2(false);
      }, 2500);
      return;
    }
  }
  return (
    <section id="agenda">
      <ToastContainer/>
      {isLoad ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          {add && (
            <article>
              <form onSubmit={createCalendar}>
                <h2>Horários</h2>
                <label htmlFor="hour_in">Hora de Entrada</label>
                <input
                  id="hour_in"
                  type="time"
                  required
                  onChange={(e) => {
                    setCalndas((prev) => ({
                      ...prev,
                      hour_start: e.target.value + ":00",
                    }));
                  }}
                />
                <label htmlFor="hour_out">Hora de Saída</label>
                <input
                  id="hour_out"
                  type="time"
                  required
                  onChange={(e) => {
                    setCalndas((prev) => ({
                      ...prev,
                      hour_end: e.target.value + ":00",
                    }));
                  }}
                />
                <label>Entre com um dia</label>
                <select
                  required
                  onChange={(e) => {
                    setCalndas((prev) => ({
                      ...prev,
                      week_day: String(e.target.value),
                    }));
                  }}
                >
                  <option>Selecione um dia de semana</option>
                  {weekDays.map((day) => (
                    <option value={day} key={day}>{day}</option>
                  ))}
                </select>

                <label>Entre com o professor</label>
                <select
                  onChange={(e) => {
                    setCalndas((prev) => ({
                      ...prev,
                      teaherid: Number(e.target.value),
                    }));
                  }}
                >
                  <option>Selecione um professor</option>
                  {tecacherNames?.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.name + " " + data.lastname}
                    </option>
                  ))}
                </select>
                <div>
                  <button type="submit">Add Horário</button>
                  <button
                    type="reset"
                    onClick={() => {
                      setAdd(false);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </article>
          )}
          {see && (
            <article>
              <aside>
                {isLoad2 ? (
                  <div id="ll">
                    <Loader />
                  </div>
                ) : (
                  <>
                    <header>
                      <h1>SmartPresence</h1>
                      <button
                        onClick={() => {
                          setSee(false);
                        }}
                      >
                        x
                      </button>
                    </header>
                    <strong>
                      {teacherIndex.name.toUpperCase() +
                        " " +
                        teacherIndex.lastname.toUpperCase()}
                    </strong>
                    <p>{teacherIndex.email}</p>
                    <>
                      {Array.isArray(TeacherCalendar) &&
                      TeacherCalendar.length == 0 ? (
                        <>
                          <h1
                            style={{
                              textAlign: "center",
                              marginTop: "40px",
                              fontSize: "14pt",
                            }}
                          >
                            Professor Sem Calendário
                          </h1>
                          <button
                            id="add"
                            onClick={() => {
                              setSee(false);
                              setTimeout(() => {
                                setAdd(true);
                              }, 500);
                            }}
                          >
                            Criar Horário
                          </button>
                        </>
                      ) : (
                        <div>
                          <table>
                            <thead>
                              <tr>
                                <td>Dia de Semana</td>
                                <td>Horário de Entrada</td>
                                <td>Horário de Saída</td>
                                <td>Ação</td>
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(TeacherCalendar) &&
                                TeacherCalendar.map((c, index) => (
                                  <tr key={index}>
                                    <td>{c.week_day}</td>
                                    <td>{c.hour_start}</td>
                                    <td>{c.hour_end}</td>
                                    <td>
                                      <button
                                        onClick={async (e) => {
                                          e.preventDefault();
                                          await deleteCalendarVyId(c.id);
                                          await getTeacherCalendar(
                                            teacherIndex.id
                                          );
                                          setLoad2(true);
                                          toast.success("Removido com sucesso");
                                          setTimeout(() => {
                                            setLoad(false);
                                          }, 2500);
                                          return;
                                        }}
                                      >
                                        Remover
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </>
                  </>
                )}
              </aside>
            </article>
          )}
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
              placeholder="Pesquise pelo nome , email ou id do professor "
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button>
              <FaSearch />
            </button>
          </form>
          {Array.isArray(teachers) && teachers?.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <td>Nome Completo</td>
                  <td>Email</td>
                  <td>Detalhes</td>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={index}>
                    <td>{teacher.name + " " + teacher.lastname}</td>
                    <td>{teacher.email}</td>
                    <td>
                      <button
                        onClick={async () => {
                          setLoad2(true);
                          sessionStorage.setItem("tid", String(teacher.id));
                          setSee(true);
                          setTeacherIndex(teacher);
                          const id = Number(sessionStorage.getItem("tid"));
                          await getTeacherCalendar(id);
                        }}
                      >
                        <FaRegEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1 style={{ textAlign: "center", marginTop: "100px" }}>
              Nenhum Professor Cadastrado
            </h1>
          )}
        </>
      )}
    </section>
  );
}
