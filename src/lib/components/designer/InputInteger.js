import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Col, FormGroup, Label, CardTitle, CardBody, Button, Collapse, FormFeedback } from 'reactstrap';
import { Default_IntTranslation, IntegerTranslationPropType, Default_keyPropType, keyPropType } from './propTypes';
import { idGenerator } from './utils';
import { filterInt, intValid } from './validators';
import { integer as icon, invalid_integer as invalid_icon, warnings as warningsIcon, warningAlert as warningsAlertIcon, error as errorsIcon, errorAlert as errorsAlertIcon } from './icons';
import ErrorContainer from './ErrorContainer';

export class InputInteger extends Component {
  state = {
    isOpenMain: true,
    gId: idGenerator(this.props.jkey.prefix + "i" + this.props.jkey.sufix)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var nextState = {}
    if (nextProps.value && nextProps.isValid) {
      nextProps.isValid(valid(nextState.value));
    }

    return nextState;
  }

  onChange = function (e) {
    var props = this.props.value;

    props[e.target.name] = e.target.value;
    props.uid = props.uid.replace(" ", "_");

    var validation = valid(props);

    if (this.props.onChange) {
      this.props.onChange(props, validation);
    }

    if (this.props.isValid) {
      this.props.isValid(validation);
    }
  }.bind(this)

  onChangeBool = function (e) {
    var props = this.props.value;

    props[e.target.name] = e.target.checked;

    var validation = valid(props);

    if (this.props.onChange) {
      this.props.onChange(props, validation);
    }

    if (this.props.isValid) {
      this.props.isValid(validation);
    }
  }.bind(this)

  onChangeError = function (key, value) {
    var props = this.props.value;

    props[key] = value;

    var validation = valid(props);

    if (this.props.onChange) {
      this.props.onChange(props, validation);
    }

    if (this.props.isValid) {
      this.props.isValid(validation);
    }
  }.bind(this)

  collapseMain = function () { this.setState({ isOpenMain: !this.state.isOpenMain }); }.bind(this)

  renderErrors(value, min, max, midfix) {
    let errors = [];

    var strValue = String(value);
    var strMin = String(min);
    var strMax = String(max);

    if (intValid(strValue)) {
      var v = filterInt(strValue);
      var mn = filterInt(strMin);
      var mx = filterInt(strMax);

      if (v < mn && !isNaN(mn)) {
        errors = [...errors, <FormFeedback key={this.state.gId + "-" + midfix + "-ib-MN"} valid={false} >{this.props.translation.messages["min"]}</FormFeedback>];
      }

      if (v > mx && !isNaN(mx)) {
        errors = [...errors, <FormFeedback key={this.state.gId + "-" + midfix + "-ib-MX"} valid={false} >{this.props.translation.messages["max"]}</FormFeedback>];
      }

      if (!isFinite(v)) {
        errors = [...errors, <FormFeedback key={this.state.gId + "-" + midfix + "-ib-I"} valid={false} >{this.props.translation.messages["inf"]}</FormFeedback>];
      }
    }
    else {
      if (strValue.length > 0) {
        errors = [...errors, <FormFeedback key={this.state.gId + "-" + midfix + "-ib-T"} valid={false} >{this.props.translation.messages["type"]}</FormFeedback>];
      }
    }

    return errors;
  }

