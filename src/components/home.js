import { useAuth } from "../context/authContext";
import { useState} from "react";
import {storage} from "../firebase"
import {ref,getDownloadURL,uploadBytesResumable} from "firebase/storage";
import { v4 } from "uuid";

export function Home() {


  const { user, logout, loading } = useAuth();
  const [imgURL, setImgURL] = useState("");
  const [progressPorcent, setPorgessPorcent] = useState(0);



/*const handleSubmit = async  (e) => {
   //e.preventDefault();
   
   try {
    const result= await  uploadFile(file);
    console.log(result)
    
  } catch (error) {
    console.log(error)
  }
  
}*/

const handleSubmit = (event) => {
  event.preventDefault();
  const file = event.target[0]?.files[0];
  if (!file) return;

  const storageRef = ref(storage, `images/${file.name + v4()}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setPorgessPorcent(progress);
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImgURL(downloadURL);
      });
    }
  );
};

const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.log(error);
  }
};


  if (loading) return <h1>Cargando....</h1>;

  return (
    <div>
      <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
        <div className="mb-2 sm:mb-0">
          <p className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">
            Bienvenido {user.email}
          </p>
        </div>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogout}
          > Cerrar Sesion
          </button>
        </div>
      </nav>

 
      
      <div className="grid place-items-center h-80">

      <form onSubmit={handleSubmit}  >
          <input type="file"  />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
            Subir Imagen</button>
        </form>
        {!imgURL && <p>{progressPorcent}%</p>}
        {imgURL && <img src={imgURL} alt="Imagen" className="object-fill h-60 w-96 "/>}

        </div>

 

   


    </div>
  );
}
