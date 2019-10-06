import React from 'react';

import { ReactComponent as Grafana } from '../../assets/grafana.svg'
import { ReactComponent as Elastic } from '../../assets/elastic.svg'

function Helm() {
  return (
    <div>
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 class="h2">Helm charts (2)</h1>
      </div>

      <div class="jumbotron">
        <div class="card-columns">
          <div class="card">
            <Grafana class="card-img-top" alt="grafana" style={{maxHeight: '250px' }} />
            <div class="card-body">
              <h5 class="card-title">Prometheus + Grafana</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="/helm/install" class="btn btn-primary">Install</a>
            </div>
          </div>
          <div class="card">
            <Elastic class="card-img-top" alt="grafana" style={{maxHeight: '250px' }} />
            <div class="card-body">
              <h5 class="card-title">EFK</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="/helm/install" class="btn btn-primary">Install</a>
            </div>
          </div>
        </div>
      </div>
    </div>
   )
}

export default Helm;


