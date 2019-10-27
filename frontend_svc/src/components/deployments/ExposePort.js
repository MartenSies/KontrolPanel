import React from 'react';

import { createLoadBalancer, deleteLoadBalancer } from '../../helpers/Api';

class ExposePort extends React.Component {
  constructor(props) {
    super(props);
    this.localPortRef = React.createRef();
    this.state = {
      localPort: this.props.localPort
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ localPort: nextProps.localPort });
  }

  execute(deploymentName, namespace) {
    var inputPort = this.localPortRef.current.value ? parseInt(this.localPortRef.current.value, 10) : ''
    if (inputPort !== this.state.localPort) {
      var body = {
        "name": this.props.containerName,
        "selector": this.props.labels,
        "port": {
          "local": inputPort ? parseInt(inputPort, 10) : null,
          "target": this.props.targetPort
        }
      }
      inputPort ?
      createLoadBalancer(deploymentName, namespace, body) :
      deleteLoadBalancer(deploymentName, namespace, body);
    }
  }

  render() {
    return (
      <div className="d-flex mt-1">
        <input type="number" className="form-control" ref={this.localPortRef} defaultValue={this.state.localPort} placeholder="Local port" />
        <input type="number" className="form-control ml-1" disabled defaultValue={this.props.targetPort} />
      </div>
    )
  }
}

export default ExposePort;