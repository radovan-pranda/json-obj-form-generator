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
      json: [{"uid":"list_of_animals","name":"List of animals","default": [4,4],"minNo":1,"maxNo":10, "required": true, "tip":"Enumerate all your favourite numbers","type":"str_il"}],
      value: {}
    }
  }

  render() {
    return (
      <div className="container-fluid">
        {<JOFGENDesigner json={this.state.json} size="sm" onChange={(e, v) => { /*console.log("json validity",v);*/ this.setState({ json: e }); }} export={true} />}
        <JOFGENGenerator mode="tree" json={this.state.json} onChange={(e, v) => { /*console.log(e); console.log(v) */}}  />
      </div>
    );
  }
}

export default App;
