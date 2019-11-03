import * as React from 'react';

import { createLoadBalancer, deleteLoadBalancer } from '../../helpers/Api';

interface ExposePortProps {
  containerName: string,
  labels: string,
  targetPort: number,
  localPort: number,
}

interface ExposePortState {
  localPort: number,
}

class ExposePort extends React.Component<ExposePortProps, ExposePortState> {
  localPortRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    this.localPortRef = React.createRef<HTMLInputElement>();
    this.state = {
      localPort: this.props.localPort
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ localPort: nextProps.localPort });
  }

  execute(deploymentName, namespace) {
    const inputPort = this.localPortRef.current!.value ? parseInt(this.localPortRef.current!.value, 10) : null;
    console.log(inputPort);
    console.log(this.state.localPort);
    if (inputPort !== this.state.localPort) {
      var body = {
        "name": this.props.containerName,
        "selector": this.props.labels,
        "port": {
          "local": inputPort,
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