import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Input, Button, FormFeedback, FormText } from 'reactstrap';
import { plus as addIcon, trashCan as dropIcon } from '../icons';
import { Default_keyPropType, keyPropType } from '../propTypes';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { intValid } from '../validators';
import { idGenerator } from './../utils';

export class ListCustom extends Component {
  state = {
    gId: idGenerator(this.props.jkey.prefix + "-lrgx-" + this.props.jkey.sufix)
  }
  
  onChange = function (e) {
    var props = this.props.value;

    var validation_result = isValid(e.target.value, this.props);
    switch (e.target.name) {
      case "value-new":
        props.new_value = e.target.value;
        props.new_type = (props.new_value.length === 0 || validation_result);
        break;

      default:
        var idx = parseInt(e.target.name.replace("value-", ""))
        props.values[idx] = e.target.value; 
        props.etype[idx] = validation_result; 
    }
    
    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.uid, props, !props.etype.includes(false));
    } 
  }.bind(this)

  onAdd = function (e) {
    var props = this.props.value;
    var validation_result = isValid(props.new_value, this.props);

    props.values.push(props.new_value);    
    props.etype.push(validation_result[0]);
    props.new_value = "";
    props.new_type = true;

    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.uid, props, !props.etype.includes(false));
    }
  }.bind(this)

  onDrop = function (e) {
    var props = this.props.value;

    var idx = parseInt(e.currentTarget.value.replace("btn-", ""));
    props.values.splice(idx, 1);
    props.etype.splice(idx, 1);

    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.uid, props, !props.etype.includes(false));
    }
  }.bind(this)

  render() {
    var new_element;
    var warn_mode;

    if (this.props.value.values.length < this.props.max) {
      new_element = (
        <Fragment>
          <FormGroup key={this.state.gId + "-new"} row className={"jofgen-D-card-lst-row"}>
            <Col>
              <table className="jofgen-D-card-lst-table">
                <tbody>
                  <tr>
                    <td>
                      <Input
                        name={"value-new"}
                        type="text"
                        bsSize={this.props.size}
                        value={this.props.value.new_value}
                        invalid={!this.props.value.new_type}                        
                        onChange={this.onChange}
                      />
                      <FormFeedback hidden={this.props.value.new_type} color="danger">{this.props.err_type}</FormFeedback>
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

    return (<div className={this.props.className + "jofgen-D-card-lst"} style={this.props.style}>      
      {new_element}
      {warn_mode}
      <TransitionGroup>
        {
          this.props.value.values.map((item, idx) => {

            return (
              <CSSTransition
                key={idx}
                classNames="jofgen-D-card-lst-row-item"
                timeout={50}
              >
                <FormGroup row className={"jofgen-D-card-lst-row"}>
                  <Col>
                    <table className="jofgen-D-card-lst-table">
                      <tbody>
                        <tr>
                          <td>
                            <Input
                              name={"value-" + idx}
                              type="text"
                              bsSize={this.props.size}
                              value={item}
                              invalid={!(this.props.value.etype[idx])}
                              onChange={this.onChange}
                            />
                            <FormFeedback hidden={this.props.value.etype[idx]} color="danger">{this.props.err_type}</FormFeedback>
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

ListCustom.propTypes = {
  /* properties */
  uid: PropTypes.string.isRequired,
  value: PropTypes.exact({
    new_value: PropTypes.string.isRequired,
    new_type: PropTypes.bool.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    etype: PropTypes.arrayOf(PropTypes.bool).isRequired
  }),  
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
  regex: function(props, propName, componentName) {
    if (props[propName] !== undefined)
    {
      try
      {
        new RegExp(props[propName]);
      }
      catch
      {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Invalid regular expression');
      }
    }
  },
  err_minNo: PropTypes.string,
  err_maxNo: PropTypes.string,
  err_typeNo: PropTypes.string,

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

ListCustom.defaultProps = {
  className: "",
  invalid: false,
  min: 0,
  max: Infinity,
  regex: ".*",
  err_minNo: "Number of values is lower than minimum",
  err_maxNo: "Number of values is higher than maximum",
  err_type: "Invalid value type",
  icons: {
    add: addIcon,
    drop: dropIcon
  },
  jkey: Default_keyPropType,
  size: "sm"
}

const isValid = function (value, props) {
  try 
  {
    return new RegExp(props.regex).test(value);
  }
  catch
  {
    return false;
  }
}

export const validGetArrays = function (e, props) {
  try 
  {
    var rgx_test = new RegExp(props.regex);
    var result = {
      new_value: e.new_value,
      new_type: (e.new_value.length === 0)?true:rgx_test.test(e.new_value),
      values: [],
      etype: []
    }

    var values = e.values;
    var valuesLength = values.length;
    
    for (var i = 0; i < valuesLength; i++) 
    {
      result.values.push(values[i]);
      result.etype.push(rgx_test.test(values[i]));
    }

    return result;
  }
  catch
  {
    var result = {
      new_value: e.new_value,
      new_type: false,
      values: [],
      etype: []
    }

    var values = e.values;
    var valuesLength = values.length;
    
    for (var i = 0; i < valuesLength; i++) 
    {
      result.values.push(values[i]);
      result.etype.push(false);
    }

    return result;
  }
}

export const prototype = function () {
  return {
    new_value: "",
    new_type: true,
    values: [],
    etype: []
  };
}

export const rebuild = function (e, props) {
  return validGetArrays({
    new_value: "",
    new_type: true,
    values: e,
    etype: []
  }, props);
}