  render() {
    var invalid = !valid(this.props.value);

    var refMin = ((this.props.value.min.length === 0) ? Number.NEGATIVE_INFINITY : filterInt(this.props.value.min));
    var refMax = ((this.props.value.max.length === 0) ? Number.POSITIVE_INFINITY : filterInt(this.props.value.max));

    var renderValue = this.renderErrors(this.props.value.value, refMin, refMax, "v");
    var renderMin = this.renderErrors(this.props.value.min, refMin, refMax, "m");
    var renderMax = this.renderErrors(this.props.value.max, refMin, refMax, "x");
    var renderDefault = this.renderErrors(this.props.value.default, refMin, refMax, "d");

    var default_section = <Col sm={6} />;

    if (this.props.value.required) {
      default_section = (<Col sm={6}>
        <FormGroup row>
          <Label size={this.props.size} sm={2} className="jofgen-D-inputLabel" >{this.props.translation.default}</Label>
          <Col className="jofgen-D-input-col">
            <Input
              name="default"
              type="text"
              value={this.props.value.default} onChange={this.onChange}
              invalid={renderDefault.length > 0}
              bsSize={this.props.size}
            />
            {renderDefault}
          </Col>
        </FormGroup>
      </Col>);
    }

    return (<div className={this.props.className + " jofgen-D-card jofgen-D-integer" + ((this.props.value.required) ? " required" : "") + ((invalid || this.props.invalid) ? " invalid" : "")} style={this.props.style} >
      <CardBody className="jofgen-D-card-body">
        <CardTitle>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td className="jofgen-D-children" >
                  {(invalid || this.props.invalid) ? this.props.icons.invalid_icon : this.props.icons.icon}
                  <b>{this.props.translation.title}</b>
                </td>
                <td style={{ width: "50px", textAlign: "right" }}>
                  <Button size={this.props.size} color="link" onClick={this.collapseMain} >
                    <svg className="jofgen-D-collapse-icon" style={{ transform: ((this.state.isOpenMain) ? "rotate(180deg)" : "rotate(0deg)") }} viewBox="0 0 24 24"><path fill="#000" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardTitle>
        <FormGroup row>
          <Col sm={6}>
            <FormGroup row>
              <Label sm={2} className="jofgen-D-inputLabel" >{this.props.translation.uid}</Label>
              <Col className="jofgen-D-input-col">
                <Input
                  name="uid"
                  type="text"
                  value={this.props.value.uid} onChange={this.onChange}
                  invalid={this.props.value.uid.length === 0 || this.props.invalid}
                  bsSize={this.props.size}
                />
                <FormFeedback valid={false} >{this.props.translation.messages.uid}</FormFeedback>
              </Col>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup check>
              <Label size={this.props.size} check>
                <Input
                  name="required"
                  type="checkbox"
                  checked={this.props.value.required} onChange={this.onChangeBool}
                />
                {" " + this.props.translation.required}
              </Label>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup row>
              <Label size={this.props.size} sm={1} className="jofgen-D-inputLabel" >{this.props.translation.name}</Label>
              <Col className="jofgen-D-input-col">
                <Input
                  name="name"
                  type="text"
                  value={this.props.value.name} onChange={this.onChange}
                  bsSize={this.props.size}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup row>
              <Label size={this.props.size} sm={1} className="jofgen-D-inputLabel" >{this.props.translation.placeholder}</Label>
              <Col className="jofgen-D-input-col">
                <Input
                  name="placeholder"
                  type="text"
                  value={this.props.value.placeholder} onChange={this.onChange}
                  bsSize={this.props.size}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col sm={12}>
            <FormGroup row>
              <Label size={this.props.size} sm={1} className="jofgen-D-inputLabel" >{this.props.translation.tip}</Label>
              <Col className="jofgen-D-input-col">
                <Input
                  name="tip"
                  type="textarea"
                  value={this.props.value.tip} onChange={this.onChange}
                  bsSize={this.props.size}
                />
              </Col>
            </FormGroup>
          </Col>
        </FormGroup>
        <Collapse isOpen={this.state.isOpenMain} >
          <FormGroup row>
            <Col sm={6}>
              <FormGroup row>
                <Label size={this.props.size} sm={2} className="jofgen-D-inputLabel" >{this.props.translation.value}</Label>
                <Col className="jofgen-D-input-col">
                  <Input
                    name="value"
                    type="text"
                    value={this.props.value.value} onChange={this.onChange}
                    invalid={renderValue.length > 0}
                    bsSize={this.props.size}
                  />
                  {renderValue}
                </Col>
              </FormGroup>
            </Col>
            {default_section}
            <Col sm={6}>
              <FormGroup row>
                <Label size={this.props.size} sm={2} className="jofgen-D-inputLabel" >{this.props.translation.min}</Label>
                <Col className="jofgen-D-input-col">
                  <Input
                    name="min"
                    type="text"
                    value={this.props.value.min} onChange={this.onChange}
                    invalid={renderMin.length > 0}
                    bsSize={this.props.size}
                  />
                  {renderMin}
                </Col>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup row>
                <Label size={this.props.size} sm={2} className="jofgen-D-inputLabel" >{this.props.translation.max}</Label>
                <Col className="jofgen-D-input-col">
                  <Input
                    name="max"
                    type="text"
                    value={this.props.value.max} onChange={this.onChange}
                    invalid={renderMax.length > 0}
                    bsSize={this.props.size}
                  />
                  {renderMax}
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>
        </Collapse>
      </CardBody>

      <Fragment>
        <ErrorContainer
          size={this.props.size}
          jkey={{ prefix: this.state.gId + "-err", sufix: "" }}
          values={
            Object.assign({},
              ((this.props.value.required) ? { err_req: this.props.value.err_req } : null),
              { err_type: this.props.value.err_type },
              ((this.props.value.min.length > 0 && renderMin.length === 0) ? { err_min: this.props.value.err_min } : null),
              ((this.props.value.max.length > 0 && renderMax.length === 0) ? { err_max: this.props.value.err_max } : null),
              { err_inf: this.props.value.err_inf }
            )
          }
          errors={{
            err_min: this.props.translation.errors.err_min,
            err_max: this.props.translation.errors.err_max,
            err_req: this.props.translation.errors.err_req,
            err_type: this.props.translation.errors.err_type,
            err_inf: this.props.translation.errors.err_inf
          }}
          translation={{ title: this.props.translation.errors.title, alert: this.props.translation.errors.alert }}
          onChange={this.onChangeError} />
      </Fragment>
      <Fragment>
        <ErrorContainer
          size={this.props.size}
          className="jofgen-D-warning"
          jkey={{ prefix: this.state.gId + "-", sufix: "warn" }}
          icons={{ icon: this.props.icons.warnings, invalid_icon: this.props.icons.warningsAlert }}
          values={
            Object.assign({},
              ((this.props.value.default.length > 0) ? { warn_def: this.props.value.warn_def } : null)
            )
          }
          errors={{
            warn_def: this.props.translation.warnings.warn_def
          }}
          translation={{ title: this.props.translation.warnings.title, alert: this.props.translation.warnings.alert }}
          onChange={this.onChangeError}
        />
      </Fragment>
    </div>);
  }
}


