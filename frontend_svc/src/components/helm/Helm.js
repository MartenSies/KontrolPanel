import React from 'react';
import styled from 'styled-components'

import IsLoading from '../shared/IsLoading'
import Header from '../shared/Header'
import Chart from './Chart'


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
      installed_charts: [],
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  retrieveData(keyword) {
    Promise.all([
        fetch('http://localhost:8080/api/v1/helm/charts?keyword=' + keyword),
        fetch('http://localhost:8080/api/v1/helm/charts/installed')
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([charts, installed_charts]) => this.setState({
        error: null,
        isLoaded: true,
        charts,
        installed_charts: installed_charts.map((chart) => chart['name'])
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
    // const { error, isLoaded, charts, installed_charts } = this.state;
    if (this.state.error) {
      return (
        <div>
          <Header title="Helm charts" />
          Unable to retrieve helm charts
        </div>
      );
    } else if (!this.state.isLoaded) {
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
            {this.state.charts.map((chart, i) => {
              return <Chart key={i} installed_charts={this.state.installed_charts} name={chart.name} description={chart.description} />
            })}
          </div>
        </div>
       )
    }
  }
}

export default Helm;


