
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Signup from './pages/Signup';
import PostRental from "./components/PostRental";
import { MyProvider } from './providers/UserProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RenatlItemDetails from './components/RentalItemDetails';
import PageNotFound from './pages/PageNotFound';
import UpdateProfile from './pages/UpdateProfile';


function App() {
  return (
    <div className="App">
    <Router>
    <MyProvider >
    <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/post" element={<PostRental />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/updateprofile" element={<UpdateProfile />} />
        <Route exact path="/items/:id/details" element={<RenatlItemDetails/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </MyProvider>
      <Footer />
      
    
    </Router>
  </div>
  );
}

export default App;
