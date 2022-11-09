import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate,Link } from "react-router-dom";
import { Alert } from "./alert";

export function Register() {

    
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    
    
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  //obtenemos y definimos los valores en el estado
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  //ver valores obtenidos del estado
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setError('');
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      //console.log(error.code);
      if(error.code === "auth/invalid-email"){
        setError("INGRESA UN CORREO VALIDO");
      }
      else if(error.code === "auth/weak-password"){
        setError("CONTRASEÑA DEBIL,INTENTA DE NUEVO")
      }

      else if(error.code === "auth/email-already-in-use") {
        setError("ESTE CORREO YA HA SIDO REGISTRADO")
      }

      else{
        setError("ALGO SALIO MAL")
      }
      
    }
  };

  return (
    <div className="w-full max-w-xs m-auto flex items-center justify-center h-screen">
      
    {error &&  <Alert message={error}/> }

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        
        <div className="mb-4">

        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2" >Correo Electronico</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          name="email"
          placeholder="email@*****.com"
          onChange={handleChange}
        />

        </div>
        
        <div className="mb-4">

        <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
        <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          name="password"
          id="password"
          placeholder="******"
          onChange={handleChange}
        />

        </div>

        <div className="flex items-center justify-center">
        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
        >Registrarse</button>

        </div>

        <p className="my-4 text-sm flex justify-between px-3 py-2">
         ¿Ya tienes una cuenta?<Link to="/login" className="text-blue-700 hover:text-blue-900 px-1">Iniciar sesion</Link>
      </p>
    

      

      </form>
    </div>
  );
}
