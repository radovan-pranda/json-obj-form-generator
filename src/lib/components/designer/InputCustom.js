import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Popover, PopoverBody, CustomInput, Input, Col, FormGroup, Label, CardTitle, CardBody, Button, Collapse, FormFeedback, FormText } from 'reactstrap';
import { Default_CustomTranslation, CustomTranslationPropType, Default_keyPropType, keyPropType } from './propTypes';
import { idGenerator } from './utils';
import { custom as icon, invalid_custom as invalid_icon, warnings as warningsIcon, warningAlert as warningsAlertIcon, error as errorsIcon, errorAlert as errorsAlertIcon } from './icons';
import ErrorContainer from './ErrorContainer';

export class InputCustom extends Component {
  state = {
    isOpenMain: true,
    gId: idGenerator(this.props.jkey.prefix + "regx" + this.props.jkey.sufix)
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

  renderErrors(value, regex, midfix) {
    let errors = [];
    if (value !== undefined && value.length > 0) {
      try {
        if (regex.length > 0 && !(new RegExp(regex).test(value))) {
          errors = [...errors, <FormFeedback key={this.props.gId + "-" + midfix + "-cb-T"} valid={false} >{this.props.translation.messages["type"]}</FormFeedback>];
        }
      }
      catch
      {
        errors = [...errors, <FormFeedback key={this.props.gId + "-" + midfix + "-cb-T"} valid={false} >{this.props.translation.messages["rgxv"]}</FormFeedback>];
      }
    }

    return errors;
  }

  render() {
    var invalid = !valid(this.props.value);
    var renderErrDefault = (this.props.value.default.length > 0) ? this.renderErrors(this.props.value.default, this.props.value.regex, "d") : [];
    var renderErrValue = (this.props.value.value.length > 0) ? this.renderErrors(this.props.value.value, this.props.value.regex, "v") : [];
    var renderErrRegex = [];

    try {
      var rgx = new RegExp(this.props.value.regex);
    }
    catch
    {
      renderErrRegex = [...renderErrRegex, <FormFeedback key={this.props.gId + "-RT-cb-RGX"} valid={false} >{this.props.translation.messages["rgx"]}</FormFeedback>];
    }


    var default_section;

    if (this.props.value.required) {
      default_section = (<Col sm={6}>
        <FormGroup row>
          <Label size={this.props.size} sm={2} className="jofgen-D-inputLabel" >{this.props.translation.default}</Label>
          <Col className="jofgen-D-input-col">
            <Input
              name="default"
              type="text"
              value={this.props.value.default} onChange={this.onChange}
              invalid={renderErrDefault.length > 0}
              bsSize={this.props.size}
            />
            {renderErrDefault}
          </Col>
        </FormGroup>
      </Col>);
    }

    return (<div className={this.props.className + " jofgen-D-card jofgen-D-regx" + ((this.props.value.required) ? " required" : "") + ((invalid || this.props.invalid) ? " invalid" : "")} style={this.props.style} >
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
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup row className="jofgen-D-form-group">
              <Col sm={2} className="jofgen-D-inputLabel jofgen-D-inputLabelWithpopUp" >
                <Label className="jofgen-D-col-form-label-sm" size={this.props.size} >
                  {this.props.translations.width}
                </Label>
                {
                  (["1","2","3","4","5"].includes(this.props.value.sm))
                    ? (
                      <Fragment>
                        <span id={this.state.gId + "popup"} style={{ float: "right" }} onMouseOver={() => { this.setState({ alertShow: true }) }} onMouseOut={() => { this.setState({ alertShow: false }) }} >
                          {this.props.icons_set.alert}
                        </span>
                        <Popover target={this.state.gId + "popup"} isOpen={this.state.alertShow}>
                          <PopoverBody>
                            {this.props.translations.smallWidthAlert}
                          </PopoverBody>
                        </Popover>
                      </Fragment>
                    )
                    : null
                }
              </Col>
              <Col className="jofgen-D-input-col">
                <CustomInput
                  name="sm"
                  type="select"
                  value={this.props.value.sm} onChange={this.onChange}
                  id={this.state.gId + "dropdown"}
                  bsSize={this.props.size}
                >
                  <option value={1}>1 (12 {this.props.translations.columns})</option>
                  <option value={2}>2 (6 {this.props.translations.columns})</option>
                  <option value={3}>3 (4 {this.props.translations.columns})</option>
                  <option value={4}>4 (3 {this.props.translations.columns})</option>
                  <option value={5}>5</option>
                  <option value={6}>6 (2 {this.props.translations.columns})</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                  <option value={12}>12 (1 {this.props.translations.columns})</option>
                </CustomInput>
              </Col>
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
                    invalid={renderErrValue.length > 0}
                    bsSize={this.props.size}
                  />
                  {renderErrValue}
                </Col>
              </FormGroup>
            </Col>
            {default_section}
            <Col sm={(this.props.value.required) ? 12 : 6}>
              <FormGroup row>
                <Label size={this.props.size} sm={1} className="jofgen-D-inputLabel" >
                  {this.props.translation.regex}
                </Label>
                <Col className="jofgen-D-input-col">
                  <Input
                    name="regex"
                    type="text"
                    value={this.props.value.regex} onChange={this.onChange}
                    invalid={renderErrRegex.length > 0}
                    bsSize={this.props.size}
                  />
                  {renderErrRegex}
                  {(this.props.value.regex.length === 0) ? <FormText color="info" >{this.props.translation.messages["norgx"]}</FormText> : <></>}
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>
        </Collapse>
      </CardBody>
      <Fragment>
        <ErrorContainer
          jkey={{ prefix: this.state.gId + "-err", sufix: "" }}
          size={this.props.size}
          values={
            Object.assign({},
              ((this.props.value.required) ? { err_req: this.props.value.err_req } : null),
              ((this.props.value.regex.length > 0 && renderErrRegex.length === 0) ? { err_type: this.props.value.err_type } : null)
            )
          }

          errors={{
            err_req: this.props.translation.errors.err_req,
            err_type: this.props.translation.errors.err_type
          }}
          translation={{ title: this.props.translation.errors.title, alert: this.props.translation.errors.alert }}
          onChange={this.onChangeError} />
      </Fragment>
      <Fragment>
        <ErrorContainer
          className="jofgen-D-warning"
          size={this.props.size}
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
    </div>
    );
  }
}

InputCustom.propTypes = {
  /* properties */
  value: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    is_password: PropTypes.bool,
    value: function (props, propName, componentName) {
      if (props[propName] !== undefined && props["regex"] !== undefined) {
        try {
          var rgx = new RegExp(props[propName]);
          if (!rgx.test(props[propName])) {
            return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\` - invalid value type.`);
          }
        }
        catch
        {
          return new Error(`Invalid prop \`regex\` - unable to validate value of prop \`${propName}\` supplied to \`${componentName}\`.`);
        }
      }
    },
    default: function (props, propName, componentName) {
      if (props[propName] !== undefined && props["regex"] !== undefined) {
        try {
          var rgx = new RegExp(props[propName]);
          if (!rgx.test(props[propName])) {
            return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\` - invalid value type.`);
          }
        }
        catch
        {
          return new Error(`Invalid prop \`regex\` - unable to validate value of prop \`${propName}\` supplied to \`${componentName}\`.`);
        }
      }
    },
    regex: function (props, propName, componentName) {
      if (props[propName] !== undefined) {
        try {
          new RegExp(props[propName]);
        }
        catch
        {
          return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Invalid regular expression.`);
        }
      }
    },
    err_req: PropTypes.string,
    err_type: PropTypes.string,
    warn_def: PropTypes.string,
    placeholder: PropTypes.string,
    tip: PropTypes.string,
    sm: PropTypes.oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"])
  }),

  translation: PropTypes.shape(CustomTranslationPropType),

  /* functions */
  onChange: PropTypes.func,
  isValid: PropTypes.func,
  invalid: PropTypes.bool,

  /* icons */
  icons: PropTypes.shape({
    icon: PropTypes.any.isRequired,
    invalid_icon: PropTypes.any.isRequired,
    errors: PropTypes.any.isRequired,
    errorsAlert: PropTypes.any.isRequired
  }),

  /* aditional */
  jkey: PropTypes.shape(keyPropType),
  size: PropTypes.string
};

InputCustom.defaultProps = {
  className: "",
  translation: Default_CustomTranslation,
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
  var rgx = true;
  var rgxV = true;
  var rgxD = true;
  try {
    var rg = new RegExp(e.regex);
    rgxV = rg.test(e.value);
    rgxD = rg.test(e.default);
  }
  catch
  {
    rgx = false;
    rgxV = false;
    rgxD = false;
  }

  var defValid = e.default.length > 0;

  return Object.assign({},
    { uid: e.uid },
    (e.name.length > 0) ? { name: e.name } : null,
    (e.required) ? { required: e.required } : null,
    (e.is_password) ? { is_password: e.is_password } : null,
    (e.value.length > 0 && rgxV) ? { value: e.value } : null,
    (defValid && rgxD && e.required) ? { default: e.default } : null,
    (rgx) ? { regex: e.regex } : null,
    (e.err_req.length > 0 && e.required) ? { err_req: e.err_req } : null,
    (e.err_type.length > 0) ? { err_type: e.err_type } : null,
    (e.warn_def.length > 0 && defValid && rgxD && e.required) ? { warn_def: e.warn_def } : null,
    (e.placeholder.length > 0) ? { placeholder: e.placeholder } : null,
    (e.tip.length > 0) ? { tip: e.tip } : null,
    { type: "rgx" },
    (e.sm !== undefined && e.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"].includes(e.sm)) ? { sm: e.sm } : null
  )
}

export const valid = function (e) {
  var valid = (e.uid.length > 0);

  try {
    var rgx = new RegExp(e.regex);

    valid = valid &&
      (e.default.length === 0 || rgx.test(e.default) || !e.required) &&
      (e.value.length === 0 || rgx.test(e.value));
  }
  catch
  {
    valid = false;
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
    regex: "",
    err_req: "",
    err_type: "",
    warn_def: "",
    placeholder: "",
    tip: "",
    type: "rgx",
    sm: "12"
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
    regex: (e.regex !== undefined && e.regex !== null) ? String(e.regex) : "",
    err_req: (e.err_req !== undefined && e.err_req !== null) ? String(e.err_req) : "",
    err_type: (e.err_type !== undefined && e.err_type !== null) ? String(e.err_type) : "",
    warn_def: (e.warn_def !== undefined && e.warn_def !== null) ? String(e.warn_def) : "",
    placeholder: (e.placeholder !== undefined && e.placeholder !== null) ? String(e.placeholder) : "",
    tip: (e.tip !== undefined && e.tip !== null) ? String(e.tip) : "",
    type: "rgx",
    sm: (e.sm !== undefined && e.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(e.sm)) ? String(e.sm) : "12"
  }
}