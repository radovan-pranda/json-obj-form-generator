import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Input, Button, FormFeedback, FormText, Label, Popover, PopoverBody } from 'reactstrap';
import { info as infoIcon, plus as addIcon, trashCan as dropIcon } from './icons';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { intValid, filterInt } from './validators';
import { idGenerator } from './utils';
import { Default_keyPropType, keyPropType, translationUid, Default_translationUid } from './propTypes';
import Clearer from './Clearer';

export class InputListString extends Component {
  state = {
    gId: idGenerator(this.props.jkey.prefix + "il-str" + this.props.jkey.sufix),
    preloaded: false
  }

  onChange = function (e) {
    var validation_result = valid(e.target.value, this.props);

    var val = this.props.value;
    var err = this.props.errors;

    switch (e.target.name) {
      case "value-new":
        err.new_value = e.target.value;
        err.new_min = err.new_value.length === 0 || validation_result[0];
        err.new_max = validation_result[1];
        err.new_invalid = err.new_value.length > 0 && !validation_result[2];
        break;

      default:
        var idx = parseInt(e.target.name.replace("value-", ""))
        val[idx] = e.target.value;
        err.emin[idx] = validation_result[0];
        err.emax[idx] = validation_result[1];
        err.invalidArr[idx] = !validation_result[2];
        err.err_req = (this.props.required && val.length === 0 && err.err_minNo);
        err.invalid = err.err_minNo || err.err_maxNo || err.invalidArr.includes(true);
    }
    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.uid, { value: val, errors: err }, !err.invalid);
    }

    if (this.props.isValid !== undefined) {
      this.props.isValid(!err.invalid);
    }
  }.bind(this)

  onAdd = function (e) {
    var val = this.props.value;
    var err = this.props.errors;
    var test = valid(err.new_value, this.props);

    if (val === null) {
      val = [];
    }

    val.push(err.new_value);
    err.emin.push(test[0]);
    err.emax.push(test[1]);
    err.invalidArr.push(!test[2]);
    err.err_minNo = (this.props.minNo !== undefined && intValid(this.props.minNo) && filterInt(this.props.minNo) > val.length);
    err.err_maxNo = (this.props.maxNo !== undefined && intValid(this.props.maxNo) && filterInt(this.props.maxNo) < val.length);
    err.invalid = err.err_minNo || err.err_maxNo || err.invalidArr.includes(true);
    err.err_req = (this.props.required && val.length === 0 && err.err_minNo);
        
    err.new_invalid = false;
    err.new_min = false;
    err.new_max = false;
    err.new_value = "";

    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.uid, { value: val, errors: err }, !err.invalid);
    }

    if (this.props.isValid !== undefined) {
      this.props.isValid(!err.invalid);
    }
  }.bind(this)

  Clear = function () {
    var err = {
      warn_def: false,
      invalidArr: [],
      invalid: false,
      emax: [],
      emin: [],
      new_value: "",
      new_invalid: false,
      new_min: false,
      new_max: false,
      err_maxNo: false,
      err_minNo: false,
      err_req: false
    };

    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.uid, { value: null, errors: err }, !err.invalid);
    }

    if (this.props.isValid !== undefined) {
      this.props.isValid(!err.invalid);
    }
  }.bind(this)

  onDrop = function (e) {
    var val = this.props.value;
    var err = this.props.errors;

    var idx = parseInt(e.currentTarget.value.replace("btn-", ""));
    val.splice(idx, 1);
    err.invalidArr.splice(idx, 1);
    err.emin.splice(idx, 1);
    err.emax.splice(idx, 1);

    err.err_minNo = ((!this.props.required && val === null) || (this.props.minNo !== undefined && intValid(this.props.minNo) && filterInt(this.props.minNo) > val.length));
    err.err_maxNo = (this.props.maxNo !== undefined && intValid(this.props.maxNo) && filterInt(this.props.maxNo) < val.length);
    err.warn_def = !(val.length === 0 && this.props.default !== undefined && this.props.required);
    err.invalid = err.err_minNo || err.err_maxNo || err.invalidArr.includes(true);
    err.err_req = (this.props.required && val.length === 0 && err.err_minNo);
        
    var sinvalid = [];

    if (val.length === 0 && this.props.required && this.props.default && this.props.minNo !== undefined && this.props.minNo > 0) {
      err.warn_def = true;
      var err_minNo = (this.props.minNo !== undefined && intValid(this.props.minNo) && filterInt(this.props.minNo) > this.props.default.length);
      var err_maxNo = (this.props.maxNo !== undefined && intValid(this.props.maxNo) && filterInt(this.props.maxNo) < this.props.default.length);
      err.err_req = (this.props.required && val.length === 0 && err_minNo);
        
      for (var i = 0; i < this.props.default.length; i++) {
        sinvalid.push(valid(this.props.default[i], this.props)[2]);
      }

      err.invalid = err_minNo || err_maxNo || sinvalid.includes(true);
    }

    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.uid, { value: val, errors: err }, !err.invalid);
    }

    if (this.props.isValid !== undefined) {
      this.props.isValid(!err.invalid);
    }
  }.bind(this)

  showInfoPopUp = () => { this.setState({ popUp: true }); }
  hideInfoPopUp = () => { this.setState({ popUp: false }); }

  showInfoPopUpEmpty = () => { this.setState({ popUpEmpty: true }); }
  hideInfoPopUpEmpty = () => { this.setState({ popUpEmpty: false }); }

  showInfoPopUpDefault = () => { this.setState({ popUpDefault: true }); }
  hideInfoPopUpDefault = () => { this.setState({ popUpDefault: false }); }

  render() {
    var new_element;

    if (this.props.value === null || (this.props.value !== null && (!intValid(this.props.maxNo) || filterInt(this.props.maxNo) > this.props.value.length))) {
      new_element = (
        <Fragment>
          <FormGroup key={this.state.gId + "-new"} row className={"jofgen-card-lst-row"}>
            <Col>
              <table className="jofgen-card-lst-table">
                <tbody>
                  <tr>
                    <td>
                      <Input
                        name={"value-new"}
                        type="text"
                        bsSize={this.props.size}
                        value={this.props.errors.new_value}
                        invalid={this.props.errors.new_invalid}
                        placeholder={this.props.placeholder}
                        onChange={this.onChange}
                      />
                      <FormFeedback hidden={this.props.errors.new_min} color="danger">{this.props.err_minlength}</FormFeedback>
                      <FormFeedback hidden={this.props.errors.new_max} color="danger">{this.props.err_maxlength}</FormFeedback>
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

    return (
      <div className="jofgen-card-lst">
        <Clearer {...this.props} clear={this.Clear}>
          <div class={ "jofgen-list-body" + ((!this.props.required)?"-mr":"") } >
            {new_element}
            {
              (!this.props.errors.warn_def && this.props.required)
                ? (<FormText color="info">{this.props.warn_def}: [{this.props.default.map((value, key) => { return "\"" + value + ((this.props.default.length - 1 !== key) ? "\", " : "\"") })}]</FormText>)
                : null
            }
            {(this.props.errors.err_req) ? <FormText color="danger">{this.props.err_req}</FormText> : null}
            {(this.props.errors.err_minNo) ? <FormText color="danger">{this.props.err_minNo}</FormText> : null}
            {(this.props.errors.err_maxNo) ? <FormText color="danger">{this.props.err_maxNo}</FormText> : null}
            <TransitionGroup>
              {
                (this.props.value !== null) ? (
                  this.props.value.map((item, idx) => {

                    return (
                      <CSSTransition
                        key={idx}
                        classNames="jofgen-card-lst-row-item"
                        timeout={50}
                      >
                        <FormGroup className={"jofgen-card-lst-row"}>
                          <table className="jofgen-card-lst-table">
                            <tbody>
                              <tr>
                                <td>
                                  <Input
                                    name={"value-" + idx}
                                    type="text"
                                    bsSize={this.props.size}
                                    value={item}
                                    invalid={this.props.errors.invalidArr[idx]}
                                    onChange={this.onChange}
                                  />
                                  <FormFeedback hidden={this.props.errors.emin[idx]} color="danger">{this.props.err_minlength}</FormFeedback>
                                  <FormFeedback hidden={this.props.errors.emax[idx]} color="danger">{this.props.err_maxlength}</FormFeedback>
                                </td>
                                <td className="btns" >
                                  <Button className="btn-remove" value={"btn-" + idx} color="light" size="sm" onClick={this.onDrop} >
                                    {this.props.icons.drop}
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </FormGroup>
                      </CSSTransition>);
                  })
                ) : null
              }
            </TransitionGroup>
          </div>
        </Clearer>
      </div>
    );
  }
}

const valid = function (value, props) {
  var valid = [];
  if (props.minLength !== undefined && !isNaN(props.minLength)) {
    valid.push(value.length >= props.minLength);
  }
  else {
    valid.push(true);
  }

  if (props.maxLength !== undefined && !isNaN(props.maxLength)) {
    valid.push(value.length <= props.maxLength);
  }
  else {
    valid.push(true);
  }

  valid.push(valid[0] && valid[1]);

  return valid;
}

InputListString.propTypes = {
  /* properties */
  uid: PropTypes.string.isRequired,
  name: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.string),
  default: PropTypes.arrayOf(PropTypes.string),
  tip: PropTypes.string,
  placeholder: PropTypes.string,

  minLength: function (props, propName, componentName) {
    if (props[propName] !== undefined) {
      if (!intValid(String(props[propName]))) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be integer.');
      }

      if (props[propName] < 0) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than zero or equal to zero.');
      }

      if (props["maxLength"] !== undefined && props["maxLength"] < props[propName]) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be lower than maxlength.');
      }
    }
  },
  maxLength: function (props, propName, componentName) {
    if (props[propName] !== undefined) {
      if (!intValid(String(props[propName]))) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be integer.');
      }

      if (props[propName] < 0) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than zero or equal to zero.');
      }

      if (props["minLength"] !== undefined && props["minLength"] > props[propName]) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than minlength.');
      }
    }
  },
  minNo: function (props, propName, componentName) {
    if (props[propName] !== undefined) {
      if (!intValid(String(props[propName]))) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be integer.');
      }

      if (props[propName] < 0) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than zero or equal to zero.');
      }

      if (props["maxNo"] !== undefined && props["maxNo"] < props[propName]) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be lower than maxNo.');
      }
    }
  },
  maxNo: function (props, propName, componentName) {
    if (props[propName] !== undefined) {
      if (!intValid(String(props[propName]))) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be integer.');
      }

      if (props[propName] < 0) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than zero or equal to zero.');
      }

      if (props["minNo"] !== undefined && props["minNo"] > props[propName]) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than minNo.');
      }
    }
  },
  errors: PropTypes.object,
  err_req: PropTypes.string,
  err_minlength: PropTypes.string,
  err_maxlength: PropTypes.string,
  err_minNo: PropTypes.string,
  err_maxNo: PropTypes.string,
  empty: PropTypes.string,

  /* functions */
  onChange: PropTypes.func,

  /* icons */
  icons: PropTypes.shape(
    {
      add: PropTypes.any.isRequired,
      drop: PropTypes.any.isRequired
    }
  ),

  /* aditional */
  jkey: PropTypes.shape(keyPropType),

  sm: PropTypes.oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]),
  size: PropTypes.string,

  invalid: PropTypes.bool,
  invalidUid: PropTypes.bool,
  icon: PropTypes.any,
  translation: PropTypes.shape(translationUid)
}

