import * as React from 'react';

import { getDeployments } from '../../helpers/Api'
import IsLoading from '../shared/IsLoading'
import Header from '../shared/Header'
import DeploymentCard from './DeploymentCard'
import { Deployment } from '../../types/k8s';

interface DeploymentsState {
  error?: string,
  isLoaded: boolean,
  items: Namespace[],
}

interface Namespace {
  name: string,
  deployments: Deployment[],
}

class Deployments extends React.Component<{}, DeploymentsState> {
  interval: number;  

  constructor(props) {
    super(props);
    this.interval = 0;
    this.state = {
      error: undefined,
      isLoaded: false,
      items: []
    };
  }

  retrieveData() {
    getDeployments().then(
        (result) => {
          this.setState({ error: undefined, isLoaded: true, items: result });
        },
        (error) => {
          this.setState({ items: [], isLoaded: true, error});
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
            {items.filter(n => n.deployments.length > 0).map((namespace, ni) => {
              return <div key={ni}>
                  <h5>{namespace['name']} ({namespace.deployments.length})</h5>
                  <div id="deployments" className="card-columns">
                      {namespace.deployments.map((deployment, di) => {
                        return <DeploymentCard key={di} deployment={deployment}/>
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