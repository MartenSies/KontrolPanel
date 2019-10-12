import React from 'react';

import IsLoading from '../shared/IsLoading'
import Header from '../shared/Header'
import Chart from './Chart'

// icons
import logo from '../../assets/elastic.png';


class Helm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  retrieveData() {
    fetch("http://localhost:8080/api/v1/helm/charts")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            error: null,
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            items: [],
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.retrieveData()
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return (
        <div>
          <Header title="Helm charts" />
          Unable to retrieve helm charts
        </div>
      );
    } else if (!isLoaded) {
      return(
        <div>
        <Header title="Helm charts" />
        <IsLoading />
        </div>
      );
    } else {
      return (
        <div>
          <Header title="Helm charts" />
          <div className="card-columns" style={{ columnCount: 4}}>
            {items.map((chart, i) => {
              return <Chart key={i} icon={logo} name={chart.NAME} description={chart.DESCRIPTION} />
            })}
          </div>
        </div>
       )
    }
  }
}

export default Helm;


