import React, { Component } from 'react';
import { JOFGENDesigner, JOFGENGenerator, isValidDesignJSON, isValidValueJSON } from './lib'
import 'bootstrap/dist/css/bootstrap.css';
import './lib/css/designer.css';
import './lib/css/designer-extra.css';
import './lib/css/generator.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {},
      value: {}
    }
  }

  render() {
    console.log(this.state.valid)
    return (
      <div className="container-fluid">
        {<JOFGENDesigner json={this.state.json} size="sm" onChange={(e, v) => { /*console.log("json validity",v);*/ this.setState({ json: e }); }} export={true} />}
        <JOFGENGenerator mode="tree" json={this.state.json} value={this.state.value} onChange={(e, v) => { this.setState({ valid: v, value: e })}}  />
        <JOFGENGenerator mode="linear" json={this.state.json} value={this.state.init_value} onChange={(e, v) => { this.setState({ valid: v, init_value: e })}}  />
      </div>      
    );
  }
}

export default App;
