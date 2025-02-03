import { useEffect, useState } from "react";
import "./index.css";
import { getAllCalendarByTeacher } from "../../../services/calendar";
import Loader from "../../../componets/Loader";

export default function TeacherAgenda() {
  interface ICalendar {
    id: number;
    teacher_id: number;
    week_day: string;
    hour_start: string;
    hour_end: string;
  }
  const [calendar, setCalendar] = useState<ICalendar[]>([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    async function get() {
      const response = await getAllCalendarByTeacher();
      setCalendar(response?.data);
    }
    get();
    setTimeout(() => {
      setLoad(false);
    }, 2500);
    const interval = setInterval(() => {
      get();
    }, 1500);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <section id="agendasTeacher">
      {load ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <aside>
            {Array.isArray(calendar) && calendar?.length > 0 ? (
              <>
                {calendar?.map((c) => (
                  <div key={c.id}>
                    <span>
                      <strong>Horário Entrada</strong>
                      <i>{c.hour_start}</i>
                    </span>
                    <span>
                      <strong>Horário Saída</strong>
                      <i>{c.hour_end}</i>
                    </span>
                    <span>
                      <strong>Dia de Semana</strong>
                      <i>{c.week_day}</i>
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "17pt",
                  marginTop: "10%",
                }}
              >
                Sem Agendas para si
              </h1>
            )}
          </aside>
          <article>
            {Array.isArray(calendar) && calendar?.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <td>Hora Chegada</td>
                    <td>Hora Saída</td>
                    <td>Dia Semana</td>
                  </tr>
                </thead>
                <tbody>
                  {calendar?.map((agenda, index) => (
                    <tr key={index}>
                      <td>{agenda.hour_start}</td>
                      <td>{agenda.hour_end}</td>
                      <td>{agenda.week_day}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "17pt",
                  marginTop: "5%",
                }}
              >
                Sem Agendas para si
              </h1>
            )}
          </article>
        </>
      )}
    </section>
  );
}
