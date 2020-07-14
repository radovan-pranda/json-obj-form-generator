import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CardTitle, Col, FormGroup, CardBody, Input, Label, Button, Collapse, FormFeedback } from 'reactstrap';
import { ListStringTranslationPropType as translationProp, Default_ListStringTranslation as default_translationProp, Default_keyPropType, keyPropType } from './propTypes';
import { idGenerator } from './utils';
import { filterInt, intValid } from './validators';
import { inputlist as icon, invalid_inputlist as invalid_icon, warnings as warningsIcon, warningAlert as warningsAlertIcon, error as errorsIcon, errorAlert as errorsAlertIcon } from './icons';
import ErrorContainer from './ErrorContainer';
import { ListString } from './subcomponents';
import { prototype as ListString_prototype, validGetArrays, rebuild as list_rebuild } from './subcomponents/ListString';

export class InputListString extends Component {
  state = {
    isOpenMain: true,
    invalid: true,
    errPopUp: false,
    uidErrorShow: false,
    gId: idGenerator(this.props.jkey.prefix + "il-str" + this.props.jkey.sufix)
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

    if (["minLength", "maxLength", "minNo", "maxNo"].includes(e.target.name)) {
      props.value = validGetArrays(props.value, props);
      props.default = validGetArrays(props.default, props);
    }

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

  onChangeList = function (key, value) {
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
    var mnL = intValid(this.props.value.minLength);
    var mxL = intValid(this.props.value.maxLength);
    var maxValid = (this.props.value.maxLength.length === 0) || mxL;
    var minValid = (this.props.value.minLength.length === 0) || mnL;
    var rangeValid = true;
    if (mnL && mxL) {
      rangeValid = maxValid && minValid && (fmin <= fmax);
    }

    var err_max = (fmax > 0 && maxValid && rangeValid);
    var err_min = (fmin >= 0 && minValid && rangeValid);


    var fmaxNo = filterInt(this.props.value.maxNo);
    var fminNo = filterInt(this.props.value.minNo);
    var mnN = intValid(this.props.value.minNo);
    var mxN = intValid(this.props.value.maxNo);
    var maxNoValid = (this.props.value.maxNo.length === 0) || (!isNaN(fmaxNo) && isFinite(fmaxNo));
    var minNoValid = (this.props.value.minNo.length === 0) || (!isNaN(fminNo) && isFinite(fminNo));
    var rangeNoValid = true;

    if (mnN && mxN) {
      rangeNoValid = maxNoValid && minNoValid && (fminNo <= fmaxNo);
    }

    var err_maxNo = (fmaxNo > 0 && maxNoValid && rangeNoValid);
    var err_minNo = (fminNo >= 0 && minNoValid && rangeNoValid);

    var default_section = <Col sm={6} />;

    if (this.props.value.required) {
      default_section = (
        <Col sm={6}>
          <FormGroup row>
            <Label sm={1} size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.default}</Label>
            <Col className="jofgen-D-input-col">
              <ListString
                uid="default"
                value={this.props.value.default} onChange={this.onChangeList}
                minLength={(intValid(this.props.value.minLength) && rangeValid && fmin >= 0) ? filterInt(this.props.value.minLength) : undefined} maxLength={(intValid(this.props.value.maxLength) && rangeValid && fmax >= 0) ? filterInt(this.props.value.maxLength) : undefined}
                min={(intValid(this.props.value.minNo) && rangeNoValid && fminNo >= 0) ? filterInt(this.props.value.minNo) : undefined} max={(intValid(this.props.value.maxNo) && rangeNoValid && fmaxNo >= 0) ? filterInt(this.props.value.maxNo) : undefined}
                bsSize={this.props.size}
                err_minNo={this.props.translation.messages.v_minNo}
                err_maxNo={this.props.translation.messages.v_maxNo}
                err_maxlength={this.props.translation.messages.v_maxlength}
                err_minlength={this.props.translation.messages.v_minlength}
                none_enabled={true}
              />
            </Col>
          </FormGroup>
        </Col>
      );
    }

    return (<div className={this.props.className + " jofgen-D-card jofgen-D-string" + ((this.props.value.required) ? " required" : "") + ((invalid || this.props.invalid) ? " invalid" : "")} style={this.props.style} >
      <CardBody className={"jofgen-D-card-body"}>
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
              <Label sm={2} size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.uid}</Label>
              <Col className="jofgen-D-input-col">
                <Input
                  name="uid"
                  type="text"
                  value={this.props.value.uid} onChange={this.onChange}
                  invalid={!(this.props.value.uid.length > 0)}
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
                  <ListString
                    uid="value"
                    value={this.props.value.value} onChange={this.onChangeList}
                    minLength={(intValid(this.props.value.minLength) && rangeValid && fmin >= 0) ? filterInt(this.props.value.minLength) : undefined} maxLength={(intValid(this.props.value.maxLength) && rangeValid && fmax >= 0) ? filterInt(this.props.value.maxLength) : undefined}
                    min={(intValid(this.props.value.minNo) && rangeNoValid && fminNo >= 0) ? filterInt(this.props.value.minNo) : undefined} max={(intValid(this.props.value.maxNo) && rangeNoValid && fmaxNo >= 0) ? filterInt(this.props.value.maxNo) : undefined}
                    bsSize={this.props.size}
                    err_minNo={this.props.translation.messages.v_minNo}
                    err_maxNo={this.props.translation.messages.v_maxNo}
                    err_maxlength={this.props.translation.messages.v_maxlength}
                    err_minlength={this.props.translation.messages.v_minlength}
                    none_enabled={true}
                  />
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
                    type="text" step="1"
                    value={this.props.value.minLength} onChange={this.onChange}
                    min="0"
                    max={(this.props.value.maxLength.length > 0) ? this.props.value.maxLength : undefined}
                    invalid={!minValid || !rangeValid || fmin < 0}
                    bsSize={this.props.size}
                  />
                  {(!rangeValid) ? <FormFeedback valid={false} >{this.props.translation.messages.minLength}</FormFeedback> : null}
                  {(fmin < 0) ? <FormFeedback valid={false} >{this.props.translation.messages.zeroLength}</FormFeedback> : null}
                  {(isNaN(fmin)) ? <FormFeedback valid={false} >{this.props.translation.messages.type}</FormFeedback> : null}
                </Col>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup row>
                <Label sm={1} size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.maxLength}</Label>
                <Col className="jofgen-D-input-col">
                  <Input
                    name="maxLength"
                    type="text" step="1"
                    value={this.props.value.maxLength} onChange={this.onChange}
                    min={(this.props.value.minLength.length > 0) ? this.props.value.minLength : 0}
                    invalid={!maxValid || !rangeValid || fmax < 0}
                    bsSize={this.props.size}
                  />
                  {(!rangeValid) ? <FormFeedback valid={false} >{this.props.translation.messages.maxLength}</FormFeedback> : null}
                  {(fmax < 0) ? <FormFeedback valid={false} >{this.props.translation.messages.zeroLength}</FormFeedback> : null}
                  {(isNaN(fmax)) ? <FormFeedback valid={false} >{this.props.translation.messages.type}</FormFeedback> : null}
                </Col>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup row>
                <Label sm={1} size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.minNo}</Label>
                <Col className="jofgen-D-input-col">
                  <Input
                    name="minNo"
                    type="text" step="1"
                    value={this.props.value.minNo} onChange={this.onChange}
                    min="0"
                    max={(this.props.value.maxNo.length > 0) ? this.props.value.maxNo : undefined}
                    invalid={!minNoValid || !rangeNoValid || fminNo < 0}
                    bsSize={this.props.size}
                  />
                  {(!rangeNoValid) ? <FormFeedback valid={false} >{this.props.translation.messages.minNo}</FormFeedback> : null}
                  {(fminNo < 0) ? <FormFeedback valid={false} >{this.props.translation.messages.zeroNo}</FormFeedback> : null}
                  {(isNaN(fminNo)) ? <FormFeedback valid={false} >{this.props.translation.messages.type}</FormFeedback> : null}
                </Col>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup row>
                <Label sm={1} size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.maxNo}</Label>
                <Col className="jofgen-D-input-col">
                  <Input
                    name="maxNo"
                    type="text" step="1"
                    value={this.props.value.maxNo} onChange={this.onChange}
                    min={(this.props.value.minNo.length > 0) ? this.props.value.minNo : "0"}
                    invalid={!maxNoValid || !rangeNoValid || fmaxNo < 0}
                    bsSize={this.props.size}
                  />
                  {(!rangeNoValid) ? <FormFeedback valid={false} >{this.props.translation.messages.maxNo}</FormFeedback> : null}
                  {(fmaxNo < 0) ? <FormFeedback valid={false} >{this.props.translation.messages.zeroNo}</FormFeedback> : null}
                  {(isNaN(fmaxNo)) ? <FormFeedback valid={false} >{this.props.translation.messages.type}</FormFeedback> : null}
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>
        </Collapse>
      </CardBody>
      <Fragment>
        <ErrorContainer
          jkey={{ prefix: this.state.gId + "-", sufix: "" }}
          icons={{ icon: this.props.icons.errors, invalid_icon: this.props.icons.errorsAlert }}
          values={
            Object.assign({},
              ((this.props.value.required) ? { err_req: this.props.value.err_req } : null),
              ((err_min) ? { err_minlength: this.props.value.err_minlength } : null),
              ((err_max) ? { err_maxlength: this.props.value.err_maxlength } : null),
              ((err_minNo) ? { err_minNo: this.props.value.err_minNo } : null),
              ((err_maxNo) ? { err_maxNo: this.props.value.err_maxNo } : null)
            )
          }
          errors={{
            err_req: this.props.translation.errors.err_req,
            err_minlength: this.props.translation.errors.err_minlength,
            err_maxlength: this.props.translation.errors.err_maxlength,
            err_minNo: this.props.translation.errors.err_minNo,
            err_maxNo: this.props.translation.errors.err_maxNo
          }}
          translation={{ title: this.props.translation.errors.title, alert: this.props.translation.errors.alert }}
          onChange={this.onChangeError}
        />
      </Fragment>
      <Fragment>
        <ErrorContainer
          className="jofgen-D-warning"
          jkey={{ prefix: this.state.gId + "-", sufix: "warn" }}
          icons={{ icon: this.props.icons.warnings, invalid_icon: this.props.icons.warningsAlert }}
          values={
            Object.assign({},
              ((this.props.value.default.values.length > 0) ? { warn_def: this.props.value.warn_def } : null),
              { empty: this.props.value.empty }
            )
          }
          errors={{
            warn_def: this.props.translation.warnings.warn_def,
            empty: this.props.translation.warnings.empty
          }}
          translation={{ title: this.props.translation.warnings.title, alert: this.props.translation.warnings.alert }}
          onChange={this.onChangeError}
        />
      </Fragment>
    </div>);
  }
}

