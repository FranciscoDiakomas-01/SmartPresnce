import { useNavigate } from 'react-router-dom';
import './index.css'

export default function HomeTeacher(){

  const nav = useNavigate()
  return (
    <section id="homeTeacher">
      <span>
        <h1>Bem vindo de volta no sistema professor!</h1>
        <button onClick={()=>{
          nav("/teacher/merelatory");
        }}>Ver Meus Relatórios</button>
      </span>
    </section>
  );
}