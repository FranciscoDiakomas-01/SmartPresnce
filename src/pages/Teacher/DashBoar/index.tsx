import "./index.css";

import "./index.css";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaSearch,
} from "react-icons/fa";

export default function TeacherDash() {
  const data = {
    total_presence: 20,
    total_missings: 30,
    total_lates: 40,
  };
  const presence = [
    {
      id: 1,
      date: "12/02/2025 , 12:10:00 - 14:00:00",
      week: "Quarta-feira",
      status: "Presente",
      atraso: "",
    },
    {
      id: 1,
      date: "12/02/2025 , 12:10:00 - 14:00:00",
      week: "Sexta-feira",
      status: "Ausente",
      atraso: "40min",
    },
    {
      id: 1,
      date: "12/02/2025 , 12:10:00 - 14:00:00",
      week: "Quarta-feira",
      status: "Ausente",
      atraso: "12min",
    },
    {
      id: 1,
      date: "12/02/2025 , 12:10:00 - 14:00:00",
      week: "Sexta-feira",
      status: "Pendente",
      atraso: "12min",
    },
  ];
  return (
    <section id="presenceTeacher">
      <article>
        <aside>
          <span>
            <h1>Presenças</h1>
            <strong>{data.total_presence}</strong>
          </span>
          <span>
            <h1>Faltas</h1>
            <strong>{data.total_missings}</strong>
          </span>
          <span>
            <h1>Atrasos</h1>
            <strong>{data.total_lates}</strong>
          </span>
        </aside>
        <form>
          <label htmlFor="date">Filtre por data</label>
          <input type="date" name="date" />
          <button>
            <FaSearch />
          </button>
        </form>
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
                        color: agenda.status.includes("Pr")
                          ? "green"
                          : agenda.status.includes("A")
                          ? "red"
                          : "orange",
                      }}
                    >
                      {agenda.status}
                    </p>
                  </span>
                  {!agenda.status.includes("Pr") && <span>Atraso :{agenda.atraso}</span>}
                  <span>Dia de Semana : {agenda.week}</span>
                </div>
              ))}
            </div>
          ) : (
            <h1>Sem Registros</h1>
          )}

          {Array.isArray(presence) && presence?.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <td>Data</td>
                  <td>Status</td>
                  <td>Atraso</td>
                  <td>Dia Semana</td>
                </tr>
              </thead>
              <tbody>
                {presence.map((agenda) => (
                  <tr>
                    <td>{agenda.date}</td>
                    <td
                      style={{
                        color: agenda.status.includes("Pr")
                          ? "green"
                          : agenda.status.includes("A")
                          ? "red"
                          : "orange",
                      }}
                    >
                      {agenda.status}
                    </td>
                    <td>{agenda.atraso}</td>
                    <td>{agenda.week}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1>Sem Registros</h1>
          )}
        </article>
        <footer>
          <p>1 de 1</p>
          <div>
            <button>
              <FaArrowCircleLeft />
            </button>
            <button>
              <FaArrowCircleRight />
            </button>
          </div>
        </footer>
      </article>
    </section>
  );
}
