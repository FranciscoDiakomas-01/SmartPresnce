/* eslint-disable @typescript-eslint/no-unused-vars */
import "./index.css";
import { getAdminData, updateAdmin } from "../../services/admin";
import { useEffect, useState, type FormEvent } from "react";
import Loader from "../../componets/Loader";

export default function Profile() {
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
      const response = await getAdminData();
      setName((prev) => response.name);
      setLastName((prev) => response.lastname);
      setOldEmail((prev) => response.email);
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
      const response = await updateAdmin(body);
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
    <section id="profile">
      {load ? (
        <div>
          <Loader />
        </div>
      ) : (
        <form onSubmit={update}>
          <span>
            {name.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()}
          </span>
          <aside>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
            </div>

            <div>
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
            </div>
            <div>
              <label htmlFor="email">Novo Email</label>
              <input
                id="email"
                placeholder="Entre com seu email (opcional)"
                type="email"
                onChange={(e) => {
                  setEmail((prev) => e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="pass">Nova Senha</label>
              <input
                id="pass"
                placeholder="Entre com nova senha (opcional)"
                type="password"
                onChange={(e) => {
                  setPassword((prev) => e.target.value);
                }}
              />
            </div>
          </aside>
          <div>
            <button type="submit">Actualizar</button>
            <button
              type="button"
              onClick={() => {
                history.back();
              }}
            >
              Cancelar
            </button>
          </div>
          <p
            style={{
              color: msg?.includes("Perfil") ? "var(--blue2)" : "",
            }}
          >
            {msg}
          </p>
        </form>
      )}
    </section>
  );
}
