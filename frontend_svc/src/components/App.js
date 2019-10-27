import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Deployments from './deployments/Deployments';
import Helm from './helm/Helm';

import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';

function App() {
  return (
    <div>
      <Navbar />

      <div className="container-fluid">
        <Router>
          <Sidebar />

          <div>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <Switch>
                <Route path="/helm">
                  <Helm/>
                </Route>
                <Route path="/">
                  <Deployments/>
                </Route>
              </Switch>
            </main>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
