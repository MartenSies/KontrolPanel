import React from 'react';

import { NavLink } from "react-router-dom";
import { Wind, Zap, LifeBuoy, Map } from 'react-feather';

function Sidebar() {
  return (
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink to="/" activeClassName="active" className="nav-link" exact={true}>
                  <Zap className="feather" />
                  Deployments
                </NavLink>
                <NavLink to="/services" activeClassName="active" className="nav-link" exact={true}>
                  <Wind className="feather" />
                  Services
                </NavLink>
                <NavLink to="/configmaps" activeClassName="active" className="nav-link">
                  <LifeBuoy className="feather" />
                  Configmaps
                </NavLink>
                <NavLink to="/helm" activeClassName="active" className="nav-link">
                  <Map className="feather" />
                  Helm
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
   )
}

export default Sidebar;