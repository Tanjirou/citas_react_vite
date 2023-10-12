import React from 'react';
import {useState, useEffect} from 'react';
import Error from './Error';

const Formulario = ({pacientes ,setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState('');
  const [propietario,setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false);
  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }

  useEffect(()=>{
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  },[paciente]);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacion del formulario
    if([nombre ,propietario, email, fecha, sintomas].includes('')){
      console.log('Hay al menos un input vacio');
      setError(true);
      return;
    }

    setError(false);
    //objetos de paciente
    const objetoPaciente = {
      nombre ,
      propietario, 
      email,
      fecha,
      sintomas
    }

    if(paciente.id){
      //Editando el registro
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);
      setPacientes(pacientesActualizados);
      setPaciente({});
    }else{
      //nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    //Reiniciar el formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }
  
  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form onSubmit={handleSubmit} className="bg-white shadow-md roundend-lg py-10 px-5 mb-10">
       {error && <Error> <p>Todos los campos son obligatorios</p> </Error>}
        <div className='mb-5'>
          <label htmlFor="mascota" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input type="text" name="mascota" id="mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre de la mascota" value={nombre} onChange={ (e) => setNombre(e.target.value) } />
        </div>
        <div className='mb-5'>
          <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input type="text" name="propietario" id="propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre del Propietario" value={propietario} onChange={(e) => setPropietario(e.target.value)}  />
        </div>
        <div className='mb-5'>
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email</label>
          <input type="email" name="email" id="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Email Contacto Propietario" value={email} onChange={ (e) => setEmail(e.target.value)} />
        </div>
        <div className='mb-5'>
          <label htmlFor="alta" className="text-gray-700 uppercase font-bold">Alta</label>
          <input type="date" name="alta" id="alta" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={fecha} onChange={ (e) => setFecha(e.target.value)} />
        </div>
        <div className='mb-5'>
          <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Síntomas</label>
          <textarea name="sintomas" id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Describe los Síntomas" value={sintomas} onChange={ (e) => setSintomas(e.target.value)} />
        </div>
        <input type="submit" className="resize-none bg-indigo-600 w-full p-3 text-white uppercase font-bold cursor-pointer hover:bg-indigo-700 transition-colors" value={paciente.id? 'Editar Paciente' : 'Agregar Paciente'} />
      </form>
    </div>
  )
}

export default Formulario
