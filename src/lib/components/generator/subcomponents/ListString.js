import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Input, Button, FormFeedback, FormText } from 'reactstrap';
import { plus as addIcon, trashCan as dropIcon } from '../icons';
import { Default_keyPropType, keyPropType } from '../propTypes';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { intValid, filterInt } from '../validators';
import { idGenerator } from './../utils';

export class ListString extends Component {
  state = {
    gId: idGenerator(this.props.jkey.prefix + "-lstr-" + this.props.jkey.sufix)
  }

  onChange = function (e) {
    var props = this.props.value;
    
    var validation_result = isValid(e.target.value, this.props);
    switch (e.target.name) {
      case "value-new":
        props.new_value = e.target.value;
        props.new_min = (props.new_value.length === 0 || validation_result[0]);
        props.new_max = (props.new_value.length === 0 || validation_result[1]);
        break;

      default:
        var idx = parseInt(e.target.name.replace("value-", ""))
        props.values[idx] = e.target.value;
        props.emin[idx] = validation_result[0];
        props.emax[idx] = validation_result[1];       
    }   
    
    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.uid, props, (!props.emax.includes(false) && !props.emin.includes(false)));
    }
  }.bind(this)

  onAdd = function (e) {
    var props = this.props.value;
    var validation_result = isValid(props.new_value, this.props);

    props.values.push(props.new_value);    
    props.emin.push(validation_result[0]);
    props.emax.push(validation_result[1]);
    props.new_value = "";
    props.new_min = true;
    props.new_max = true;

    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.uid, props, (!props.emax.includes(false) && !props.emin.includes(false)));
    }
  }.bind(this)

  onDrop = function (e) {
    var props = this.props.value;

    var idx = parseInt(e.currentTarget.value.replace("btn-", ""));
    props.values.splice(idx, 1);
    props.emin.splice(idx, 1);
    props.emax.splice(idx, 1);

    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.uid, props, (!props.emax.includes(false) && !props.emin.includes(false)));
    }
  }.bind(this)

  render() {
    var new_element;
    var warn_mode;
    
    if (this.props.value.values.length < this.props.max) {
      new_element = (
        <Fragment>
          <FormGroup key={this.state.gId + "-new"} row className="jofgen-card-lst-row">
            <Col>
              <table className="jofgen-card-lst-table">
                <tbody>
                  <tr>
                    <td>
                      <Input
                        name={"value-new"}
                        type="text"
                        bsSize={this.props.size}
                        value={this.props.value.new_value}
                        invalid={(!this.props.value.new_min || !this.props.value.new_max)}
                        onChange={this.onChange}
                      />
                      <FormFeedback hidden={this.props.value.new_min} color="danger">{this.props.err_minlength}</FormFeedback>
                      <FormFeedback hidden={this.props.value.new_max} color="danger">{this.props.err_maxlength}</FormFeedback>
                    </td>
                    <td className="btns" >
                      <Button className="btn-add" color="light" size="sm" onClick={this.onAdd} >
                        {this.props.icons.add}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </FormGroup>
        </Fragment>
      );

    }

    if (!this.props.none_enabled || this.props.value.values.length > 0)
    {
      warn_mode = (
        <>
          {(this.props.min !== undefined && this.props.value.values.length < this.props.min) ? <FormText color="danger">{this.props.err_minNo}</FormText> : null}
          {(this.props.max !== undefined && this.props.value.values.length > this.props.max) ? <FormText color="danger">{this.props.err_maxNo}</FormText> : null}       
        </>
      )
    }

    return (<div className={this.props.className + "jofgen-card-lst"} style={this.props.style}>      
      {new_element}
      {warn_mode}
      <TransitionGroup>
        {
          this.props.value.values.map((item, idx) => {
            return (
              <CSSTransition
                key={idx}
                classNames="jofgen-card-lst-row-item"
                timeout={50}
              >
                <FormGroup row className={"jofgen-card-lst-row"} >
                  <Col>
                    <table className="jofgen-card-lst-table">
                      <tbody>
                        <tr>
                          <td>
                            <Input
                              name={"value-" + idx}
                              type="text"
                              bsSize={this.props.size}
                              value={item}
                              invalid={(!this.props.value.emin[idx] || !this.props.value.emax[idx])}
                              onChange={this.onChange}
                            />
                            <FormFeedback hidden={this.props.value.emin[idx]} color="danger">{this.props.err_minlength}</FormFeedback>
                            <FormFeedback hidden={this.props.value.emax[idx]} color="danger">{this.props.err_maxlength}</FormFeedback>
                          </td>
                          <td className="btns" >
                            <Button className="btn-remove" value={"btn-" + idx} color="light" size="sm" onClick={this.onDrop} >
                              {this.props.icons.drop}
                            </Button>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </Col>
                </FormGroup>
              </CSSTransition>);
          })
        }
      </TransitionGroup>
    </div>);
  }
}

