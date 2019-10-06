import React from 'react';

import IsLoading from '../shared/IsLoading'
import Header from '../shared/Header'
import Configmap from './Configmap'

class Configmaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  retrieveData() {
    fetch("http://localhost:8080/api/v1/configmaps")
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
        <Header title="Configmaps" />
        Unable to retrieve configmaps
      </div>);
    } else if (!isLoaded) {
      return(
        <div>
        <Header title="Configmaps" />
        <IsLoading />
        </div>
      );
    } else {
    return (
      <div>
        <Header title="Configmaps" />
        {items.map((namespace, ni) => {
          if(namespace.configmaps.length > 0)
          return <div key={ni} className="jumbotron">
            <h4 className="display-5">Namespace: { namespace.name } ({ namespace.configmaps.length })</h4>
            <div className="card-columns">
              {namespace.configmaps.map((configmap, ci) => {
                return <Configmap key={ci} configmap={configmap}/>
              })}
            </div>
          </div>
        })}

      </div>
     )
   }
 }
}

export default Configmaps;