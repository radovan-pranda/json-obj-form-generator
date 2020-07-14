import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, ButtonGroup } from 'reactstrap';
import { up, down, view, unview, dropIco as drop  } from './icons';
import Generator from '../../Generator';

export default class Container extends Component {
  state = {
    view: false
  }

  onViewClick = () => { this.setState({ view: !this.state.view }) }
  render() {    
    var upBtn;
    var downBtn;    
    var dropBtn;
    var resultContainer;
    var viewBtn;    

    if (this.props.onUpButtonClick !== undefined || !this.props.hideDissabled) {
      upBtn = <Fragment>
          <Button className="btn-up" disabled={(this.props.onUpButtonClick === undefined)} color="light" size="sm" onClick={this.props.onUpButtonClick} >
            { this.props.icons.arrowUp }
          </Button>
      </Fragment>;
    }
    
    if (this.props.onDownButtonClick !== undefined || !this.props.hideDissabled) {
      downBtn = <Fragment>
        <Button className="btn-down" disabled={(this.props.onDownButtonClick === undefined)} color="light" size="sm" onClick={this.props.onDownButtonClick} >
          { this.props.icons.arrowDown }
        </Button>
      </Fragment>;
    }

    if (this.props.onRemoveButtonClick !== undefined) {
      dropBtn = <Fragment>     
        <Button className="btn-remove" disabled={(this.props.onRemoveButtonClick === undefined)} color="light" size="sm" onClick={this.props.onRemoveButtonClick} >
          {this.props.icons.drop}
        </Button>
      </Fragment>;
    }

    if (this.props.extended) {
      viewBtn = <Fragment>     
        <Button className="btn-view" color="light" size="sm" onClick={this.onViewClick} >
          {(this.state.view)
            ?(this.props.icons.view)
            :(this.props.icons.unview)
          }
        </Button>
      </Fragment>;
    }

    if (this.props.onUpButtonClick !== undefined || this.props.onDownButtonClick !== undefined || !this.props.hideDissabled || this.props.onRemoveButtonClick !== undefined)
    {
      var extras = [];
      extras.push(this.props.extras);
      resultContainer = <Fragment>
          <div className="jofgen-D-component-btns-left" >
            <ButtonGroup vertical>
              {upBtn}
              {downBtn}
              {viewBtn}
              {dropBtn}

            </ButtonGroup>
          </div>
          <div className="jofgen-D-component-body">
            {(this.state.view)?<Generator json={extras} />:this.props.children}
          </div>
        </Fragment>;
    }
    else
    {
      resultContainer = <Fragment>{this.props.children}</Fragment>;
    }

    return (
      <Card className="jofgen-D-component jofgen-D-designer-container" style={this.props.style} draggable={this.props.draggable} >
        {resultContainer}
      </Card>
    );
  }
}

Container.propTypes = {
  children: PropTypes.any.isRequired,
  hideDissabled: PropTypes.bool,
  position: PropTypes.number,
  enabledCounter: PropTypes.bool,
  onUpButtonClick: PropTypes.func,
  onDownButtonClick: PropTypes.func,    
  onChangePosition: PropTypes.func,
  onRemoveButtonClick: PropTypes.func,
  draggable: PropTypes.bool,
  extended: PropTypes.bool,
  icons: PropTypes.exact({
    view: PropTypes.any.isRequired,
    unview: PropTypes.any.isRequired,
    drop: PropTypes.any.isRequired,
    arrowDown: PropTypes.any.isRequired,
    arrowUp: PropTypes.any.isRequired
  })
}

Container.defaultProps = {
  hideDissabled: true,
  position: 0,
  enabledCounter: false,
  draggable: false,
  icons: {
    view: view,
    unview: unview,
    drop: drop,
    arrowDown: down,
    arrowUp: up
  }
}