import { ToastContainer } from "react-toastify";
import "./App.css";
import SideBar from "./componets/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./componets/Loader";
import isLogged from "./services/isLogged";

function App() {
  const [ load , setLoad ] = useState(true)
  const nav = useNavigate()
  useEffect(()=>{
    if(isLogged()){
      setTimeout(()=>{
        setLoad(false)
      },2500)
      return
    }else{
      nav("/login")
      return
    }
  }, [])

  return (
    <main id="App">
      <ToastContainer
        style={{
          zIndex: "999999999999999999999999999999",
        }}
      />
      {load ? (
        <Loader />
      ) : (
        <>
          <SideBar />
          <Outlet />
        </>
      )}
    </main>
  );
}

export default App;
