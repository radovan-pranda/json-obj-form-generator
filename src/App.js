import React, { Component } from 'react';
import { JOFGENDesigner, JOFGENGenerator, isValidDesignJSON, isValidValueJSON } from './lib'
import 'bootstrap/dist/css/bootstrap.css';
import './lib/css/designer.css';
import './lib/css/generator.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: [],
      value: {}
    }
  }

  render() {
    console.log("JSON input object validation", isValidDesignJSON(this.state.json, "tree"));
    console.log("Value object validation", isValidValueJSON(this.state.json, this.state.value, "tree"))
    return (
      <div>
        <JOFGENDesigner json={this.state.json} size="sm" onChange={(e, v) => { console.log("json validity",v); this.setState({ json: e }) }} export={true} />
        <JOFGENGenerator json={this.state.json} value={this.state.value} onChange={(e, v) => { console.log("value validity", v); this.setState({ value: e }) }}  />
      </div>
    );
  }
}

export default App;
