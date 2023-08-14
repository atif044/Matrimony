import './App.css';
import Login from './Components/Login';
import State from './Context/State'
import Signup from './Components/Auth/Signup';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router,
Route,Routes } from 'react-router-dom';
import HeroSection from './Components/HeroSection';
import Profile from './Components/Profile';
import CompleteProfile from './Components/CompleteProfile';
function App() {
  return (
   <Router>
    <State>
   <Navbar/>
    <Routes>
    <Route exact path="/" element={<HeroSection/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/Sign up' element={<Signup/>}/>
      <Route exact path="/My Profile" element={<Profile/>}/>
      <Route exact path="/CompleteProfile" element={<CompleteProfile/>}/>
    </Routes>
    </State>
   </Router>
  );
}

export default App;
