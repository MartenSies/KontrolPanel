import React from 'react';

class Header extends React.Component {
  render() {
    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">{ this.props.title }</h1>

          <div className="dropdown">
            <h3 className="d-inline">Group by: </h3>
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Namespaces
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">Namespaces</a>
            </div>
          </div>
        </div>
     )
  }
}

export default Header;