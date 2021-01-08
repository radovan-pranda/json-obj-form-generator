import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Input, Button, FormFeedback, FormText } from 'reactstrap';
import { plus as addIcon, trashCan as dropIcon } from '../icons';
import { Default_keyPropType, keyPropType } from '../propTypes';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { intValid } from '../validators';
import { idGenerator } from './../utils';

export class ListNumeric extends Component {
  state = {
    gId: idGenerator(this.props.jkey.prefix + "-lint-" + this.props.jkey.sufix)
  }

  onChange = function (e) {
    var props = this.props.value;

    var validation_result = isValid(e.target.value, this.props);
    switch (e.target.name) {
      case "value-new":
        props.new_value = e.target.value;
        props.new_min = (props.new_value.length === 0 || validation_result[0]);
        props.new_max = (props.new_value.length === 0 || validation_result[1]);
        props.new_type = (props.new_value.length === 0 || validation_result[2]);
        if (props.new_type && props.new_value.length > 0) {
          props.new_value = this.props.typeFilter(props.new_value);
        }
        break;

      default:
        var idx = parseInt(e.target.name.replace("value-", ""));
        props.emin[idx] = validation_result[0];
        props.emax[idx] = validation_result[1];
        props.etype[idx] = validation_result[2];
        if (validation_result[2]) {
          props.values[idx] = this.props.typeFilter(e.target.value);
        }
        else
        {         
          props.values[idx] = e.target.value;
        }
    }

    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.uid, props, (!props.emin.includes(false) && !props.emax.includes(false) && !props.etype.includes(false)));
    }
  }.bind(this)

  onAdd = function () {
    var props = this.props.value;
    var validation_result = isValid(props.new_value, this.props);

    props.values.push(props.new_value);
    props.emin.push(validation_result[0]);
    props.emax.push(validation_result[1]);
    props.etype.push(validation_result[2]);
    props.new_value = "";
    props.new_min = true;
    props.new_max = true;
    props.new_type = true;

    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.uid, props, (!props.emax.includes(false) && !props.emin.includes(false) && !props.etype.includes(false)));
    }
  }.bind(this)

  onDrop = function (e) {
    var props = this.props.value;

    var idx = parseInt(e.currentTarget.value.replace("btn-", ""));
    props.values.splice(idx, 1);
    props.emin.splice(idx, 1);
    props.emax.splice(idx, 1);
    props.etype.splice(idx, 1);

    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.uid, props, (!props.emax.includes(false) && !props.emin.includes(false)));
    }
  }.bind(this)

  render() {
    var new_element;
    var warn_mode;

    if (this.props.value.values.length < this.props.maxNo) {
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
                        invalid={(!this.props.value.new_min || !this.props.value.new_max || !this.props.value.new_type)}
                        onChange={this.onChange}
                      />
                      <FormFeedback hidden={this.props.value.new_type} color="danger">{this.props.err_type}</FormFeedback>
                      <FormFeedback hidden={this.props.value.new_min} color="danger">{this.props.err_min}</FormFeedback>
                      <FormFeedback hidden={this.props.value.new_max} color="danger">{this.props.err_max}</FormFeedback>
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
          {(this.props.minNo !== undefined && this.props.value.values.length < this.props.minNo) ? <FormText color="danger">{this.props.err_minNo}</FormText> : null}
          {(this.props.maxNo !== undefined && this.props.value.values.length > this.props.maxNo) ? <FormText color="danger">{this.props.err_maxNo}</FormText> : null}
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
                              invalid={(!this.props.value.emin[idx] || !this.props.value.emax[idx] || !this.props.value.etype[idx])}
                              onChange={this.onChange}
                            />
                            <FormFeedback hidden={this.props.value.etype[idx]} color="danger">{this.props.err_type}</FormFeedback>
                            <FormFeedback hidden={this.props.value.emin[idx]} color="danger">{this.props.err_min}</FormFeedback>
                            <FormFeedback hidden={this.props.value.emax[idx]} color="danger">{this.props.err_max}</FormFeedback>
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

ListNumeric.propTypes = {
  /* properties */
  uid: PropTypes.string.isRequired,
  value: PropTypes.exact({
    new_value: PropTypes.string.isRequired,
    new_min: PropTypes.bool.isRequired,
    new_max: PropTypes.bool.isRequired,
    new_type: PropTypes.bool.isRequired,
    values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    emin: PropTypes.arrayOf(PropTypes.bool).isRequired,
    emax: PropTypes.arrayOf(PropTypes.bool).isRequired,
    etype: PropTypes.arrayOf(PropTypes.bool).isRequired
  }),
  min: PropTypes.number,
  max: PropTypes.number,
  minNo: function (props, propName, componentName) {
    if (props[propName] !== undefined) {
      if (!intValid(String(props[propName]))) {
        return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value must be integer.`);
      }

      if (props[propName] < 0) {
        return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value must be greater than zero or equal to zero.`);
      }

      if (props["maxNo"] !== undefined && props["maxNo"] < props[propName]) {
        return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value must be lower than maxNo.`);
      }
    }
  },
  maxNo: function (props, propName, componentName) {
    if (props[propName] !== undefined) {
      if (!intValid(String(props[propName]))) {
        return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value must be integer.`);
      }

      if (props[propName] < 0) {
        return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value must be greater than zero or equal to zero.`);
      }

      if (props["minNo"] !== undefined && props["minNo"] > props[propName]) {
        return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value must be greater than minNo.`);
      }
    }
  },
  err_min: PropTypes.string,
  err_max: PropTypes.string,
  err_minNo: PropTypes.string,
  err_maxNo: PropTypes.string,
  err_type: PropTypes.string,
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

