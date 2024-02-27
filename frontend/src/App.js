
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from './pages/Signup';
import ListingForm from "./components/ListingForm";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {

  const routes = [
    //auth
    {url : "", component: Signup},
    {url:"post",component:ListingForm},
    {url:"home",component:Home},
    {url:"login",component:Login}
  ]

  return (
    <div className="App">
     <Router basename="/" >
      <Navbar />
        <Switch>
        <Route>

                <Switch>
                  {routes.map((data, i) => (
                    <Route
                      key={i}
                      exact
                      
                      path={`/${data.url}`}
                      component={data.component}
                    />
                  ))}
                   <Route path="*">
            
          </Route>
                </Switch>
             
        </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
