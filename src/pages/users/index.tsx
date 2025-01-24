import { FaCamera, FaFilePdf, FaPlus, FaSearch, FaUser } from 'react-icons/fa'
import './index.css'
import { useNavigate } from 'react-router-dom'

export default function Users(){
  const users = [
    {
      name : "Pedro",
      lastname : "Miguel",
      date : "10/01/2025",
      hour : "12:00:00",
      email : "pedro@gmail.com",
      status : "Ativo",

    }, {
      name : "Pedro",
      lastname : "Miguel",
      date : "10/01/2025",
      hour : "12:00:00",
      email : "pedro@gmail.com",
      status : "Ativo",

    }, {
      name : "Pedro",
      lastname : "Miguel",
      date : "10/01/2025",
      hour : "12:00:00",
      email : "pedro@gmail.com",
      status : "Ativo",

    }, {
      name : "Pedro",
      lastname : "Miguel",
      date : "10/01/2025",
      hour : "12:00:00",
      email : "pedro@gmail.com",
      status : "Ativo",

    }, {
      name : "Pedro",
      lastname : "Miguel",
      date : "10/01/2025",
      hour : "12:00:00",
      email : "pedro@gmail.com",
      status : "Ativo",

    }, {
      name : "Pedro",
      lastname : "Miguel",
      date : "10/01/2025",
      hour : "12:00:00",
      email : "pedro@gmail.com",
      status : "Ativo",

    }, {
      name : "Pedro",
      lastname : "Miguel",
      date : "10/01/2025",
      hour : "12:00:00",
      email : "pedro@gmail.com",
      status : "Ativo",

    }, {
      name : "Pedro",
      lastname : "Miguel",
      date : "10/01/2025",
      hour : "12:00:00",
      email : "pedro@gmail.com",
      status : "Ativo",

    }, {
      name : "Pedro",
      lastname : "Miguel",
      date : "10/01/2025",
      hour : "12:00:00",
      email : "pedro@gmail.com",
      status : "Ativo",

    }, {
      name : "Pedro",
      lastname : "Miguel",
      date : "10/01/2025",
      hour : "12:00:00",
      email : "pedro@gmail.com",
      status : "Ativo",

    }, {
      name : "Pedro",
      lastname : "Miguel",
      date : "10/01/2025",
      hour : "12:00:00",
      email : "pedro@gmail.com",
      status : "Ativo",

    }, {
      name : "Pedro",
      lastname : "Miguel",
      date : "10/01/2025",
      hour : "12:00:00",
      email : "pedro@gmail.com",
      status : "Ativo",

    }
  ]
  const nav = useNavigate()
  return(
    <section id='teachers'>
      
      <header>
        <form>
          <input placeholder='Pesquise pelo nome ou pelo id do professor' type='text' required/>
          <button>
          <FaSearch/>
          </button>
        </form>
        <div>
          
        <button onClick={()=>{
          nav("/read")
        }}>
          <FaCamera/>
          <p>
            Ler Qr Code
          </p>
        </button>
        <button>
          <FaFilePdf/> 
          <p>
            Exporrtar em PDF
          </p>
        </button>
        <button onClick={()=>{
          nav("/createTeaher")
        }}>
          <FaPlus/> 
          <p>
            Add
          </p>
        </button>
        </div>

      </header>
      <aside>
        {
          users.map((user , index) => (
            <div key={index}>
              <span>
                <FaUser/>
              </span>
              <strong>
                {user.name  + " " + user.lastname}
              </strong>
              <p>
                {user.email}
              </p>
              <p>
                Estatus : { user.status}
              </p>
              <button onClick={()=>{
                localStorage.setItem("userid" , index.toString())
                nav("/details")
              }}>
                Ver Detalhes
              </button>
            </div>
          ))
        }
      </aside>
      <footer>
        <span>
        1 de 1
        </span>
        <div>

        <button>
            {"<"}
          </button>
          
          <button>
            {">"}
          </button>
        </div>
      </footer>
    </section>
  )
}