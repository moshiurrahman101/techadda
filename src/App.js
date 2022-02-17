import { Route, Routes } from "react-router-dom";
import Landing from './components/Landing';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from "./components/Dashboard";
import SignupVerification from "./components/SignupVerification";
import Resetpassword from "./components/Resetpassword";
import ConfirmEmail from "./components/ConfirmEmail";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signup/" element={<Signup />}/>
        <Route path="/login/" element={<Login />}/>
        <Route path="/dashboard/" element={<Dashboard />}/>
        <Route path="/signup-verification/" element={<SignupVerification />}/>
        <Route path="/email-confirmation/" element={<ConfirmEmail />}/>
        <Route path="/reset-password/" element={<Resetpassword />}/>
        <Route path="/profile/" element={<Profile />}/>
      </Routes>
    </>
    
  );
}

export default App;
