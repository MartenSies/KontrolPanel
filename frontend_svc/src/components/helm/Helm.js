import React from 'react';
import styled from 'styled-components';

import { getCharts, getInstalledCharts } from '../../helpers/Api';
import IsLoading from '../shared/IsLoading';
import Header from '../shared/Header';
import Chart from './Chart';


const StyledSearchBar = styled.input`
    margin-right: 5px;
    padding: 18px 10px;
`

class Helm extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      error: null,
      isLoaded: false,
      charts: [],
      installedCharts: [],
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  retrieveData(keyword) {
    Promise.all([getCharts(keyword), getInstalledCharts()])
      .then(([charts, installed_charts]) => this.setState({
          error: null,
          isLoaded: true,
          charts,
          installedCharts: installed_charts.map((chart) => chart['name'])
      }));
  }

  onChangeHandler(e) {
    e.preventDefault();
    this.retrieveData(this.myRef.current.value);
  }

  componentDidMount() {
    this.retrieveData('');
  }

  render() {
    const { error, isLoaded, charts, installedCharts } = this.state;
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
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 className="h2">Helm charts</h1>
            <form className="form-inline">
              <StyledSearchBar ref={this.myRef} className="form-control form-control-sm ml-3 w-80" type="text" placeholder="Search" />
              <button className="btn btn-primary" onClick={this.onChangeHandler}>Search</button>
            </form>
          </div>

          <div className="card-columns" style={{ columnCount: 4}}>
            {charts.map((chart, i) => {
              return <Chart key={i} installedCharts={installedCharts} name={chart.name} description={chart.description} />
            })}
          </div>
        </div>
       )
    }
  }
}

export default Helm;