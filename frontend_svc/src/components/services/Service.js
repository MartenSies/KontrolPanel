import React from 'react';

import Card from '../shared/Card'

class Service extends React.Component {
  render() {
    const button = <button 
      className="btn btn-primary disabled"
    >Edit</button>;

    const body = <div>
          <b>Type:</b> { this.props.service.type }<br></br>
          <b>Cluster IP:</b> { this.props.service.cluster_ip }<br></br>
          <b>External IP:</b> { this.props.service.external_ip || '-' }<br></br>
          <b>Ports: </b> 
          {this.props.service.ports.map((port, i) => {
            return <span key={i}>
                {port.port}:{port.node_port}/{port.protocol}
                { i < this.props.service.ports.length - 1 ? ',' : null }
            </span>
          })}<br></br>
          <b>Selector:</b><br></br>
          {this.props.service.selector !== null &&
              Object.keys(this.props.service.selector).map((key, index) => {
              return <div key={index}>
                    {key}: { this.props.service.selector[key] }<br></br>
                </div>
          })}
    </div>;

    return <Card 
      title={ this.props.service.name }
      body={ body }
      // button={ button }
    />
  }
}

export default Service;