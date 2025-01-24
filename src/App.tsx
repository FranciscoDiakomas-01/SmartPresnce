
import './App.css'
import SideBar from './componets/SideBar'
import { Outlet} from 'react-router-dom'

function App() {
  return (
    <main id='App'>
      <SideBar/>
      <section>
        <Outlet/>
      </section>
    </main>
  )
}

export default App