ListString.propTypes = {
  /* properties */
  uid: PropTypes.string.isRequired,
  value: PropTypes.exact({
    new_value: PropTypes.string.isRequired,
    new_min: PropTypes.bool.isRequired,
    new_max: PropTypes.bool.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    emin: PropTypes.arrayOf(PropTypes.bool).isRequired,
    emax: PropTypes.arrayOf(PropTypes.bool).isRequired
  }),
  minLength: function(props, propName, componentName) {
    if (props[propName] !== undefined)
    {
      if (!intValid(String(props[propName]))) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be integer.');
      }

      if (props[propName] < 0)
      {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than zero or equal to zero.');
      }

      if (props["maxLength"] !== undefined && props["maxLength"] < props[propName])
      {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be lower than maxlength.');
      }
    }
  },
  maxLength: function(props, propName, componentName) {
    if (props[propName] !== undefined)
    {
      if (!intValid(String(props[propName]))) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be integer.');
      }

      if (props[propName] < 0)
      {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than zero or equal to zero.');
      }

      if (props["minLength"] !== undefined && props["minLength"] > props[propName])
      {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than minlength.');
      }
    }
  },
  min: function(props, propName, componentName) {
    if (props[propName] !== undefined)
    {
      if (!intValid(String(props[propName]))) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be integer.');
      }

      if (props[propName] < 0)
      {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than zero or equal to zero.');
      }

      if (props["max"] !== undefined && props["max"] < props[propName])
      {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be lower than max.');
      }
    }
  },
  max: function(props, propName, componentName) {
    if (props[propName] !== undefined)
    {
      if (!intValid(String(props[propName]))) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be integer.');
      }

      if (props[propName] < 0)
      {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than zero or equal to zero.');
      }

      if (props["min"] !== undefined && props["min"] > props[propName])
      {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than min.');
      }
    }
  },
  err_minlength: PropTypes.string,
  err_maxlength: PropTypes.string,
  err_minNo: PropTypes.string,
  err_maxNo: PropTypes.string,
  none_enabled: PropTypes.bool,

  /* functions */
  onChange: PropTypes.func,
  invalid: PropTypes.bool,

  /* icons */
  icons: PropTypes.shape(
    {
      add: PropTypes.any.isRequired,
      drop: PropTypes.any.isRequired
    }
  ),

  /* aditional */
  jkey: PropTypes.shape(keyPropType),
  size: PropTypes.string
}

ListString.defaultProps = {
  className: "",
  invalid: false,
  err_minNo: "Number of values is lower than minimum",
  err_maxNo: "Number of values is higher than maximum",
  err_maxlength: "Value is too long",
  err_minlength: "Value is too short",
  min: 0,
  max: Infinity,
  minLength: 0,
  maxLength: Infinity,
  none_enabled: false,
  icons: {
    add: addIcon,
    drop: dropIcon
  },
  jkey: Default_keyPropType,
  size: "sm"
}

const isValid = function (value, props) {
  var valid = [];
  if (props.minLength !== undefined) {
    valid.push(value.length >= props.minLength);
  }
  else {
    valid.push(true);
  }

  if (props.maxLength !== undefined) {
    valid.push(value.length <= props.maxLength);
  }
  else {
    valid.push(true);
  }

  return valid;
}

export const validGetArrays = function (e, props) {
  var new_value = "";
  var values = [];
  var emin = [];
  var emax = [];

  var minL = (props.minLength === undefined || !intValid(props.minLength))?0:filterInt(props.minLength);
  var maxL = (props.maxLength === undefined || !intValid(props.maxLength))?Infinity:filterInt(props.maxLength);

  if (e !== undefined)
  {
    if (e.new_value !== undefined)
    {
      new_value = e.new_value;
    }

    if (e.values !== undefined)
    {
      values = e.values;
      var valuesLength = values.length;

      for (var i = 0; i < valuesLength; i++)
      {
        emin.push(values[i].length >= minL);
        emax.push(values[i].length <= maxL);
      }
    }
  }

  return {
    new_value: new_value,
    new_min: (new_value.length === 0 || new_value.length >= minL),
    new_max: (new_value.length === 0 || new_value.length <= maxL),
    values: values,
    emin: emin,
    emax: emax
  };
}

export const prototype = function()
{
  return {
    new_value: "",
    new_min: true,
    new_max: true,
    values: [],
    emin:  [],
    emax:  []
  };
}