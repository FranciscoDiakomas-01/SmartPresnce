import './index.css'


export default function CreateTeache(){
  
  return(
    <section id='teachersingup'>
      <form>
        <h1>Cadastro de Professor</h1>
        <aside>
        <div>
          <label>
            Nome
          </label>
        <input placeholder='Entre com seu nome' required/>
        </div>
        <div>
          <label>
            Sobrenome
          </label>
        <input placeholder='Entre com seu sobrenome'required/>
        </div>
        <div>
          <label>
            Email
          </label>
        <input placeholder='Entre com seu email' type='email' required/>
        </div>

        <div>
          <label>
            Data Nascimento
          </label>
        <input  type='date'required/>
        </div>

        <div>
          <label>
            Telefone
          </label>
        <input placeholder='Entre com seu telefone' type='tel'required/>
        </div>
        <div>
          <label>
            Nº do BI
          </label>
        <input placeholder='Entre com seu BI' type='text' required/>
        </div>
        <div>
          <label>
            Género
          </label>
          <select required>
            <option>Selecione o seu género</option>
            <option>Masculino</option>
            <option>Femenino</option>
            <option>Outro</option>
          </select>
        </div>
        <div>
          <label>
            Disciplina
          </label>
          <select>
            <option>Selecione uma disciplina</option>
            <option>Masculino</option>
            <option>Femenino</option>
            <option>Outro</option>
          </select>
        </div>
        </aside>
        <div>
          <button>
            Cadastrar
          </button>
          <button onClick={()=>{
            history.back()
          }}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  )
}