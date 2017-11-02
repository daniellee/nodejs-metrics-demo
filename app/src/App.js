import React, { Component } from 'react';
import logo from './grafana_icon.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      responseTime: ''
    };
  }

  componentWillMount() {
    fetch('/home')
    .then(response => this.json(response))
    .then(response => {
      console.log(response.text);
    });
  }

  getSlow() {
    fetch('/slow')
    .then(response => this.json(response))
    .then(response => {
      this.setState({responseTime: response.responseTime + 'ms'});
    });
  }

  json(response) {
    var contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    throw new Error('Invalid response');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">A Sample App</h1>
        </header>
        <p className="App-intro">
          This is a sample app that generates metrics and sends them to a Statsd server.
        </p>
        <button onClick={this.getSlow.bind(this)}>Do a slow api call</button>
        <p>Response Time: {this.state.responseTime}</p>
      </div>
    );
  }
}

export default App;
