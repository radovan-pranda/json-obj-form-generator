import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CardTitle, Col, FormGroup, CardBody, Input, Label, Button, Collapse, FormFeedback } from 'reactstrap';
import { StringTranslationPropType, Default_StringTranslation, Default_keyPropType, keyPropType } from './propTypes';
import { idGenerator } from './utils';
import { filterInt, intValid } from './validators';
import { string as icon, invalid_string as invalid_icon, warnings as warningsIcon, warningAlert as warningsAlertIcon, error as errorsIcon, errorAlert as errorsAlertIcon } from './icons';
import ErrorContainer from './ErrorContainer';

export class InputString extends Component {
  state = {
    isOpenMain: true,
    gId: idGenerator(this.props.jkey.prefix + "s" + this.props.jkey.sufix),
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

  render() {
    var invalid = !valid(this.props.value);

    /* ------ validation ------ */
    var fmax = filterInt(this.props.value.maxLength);
    var fmin = filterInt(this.props.value.minLength);
    var maxValid = (this.props.value.maxLength.length === 0) || (!isNaN(fmax) && isFinite(fmax));
    var minValid = (this.props.value.minLength.length === 0) || (!isNaN(fmin) && isFinite(fmin));
    var rangeValid = true;

    if ((this.props.value.maxLength.length > 0 && this.props.value.minLength.length > 0) && maxValid && minValid) {
      rangeValid = maxValid && minValid && (fmin <= fmax);
    }

    /* ---- validation end ---- */
    var err_max = (fmax > 0 && maxValid && rangeValid);
    var err_min = (fmin >= 0 && minValid && rangeValid);

    var default_section = <Col sm={6} />;

    if (this.props.value.required) {
      default_section = (<Col sm={6}>
        <FormGroup row>
          <Label sm={1} size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.default}</Label>
          <Col className="jofgen-D-input-col">
            <Input
              name="default"
              type={(this.props.value.is_password) ? "password" : "text"}
              value={this.props.value.default} onChange={this.onChange}
              minLength={(this.props.value.minLength > 0) ? this.props.value.minLength : 0}
              maxLength={(this.props.value.maxLength > 0) ? this.props.value.maxLength : undefined}
              invalid={(this.props.value.default.length < fmin || this.props.value.default.length > fmax) && this.props.value.default.length > 0}
              bsSize={this.props.size}
            />
            {(this.props.value.default.length < fmin) ? <FormFeedback valid={false} >{this.props.translation.messages.shortLength}</FormFeedback> : null}
            {(this.props.value.default.length > fmax) ? <FormFeedback valid={false} >{this.props.translation.messages.longLength}</FormFeedback> : null}
          </Col>
        </FormGroup>
      </Col>);
    }

    return (<div className={this.props.className + " jofgen-D-card jofgen-D-string" + ((this.props.value.required) ? " required" : "") + ((invalid || this.props.invalid) ? " invalid" : "")} style={this.props.style} >
      <CardBody className={"jofgen-D-card-body"}>
        <CardTitle>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td className="jofgen-D-children" >
                  {(invalid) ? this.props.icons.invalid_icon : this.props.icons.icon}
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
              <Label sm={2} size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.uid}</Label>
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
              <br />
              <Label size={this.props.size} check>
                <Input
                  name="is_password"
                  type="checkbox"
                  checked={this.props.value.is_password} onChange={this.onChangeBool}
                />
                {" " + this.props.translation.is_password}
              </Label>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup row>
              <Label sm={1} size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.name}</Label>
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
                  bsSize={this.props.size} />
              </Col>
            </FormGroup>
          </Col>
        </FormGroup>
        <Collapse isOpen={this.state.isOpenMain} >
          <FormGroup row>
            <Col sm={6}>
              <FormGroup row>
                <Label sm={1} size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.value}</Label>
                <Col className="jofgen-D-input-col">
                  <Input
                    name="value"
                    type={(this.props.value.is_password) ? "password" : "text"}
                    value={this.props.value.value} onChange={this.onChange}
                    minLength={(this.props.value.minLength > 0) ? this.props.value.minLength : 0}
                    maxLength={(this.props.value.maxLength > 0) ? this.props.value.maxLength : undefined}
                    invalid={(this.props.value.value.length < fmin || this.props.value.value.length > fmax) && this.props.value.value.length > 0}
                    bsSize={this.props.size}
                  />
                  {(this.props.value.value.length < fmin) ? <FormFeedback valid={false} >{this.props.translation.messages.shortLength}</FormFeedback> : null}
                  {(this.props.value.value.length > fmax) ? <FormFeedback valid={false} >{this.props.translation.messages.longLength}</FormFeedback> : null}
                </Col>
              </FormGroup>
            </Col>
            {default_section}
            <Col sm={6}>
              <FormGroup row>
                <Label sm={1} size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.minLength}</Label>
                <Col className="jofgen-D-input-col">
                  <Input
                    name="minLength"
                    type="number" step="1"
                    value={this.props.value.minLength} onChange={this.onChange}
                    min="0"
                    max={(this.props.value.maxLength.length > 0) ? this.props.value.maxLength : undefined}
                    invalid={!minValid || !rangeValid || fmin < 0}
                    bsSize={this.props.size}
                  />
                  {(!rangeValid) ? <FormFeedback valid={false} >{this.props.translation.messages.minLength}</FormFeedback> : null}
                  {(fmin < 0) ? <FormFeedback valid={false} >{this.props.translation.messages.zeroLength}</FormFeedback> : null}
                </Col>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup row>
                <Label sm={1} size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.maxLength}</Label>
                <Col className="jofgen-D-input-col">
                  <Input
                    name="maxLength"
                    type="number" step="1"
                    value={this.props.value.maxLength} onChange={this.onChange}
                    min={(this.props.value.minLength.length > 0) ? this.props.value.minLength : "0"}
                    invalid={!maxValid || !rangeValid || fmax < 0}
                    bsSize={this.props.size}
                  />
                  {(!rangeValid) ? <FormFeedback valid={false} >{this.props.translation.messages.maxLength}</FormFeedback> : null}
                  {(fmax < 0) ? <FormFeedback valid={false} >{this.props.translation.messages.zeroLength}</FormFeedback> : null}
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>
        </Collapse>
      </CardBody>
      <Fragment>
        <ErrorContainer
          size={this.props.size}
          jkey={{ prefix: this.state.gId + "-", sufix: "" }}
          icons={{ icon: this.props.icons.errors, invalid_icon: this.props.icons.errorsAlert }}
          values={
            Object.assign({},
              ((this.props.valuerequired) ? { err_req: this.props.valueerr_req } : null),
              ((err_min) ? { err_minlength: this.props.value.err_minlength } : null),
              ((err_max) ? { err_maxlength: this.props.value.err_maxlength } : null)
            )
          }
          errors={{
            err_req: this.props.translation.errors.err_req,
            err_minlength: this.props.translation.errors.err_minlength,
            err_maxlength: this.props.translation.errors.err_maxlength
          }}
          translation={{ title: this.props.translation.errors.title, alert: this.props.translation.errors.alert }}
          onChange={this.onChangeError}
        />
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