InputListString.propTypes = {
  /* properties */
  value: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.exact({
      new_value: PropTypes.string.isRequired,
      new_min: PropTypes.bool.isRequired,
      new_max: PropTypes.bool.isRequired,
      values: PropTypes.arrayOf(PropTypes.string).isRequired,
      emin: PropTypes.arrayOf(PropTypes.bool).isRequired,
      emax: PropTypes.arrayOf(PropTypes.bool).isRequired
    }),

    default: PropTypes.exact({
      new_value: PropTypes.string.isRequired,
      new_min: PropTypes.bool.isRequired,
      new_max: PropTypes.bool.isRequired,
      values: PropTypes.arrayOf(PropTypes.string).isRequired,
      emin: PropTypes.arrayOf(PropTypes.bool).isRequired,
      emax: PropTypes.arrayOf(PropTypes.bool).isRequired
    }),

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
    err_req: PropTypes.string,
    empty: PropTypes.string,
    err_minlength: PropTypes.string,
    err_maxlength: PropTypes.string,
    err_minNo: PropTypes.string,
    err_maxNo: PropTypes.string,
    warn_def: PropTypes.string,

    placeholder: PropTypes.string,
    tip: PropTypes.string
  }),

  translation: PropTypes.shape(translationProp),

  /* functions */
  onChange: PropTypes.func,
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

