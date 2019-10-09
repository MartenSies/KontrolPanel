import React from 'react';

import Card from '../shared/Card'

class Pod extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    var url = 'http://localhost:8080/api/v1/pods/' + this.props.pod.name + '?namespace=' + this.props.pod.namespace;
    fetch(url, {
      method: 'DELETE',
    })
  }

  render() {
    const body = <div>
          <b>Status:</b> { this.props.pod.phase }<br></br>
          <b>Pod ip:</b> { this.props.pod.ip }
    </div>;

    const button = <button 
      className="btn btn-primary"
      onClick={this.handleClick}
    >Delete pod</button>;

    return <Card 
      title={ this.props.pod.name }
      body={ body }
      button={ button }
      footer={ this.props.pod.started_at }
    />
  }
}

export default Pod;