InputInteger.propTypes = {
  /* properties */
  value: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    value: function (props, propName, componentName) {
      if (props[propName] !== undefined) {
        if (!intValid(String(props[propName]))) {
          return new Error(
            'Invalid prop `' + propName + '` supplied to `' + componentName + '`. Value must be integer.'
          );
        }
        else {
          if (props["min"] !== undefined && intValid(String(props["min"])) && props["min"] > props[propName]) {
            return new Error(
              'Invalid prop `' + propName + '` supplied to `' + componentName + '`. Value must be higher than value of min.'
            );
          }

          if (props["max"] !== undefined && intValid(String(props["max"])) && props["max"] < props[propName]) {
            return new Error(
              'Invalid prop `' + propName + '` supplied to `' + componentName + '`. Value must be lower than value of max.'
            );
          }
        }
      }
    },
    min: function (props, propName, componentName) {
      if (props[propName] !== undefined && !intValid(String(props[propName]))) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to `' + componentName + '`. Value must be integer.'
        );
      }

      if (props["max"] !== undefined && intValid(String(props["max"])) && props["max"] < props[propName]) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to `' + componentName + '`. Value must be lower than value of max.'
        );
      }
    },
    max: function (props, propName, componentName) {
      if (props[propName] !== undefined && !intValid(String(props[propName]))) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to `' + componentName + '`. Value must be integer.'
        );
      }

      if (props["min"] !== undefined && intValid(String(props["min"])) && props["min"] < props[propName]) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to `' + componentName + '`. Value must be higher than value of min.'
        );
      }
    },
    default: function (props, propName, componentName) {
      if (props[propName] !== undefined) {
        if (!intValid(String(props[propName]))) {
          return new Error(
            'Invalid prop `' + propName + '` supplied to `' + componentName + '`. Value must be integer.'
          );
        }
        else {
          if (props["min"] !== undefined && intValid(String(props["min"])) && props["min"] > props[propName]) {
            return new Error(
              'Invalid prop `' + propName + '` supplied to `' + componentName + '`. Value must be higher than value of min.'
            );
          }

          if (props["max"] !== undefined && intValid(String(props["max"])) && props["max"] < props[propName]) {
            return new Error(
              'Invalid prop `' + propName + '` supplied to `' + componentName + '`. Value must be lower than value of max.'
            );
          }
        }
      }
    },
    err_min: PropTypes.string,
    err_max: PropTypes.string,
    err_req: PropTypes.string,
    err_type: PropTypes.string,
    err_inf: PropTypes.string,
    warn_def: PropTypes.string,
    placeholder: PropTypes.string,
    tip: PropTypes.string
  }),

  translation: PropTypes.shape(IntegerTranslationPropType),

  /* functions */
  onChange: PropTypes.func,
  isValid: PropTypes.func,
  invalid: PropTypes.bool,

  /* icons */
  icons: PropTypes.shape({
    icon: PropTypes.any.isRequired,
    invalid_icon: PropTypes.any.isRequired,
    errors: PropTypes.any.isRequired,
    errorsAlert: PropTypes.any.isRequired,
    warnings: PropTypes.any.isRequired,
    warningsAlert: PropTypes.any.isRequired
  }),

  /* aditional */
  jkey: PropTypes.shape(keyPropType),
  size: PropTypes.string
};

InputInteger.defaultProps = {
  className: "",
  translation: Default_IntTranslation,
  invalid: true,
  icons: {
    icon: icon,
    invalid_icon: invalid_icon,
    errors: errorsIcon,
    errorsAlert: errorsAlertIcon,
    warnings: warningsIcon,
    warningsAlert: warningsAlertIcon
  },
  jkey: Default_keyPropType,
  size: "sm"
}

