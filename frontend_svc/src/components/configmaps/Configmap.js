import React from 'react';

import Card from '../shared/Card'

class Configmap extends React.Component {
  render() {
    const button = <button 
      className="btn btn-primary disabled"
    >Edit</button>;

    return <Card 
      title={ this.props.configmap.name }
      button={ button }
    />
  }
}

export default Configmap;