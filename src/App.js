import { Navigate, Route, Routes } from "react-router-dom";
import Landing from './components/Landing'
import Signup from './components/Signup'
import Login from './components/Login'
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import SignupVerification from "./components/SignupVerification";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/signup-verification/:email" element={<SignupVerification />}/>
      </Routes>
    </>
    
  );
}

export default App;
