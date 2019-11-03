import * as React from 'react';

import { updateReplicas } from '../../helpers/Api';
import FormGroup from '../shared/form/FormGroup';

interface EditReplicasProps {
  currentReplicas: number,
  hasExecute?: boolean,
  ref?: React.RefObject<any>,
}

interface EditReplicasState {
  currentReplicas: number,
}

class EditReplicas extends React.Component<EditReplicasProps, EditReplicasState> {
  replicasRef: React.RefObject<HTMLSelectElement>;

  constructor(props: Readonly<EditReplicasProps>) {
    super(props);
    this.replicasRef = React.createRef<HTMLSelectElement>();
    this.state = {
      currentReplicas: this.props.currentReplicas
    };
    this.execute = this.execute.bind(this);
  }

  componentWillReceiveProps(nextProps: Readonly<EditReplicasProps>) {
    this.setState({ currentReplicas: nextProps.currentReplicas });
  }

  execute(deployment_name: string, namespace: string) {
    var value = parseInt(this.replicasRef.current!.value, 10);
    if (value !== this.state.currentReplicas) {
      this.updateReplicas(deployment_name, namespace, value);
    }
  }

  updateReplicas(deploymentName: string, namespace: string, value: number) {
    updateReplicas(deploymentName, namespace, { 'replicas': value });
  }

  render() {
    return (
      <FormGroup>
        <select className="form-control" defaultValue={this.state.currentReplicas} ref={this.replicasRef}>
          { [...Array(6).keys()].map((value, index) => {
            return <option key={index}>{value}</option>
          })}
        </select>
      </FormGroup>
    )
  }
}

export default EditReplicas;