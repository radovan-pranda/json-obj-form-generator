import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CardTitle, Col, FormGroup, CardBody, Input, Label, Button, Collapse, FormFeedback } from 'reactstrap';
import { BasicTypeTranslationPropType, Default_ColorTranslation, Default_keyPropType, keyPropType } from './propTypes';
import { idGenerator } from './utils';
import { isRGB } from './validators';
import { color as icon, invalid_color as invalid_icon, warnings as warningsIcon, warningAlert as warningsAlertIcon, error as errorsIcon, errorAlert as errorsAlertIcon } from './icons';
import ErrorContainer from './ErrorContainer';

export class InputColor extends Component {
  state = {
    isOpenMain: true,
    gId: idGenerator(this.props.jkey.prefix + "color" + this.props.jkey.sufix),
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
    var default_section;

    if (this.props.value.required) {
      default_section = (<Col sm={6}>
        <FormGroup row>
          <Label sm={1} size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.default}</Label>
          <Col className="jofgen-D-input-col">
            <Input
              name="default"
              type="text"
              value={this.props.value.default} onChange={this.onChange}
              invalid={this.props.value.default.length > 0 && !isRGB(this.props.value.default)}
              bsSize={this.props.size}
            />
            <Input
              name="default"
              type="color"
              value={this.props.value.default} onChange={this.onChange}
              invalid={this.props.value.default.length > 0 && !isRGB(this.props.value.default)}
              bsSize={this.props.size}
            />
            {(this.props.value.default.length > 0 && !isRGB(this.props.value.default)) ? <FormFeedback valid={false} >{this.props.translation.messages.type}</FormFeedback> : null}
          </Col>
        </FormGroup>
      </Col>);
    }

    return (<div className={this.props.className + " jofgen-D-card jofgen-D-color" + ((this.props.value.required) ? " required" : "") + ((invalid || this.props.invalid) ? " invalid" : "")} style={this.props.style} >
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
                    type="text"
                    value={this.props.value.value} onChange={this.onChange}
                    invalid={this.props.value.value.length > 0 && !isRGB(this.props.value.value)}
                    bsSize={this.props.size}
                  />
                  <Input
                    name="value"
                    type="color"
                    value={this.props.value.value} onChange={this.onChange}
                    invalid={this.props.value.value.length > 0 && !isRGB(this.props.value.value)}
                    bsSize={this.props.size}
                  />
                  {(this.props.value.value.length > 0 && !isRGB(this.props.value.value)) ? <FormFeedback valid={false} >{this.props.translation.messages.type}</FormFeedback> : null}
                </Col>
              </FormGroup>
            </Col>
            {default_section}
          </FormGroup>
        </Collapse>
      </CardBody>
      <Fragment>
        <ErrorContainer
          jkey={{ prefix: this.state.gId + "-", sufix: "" }}
          icons={{ icon: this.props.icons.errors, invalid_icon: this.props.icons.errorsAlert }}
          size={this.props.size}
          values={
            Object.assign({},
              ((this.props.value.required) ? { err_req: this.props.value.err_req } : null),
              { err_type: this.props.value.err_type }
            )
          }
          errors={{
            err_req: this.props.translation.errors.err_req,
            err_type: this.props.translation.errors.err_type
          }}
          translation={{ title: this.props.translation.errors.title, alert: this.props.translation.errors.alert }}
          onChange={this.onChangeError}
        />
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
    </div>);
  }
}

InputColor.propTypes = {
  /* properties */
  value: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    value: function (props, propName, componentName) {
      if (props[propName] !== undefined) {
        if (!isRGB(String(props[propName]))) {
          return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must have format #ffffff.');
        }
      }
    },
    default: function (props, propName, componentName) {
      if (props[propName] !== undefined) {
        if (!isRGB(String(props[propName]))) {
          return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must have format #ffffff.');
        }
      }
    },
    err_req: PropTypes.string,
    err_type: PropTypes.string,
    warn_def: PropTypes.string,
    placeholder: PropTypes.string,
    tip: PropTypes.string
  }),

  translation: PropTypes.shape(BasicTypeTranslationPropType),

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

InputColor.defaultProps = {
  className: "",
  translation: Default_ColorTranslation,
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
  return Object.assign({},
    { uid: e.uid },
    (e.name.length > 0) ? { name: e.name } : null,
    (e.required) ? { required: e.required } : null,
    (e.value.length > 0 && isRGB(e.value)) ? { value: e.value } : null,
    (e.required && e.default.length > 0 && isRGB(e.default) && e.required) ? { default: e.default } : null,
    (e.err_req.length > 0 && e.required) ? { err_req: e.err_req } : null,
    (e.err_type.length > 0) ? { err_type: e.err_type } : null,
    (e.required && e.warn_def.length > 0 && e.default.length > 0 && isRGB(e.default) && e.required) ? { warn_def: e.warn_def } : null,
    (e.placeholder.length > 0) ? { placeholder: e.placeholder } : null,
    (e.tip.length > 0) ? { tip: e.tip } : null,
    { type: "color" }
  )
}

export const valid = function (e) {
  return (e.uid.length > 0) && (e.value.length === 0 || (e.value.length > 0 && isRGB(e.value))) && (e.default.length === 0 || !e.required || (e.required && e.default.length > 0 && isRGB(e.default)));
}

export const prototype = function () {
  return {
    uid: "",
    name: "",
    required: false,
    value: "",
    default: "",
    err_req: "",
    err_type: "",
    warn_def: "",
    placeholder: "",
    tip: "",
    type: "color"
  }
}

export const rebuild = function (e) {
  return {
    uid: (e.uid !== undefined && e.uid !== null) ? String(e.uid) : "",
    name: (e.name !== undefined && e.name !== null) ? String(e.name) : "",
    required: (e.required !== undefined && e.required !== null) ? Boolean(e.required) : false,
    value: (e.value !== undefined && e.value !== null) ? String(e.value) : "",
    default: (e.default !== undefined && e.default !== null) ? String(e.default) : "",
    err_req: (e.err_req !== undefined && e.err_req !== null) ? String(e.err_req) : "",
    err_type: (e.err_type !== undefined && e.err_type !== null) ? String(e.err_type) : "",
    warn_def: (e.warn_def !== undefined && e.warn_def !== null) ? String(e.warn_def) : "",
    placeholder: (e.placeholder !== undefined && e.placeholder !== null) ? String(e.placeholder) : "",
    tip: (e.tip !== undefined && e.tip !== null) ? String(e.tip) : "",
    type: "color"
  }
}