InputListString.defaultProps = {
  className: "",
  translation: default_translationProp,
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
  var validDefault = !e.default.emin.includes(false) && !e.default.emax.includes(false);
  var validValue = !e.value.emin.includes(false) && !e.value.emax.includes(false);

  var minL = filterInt(e.minLength);
  var maxL = filterInt(e.maxLength);
  var minNo = filterInt(e.minNo);
  var maxNo = filterInt(e.maxNo);

  var defLen = e.default.values.length > 0;
  var valLen = e.value.values.length > 0;

  var defValid = (defLen && ((maxNo >= e.default.values.length && maxValid) || (!maxValid && defLen)) && ((minNo <= e.default.values.length && minValid) || (!minValid && defLen)) && validDefault);
  var valValid = (valLen && ((maxNo >= e.value.values.length && maxValid) || (!maxValid && valLen)) && ((minNo <= e.value.values.length && minValid) || (!minValid && valLen)) && validValue);

  var minLValid = intValid(e.minLength) && (maxL >= minL || isNaN(maxL)) && minL >= 0;
  var maxLValid = intValid(e.maxLength) && (maxL >= minL || isNaN(minL)) && maxL >= 0;
  var minValid = intValid(e.minNo) && (maxNo >= minNo || isNaN(maxNo)) && minNo >= 0;
  var maxValid = intValid(e.maxNo) && (maxNo >= minNo || isNaN(minNo)) && maxNo >= 0;
  return Object.assign({},
    { uid: e.uid },
    (e.name.length > 0) ? { name: e.name } : null,
    (e.required) ? { required: e.required } : null,
    (valValid) ? { value: e.value.values } : null,
    (defValid && e.required) ? { default: e.default.values } : null,
    (minLValid) ? { minLength: minL } : null,
    (maxLValid) ? { maxLength: maxL } : null,
    (minValid) ? { minNo: minNo } : null,
    (maxValid) ? { maxNo: maxNo } : null,
    (e.err_req.length > 0 && e.required) ? { err_req: e.err_req } : null,
    (e.err_minlength.length > 0 && minLValid) ? { err_minlength: e.err_minlength } : null,
    (e.err_maxlength.length > 0 && maxLValid) ? { err_maxlength: e.err_maxlength } : null,
    (e.err_minNo.length > 0 && minValid) ? { err_minNo: e.err_minNo } : null,
    (e.err_maxNo.length > 0 && maxValid) ? { err_maxNo: e.err_maxNo } : null,
    (e.warn_def.length > 0 && defValid && e.required) ? { warn_def: e.warn_def } : null,
    (e.placeholder.length > 0) ? { placeholder: e.placeholder } : null,
    (e.tip.length > 0) ? { tip: e.tip } : null,
    (e.empty.length > 0) ? { empty: e.empty } : null,
    { type: "str_il" }
  )
}

