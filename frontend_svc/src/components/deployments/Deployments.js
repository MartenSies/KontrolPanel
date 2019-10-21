import React from 'react';

import IsLoading from '../shared/IsLoading'
import Header from '../shared/Header'
import Deployment from './Deployment'

class Deployments extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  retrieveData() {
    fetch("http://localhost:8080/api/v1/deployments")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            error: null,
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            items: [],
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.retrieveData()
    this.interval = setInterval(() => this.retrieveData(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return (
        <div>
          <Header title="Deployments" />
          Unable to retrieve deployments
        </div>
      );
    } else if (!isLoaded) {
      return(
        <div>
        <Header title="Deployments" />
        <IsLoading />
        </div>
      );
    } else {
      return (
        <div>
            <Header title="Deployments" />
            {items.map((namespace, ni) => {
              if(namespace.deployments.length > 0)
              return <div key={ni} className="">
                  <h5>{namespace['name']} ({namespace.deployments.length})</h5>
                  <div className="card-columns">
                      {namespace.deployments.map((deployment, di) => {
                        return <Deployment key={di} deployment={deployment}/>
                      })}
                  </div>
              </div>
          })}
        </div>
      )
    }
  }
}

export default Deployments;