InputListString.defaultProps = {
  uid: "",
  className: "",
  invalid: false,
  value: null,
  empty: "This field is not mandatory. If you don't want to define any value click here",
  err_req: "Value is required",
  err_minNo: "Number of values is lower than minimum",
  err_maxNo: "Number of values is higher than maximum",
  err_maxlength: "Value is too long",
  err_minlength: "Value is too short",
  useDefaultTip: "If you want to use default value activate this button.",
  warn_def: "Value is not filled. Default value: ",
  icons: {
    add: addIcon,
    drop: dropIcon
  },
  jkey: Default_keyPropType,
  translation: Default_translationUid,
  size: "sm",
  sm: "12",
  icon: infoIcon
}

export const getErrors = function (e, props) {

  var new_value = getValue(e, props);

  if (new_value !== undefined && new_value !== null) {
    var warn_def = !(e.length === 0 && props.default !== undefined && props.required);

    if (!warn_def) {
      var sinvalid = [];
      var err_minNo = (props.minNo !== undefined && intValid(props.minNo) && filterInt(props.minNo) > props.default.length);
      var err_maxNo = (props.maxNo !== undefined && intValid(props.maxNo) && filterInt(props.maxNo) < props.default.length);

      for (var i = 0; i < props.default.length; i++) {
        sinvalid.push(valid(props.default[i], props)[2]);
      }

      return {
        warn_def: warn_def,
        invalidArr: [],
        invalid: err_minNo || err_maxNo || sinvalid.includes(true),
        emax: [],
        emin: [],
        new_value: "",
        new_invalid: false,
        new_min: false,
        new_max: false,
        err_maxNo: false,
        err_minNo: false,
        err_req: false,
      }
    }
    else {
      var invalid = [];
      var emin = [];
      var emax = [];

      var err_minNoV = (props.minNo !== undefined && intValid(props.minNo) && filterInt(props.minNo) > e.length);
      var err_maxNoV = (props.maxNo !== undefined && intValid(props.maxNo) && filterInt(props.maxNo) < e.length);
      var validate;
      for (var i = 0; i < e.length; i++) {
        validate = valid(e[i], props);
        emin.push(validate[0]);
        emax.push(validate[1]);
        invalid.push(validate[2]);
      }

      var err_req = (props.required && e.length === 0 && err_minNoV);
      return {
        warn_def: warn_def,
        invalidArr: invalid,
        invalid: err_minNoV || err_maxNoV || invalid.includes(true),
        emax: emax,
        emin: emin,
        new_value: "",
        new_invalid: false,
        new_min: false,
        new_max: false,
        err_maxNo: err_maxNoV,
        err_minNo: err_minNoV,
        err_req: err_req,
      }
    }
  }
  else {
    return {
      warn_def: false,
      invalidArr: [],
      invalid: false,
      emax: [],
      emin: [],
      new_value: "",
      new_invalid: false,
      new_min: false,
      new_max: false,
      err_maxNo: false,
      err_minNo: false,
      err_req: false
    }
  }
}

export const getValue = function (e, props) {
  if (props.required) {
    if (e === undefined || e === null || e.length === 0) {
      if (props.default === null || props.default === undefined) {
        return [];
      }

      return props.default;
    }
    else {
      return e;
    }
  }
  else {
    if (e === undefined || e === null) {
      return null;
    }
    else {
      return e;
    }
  }
}