import React from 'react';

import Chart from './Chart'

// icons
import logo from '../../assets/elastic.png';


class Helm extends React.Component {

  render() {
    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Helm charts</h1>
        </div>

          <div className="card-columns" style={{ columnCount: 4}}>
            <Chart chartIcon={logo} chartName="fluentd"  />
            <Chart chartIcon={logo} chartName="elasticsearch"  />
            <Chart chartIcon={logo} chartName="grafana"  />
            <Chart chartIcon={logo} chartName="ambassador"  />
            <Chart chartIcon={logo} chartName="drupal"  />
            <Chart chartIcon={logo} chartName="jenkins"  />
            <Chart chartIcon={logo} chartName="kibana"  />
            <Chart chartIcon={logo} chartName="mongodb"  />
          </div>
      </div>
     )
  }
}

export default Helm;


