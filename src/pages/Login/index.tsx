import "./index.css";
import 'react-toastify/ReactToastify.css'
import bg from "../../assets/Smart-presence_01.png";
import Loader from "../../componets/Loader";
import loginFunc, { Body } from "../../services/login";
import { useEffect, useState, type FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [user, setUser] = useState<Body>();
  const [ load , setLoad ] = useState(false)
  useEffect(()=> {
    localStorage.clear()
    sessionStorage.clear()
  } , [])
  const nav = useNavigate()
  async function hanleOnSubmit(e : FormEvent) {
    e.preventDefault()
    if(!user?.email || !user.password || !user.type){
      toast.error("Preencha todos os campos")
      return
    }
    setLoad(true)
    const response = await loginFunc(user)
    setTimeout(()=>{
      if (response?.error) {
        toast.warning(response.error);
        setLoad(false);
        return;
      } else if (String(response?.msg).includes("wrong credentials")) {
        toast.info("Credenciais Inválidas");
        setUser({ email: "", password: "" });
        setLoad(false);
        return;
      }else{
        const token = response?.token
        localStorage.setItem("token" , token)
        toast.success("Bem vindo ao sistema!")
        setTimeout(() => {
          const url = ["/" , "/teacher" , "/coord"]
          nav(url[Number(user.type) - 1])
          return
        }, 1500)
      }
    } , 1500)
    
  }
  return (
    <form id="login" onSubmit={hanleOnSubmit}>
      <ToastContainer />
      <article>
        <img src={bg} />
      </article>
      <aside>
        <h1>SmartPresence-28AGD</h1>
        <label htmlFor="email">Email</label>
        <input
          placeholder="exemple@gmail.com"
          type="email"
          name="email"
          id="email"
          onChange={(e) => {
            setUser((prev) => ({
              ...prev,
              email: String(e.target.value),
            }));
          }}
        />
        <label htmlFor="password">Senha</label>
        <input
          placeholder="entre com uma senha"
          type="password"
          id="password"
          onChange={(e) => {
            setUser((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <label htmlFor="carg">Cargo</label>
        <select
          id="carg"
          onChange={(e) => {
            setUser((prev) => ({
              ...prev,
              type: Number(e.target.value),
            }));
          }}
          value={user?.type}
        >
          <option>Selecione o seu papel</option>
          <option value={1}>Administrador</option>
          <option value={2}>Professor</option>
          <option value={3}>Coordenador</option>
        </select>
        <button type="submit">Entrar</button>
        {load && <Loader />}
      </aside>
    </form>
  );
}