InputString.propTypes = {
  /* properties */
  value: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    is_password: PropTypes.bool,
    value: PropTypes.string,
    default: PropTypes.string,
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
    err_req: PropTypes.string,
    err_minlength: PropTypes.string,
    err_maxlength: PropTypes.string,
    warn_def: PropTypes.string,
    placeholder: PropTypes.string,
    tip: PropTypes.string
  }),

  translation: PropTypes.shape(StringTranslationPropType),

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
}

InputString.defaultProps = {
  className: "",
  translation: Default_StringTranslation,
  invalid: false,
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

export const clean = function (e) {
  var minL = filterInt(e.minLength);
  var maxL = filterInt(e.maxLength);
  var valValid = e.value.length > 0 && (maxL >= e.value.length || isNaN(maxL)) && (minL <= e.value.length || isNaN(minL));
  var defValid = e.default.length > 0 && (maxL >= e.default.length || isNaN(maxL)) && (minL <= e.default.length || isNaN(minL));
  var minValid = !isNaN(minL) && e.minLength.length > 0 && (maxL >= minL || isNaN(maxL)) && minL >= 0;
  var maxValid = !isNaN(maxL) && e.maxLength.length > 0 && (maxL >= minL || isNaN(minL)) && maxL >= 0;

  return Object.assign({},
    { uid: e.uid },
    (e.name.length > 0) ? { name: e.name } : null,
    (e.required) ? { required: e.required } : null,
    (e.is_password) ? { is_password: e.is_password } : null,
    (valValid) ? { value: e.value } : null,
    (defValid && e.required) ? { default: e.default } : null,
    (minValid) ? { minLength: minL } : null,
    (maxValid) ? { maxLength: maxL } : null,
    (e.err_req.length > 0 && e.required) ? { err_req: e.err_req } : null,
    (e.err_minlength.length > 0 && minValid) ? { err_minlength: e.err_minlength } : null,
    (e.err_maxlength.length > 0 && maxValid) ? { err_maxlength: e.err_maxlength } : null,
    (e.warn_def.length > 0 && defValid && e.required) ? { warn_def: e.warn_def } : null,
    (e.placeholder.length > 0) ? { placeholder: e.placeholder } : null,
    (e.tip.length > 0) ? { tip: e.tip } : null,
    { type: "str" }
  )
}

export const valid = function (e) {
  var valid = (e.uid.length > 0);

  var fmax = filterInt(e.maxLength);
  var fmin = filterInt(e.minLength);

  valid = valid && ((e.maxLength.length === 0) || (!isNaN(fmax) && isFinite(fmax))) && ((e.minLength.length === 0) || (!isNaN(fmin) && isFinite(fmin)));

  if (e.maxLength.length > 0 && e.minLength.length > 0) {
    valid = valid && (fmin <= fmax);
  }

  if (e.minLength.length > 0) {
    valid = valid && (e.default.length === 0 || e.default.length >= fmin || !e.required) && (e.value.length === 0 || (e.value.length >= fmin));
  }

  if (e.maxLength.length > 0) {
    valid = valid && (e.default.length === 0 || (e.default.length <= fmax) || !e.required) && (e.value.length === 0 || (e.value.length <= fmax));
  }

  return valid;
}

export const prototype = function () {
  return {
    uid: "",
    name: "",
    required: false,
    is_password: false,
    value: "",
    default: "",
    minLength: "",
    maxLength: "",
    err_req: "",
    err_minlength: "",
    err_maxlength: "",
    warn_def: "",
    placeholder: "",
    tip: "",
    type: "str"
  }
}

export const rebuild = function (e) {
  return {
    uid: (e.uid !== undefined && e.uid !== null) ? String(e.uid) : "",
    name: (e.name !== undefined && e.name !== null) ? String(e.name) : "",
    required: (e.required !== undefined && e.required !== null) ? Boolean(e.required) : false,
    is_password: (e.is_password !== undefined && e.is_password !== null) ? Boolean(e.is_password) : false,
    value: (e.value !== undefined && e.value !== null) ? String(e.value) : "",
    default: (e.default !== undefined && e.default !== null) ? String(e.default) : "",
    minLength: (e.minLength !== undefined && e.minLength !== null) ? e.minLength : "",
    maxLength: (e.maxLength !== undefined && e.maxLength !== null) ? e.maxLength : "",
    err_minlength: (e.err_minlength !== undefined && e.err_minlength !== null) ? String(e.err_minlength) : "",
    err_maxlength: (e.err_maxlength !== undefined && e.err_maxlength !== null) ? String(e.err_maxlength) : "",
    err_req: (e.err_req !== undefined && e.err_req !== null) ? String(e.err_req) : "",
    warn_def: (e.warn_def !== undefined && e.warn_def !== null) ? String(e.warn_def) : "",
    placeholder: (e.placeholder !== undefined && e.placeholder !== null) ? String(e.placeholder) : "",
    tip: (e.tip !== undefined && e.tip !== null) ? String(e.tip) : "",
    type: "str"
  }
}