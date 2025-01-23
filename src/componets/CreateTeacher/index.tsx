import './index.css'

interface IProps {
  close(status : boolean) : void
}
export default function CreateTeache(prop : IProps){
  
  return(
    <section>
      <form>
        <aside>
        <div>
          <label>
            Nome
          </label>
        <input placeholder='Entre com seu nome'/>
        </div>
        <div>
          <label>
            Sobrenome
          </label>
        <input placeholder='Entre com seu sobrenome'/>
        </div>
        <div>
          <label>
            Email
          </label>
        <input placeholder='Entre com seu email'/>
        </div>

        <div>
          <label>
            Email
          </label>
        <input placeholder='Entre com seu email'/>
        </div>
        
        </aside>
        <div>
          <button>
            Cadastrar
          </button>
          <button onClick={()=>{
            prop.close(false)
          }}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  )
}