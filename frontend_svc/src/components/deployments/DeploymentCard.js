import React from 'react';
import styled from 'styled-components'

import { deletePod } from '../../helpers/Api'
import Card from '../shared/Card'
import EditModal from './EditModal'

import { Trash } from 'react-feather';

const StyledListItem = styled.li`
    border-left: 0;
    border-right: 0;
    padding: .75rem 0rem;
`

const StatusIcon = styled.span`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  display: inline-block;
`

class DeploymentCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    deletePod(e.target.dataset.name, this.props.deployment.namespace);
  }

  getPodStatus(status) {
    var statusIconClass = ""
    switch(status) {
      case "Pending":
        statusIconClass = "badge-warning"
        break;
      case "Running":
      case "Succeeded":
        statusIconClass = "badge-success"
        break; 
      case "Failed":
        statusIconClass = "badge-danger"
        break;
      case "Unknown":
      default:
        statusIconClass = "badge-secondary"
        break;
    };
    return statusIconClass;
  }

  render() {
    const body = <div className="mb-2">
      <ul className="list-group">
        {this.props.deployment.pods.map((pod, pi) => {
          return <StyledListItem key={pi} className="list-group-item d-flex justify-content-between align-items-center">
            <div> 
             <StatusIcon className={"mr-1 " + this.getPodStatus(pod.status) } />
             <span>{pod.name}</span>
            </div>
             <Trash className="feather mr-1" data-name={pod.name} onClick={this.handleClick} />
          </StyledListItem>
        })}
      </ul>
    </div>;

    const button = <div>
      <button 
        className="btn btn-primary btn-block"
        data-toggle="modal" data-target={"#" + this.props.deployment.name }
      >Edit deployment</button>
      <EditModal deployment={this.props.deployment} />
    </div>;

    return <Card 
      title={ this.props.deployment.name }
      body={ body }
      button={ button }
    />
  }
}

export default DeploymentCard;