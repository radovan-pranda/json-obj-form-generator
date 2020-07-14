import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, FormText } from 'reactstrap';
import { Default_keyPropType, keyPropType, translationUid, Default_translationUid } from './propTypes';
import { info as infoIcon } from './icons';
import { filterInt, intValid } from './validators';
import Clearer from './Clearer';

export class InputInteger extends Component {
    onChange = function (e) {
        var val = e.target.value;
        var err = getErrors(e.target.value, this.props);
        var value = {
            value: (err.err_type && val !== null && val.length > 0)?filterInt(String(val)):val,
            errors: err
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
                    type="text"
                    value={(this.props.value !== null)?this.props.value:""} onChange={this.onChange}
                    placeholder={this.props.placeholder}
                    invalid={this.props.invalid || this.props.errors.invalid}
                    bsSize={this.props.size}
                />
                </Clearer>
                <FormText hidden={this.props.errors.warn_def} color="info" className="jofgen-warning jofgen-warning-int">{this.props.warn_def + ' ' + this.props.default}</FormText>
                <FormText hidden={this.props.errors.err_type} color="danger" className="jofgen-warning jofgen-warning-int">{this.props.err_type}</FormText>
                <FormText hidden={this.props.errors.err_req} color="danger" className="jofgen-warning jofgen-warning-int">{this.props.err_req}</FormText>
                <FormText hidden={this.props.errors.err_min} color="danger" className="jofgen-warning jofgen-warning-int">{this.props.err_min}</FormText>
                <FormText hidden={this.props.errors.err_max} color="danger" className="jofgen-warning jofgen-warning-int">{this.props.err_max}</FormText>
                <FormText hidden={this.props.errors.err_inf} color="danger" className="jofgen-warning jofgen-warning-int">{this.props.err_inf}</FormText>
            </Fragment>
        );
    }
}

InputInteger.propTypes = {
    uid: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    value: function (props, propName, componentName) {
        if (props[propName] !== undefined) {
            if (!intValid(String(props[propName]))) {
                return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be integer.');
            }
        }
    },
    default: function (props, propName, componentName) {
        if (props[propName] !== undefined) {
            if (!intValid(String(props[propName]))) {
                return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be integer.');
            }
        }
    },
    min: function (props, propName, componentName) {
        if (props[propName] !== undefined) {
            if (!intValid(String(props[propName]))) {
                return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be integer.');
            }

            if (props["max"] !== undefined && props["max"] < props[propName]) {
                return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be lower than max.');
            }
        }
    },
    max: function (props, propName, componentName) {
        if (props[propName] !== undefined) {
            if (!intValid(String(props[propName]))) {
                return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be integer.');
            }

            if (props["min"] !== undefined && props["min"] > props[propName]) {
                return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than min.');
            }
        }
    },
    errors: PropTypes.object,
    err_req: PropTypes.string,
    err_min: PropTypes.string,
    err_max: PropTypes.string,
    err_inf: PropTypes.string,
    err_type: PropTypes.string,
    warn_def: PropTypes.string,
    placeholder: PropTypes.string,
    tip: PropTypes.string,

    sm: PropTypes.oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]),
    size: PropTypes.string,

    onChange: PropTypes.func,

    invalid: PropTypes.bool,
    invalidUid: PropTypes.bool,
    translation: PropTypes.shape(translationUid),

    /* aditional */
    jkey: PropTypes.shape(keyPropType),
    icon: PropTypes.any
}

InputInteger.defaultProps = {
    uid: "",
    className: "",
    invalid: false,
    value: null,
    err_req: "Value is mandatory.",
    warn_def: "Value is not filled. Default value:",
    err_min: "Value is lower than minimum enabled value.",
    err_max: "Value is higher than maximal enabled value.",
    err_inf: "Value must be finite",
    err_type: "Invalid type of value. Value is not integer.",

    translation: Default_translationUid,
    size: "sm",
    jkey: Default_keyPropType,
    sm: "12",
    icon: infoIcon
}

export const getErrors = function (e, props) {
    var new_value = getValue(e, props);

    if (new_value !== undefined && new_value !== null) {
        var filter_new_value = filterInt(new_value);
        var min = String(props.min);
        var max = String(props.max);
        var new_value_valid = intValid(new_value);

        var w_d = !(e.length === 0 && props.default !== undefined && props.required);
        var e_t = new_value_valid || (String(new_value).length === 0 && props.required);
        var e_r = (String(new_value).length > 0 && props.required) || !props.required;
        var e_ml = !intValid(min) || !new_value_valid || filter_new_value >= filterInt(min);
        var e_mxl = !intValid(max) || !new_value_valid || filter_new_value <= filterInt(max);
        var e_i = String(new_value).length === 0 || !new_value_valid || (new_value_valid && isFinite(filter_new_value));

        return {
            warn_def: w_d,
            err_req: e_r,
            err_type: e_t,
            err_min: e_ml,
            err_max: e_mxl,
            err_inf: e_i,
            invalid: !(e_t && e_r && e_ml && e_mxl && e_i)
        };
    }
    else {
        return {
            warn_def: true,
            err_req: true,
            err_type: true,
            err_min: true,
            err_max: true,
            err_inf: true,
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
            return (intValid(e))?filterInt(e):e;
        }
    }
    else {
        if (e === undefined || e === null)
        {
            return null;
        }
        else
        {
            return (intValid(e))?filterInt(e):e;
        }
    }
}