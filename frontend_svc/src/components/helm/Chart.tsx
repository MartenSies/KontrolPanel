import * as React from 'react';

import { installChart, deleteChart } from '../../helpers/Api';
import Card from '../shared/Card';

const icons: {} = {
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

interface ChartProps {
  name: string,
  description: string,
  installedCharts: string[],
}

interface ChartState {
  installed: boolean,
  loading: boolean,
}

class Chart extends React.Component<ChartProps, ChartState> {

  constructor(props) {
    super(props);
    this.state = { 
      installed: this.isInstalled(this.props),
      loading: false
    };
    this.isInstalled = this.isInstalled.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.installChart = this.installChart.bind(this);
    this.deleteChart = this.deleteChart.bind(this);
  }

  componentWillReceiveProps(nextProps: Readonly<ChartProps>) {
    this.setState({
      installed: this.isInstalled(nextProps),
      loading: false
    });
  }

  isInstalled(props: Readonly<ChartProps>) {
    return props.installedCharts.includes(props.name.substring(props.name.lastIndexOf("/") + 1, props.name.length));
  }

  onButtonClick() {
    !this.state.installed ? this.installChart() : this.deleteChart();
  }

  installChart() {
    this.setState({ installed: false, loading: true });
    installChart({
      'chart_name': this.props.name,
      'release_name': this.props.name.replace('stable/', '')
    }).then((result) => {
      this.setState({ installed: true, loading: false });
    });
  }

  deleteChart() {
    this.setState({ installed: true, loading: true });
    deleteChart({
      'release_name': this.props.name.replace('stable/', '')
    }).then((result) => {
      this.setState({ installed: false, loading: false });
    })
  }

  render() {
    const { installed, loading } = this.state;
    const icon = icons[this.props.name];
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