export const valid = function (e) {
  var validDefault = !e.default.emin.includes(false) && !e.default.emax.includes(false);
  var validValue = !e.value.emin.includes(false) && !e.value.emax.includes(false);

  var fmin = filterInt(e.minNo);
  var fmax = filterInt(e.maxNo);
  var fminL = filterInt(e.minLength);
  var fmaxL = filterInt(e.maxLength);
  var vdl = e.default.values.length;
  var vvl = e.value.values.length;

  var vml = intValid(e.minLength);
  var vmxl = intValid(e.maxLength);

  var vm = intValid(e.minNo);
  var vmx = intValid(e.maxNo);

  return (e.uid.length > 0) &&
    (e.minLength.length === 0 || vml) &&
    (e.maxLength.length === 0 || vmxl) &&
    ((vml && vmxl && fminL <= fmaxL) || !vml || !vmxl) &&
    ((e.minNo.length === 0) || vm) &&
    ((e.maxNo.length === 0) || vmx) &&
    ((vm && vmx && fmin <= fmax) || !vm || !vmx) &&
    (((vdl <= fmax || !fmax) && validDefault && (vdl >= fmin || !fmin)) || vdl === 0 || !e.required) &&
    (((vvl <= fmax || !fmax) && validValue && (vvl >= fmin || !fmin)) || vvl === 0);
}

export const prototype = function () {
  return {
    uid: "",
    name: "",
    required: false,
    value: ListString_prototype(),
    default: ListString_prototype(),
    minLength: "",
    maxLength: "",
    minNo: "",
    maxNo: "",
    err_req: "",
    err_minlength: "",
    err_maxlength: "",
    err_minNo: "",
    err_maxNo: "",
    warn_def: "",
    placeholder: "",
    tip: "",
    empty: "",
    type: "str_il"
  }
}

export const rebuild = function (e) {
  return {
    uid: (e.uid !== undefined && e.uid !== null) ? String(e.uid) : "",
    name: (e.name !== undefined && e.name !== null) ? String(e.name) : "",
    required: (e.required !== undefined && e.required !== null) ? Boolean(e.required) : false,
    value: (e.value !== undefined && e.value !== null) ? list_rebuild(e.value, e) : ListString_prototype(),
    default: (e.default !== undefined && e.default !== null) ? list_rebuild(e.default, e) : ListString_prototype(),
    minLength: (e.minLength !== undefined && e.minLength !== null) ? e.minLength : "",
    maxLength: (e.maxLength !== undefined && e.maxLength !== null) ? e.maxLength : "",
    minNo: (e.minNo !== undefined && e.minNo !== null) ? e.minNo : "",
    maxNo: (e.maxNo !== undefined && e.maxNo !== null) ? e.maxNo : "",
    err_req: (e.err_req !== undefined && e.err_req !== null) ? String(e.err_req) : "",
    err_minlength: (e.err_minlength !== undefined && e.err_minlength !== null) ? String(e.err_minlength) : "",
    err_maxlength: (e.err_maxlength !== undefined && e.err_maxlength !== null) ? String(e.err_maxlength) : "",
    err_minNo: (e.err_minNo !== undefined && e.err_minNo !== null) ? String(e.err_minNo) : "",
    err_maxNo: (e.err_maxNo !== undefined && e.err_maxNo !== null) ? String(e.err_maxNo) : "",
    warn_def: (e.warn_def !== undefined && e.warn_def !== null) ? String(e.warn_def) : "",
    placeholder: (e.placeholder !== undefined && e.placeholder !== null) ? String(e.placeholder) : "",
    tip: (e.tip !== undefined && e.tip !== null) ? String(e.tip) : "",
    empty: (e.empty !== undefined && e.empty !== null) ? String(e.empty) : "",
    type: "str_il"
  }
}