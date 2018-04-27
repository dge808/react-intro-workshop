import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Launch from './Launch';

const perPage = 16;

class App extends Component {
  constructor() {
    super();
    this.state = {
      offset: 0,
      launches: [],
      query: '',
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.search = this.search.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
    this.loadPreviousPage = this.loadPreviousPage.bind(this);
  }

  componentDidMount() {
    const { offset } = this.state;
    this.fetchLaunches(offset);
  }

  fetchLaunches(offset, query) {
    const queryParam = query ? `&name=${query}` : '';
    let url = `https://launchlibrary.net/1.3/launch/next/${perPage}?offset=${offset}${queryParam}`;

    fetch(url)
      .then(response => response.json())
      .then(response => {
      this.setState({
        offset,
        query,
        launches: response.launches,
      })
    })
  };

  search() {
    const { query } = this.state;
    this.fetchLaunches(0, query);
  }

  resetSearch() {
    this.fetchLaunches(0, '');
  }

  handleQueryChange(event) {
    this.setState({
      query: event.target.value,
    })
  }

  loadNextPage() {
    const { offset, query } = this.state;
    const newOffset = offset + perPage;
    this.fetchLaunches(newOffset, query);
  }

  loadPreviousPage() {
    const { offset, query } = this.state;
    const newOffset = offset - perPage;
    this.fetchLaunches(newOffset, query);
  }

  renderLaunches() {
    const { launches } = this.state;

    return launches.map(launch => (
      <Launch
        id={launch.id}
        name={launch.name}
        locationName={launch.location.name}
        rocketName={launch.rocket.name}
        imgUrl={launch.rocket.imageURL}
      />
    ))
  }

  render() {
    const { offset } = this.state;
    return (
      <div>
        <h1>Launches</h1>
        <div className="search-controls">
        <input value={this.state.query}
               onChange={this.handleQueryChange}
               placeholder="Search by rocket name"
        />
        <button onClick={this.search}>Search</button>
        <button onClick={this.resetSearch}>Reset search</button>
        </div>
        <div className="launches">
        {this.renderLaunches()}
        </div>
        <div className="controls">
        <button onClick={this.loadPreviousPage} disabled={offset === 0}>prev</button>
        <button onClick={this.loadNextPage}>next</button>
        </div>
      </div>
    )
  }
}

export default App;










