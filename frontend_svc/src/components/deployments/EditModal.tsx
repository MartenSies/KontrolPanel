import * as React from 'react';

import { deleteDeployment } from '../../helpers/Api';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import Form from '../shared/form/Form';
import ExposeContainer from './ExposeContainer';
import EditReplicas from './EditReplicas';
import { Deployment, Container, Port } from '../../types/k8s';

interface EditModalProps {
  deployment: Deployment,
}

interface EditModalState {
  containers: Container[],
}

class EditModal extends React.Component<EditModalProps, EditModalState> {
  replicasRef: React.RefObject<EditReplicas>;
  formRef: React.RefObject<Form>;

  constructor(props) {
    super(props);

    this.replicasRef = React.createRef<EditReplicas>();
    this.formRef = React.createRef<Form>();

    this.state = {
      containers: this.retrieveContainers(this.props)
    };

    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps: Readonly<EditModalProps>) {
    var newContainers = this.retrieveContainers(nextProps)
    if (this.state.containers !== newContainers) {
      this.setState({
        containers: newContainers
      });
    }
  }

  retrieveContainers(props) {
    let containers: Container[] = [];
    props.deployment.containers.forEach((container) => {
      let ports: Port[] = [];
      container.ports.forEach((port) => {
        ports.push({
          targetPort: port.target_port,
          localPort: port.local_port,
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

  onDelete() {
    deleteDeployment(this.props.deployment.name, this.props.deployment.namespace);
  }

  onSubmit() {
    // @ts-ignore
    var formItems = React.Children.toArray(this.formRef.current!.props.children).filter((item) => item.props.hasExecute);
    formItems.forEach((item) => {
      // @ts-ignore
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