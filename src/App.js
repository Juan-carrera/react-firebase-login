import { Routes, Route } from "react-router-dom";
import { Home } from "./components/home";
import { Login } from "./components/login";
import { ProtectedRoute } from "./components/protectedRoute";
import { Register } from "./components/register";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <div className="bg-slate-100 h-screen text-black">
     
      <AuthProvider>

        <Routes>

          <Route path="/" 
          element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>  
          }/>

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

        </Routes>

      </AuthProvider>
      
    </div>
  );
}

export default App;
