import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, FormText } from 'reactstrap';
import { Default_keyPropType, keyPropType, translationUid, Default_translationUid } from './propTypes';
import { info as infoIcon } from './icons';
import Clearer from './Clearer';
import { intValid } from './validators';

export class InputString extends Component {
  onChange = function (e) {
    var value = {
      value: e.target.value,
      errors: getErrors(e.target.value, this.props)
    };

    if (this.props.onChange) {
      this.props.onChange(this.props.uid, value, !value.errors.invalid);
    }
  }.bind(this)

  render() {
    return (
      <Fragment>        
        <Clearer {...this.props} clear={this.onChange}>
        <Input
          name="value"
          type={(this.props.is_password) ? "password" : "text"}
          value={(this.props.value !== null)?this.props.value:""} onChange={this.onChange}
          placeholder={this.props.placeholder}
          minLength={this.props.minLength}
          maxLength={this.props.maxLength}
          invalid={this.props.errors.invalid}
          bsSize={this.props.size}
        />
        </Clearer>
        <FormText hidden={this.props.errors.warn_def} color="info" className="jofgen-warning jofgen-warning-string">{this.props.warn_def + ' ' + this.props.default}</FormText>
        <FormText hidden={this.props.errors.err_req} color="danger" className="jofgen-warning jofgen-warning-string">{this.props.err_req}</FormText>
        <FormText hidden={this.props.errors.err_minlength} color="danger" className="jofgen-warning jofgen-warning-string">{this.props.err_minlength}</FormText>
        <FormText hidden={this.props.errors.err_maxlength} color="danger" className="jofgen-warning jofgen-warning-string">{this.props.err_maxlength}</FormText>
      </Fragment>
    );
  }
}

InputString.propTypes = {
  uid: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  default: PropTypes.string,
  minLength: function (props, propName, componentName) {
    if (props[propName] !== undefined) {
      if (!intValid(String(props[propName]))) {
        return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value must be integer.`);
      }

      if (props[propName] < 0) {
        return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value must be greater than zero or equal to zero.`);
      }

      if (props["maxLength"] !== undefined && props["maxLength"] < props[propName]) {
        return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value must be lower than maxlength.`);
      }
    }
  },
  maxLength: function (props, propName, componentName) {
    if (props[propName] !== undefined) {
      if (!intValid(String(props[propName]))) {
        return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value must be integer.`);
      }

      if (props[propName] < 0) {
        return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value must be greater than zero or equal to zero.`);
      }

      if (props["minLength"] !== undefined && props["minLength"] > props[propName]) {
        return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value must be greater than minlength.`);
      }
    }
  },
  errors: PropTypes.object,
  err_req: PropTypes.string,
  err_minlength: PropTypes.string,
  is_password: PropTypes.bool,
  err_maxlength: PropTypes.string,
  warn_def: PropTypes.string,
  placeholder: PropTypes.string,
  tip: PropTypes.string,

  sm: PropTypes.oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]),
  size: PropTypes.string,

  onChange: PropTypes.func,
  isValid: PropTypes.func,

  invalid: PropTypes.bool,
  invalidUid: PropTypes.bool,
  translation: PropTypes.shape(translationUid),

  /* aditional */
  jkey: PropTypes.shape(keyPropType),
  icon: PropTypes.any
}

InputString.defaultProps = {
  uid: "",
  className: "",
  invalid: false,
  value: null,
  err_req: "Value is mandatory.",
  warn_def: "Value is not filled. Default value:",
  err_minlength: "Value is too short.",
  err_maxlength: "Value is too long.",

  translation: Default_translationUid,
  size: "sm",
  jkey: Default_keyPropType,
  sm: "12",
  icon: infoIcon
}

export const getErrors = function (e, props) {
  var new_value = getValue(e, props);

  if (new_value !== undefined && new_value !== null) {
    var w_d = !(e.length === 0 && props.default !== undefined && props.required);
    var e_r = (new_value.length > 0 && props.required) || !props.required;
    var e_ml = !(new_value.length > 0 && new_value.length < +props.minLength);
    var e_mxl = !(new_value.length > +props.maxLength);

    return {
      warn_def: w_d,
      err_req: e_r,
      err_minlength: e_ml,
      err_maxlength: e_mxl,
      invalid: !(e_r && e_ml && e_mxl)
    };
  }
  else {
    return {
      warn_def: true,
      err_req: true,
      err_minlength: true,
      err_maxlength: true,
      invalid: false
    };
  }
}

export const getValue = function (e, props) {
  if (props.required) {
      if (e === undefined || e === null || e.length === 0)
      {
          if (props.default === null || props.default === undefined)
          {
              return "";
          }

          return props.default;
      } 
      else
      {
          return e;
      }
  }
  else {
      if (e === undefined || e === null)
      {
          return null;
      }
      else
      {
          return e;
      }
  }
}