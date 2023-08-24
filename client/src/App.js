import './App.css';
import Login from './Components/Login';
import State from './Context/State'
import Signup from './Components/Auth/Signup';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom';
import HeroSection from './Components/HeroSection';
import Profile from './Components/Profile';
import CompleteProfile from './Components/CompleteProfile';
import AllProfiles from './Components/AllProfiles';
import FullProfile from './Components/FullProfile';
import MyFans from './Components/MyFans';
import MyMatch from './Components/MyMatch';
import AllUsersNp from './Components/admin/AllUsersNp';
import UserProtected from './security/UserProtected';
import AdminPtotected from './security/AdminProtected'
function App() {
  return (
    <Router>
      <State>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HeroSection />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/Sign up' element={<Signup />} />
          <Route exact path="/My Profile" element={<UserProtected />}>
            <Route exact path="/My Profile" element={<Profile />} />
          </Route>
          <Route exact path="/CompleteProfile" element={<UserProtected />}>
            <Route exact path="/CompleteProfile" element={<CompleteProfile />} />
          </Route>
          <Route exact path="/All Profiles" element={<UserProtected />}>
            <Route exact path="/All Profiles" element={<AllProfiles />} />
          </Route>
          <Route exact path="/indPrDet" element={<FullProfile />}>
            <Route exact path="/indPrDet" element={<FullProfile />} />
          </Route>

          <Route exact path="/Stalkers" element={<MyFans />}>
            <Route exact path="/Stalkers" element={<MyFans />} />
          </Route>

          <Route exact path="/My Match" element={<MyMatch />}>
            <Route exact path="/My Match" element={<MyMatch />} />
          </Route>

          <Route exact path="/Un Approved Users" element={<AdminPtotected/>} >
          <Route exact path="/Un Approved Users" element={<AllUsersNp />} />
          </Route>
        </Routes>
      </State>
    </Router>
  );
}

export default App;
