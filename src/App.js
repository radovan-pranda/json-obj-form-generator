import React, { Component } from 'react';
import { JOFGENDesigner, JOFGENGenerator } from './lib'
import 'bootstrap/dist/css/bootstrap.css';
import './lib/css/designer.css';
import './lib/css/generator.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: []
    }
  }

  render() {
    return (
      <div>
        <JOFGENDesigner json={this.state.json} value={{}}  size="sm" onChange={(e, v) => { console.log(v); this.setState({ json: e }) }} export={true} />
        <JOFGENGenerator json={this.state.json} value={{}}  />
      </div>
    );
  }
}

export default App;
