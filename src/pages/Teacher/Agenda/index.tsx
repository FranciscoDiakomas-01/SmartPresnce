import "./index.css";

export default function TeacherAgenda() {
  const agendas = [
    {
      id: 2,
      hour_in: "12:00:00",
      hour_out: "16:00:00",
      week: "Segunda-feira",
    },
    {
      id: 3,
      hour_in: "12:00:00",
      hour_out: "16:00:00",
      week: "Terça-feira",
    },
    {
      id: 4,
      hour_in: "12:00:00",
      hour_out: "16:00:00",
      week: "Quarta-feira",
    },
    {
      id: 5,
      hour_in: "12:00:00",
      hour_out: "16:00:00",
      week: "Quinta-feira",
    },
    {
      id: 6,
      hour_in: "12:00:00",
      hour_out: "16:00:00",
      week: "Sexta-feira",
    },
    {
      id: 7,
      hour_in: "12:00:00",
      hour_out: "16:00:00",
      week: "Sábado",
    },
  ];
  return (
    <section id="agendasTeacher">
      <aside>
        {Array.isArray(agendas) && agendas?.length > 0 ? (
          <>
            {agendas.map((agenda) => (
              <div>
                <span>
                  <strong>Horário Entrada</strong>
                  <i>{agenda.hour_in}</i>
                </span>
                <span>
                  <strong>Horário Saída</strong>
                  <i>{agenda.hour_out}</i>
                </span>
                <span>
                  <strong>Dia de Semana</strong>
                  <i>{agenda.week}</i>
                </span>
              </div>
            ))}
          </>
        ) : (
          <h1>Sem Agendas</h1>
        )}
      </aside>

      <article>
        {Array.isArray(agendas) && agendas?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <td>Hora Chegada</td>
                <td>Hora Saída</td>
                <td>Dia Semana</td>
              </tr>
            </thead>
            <tbody>
              {agendas.map((agenda) => (
                <tr>
                  <td>{agenda.hour_in}</td>
                  <td>{agenda.hour_out}</td>
                  <td>{agenda.week}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>Sem Agendas</h1>
        )}
      </article>
    </section>
  );
}
