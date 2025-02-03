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
  const [admin, setAdmin] = useState<User>({
    name: "",
    email: "",
    lastname: "",
    password: "",
    oldemail : "",
    oldpassword : ""
  });
  const [load, setLoad] = useState(true);
  const [msg , setMsg] = useState("")
  useEffect(() => {
    async function getAdm() {
      setLoad(true);
      const response = await getAdminData();
      console.log(response);
      setAdmin(response);
    }
    getAdm();
    setTimeout(() => {
      setLoad(false);
    }, 2500);
  }, []);

  async function update(e: FormEvent) {
    e.preventDefault();
    if(!admin.password || !admin.email){
      admin.password = admin.oldpassword
      admin.email = admin.oldemail
    }
    if (!admin.name || !admin.password || !admin.lastname) {
      setMsg("Preencha os campos")
      return;
    } else {
      const response = await updateAdmin(admin);
      setMsg(response?.msg ? "Perfil alterado!" : response?.error)
      if (response?.msg == "updated") {
        setTimeout(() => {
          location.reload();
        }, 2000);
        return;
      } else {
        return;
      }
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
            {admin.name.charAt(0).toUpperCase() +
              admin?.lastname.charAt(0).toUpperCase()}
          </span>
          <aside>
            <div>
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                placeholder="Entre com seu nome"
                value={admin?.name}
                required
                onChange={(e) => {
                  setAdmin((prev) => ({ ...prev, name: e.target.value }));
                }}
              />
            </div>
            <div>
              <label htmlFor="lastname">Sobrenome</label>
              <input
                id="lastname"
                value={admin?.lastname}
                placeholder="Entre com seu sobrenome"
                required
                onChange={(e) => {
                  setAdmin((prev) => ({ ...prev, lastname: e.target.value }));
                }}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                value={admin?.email}
                placeholder="Entre com seu email"
                type="email"
                required
                onChange={(e) => {
                  setAdmin((prev) => ({ ...prev, oldemail: e.target.value }));
                }}
              />
            </div>
            <div>
              <label htmlFor="pass">Senha</label>
              <input
                id="pass"
                placeholder="Entre com sua antiga senha"
                type="password"
                required
                onChange={(e) => {
                  setAdmin((prev) => ({ ...prev, olpassword: e.target.value }));
                }}
              />
            </div>
            <div>
              <label htmlFor="pass">Novo email</label>
              <input
                id="pass"
                placeholder="Entre com um novo email (opcional)"
                type="password"
                required
                onChange={(e) => {
                  setAdmin((prev) => ({ ...prev, email: e.target.value }));
                }}
              />
            </div>
            <div>
              <label htmlFor="pass">Nova Senha</label>
              <input
                id="pass"
                placeholder="Entre com nova senha (opcional)"
                type="password"
                required
                onChange={(e) => {
                  setAdmin((prev) => ({ ...prev, password: e.target.value }));
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
              color: msg.includes("updated") ? "var(--blue2)" : "",
            }}
          >
            {msg}
          </p>
        </form>
      )}
    </section>
  );
}
