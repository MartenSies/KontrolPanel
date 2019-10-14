import React from 'react';

import Card from '../shared/Card'

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.icons = {
      'stable/kibana': 'elastic.png',
      'stable/ghost': 'ghost.jpeg',
      'stable/prometheus-postgres-exporter': 'prometheus.png',
      'stable/prometheus-pushgateway': 'prometheus.png',
      'stable/prometheus-rabbitmq-exporter': 'prometheus.png',
      'stable/prometheus-redis-exporter': 'prometheus.png',
      'stable/prometheus-snmp-exporter': 'prometheus.png',
      'stable/prometheus-to-sd': 'prometheus.png',
      'stable/stable/prometheus': 'prometheus.png',
      'stable/prometheus-adapter': 'prometheus.png',
      'stable/prometheus-blackbox-exporter': 'prometheus.png',
      'stable/prometheus-cloudwatch-exporter': 'prometheus.png',
      'stable/prometheus-consul-exporter': 'prometheus.png',
      'stable/prometheus-couchdb-exporter': 'prometheus.png',
      'stable/prometheus-mongodb-exporter': 'prometheus.png',
      'stable/prometheus-mysql-exporter': 'prometheus.png',
      'stable/prometheus-nats-exporter': 'prometheus.png',
      'stable/prometheus-node-exporter': 'prometheus.png',
      'stable/prometheus-operator': 'prometheus.png',
      'stable/gocd': 'gocd.png',
      'stable/grafana': 'grafana.svg',
      'stable/moodle': 'moodle.jpeg',
      'stable/mongodb': 'mongo.jpeg',
      'stable/nginx-ingress': 'nginx.png',
      'stable/nginx-ldapauth-proxy': 'nginx.png',
      'stable/nginx-lego': 'nginx.png',
      'stable/datadog': 'datadog.png',
      'stable/jaeger-operator': 'jaeger.svg',
      'stable/elasticsearch': 'elasticsearch.png',
      'stable/elasticsearch-curator': 'elasticsearch.png',
      'stable/elasticsearch-exporter': 'elasticsearch.png',
    }
    this.state = { 
      installed: this.isInstalled(this.props),
      loading: false
    };
    this.isInstalled = this.isInstalled.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.installChart = this.installChart.bind(this);
    this.deleteChart = this.deleteChart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      installed: this.isInstalled(nextProps),
      loading: false
    });
  }

  isInstalled(props) {
    return props.installed_charts.includes(props.name.substring(props.name.lastIndexOf("/") + 1, props.name.length));
  }

  onButtonClick() {
    !this.state.installed ? this.installChart() : this.deleteChart();
  }

  installChart() {
    this.setState({ installed: false, loading: true });
    fetch('http://localhost:8080/api/v1/helm/charts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'chart_name': this.props.name,
        'release_name': this.props.name.replace('stable/', '')
      })
    }).then((result) => {
        this.setState({ installed: true, loading: false });
    })
  }

  deleteChart() {
    this.setState({ installed: true, loading: true });
    fetch('http://localhost:8080/api/v1/helm/charts', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'release_name': this.props.name.replace('stable/', '')
      })
    }).then((result) => {
        this.setState({ installed: false, loading: false });
    })
  }

  render() {
    const { installed, loading } = this.state;
    const icon = this.icons[this.props.name];
    const loadButton = <div><span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...</div>
    const body = <div>
        <p className="card-text">{this.props.description}</p>
        <button className={"btn btn-block " + (!installed ? 'btn-primary' : 'btn-danger') } onClick={this.onButtonClick}>
          { loading ? loadButton  : !installed ? 'Install' : 'Delete' }
        </button>
    </div>;

    return <Card 
      title={ this.props.name }
      body={ body }
      image={ icon }
    />
  }
}

export default Chart;