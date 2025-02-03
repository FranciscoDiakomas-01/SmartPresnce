import { useState } from "react";
import "./index.css";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { CreateTeacher } from "../../services/teacher";

export default function CreateTeache() {
  const [teacher, setTeacher] = useState({
    email: "",
    lastname: "",
    name: "",
  });
  const [load, setLoad] = useState(false);
  return (
    <section id="teachersingup">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!teacher.email || !teacher.lastname || !teacher.name) {
            toast.warn("Preencha todos os Campos");
            return;
          } else {
            setLoad(true);
            const response = await CreateTeacher(teacher);
            setTimeout(() => {
              setLoad(false);
              if (response?.msg == "created") {
                toast.success("Criado com sucesso!");
                setTeacher({ name: "", email: "", lastname: "" });
                return;
              } else {
                toast.error(response?.error);
                return;
              }
            }, 2500);
          }
        }}
      >
        <h1>Cadastro de Professor</h1>
        <aside>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              onChange={(e) => {
                setTeacher((prev) => ({ ...prev, name: e.target.value }));
              }}
              placeholder="Entre com seu nome"
              value={teacher.name}
            />
          </div>
          <div>
            <label htmlFor="lastname">Sobrenome</label>
            <input
              id="lastname"
              onChange={(e) => {
                setTeacher((prev) => ({ ...prev, lastname: e.target.value }));
              }}
              placeholder="Entre com seu sobrenome"
              value={teacher.lastname}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              onChange={(e) => {
                setTeacher((prev) => ({ ...prev, email: e.target.value }));
              }}
              placeholder="Entre com seu email"
              type="email"
              value={teacher.email}
            />
          </div>
        </aside>
        <div>
          <button type="submit">Cadastrar</button>
          <button
            type="reset"
            onClick={() => {
              history.back();
            }}
          >
            Cancelar
          </button>
        </div>
        {load && <Loader />}
      </form>
    </section>
  );
}
