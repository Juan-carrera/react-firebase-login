// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDhOk-x16VLe-iENBo5twkodJeTrC0mRU",
  authDomain: "fir-login-react-2b79d.firebaseapp.com",
  projectId: "fir-login-react-2b79d",
  storageBucket: "fir-login-react-2b79d.appspot.com",
  messagingSenderId: "682494756825",
  appId: "1:682494756825:web:470ac82c3c8003b0e53bc8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 

export const storage = getStorage(app);

/*export async function uploadFile (file) {
  const storageRef = ref(storage, v4())
  await uploadBytes(storageRef,file)
  const url = await getDownloadURL(storageRef);
  return url;
}*/