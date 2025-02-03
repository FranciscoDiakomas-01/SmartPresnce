/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, type FormEvent } from "react";
import { FaUser } from "react-icons/fa";
import { getCoorbyId, updateCoord } from "../../../services/coord";
import Loader from "../../../componets/Loader";


export default function CoordProfile() {
  interface User {
    name: string;
    lastname: string;
    email: string;
    password: string;
    oldpassword: string;
    oldemail: string;
  }

  const [load, setLoad] = useState(true);
  const [msg, setMsg] = useState("");
  const [lastname, setLastName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldemail, setOldEmail] = useState("");
  const [oldpassword, setOlpassword] = useState("");
  const [ reload , setReload] = useState(false)
  useEffect(() => {
    async function getAdm() {
      setLoad(true);
      const response = await getCoorbyId();
      setName((prev) => response?.data?.name);
      setLastName((prev) => response?.data?.lastname);
      setOldEmail((prev) => response?.data?.email);
    }
    getAdm();
    setTimeout(() => {
      setLoad(false);
    }, 2500);
  }, [reload]);

  async function update(e: FormEvent) {
    e.preventDefault();
    if (!name || !oldemail || !oldpassword) {
      setMsg("Preencha os campos obrigatórios");
      setTimeout(() => {
        setMsg("");
      }, 1500);
      return;
    } else {
      const body: User = {
        name,
        lastname,
        oldpassword,
        email,
        password,
        oldemail,
      };
      const response = await updateCoord(body);
      setMsg(response?.msg ? response?.msg : response?.error);
      setOlpassword((prev) => "");
      setEmail((prev) => "");
      setPassword((prev) => "");
      setTimeout(() => {
        setMsg("")
        setReload(prev => !prev)
      }, 2000);
    }
  }
  return (
    <section id="teacherProfile">
      <article>
        {load ? (
          <Loader />
        ) : (
          <form onSubmit={update}>
            <span>
              <FaUser />
            </span>
            <aside>
              <span>
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  placeholder="Entre com seu nome"
                  value={name}
                  required
                  onChange={(e) => {
                    setName((prev) => e.target.value);
                  }}
                />
              </span>
              <span>
                <label htmlFor="lastname">Sobrenome</label>
                <input
                  id="lastname"
                  value={lastname}
                  placeholder="Entre com seu sobrenome"
                  required
                  onChange={(e) => {
                    setLastName((prev) => e.target.value);
                  }}
                />
              </span>
              <span>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  value={oldemail}
                  placeholder="Entre com seu email"
                  type="email"
                  required
                  onChange={(e) => {
                    setOldEmail((prev) => e.target.value);
                  }}
                />
              </span>
              <span>
                <label htmlFor="pass">Senha</label>
                <input
                  id="pass"
                  placeholder="Entre com a sua  senha"
                  type="password"
                  value={oldpassword}
                  required
                  onChange={(e) => {
                    setOlpassword((prev) => e.target.value);
                  }}
                />
              </span>
              <span>
                <label htmlFor="email">Novo Email</label>
                <input
                  id="email"
                  placeholder="Entre com seu email (opcional)"
                  type="email"
                  onChange={(e) => {
                    setEmail((prev) => e.target.value);
                  }}
                />
              </span>
              <span>
                <label htmlFor="pass">Nova Senha</label>
                <input
                  id="pass"
                  placeholder="Entre com nova senha"
                  type="password"
                  onChange={(e) => {
                    setPassword((prev) => e.target.value);
                  }}
                />
              </span>
            </aside>
            <button type="submit">Actualizar</button>
            {
              msg && <p style={{
                textAlign : "center",
                fontSize : "14pt",
                color : msg?.includes("up") ? "var(--blue2)" : "var(--red)"
              }}>
                {msg?.includes("up") ? "Perfil Alterado" : msg}
              </p>
            }
          </form>
        )}
      </article>
    </section>
  );
}
