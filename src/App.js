import React, { Component } from 'react';
import { JOFGENDesigner, JOFGENGenerator, isValidDesignJSON, isValidValueJSON, getValue } from './lib'
import 'bootstrap/dist/css/bootstrap.css';
import './lib/css/designer.css';
import './lib/css/designer-extra.css';
import './lib/css/generator.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: [{"uid":"bbb","required":true},{"uid":"aaa","type":"color"}],
      value: { "bbb": "#a" }
    }
  }

  render() {
    console.log("aaa", getValue(this.state.json, this.state.value, "tree"));
    return (
      <div className="container-fluid">
        {<JOFGENDesigner json={this.state.json} size="sm" onChange={(e, v) => { /*console.log("json validity",v);*/ this.setState({ json: e }); }} export={true} />}
        <JOFGENGenerator mode="tree" json={this.state.json} value={this.state.value} onChange={(e, v) => { console.log(e,v) /*console.log(e); console.log(v) */}}  />
      </div>      
    );
  }
}

export default App;
