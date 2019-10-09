import React from 'react';

import IsLoading from '../shared/IsLoading'
import Header from '../shared/Header'
import Pod from './Pod'

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
    fetch("http://localhost:8080/api/v1/pods")
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
              if(namespace.pods.length > 0)
              return <div key={ni} className="">
                  <h5>{namespace['name']} ({namespace.pods.length})</h5>
                  <div className="card-columns">
                      {namespace.pods.map((pod, pi) => {
                        return <Pod key={pi} pod={pod}/>
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