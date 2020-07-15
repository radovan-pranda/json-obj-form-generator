import React, { Component } from 'react';
import { JOFGENDesigner, JOFGENGenerator } from './lib'
import 'bootstrap/dist/css/bootstrap.css';
import './lib/css/designer.css';
import './lib/css/generator.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div>
        <JOFGENDesigner size="sm" onChange={(e, v) => { console.log(v); this.setState({ json: e }) }} />
        <JOFGENGenerator json={this.state.json} />
      </div>
    );
  }
}

export default App;
