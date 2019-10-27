import React from 'react';

import { updateReplicas } from '../../helpers/Api';
import FormGroup from '../shared/form/FormGroup';


class EditReplicas extends React.Component {
  constructor(props) {
    super(props);
    this.replicasRef = React.createRef();
    this.state = {
      currentReplicas: this.props.currentReplicas
    };
    this.execute = this.execute.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentReplicas: nextProps.currentReplicas });
  }

  execute(deployment_name, namespace) {
    var value = parseInt(this.replicasRef.current.value, 10);
    if (value !== this.state.currentReplicas) {
      this.updateReplicas(deployment_name, namespace, value);
    }
  }

  updateReplicas(deploymentName, namespace, value) {
    updateReplicas(deploymentName, namespace, { 'replicas': value });
  }

  render() {
    return (
      <FormGroup>
        <select className="form-control" defaultValue={this.state.currentReplicas} ref={this.replicasRef}>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </FormGroup>
    )
  }
}

export default EditReplicas;