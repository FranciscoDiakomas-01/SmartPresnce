import { useEffect, useState, type FormEvent } from 'react';
import './index.css'
import { getAdminVariables, updateAdminVariables } from '../../services/admin';
import Loader from '../../componets/Loader';
import { toast, ToastContainer } from 'react-toastify';
export default function Config(){

  const [variables, setVariables] = useState({
    coordVariable: "",
    teacherVariable: "",
  });
  const [ reaload , setReload] = useState(true)
  useEffect(()=>{
    async function get() {
      const response = await getAdminVariables()
      setVariables(response)
    }
    get()
    setTimeout(()=>{
      setReload(false)
    },2500)
  },[])

  async function update(e : FormEvent) {
    e.preventDefault()
    if(variables.coordVariable.length < 8 || variables.teacherVariable.length< 8){
      toast.error("Pelo menos 8 carácteres")
      return
    }else{
      const body = {
        coord: variables.coordVariable,
        teacher: variables.teacherVariable,
      };
      const response = await updateAdminVariables(body)
      if(response?.data == "updated"){
        toast.success("Variavéis alteradas")
        return
      }else{
        toast.error(response?.error)
        return
      }
    }
  }
  return (
    <section id="config">
      <ToastContainer/>
      {reaload ? (
        <div>
          <Loader />
        </div>
      ) : (
        <form onSubmit={update}>
          <h2>Variáveis do Sistema</h2>
          <aside>
            <span>
              <label>Senha Padrão Prof</label>
              <input
                placeholder="Entre com uma senha padrão para os professores"
                required
                type="password"
                value={variables.teacherVariable}
                onChange={(e) => {
                  setVariables((prev) => ({
                    ...prev,
                    teacherVariable: e.target.value,
                  }));
                }}
              />
            </span>
            <span>
              <label>Senha Padrão Coord</label>
              <input
                placeholder="Entre com uma senha padrão para os coordenadores"
                required
                type="password"
                onChange={(e) => {
                  setVariables((prev) => ({
                    ...prev,
                    coordVariable: e.target.value,
                  }));
                }}
                value={variables.coordVariable}
              />
            </span>
          </aside>
          <div>
            <button type="submit">Redefinir</button>
            <button
              type="reset"
              onClick={() => {
                history.back();
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </section>
  );
}