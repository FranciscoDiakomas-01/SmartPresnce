import { FaCamera, FaPlus, FaSearch, FaUser } from 'react-icons/fa'
import './index.css'
import { useState } from 'react'
import QRCodeReader from '../../componets/QrCode'

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
  const  [ qr , setQr] = useState(false)
  
  return(
    <section id='teachers'>
      {
        qr && <QRCodeReader/>
      }
      <header>
        <form>
          <input placeholder='Pesquise pelo nome ou pelo id do professor' type='text' required/>
          <button>

          <FaSearch/>
          </button>
        </form>
        <div>
          
        <button onClick={()=>{
          setQr(prev => !prev)
        }}>
          <FaCamera/>
          <p>
            Ler Qr Code
          </p>
        </button>
        <button>
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
              <button>
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