import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.modalRef = React.createRef();
    this.replicasRef = React.createRef();

    this.containers = [];
    this.props.deployment.containers.forEach((container) => {
      var ports = [];
      container.ports.forEach((port) => {
        ports.push({
          targetPort: port.container_port,
          localPort: this.getLocalPort(port.container_port),
          localPortRef: React.createRef()
        });
      });
      this.containers.push({
        name: container.name,
        ports: ports,
      });
    });

    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getLocalPort(targetPort) {
    var localPort = ''
    this.props.deployment.load_balancers.forEach(loadBalancer => {
      loadBalancer.ports.forEach(port => {
        if (port.target_port === targetPort) {
          localPort = port.port
        }
      })
    })
    return localPort;
  }

  onDelete(e) {
    e.preventDefault();
    var url = 'http://localhost:8080/api/v1/deployments/' + this.props.deployment.name + '?namespace=' + this.props.deployment.namespace;
    fetch(url, {
      method: 'DELETE',
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.updateReplicas();
    this.updateExposedContainers()
  }

  updateReplicas() {
    var deployment = this.props.deployment
    var value = parseInt(this.replicasRef.current.value, 10);
    if (value === this.props.deployment.replicas) {
      return;
    }
    fetch('http://localhost:8080/api/v1/deployments/' + deployment.name + '/scale?namespace=' + deployment.namespace, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'replicas': value,
      })
    });
  }

  updateExposedContainers() {
    var deployment = this.props.deployment
    this.containers.forEach((container) => {
      container.ports.forEach((port) => {
        var inputPort = port.localPortRef.current.value ? parseInt(port.localPortRef.current.value, 10) : ''
        if (inputPort !== port.localPort) {
          var body = {
            "name": container.name,
            "selector": deployment.labels,
            "port": {
              "local": inputPort ? parseInt(inputPort, 10) : null,
              "target": port.targetPort
            }
          }
          inputPort ?
          this.exposeContainer(body) :
          this.stopExposingContainer(body);
        }
      });
    });
  }

  exposeContainer(body) {
    var deployment = this.props.deployment
    fetch('http://localhost:8080/api/v1/deployments/' + deployment.name + '/expose?namespace=' + deployment.namespace, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
  }

  stopExposingContainer(body) {
    var deployment = this.props.deployment
    fetch('http://localhost:8080/api/v1/deployments/' + deployment.name + '/expose?namespace=' + deployment.namespace, {
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
        <div className="modal fade" id={this.props.deployment.name} ref={this.modalRef}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{this.props.deployment.name}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

              <form>
                  <div className="form-group">
                    <label><b>Replicas</b></label>
                    <select className="form-control" defaultValue={this.props.deployment.replicas} ref={this.replicasRef}>
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>

                  <span><b>Expose containers</b></span>
                  {this.containers.map((container, ci) => {
                    return <div key={ci} className="form-group">
                      <label className="col-form-label">{container.name}</label>
                      { container.ports && container.ports.map((port, pi) => {
                         return <div key={pi} className="d-flex mt-1">
                            <input type="number" className="form-control" ref={port.localPortRef} defaultValue={port.localPort} placeholder="Local port" />
                            <input type="number" className="form-control ml-1" disabled defaultValue={port.targetPort} />
                          </div>
                      })}
                    </div>
                  })}
                </form>
              </div>

              <div className="modal-footer justify-content-between">
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.onDelete}>Delete</button>
                <div>
                  <button type="button" className="btn btn-secondary mr-1" data-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.onSubmit}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
     )
  }
}

export default Modal;