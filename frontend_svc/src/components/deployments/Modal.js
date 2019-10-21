import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.replicasRef = React.createRef();
    this.containerRefs = [];
    this.props.deployment.containers.map((container, ci) => {
      this.containerRefs.push([React.createRef(), React.createRef()]);
    });

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.updateReplicas();
    this.updateExposedContainers()
  }

  updateReplicas() {
    var deployment = this.props.deployment
    if (this.replicasRef.current.value == this.props.deployment.replicas) {
      return;
    }
    fetch('http://localhost:8080/api/v1/deployments/' + deployment.name + '/scale?namespace=' + deployment.namespace, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'replicas': parseInt(this.replicasRef.current.value, 10),
      })
    });
  }

  updateExposedContainers() {
    var deployment = this.props.deployment
    this.containerRefs.map((containerRefs, ci) => {
      var body = {
        "name": deployment.containers[ci].name,
        "selector": deployment.labels,
        "port": {
          "local": parseInt(containerRefs[0].current.value, 10),
          "target": parseInt(containerRefs[1].current.value, 10),
        }
      }
      console.log(body)
      containerRefs[0].current.value ?
      this.exposeContainer(body) :
      this.stopExposingContainer(body);
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
        <div className="modal fade" id={this.props.deployment.name} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                  {this.props.deployment.containers.map((container, ci) => {
                    return <div key={ci} className="form-group d-flex justify-content-between">
                      <label className="col-form-label">{container.name}</label>
                        <div className="d-flex">
                          <input type="number" className="form-control" ref={this.containerRefs[ci][0]} placeholder="Local" />
                          <select className="form-control ml-1" ref={this.containerRefs[ci][1]}>
                            { container.ports && container.ports.map((port, pi) => {
                              return <option key={pi}>{port.container_port}</option>
                            })}
                          </select>
                        </div>
                    </div>
                  })}
                </form>
              </div>

              <div className="modal-footer justify-content-between">
                <button type="button" className="btn btn-danger">Delete</button>
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