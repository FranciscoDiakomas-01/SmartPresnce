import { useNavigate } from "react-router-dom";

export default function HomeScrennCoord(){
  const nav = useNavigate()
  return (
    <section id="homeTeacher">
      <span>
        <h1>Bem vindo de volta no sistema coordenador!</h1>
        <button
          onClick={() => {
            nav("/coord/profile");
          }}
        >
          Ver Meu Perfil
        </button>
      </span>
    </section>
  );
}