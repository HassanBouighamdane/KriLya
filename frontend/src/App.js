
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './pages/Signup';
import PostRental from "./components/PostRental";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RenatlItemDetails from './components/RentalItemDetails';


function App() {
  const routes = [
    //auth
    {url : "", component: Signup},
      {url:"post",component:PostRental},
    {url:"home",component:Home},
    {url:"login",component:Login},
      {url:"details",component:RenatlItemDetails},
  ]


  return (
    <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/post" element={<PostRental />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/items/:id/details" element={<RenatlItemDetails/>} />
      </Routes>
      <Footer />
    </Router>
  </div>
  );
}

export default App;
