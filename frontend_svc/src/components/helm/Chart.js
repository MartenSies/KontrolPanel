import React from 'react';

import Card from '../shared/Card'

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.installChart = this.installChart.bind(this);
    this.deleteChart = this.deleteChart.bind(this);
  }

  installChart() {
    fetch('http://localhost:8080/api/v1/helm/charts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'chartName': 'stable/' + this.props.chartName,
        'releaseName': this.props.chartName
      })
    })
  }

  deleteChart() {
    fetch('http://localhost:8080/api/v1/helm/charts', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'releaseName': this.props.chartName
      })
    })
  }

  render() {
    const body = <div>
        <button className="btn btn-primary" onClick={this.installChart}>Install</button>
        <button className="btn btn-danger" onClick={this.deleteChart}>Delete</button>
    </div>;

    return <Card 
      title={ this.props.chartName }
      body={ body }
      image={this.props.chartIcon}
    />
  }
}

export default Chart;