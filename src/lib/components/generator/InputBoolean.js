import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, FormText } from 'reactstrap';
import { Default_keyPropType, keyPropType, translationUid, Default_translationUid } from './propTypes';
import { info as infoIcon } from './icons';
import Clearer from './Clearer';

export class InputBoolean extends Component {
    onChange = (e) => {
        var value = {
            value: e.target.checked,
            errors: getErrors(e.target.checked, this.props)
        }

        if (this.props.onChange) {
            this.props.onChange(this.props.uid, value, value.errors.err_default);
        }
    }

    render() {
        return (
            <Fragment>
                <Clearer {...this.props} clear={this.onChange}>
                    <Input name="value" type="checkbox" checked={(this.props.value !== null)?this.props.value:false} onChange={this.onChange} />
                </Clearer>
                {(!this.props.errors.err_default) ? <FormText color="danger" className="jofgen-error jofgen-error-bool">{this.props.obj_translation.err_default}</FormText> : null}
            </Fragment>
        );
    }
}

InputBoolean.propTypes = {
    uid: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: PropTypes.bool,
    default: PropTypes.bool,
    errors: PropTypes.object,
    obj_translation: PropTypes.shape({        
        err_default: PropTypes.string.isRequired
    }),
    size: PropTypes.string,
    onChange: PropTypes.func,
    isValid: PropTypes.func,
    translation: PropTypes.shape(translationUid),

    /* aditional */
    jkey: PropTypes.shape(keyPropType),
    icon: PropTypes.any
}

InputBoolean.defaultProps = {
    uid: "",
    required: false,
    value: null,
    obj_translation: {
        err_default: "It is required to check this input"
    },
    className: "",
    size: "sm",
    jkey: Default_keyPropType,
    translation: Default_translationUid,
    icon: infoIcon,
    errors: {
        err_default: true
    }
}

export const getErrors = function (e, props) {
    var err_default = (!props.required || !props.default || (e && props.default && props.required));
    return {
        err_default: err_default,
        invalid: !err_default
    }
}

export const getValue = function (e, props) {
    if (e !== undefined) {
        return e;
    }
    else {
        return (props.required) ? false : undefined;
    }
}