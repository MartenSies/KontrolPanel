import React from 'react';

import IsLoading from '../shared/IsLoading'
import Header from '../shared/Header'
import Service from './Service'

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  retrieveData() {
    fetch("http://localhost:8080/api/v1/services")
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
      return (<div>
        <Header title="Services" />
        Unable to retrieve services
      </div>);
    } else if (!isLoaded) {
      return(
        <div>
        <Header title="Services" />
        <IsLoading />
        </div>
      );
    } else {
    return (
      <div>
        <Header title="Services" />
        {items.filter(n => n.services.length > 0).map((namespace, ni) => {
          return <div key={ni}>
            <h5>{ namespace.name } ({ namespace.services.length })</h5>
            <div className="card-columns">
              {namespace.services.map((service, ci) => {
                return <Service key={ci} service={service}/>
              })}
            </div>
          </div>
        })}

      </div>
     )
   }
 }
}

export default Services;