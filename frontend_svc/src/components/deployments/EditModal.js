import React from 'react';

import { deleteDeployment } from '../../helpers/Api'
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import Form from '../shared/form/Form';
import ExposeContainer from './ExposeContainer';
import EditReplicas from './EditReplicas';


class EditModal extends React.Component {
  constructor(props) {
    super(props);

    this.replicasRef = React.createRef();
    this.formRef = React.createRef();

    this.state = {
      containers: this.retrieveContainers(this.props)
    };

    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    var newContainers = this.retrieveContainers(nextProps)
    if (this.state.containers !== newContainers) {
      this.setState({
        containers: newContainers
      });
    }
  }

  retrieveContainers(props) {
    var containers = [];
    props.deployment.containers.forEach((container) => {
      var ports = [];
      container.ports.forEach((port) => {
        ports.push({
          targetPort: port.container_port,
          localPort: this.getLocalPort(props, port.container_port),
          localPortRef: React.createRef()
        });
      });
      containers.push({
        name: container.name,
        ref: React.createRef(),
        ports: ports,
      });
    });
    return containers;
  }

  getLocalPort(props, targetPort) {
    var localPort = ''
    props.deployment.load_balancers.forEach(loadBalancer => {
      loadBalancer.ports.forEach(port => {
        if (port.target_port === targetPort) {
          localPort = port.port
        }
      })
    })
    return localPort;
  }

  onDelete() {
    deleteDeployment(this.props.deployment.name, this.props.deployment.namespace);
  }

  onSubmit(e) {
    e.preventDefault();
    var formItems = React.Children.toArray(this.formRef.current.props.children).filter((item) => item.props.hasExecute);
    formItems.forEach((item) => {
      item.ref.current.execute(this.props.deployment.name, this.props.deployment.namespace);
    });
  }

  render() {
    var body = <Form ref={this.formRef}>
      <label className="font-weight-bold">Replicas</label>
      <EditReplicas hasExecute currentReplicas={this.props.deployment.replicas} ref={this.replicasRef} />
      <label className="font-weight-bold">Expose containers</label>
      {this.state.containers.map((container, ci) => {
        return <ExposeContainer hasExecute key={ci} labels={this.props.deployment.labels} container={container} ref={container.ref}/>
      })}
    </Form>
    var footerLeft = <Button dismissModal isDanger onClick={this.onDelete}>Delete</Button>
    var footerRight = <>
      <Button dismissModal isSecondary styleName="mr-1">Cancel</Button>
      <Button dismissModal isPrimary onClick={this.onSubmit}>Save</Button>
    </>

    return (
      <Modal 
        id={this.props.deployment.name}
        title={this.props.deployment.name}
        body={body}
        footerLeft={footerLeft}
        footerRight={footerRight} />
    )
  }
}

export default EditModal;