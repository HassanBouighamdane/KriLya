
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './pages/Signup';
import ListingForm from "./components/ListingForm";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {

  
  return (
    <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/post" element={<ListingForm />} />
      </Routes>
      <Footer />
    </Router>
  </div>
  );
}

export default App;
