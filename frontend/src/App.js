import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from './pages/Signup';

function App() {

  const routes = [
    //auth
    {url : "signup", component: Signup},
  ]

  return (
    <div className="App">
     <Router basename="/" >
        <Switch>
        <Route>
          <div id="" className="" style={{minHeight :"100vh", display: "flex", flexDirection: "column"}}>
            {/* <Nav /> */}
            <div className="content-body" style={{ flex: 1 , marginBottom : 2}}>
              <div className="container-fluid" style={{ flex: 1 , marginBottom : 2}}>
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
            {/* <Error404 /> */}
          </Route>
                </Switch>
              </div>
            </div>
            <div style={{  marginTop : 100}}>
            {/* <Footer /> */}
           
            </div>
          </div>
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