ListNumeric.defaultProps = {
  className: "",
  invalid: false,
  min: -Infinity,
  max: Infinity,
  minNo: 0,
  maxNo: Infinity,
  err_minNo: "Number of values is lower than minimum",
  err_maxNo: "Number of values is higher than maximum",
  err_max: "Value is too high",
  err_min: "Value is too low",
  err_type: "Invalid value type. Value must be integer",
  icons: {
    add: addIcon,
    drop: dropIcon
  },
  jkey: Default_keyPropType,
  size: "sm",
  none_enabled: false
}

const isValid = function (value, props) {
  var valid = [];
  var v = String(value);
  var val = props.typeFilter(v);
  var valValid = props.typeValid(v);
  if (props.min !== undefined && valValid) {
    valid.push(val >= props.min);
  }
  else {
    valid.push(true);
  }

  if (props.max !== undefined && valValid) {
    valid.push(val <= props.max);
  }
  else {
    valid.push(true);
  }

  valid.push(valValid);
  return valid;
}

export const validGetArrays = function (e, props, typeValid, typeFilter) {
  var snv = String(e.new_value);
  var result = {
    new_value: "",
    new_min: true,
    new_max: true,
    new_type: typeValid(snv),
    values: [],
    emin: [],
    emax: [],
    etype: []
  }

  var new_value_empty = snv.length === 0;
  result.new_value = (result.new_type) ? typeFilter(snv) : snv;
  var values = [];
  var emin = [];
  var emax = [];
  var etype = [];

  var min = (props.min === undefined || !typeValid(props.min)) ? -Infinity : typeFilter(props.min);
  var max = (props.max === undefined || !typeValid(props.max)) ? Infinity : typeFilter(props.max);
  if (result.new_type) {
    result.new_min = min <= result.new_value || new_value_empty;
    result.new_max = max >= result.new_value || new_value_empty;
  }

  result.new_type = result.new_type || new_value_empty;

  if (e.values !== undefined) {
    values = e.values;
    var valuesLength = values.length;

    var svi;
    var ivi;
    var vvi;
    for (var i = 0; i < valuesLength; i++) {
      svi = String(values[i]);
      ivi = typeFilter(svi);
      vvi = typeValid(svi);

      if (vvi)
      {
        emin.push(ivi >= min);
        emax.push(ivi <= max);
        etype.push(vvi);
      }
      else
      {
        emin.push(true);
        emax.push(true);
        etype.push(vvi);
      }

      result.values.push((vvi)?ivi:svi);
    }
  }

  result.emin = emin;
  result.emax = emax;
  result.etype = etype;
  return result;
}

export const prototype = function () {
  return {
    new_value: "",
    new_min: true,
    new_max: true,
    new_type: true,
    values: [],
    emin: [],
    emax: [],
    etype: []
  };
}

export const rebuild = function (e, props, typeValid, typeFilter) {
  return validGetArrays({
    new_value: "",
    new_min: true,
    new_max: true,
    new_type: true,
    values: (e && Array.isArray(e))?e:[],
    emin: [],
    emax: [],
    etype: []
  }, props, typeValid, typeFilter);
}