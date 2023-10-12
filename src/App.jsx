import { useState, useEffect } from 'react'
import Header from './components/header'
import Formulario from './components/Formulario'
import ListadoPacientes from './components/ListadoPcientes'
function App() {
  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []);
  const [paciente, setPaciente] = useState({});
  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id) ;
    setPacientes(pacientesActualizados);
  }
  //Versiones anteriores de react
  // useEffect(()=>{
  //   const obtenerLS = () => {
  //     const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
  //     setPacientes(pacientesLS);
  //   }
  //   obtenerLS();
  // },[]);
  useEffect(()=>{
    localStorage.setItem('pacientes',JSON.stringify(pacientes));
  },[pacientes]);
  //puedo crear funciones antes del return
  return (
    <div className="container mx-auto mt-10">
      <Header/>
      <div className="mt-12 md:flex p-4">
        <Formulario
          pacientes={pacientes}
          setPacientes= {setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>

    </div>
  )
}

export default App
