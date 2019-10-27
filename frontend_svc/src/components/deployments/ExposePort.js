import React from 'react';

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

  execute(deployment_name, namespace) {
    var inputPort = this.localPortRef.current.value ? parseInt(this.localPortRef.current.value, 10) : ''
    console.log(inputPort);
    console.log(this.state.localPort);
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
      this.exposeContainer(deployment_name, namespace, body) :
      this.stopExposingContainer(deployment_name, namespace, body);
    }
  }

  exposeContainer(deployment_name, namespace, body) {
    fetch('http://localhost:8080/api/v1/deployments/' + deployment_name + '/expose?namespace=' + namespace, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
  }

  stopExposingContainer(deployment_name, namespace, body) {
    fetch('http://localhost:8080/api/v1/deployments/' + deployment_name + '/expose?namespace=' + namespace, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
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