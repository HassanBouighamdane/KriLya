import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListingForm from './components/ListingForm';
import ListingList from './components/ListingList';

function App() {
  return (
      <Router>
          <div className="App">
              <Switch>
                  <Route path="/post" component={ListingForm} />
                  {/* Add more routes if needed */}
              </Switch>
          </div>
      </Router>

  );
}

export default App;
