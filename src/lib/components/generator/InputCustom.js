import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, FormText } from 'reactstrap';
import { Default_keyPropType, keyPropType, translationUid, Default_translationUid } from './propTypes';
import { info as infoIcon } from './icons';
import Clearer from './Clearer';

export class InputCustom extends Component {
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
        return (<Fragment>
            
            <Clearer {...this.props} clear={this.onChange}>
            <Input
                name="value"
                type="text"
                value={(this.props.value !== null)?this.props.value:""} onChange={this.onChange}
                placeholder={this.props.placeholder}
                invalid={this.props.invalid || this.props.errors.invalid}
                bsSize={this.props.size}
            />
            </Clearer>
            <FormText hidden={this.props.errors.warn_def} color="info" className="jofgen-warning jofgen-warning-regx">{this.props.warn_def + ' ' + this.props.default}</FormText>
            <FormText hidden={this.props.errors.err_req} color="danger" className="jofgen-warning jofgen-warning-regx">{this.props.err_req}</FormText>
            <FormText hidden={this.props.errors.err_type} color="danger" className="jofgen-warning jofgen-warning-regx">{this.props.err_type}</FormText>
        </Fragment>);
    }

    /*
        <FormText hidden={!this.props.invalidUid} color="danger" className="jofgen-warning jofgen-warning-regx">{this.props.translation.invalidUid}</FormText>
        <FormText hidden={this.props.errors.} color="danger" className="jofgen-warning jofgen-warning-regx">{this.props.translation.noUid}</FormText>
    */
}

InputCustom.propTypes = {
    uid: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string,
    default: PropTypes.string,
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
    errors: PropTypes.object,
    err_req: PropTypes.string,
    err_type: PropTypes.string,
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

InputCustom.defaultProps = {
    uid: "",
    regex: ".*",
    className: "",
    invalid: false,
    value: null,
    err_req: "Value is mandatory",
    err_type: "Invalid value",
    warn_def: "Value is not filled. Default value:",

    translation: Default_translationUid,
    size: "sm",
    jkey: Default_keyPropType,
    sm: "12",
    icon: infoIcon
}

export const getErrors = function (e, props) {
    var new_value = getValue(e, props);
    
    if (new_value !== undefined && new_value !== null) {
        var w_d = !(e.length === 0 && !(new RegExp(props.regex).test(e)) && props.default !== undefined && props.required);
        var e_r = (!props.required || ((new_value.length > 0 || new RegExp(props.regex).test(new_value)) && props.required));
        var e_rgx = ((new_value.length === 0 && props.required) || new RegExp(props.regex).test(new_value));
        
        return {
            warn_def: w_d,
            err_req: e_r,
            err_type: e_rgx,
            invalid: !(e_r && e_rgx)
        };
    }
    else {
        return {
            warn_def: true,
            err_req: true,
            err_type: true,
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