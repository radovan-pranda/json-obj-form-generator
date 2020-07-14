import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { drop } from './icons';

export default class Clearer extends Component {
    render() {
        var close;
        if (!this.props.required && this.props.value !== null)
        {
            close = <div onClick={() => { this.props.clear({ target: { value: null, checked: null } }) }} className="jofgen-input-c-close-btn">{this.props.dropIcon}</div>;
        }
        
        return (
            <Fragment>
                {close}
                {this.props.children}
            </Fragment>
        );       
    }
}

Clearer.propTypes = {
    uid: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.any,
    dropIcon: PropTypes.any,
    clear: PropTypes.func
}

Clearer.defaultProps = {
    uid: "",
    required: false,
    value: null,
    dropIcon: drop
}