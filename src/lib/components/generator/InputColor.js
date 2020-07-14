import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Col, FormText, FormGroup } from 'reactstrap';
import { Default_keyPropType, keyPropType, translationUid, Default_translationUid } from './propTypes';
import { info as infoIcon } from './icons';
import { isRGB } from './validators';
import Error from './Error';
import Clearer from './Clearer';

export class InputColor extends Component {
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
                <FormGroup row>
                    <Col>
                        <Clearer {...this.props} clear={this.onChange}>
                            <Input
                                name="value"
                                type="text"
                                placeholder={this.props.placeholder}
                                value={(this.props.value !== null)?this.props.value:""} onChange={this.onChange}
                                invalid={this.props.invalid || this.props.errors.invalid}
                                bsSize={this.props.size}
                            />
                        </Clearer>

                        <Input
                            name="value"
                            type="color"
                            value={(this.props.value !== null)?this.props.value:""} onChange={this.onChange}
                            invalid={this.props.invalid || this.props.errors.invalid}
                            bsSize={this.props.size}
                        />
                    </Col>
                </FormGroup>

                <FormText hidden={this.props.errors.warn_def} color="info" className="jofgen-warning jofgen-warning-color">{this.props.warn_def + ' ' + this.props.default}<div className="jofgen-color-show" style={{ background: this.props.default }} /></FormText>
                <FormText hidden={this.props.errors.err_req} color="danger" className="jofgen-warning jofgen-warning-color">{this.props.err_req}</FormText>
                <FormText hidden={this.props.errors.err_type} color="danger" className="jofgen-warning jofgen-warning-color">{this.props.err_type}</FormText>
            </Fragment>
        );
        /*<FormText hidden={!this.props.errors.invalid} color="danger" className="jofgen-warning jofgen-warning-color">{this.props.translation.invalidUid}</FormText>*/
    }
}

InputColor.propTypes = {
    uid: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    value: function (props, propName, componentName) {
        if (props[propName] !== undefined && !isRGB(props[propName])) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. RGB color validation failed.'
            );
        }
    },
    default: function (props, propName, componentName) {
        if (props[propName] !== undefined && !isRGB(props[propName])) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. RGB color validation failed.'
            );
        }
    },
    tip: PropTypes.string,
    placeholder: PropTypes.string,
    errors: PropTypes.object,
    err_req: PropTypes.string,
    err_type: PropTypes.string,
    warn_def: PropTypes.string,

    sm: PropTypes.oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]),
    size: PropTypes.string,

    onChange: PropTypes.func,
    isValid: PropTypes.func,

    invalid: PropTypes.bool,
    translation: PropTypes.shape(translationUid),

    /* aditional */
    jkey: PropTypes.shape(keyPropType),
    icon: PropTypes.any
}

InputColor.defaultProps = {
    uid: "",
    className: "",
    invalid: false,
    value: null,
    err_req: "Value is mandatory",
    err_type: "Invalid value",
    warn_def: "Value is not filled. Default value:",
    placeholder: "#FFFFFF",
    translation: Default_translationUid,
    size: "sm",
    jkey: Default_keyPropType,
    sm: "12",
    icon: infoIcon
}

export const getErrors = function (e, props) {
    var new_value = getValue(e, props);

    if (new_value !== undefined && new_value !== null) {
        var w_d = !(e.length === 0 && props.default !== undefined && props.default !== null && props.required);
        var e_r = !(new_value.length === 0 && props.required);
        var e_t = isRGB(new_value) || (new_value.length === 0 && props.required);

        return {
            err_req: e_r,
            warn_def: w_d,
            err_type: e_t,
            invalid: !(e_r && e_t)
        };
    }
    else {
        return {
            err_req: true,
            warn_def: true,
            err_type: true,
            invalid: false
        };
    }
}

export const getValue = function (e, props) {
    if (props.required) {
        if (e === undefined || e === null || e.length === 0) {
            if (props.default === null || props.default === undefined) {
                return "";
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