const isNTLastDot = function (value) {
  var s = String(value);
  return s[s.length - 1] !== '.';
}

export const clean = function (e) {
  var fValue = filterInt(e.value);
  var fDefault = filterInt(e.default);
  var fMin = filterInt(e.min);
  var fMax = filterInt(e.max);
  var doMax = fMax && (fMin <= fMax || !fMin) && isNTLastDot(e.max);
  var doMin = (fMin && (fMin <= fMax || !fMax) && isNTLastDot(e.min));

  return Object.assign({},
    { uid: e.uid },
    (e.name.length > 0) ? { name: e.name } : null,
    (e.required) ? { required: e.required } : null,
    (fValue && (fValue <= fMax || !fMax) && (fValue >= fMin || !fMin) && isNTLastDot(e.value)) ? { value: +e.value } : null,
    (fDefault && (fDefault <= fMax || !fMax) && (fDefault >= fMin || !fMin) && isNTLastDot(e.default) && e.required) ? { default: +e.default } : null,
    (doMin) ? { min: +e.min } : null,
    (doMax) ? { max: +e.max } : null,
    (e.err_min.length > 0 && doMin) ? { err_min: e.err_min } : null,
    (e.err_max.length > 0 && doMax) ? { err_max: e.err_max } : null,
    (e.err_req.length > 0) ? { err_req: e.err_req } : null,
    (e.err_type.length > 0) ? { err_type: e.err_type } : null,
    (e.err_inf.length > 0) ? { err_inf: e.err_inf } : null,
    (e.warn_def.length > 0 && fDefault && (fDefault <= fMax || !fMax) && (fDefault >= fMin || !fMin) && isNTLastDot(e.default) && e.required) ? { warn_def: e.warn_def } : null,
    (e.placeholder.length > 0) ? { placeholder: e.placeholder } : null,
    (e.tip.length > 0) ? { tip: e.tip } : null,
    { type: "int" }
  )
}

export const valid = function (e) {
  var valid = (e.uid.length > 0);

  var fmax = filterInt(e.max);
  var fmin = filterInt(e.min);

  valid = valid && ((e.max.length === 0) || (!isNaN(fmax) && isFinite(fmax))) && ((e.min.length === 0) || (!isNaN(fmin) && isFinite(fmin)));

  if (e.max.length > 0 && e.min.length > 0) {
    valid = valid && (fmin <= fmax);
  }

  if (e.min.length > 0) {
    valid = valid && (e.default.length === 0 || e.default.length >= fmin || !e.required) && (e.value.length === 0 || (e.value.length >= fmin));
  }

  if (e.max.length > 0) {
    valid = valid && (e.default.length === 0 || e.default.length <= fmax || !e.required) && (e.value.length === 0 || e.value.length <= fmax);
  }

  return valid;
}

export const prototype = function () {
  return {
    uid: "",
    name: "",
    required: false,
    value: "",
    default: "",
    min: "",
    max: "",
    err_min: "",
    err_max: "",
    err_req: "",
    err_type: "",
    err_inf: "",
    warn_def: "",
    placeholder: "",
    tip: "",
    type: "int"
  }
}

export const rebuild = function (e) {
  return {
    uid: (e.uid !== undefined && e.uid !== null) ? String(e.uid) : "",
    name: (e.name !== undefined && e.name !== null) ? String(e.name) : "",
    required: (e.required !== undefined && e.required !== null) ? Boolean(e.required) : false,
    value: (e.value !== undefined && e.value !== null) ? String(e.value) : "",
    default: (e.default !== undefined && e.default !== null) ? String(e.default) : "",
    min: (e.min !== undefined && e.min !== null) ? e.min : "",
    max: (e.max !== undefined && e.max !== null) ? e.max : "",
    err_min: (e.err_min !== undefined && e.err_min !== null) ? String(e.err_min) : "",
    err_max: (e.err_max !== undefined && e.err_max !== null) ? String(e.err_max) : "",
    err_req: (e.err_req !== undefined && e.err_req !== null) ? String(e.err_req) : "",
    err_type: (e.err_type !== undefined && e.err_type !== null) ? String(e.err_type) : "",
    err_inf: (e.err_inf !== undefined && e.err_inf !== null) ? String(e.err_inf) : "",
    warn_def: (e.warn_def !== undefined && e.warn_def !== null) ? String(e.warn_def) : "",
    placeholder: (e.placeholder !== undefined && e.placeholder !== null) ? String(e.placeholder) : "",
    tip: (e.tip !== undefined && e.tip !== null) ? String(e.tip) : "",
    type: "int"
  }
}