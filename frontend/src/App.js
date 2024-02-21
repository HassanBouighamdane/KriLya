import React from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListingForm from './components/ListingForm';
import ListingList from './components/ListingList';

function App() {
  return (
    /*<Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ListingList} />
          <Route exact path="/create" component={ListingForm} />
        </Switch>
      </div>
    </Router>*/
    <div className="App">
          <ListingList />
          <ListingForm />
        
      </div>
  );
}

export default App;
