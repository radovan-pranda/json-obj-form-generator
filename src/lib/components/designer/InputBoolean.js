import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CardTitle, Col, FormGroup, Input, CardBody, Label, Button, Collapse, FormFeedback } from 'reactstrap';
import { BoolTranslationPropType, Default_BoolTranslation, Default_keyPropType, keyPropType } from './propTypes';
import { idGenerator } from './utils';
import { boolean as icon, invalid_boolean as invalid_icon, error as errorsIcon, errorAlert as errorsAlertIcon } from './icons';
import ErrorContainer from './ErrorContainer';

export class InputBoolean extends Component {
  state = {
    isOpenMain: true,
    gId: idGenerator(this.props.jkey.prefix + "b" + this.props.jkey.sufix)
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
      default_section = (
        <Col sm={6}>
          <FormGroup check>
            <Label size={this.props.size} check>
              <Input
                name="default"
                type="checkbox"
                checked={this.props.value.default} onChange={this.onChangeBool}
              />
              {" " + this.props.translation.default}
            </Label>
          </FormGroup>
        </Col>
      )
    }

    return (
      <div className={"jofgen-D-card jofgen-D-bool" + ((this.props.value.required) ? " required" : "") + ((invalid || this.props.invalid) ? " invalid" : "")} style={this.props.style} >
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
                    invalid={!(this.props.value.uid.length > 0) && this.props.invalid}
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
            <Col sm={12}>
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
                <FormGroup check>
                  <Label size={this.props.size} check>
                    <Input
                      name="value"
                      type="checkbox"
                      checked={this.props.value.value} onChange={this.onChangeBool}
                    />
                    {" " + this.props.translation.value}
                  </Label>
                </FormGroup>
              </Col>
              {default_section}
            </FormGroup>
          </Collapse>
        </CardBody>
        <Fragment>
          <ErrorContainer
            jkey={{ prefix: this.state.gId + "-", sufix: "" }}
            values={
              Object.assign({},
                ((this.props.value.default) ? { err_default: this.props.value.err_default } : null)
              )
            }
            errors={{ err_default: this.props.translation.errors["err_default"] }}
            translation={{ title: this.props.translation.errors.title, alert: this.props.translation.errors.alert }}
            onChange={this.onChangeError} />
        </Fragment>
      </div>);
  }
}

InputBoolean.propTypes = {
  /* properties */
  value: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.bool,
    default: PropTypes.bool,
    err_default: PropTypes.string,
    tip: PropTypes.string
  }),

  translation: PropTypes.shape(BoolTranslationPropType),

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
}

InputBoolean.defaultProps = {
  className: "",
  translation: Default_BoolTranslation,
  invalid: true,
  icons: {
    icon: icon,
    invalid_icon: invalid_icon,
    errors: errorsIcon,
    errorsAlert: errorsAlertIcon
  },
  jkey: Default_keyPropType,
  size: "sm"
}


export const clean = function (e) {
  return Object.assign({},
    { uid: e.uid },
    (e.name.length > 0) ? { name: e.name } : null,
    (e.required) ? { required: e.required } : null,
    (e.required || e.value) ? { value: e.value } : null,
    (e.default && e.required) ? { default: e.default } : null,
    (e.default && e.err_default.length > 0 && e.required) ? { err_default: e.err_default } : null,
    (e.tip.length > 0) ? { tip: e.tip } : null,
    { type: "bool" }
  )
}

export const valid = function (e) {
  return (e.uid.length > 0);
}

export const prototype = function () {
  return {
    uid: "",
    name: "",
    required: false,
    value: false,
    default: false,
    err_default: "",
    tip: "",
    type: "bool"
  }
}

export const rebuild = function (e) {
  return {
    uid: (e.uid !== undefined && e.uid !== null) ? String(e.uid) : "",
    name: (e.name !== undefined && e.name !== null) ? String(e.name) : "",
    required: (e.required !== undefined && e.required !== null) ? Boolean(e.required) : false,
    value: (e.value !== undefined && e.value !== null) ? Boolean(e.value) : false,
    default: (e.default !== undefined && e.default !== null) ? Boolean(e.default) : false,
    err_default: (e.err_default !== undefined && e.err_default !== null) ? String(e.err_default) : "",
    tip: (e.tip !== undefined && e.tip !== null) ? String(e.tip) : "",
    type: "bool"
  }
}