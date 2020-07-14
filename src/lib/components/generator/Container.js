import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Popover, PopoverBody, Label, FormGroup } from 'reactstrap';
import { idGenerator } from './utils';
import { Default_keyPropType, keyPropType, translationUid, Default_translationUid } from './propTypes';
import { info as infoIcon } from './icons';

export default class Container extends Component {
    state = {
        gId: idGenerator(this.props.jkey.prefix + "param-" + this.props.jkey.sufix),
        popUp: false
    }

    showInfoPopUp = () => { this.setState({ popUp: true }); }
    hideInfoPopUp = () => { this.setState({ popUp: false }); }

    render() {
        if (this.props.tip !== undefined && this.props.tip.length > 0) {
            return (
                <Col sm={this.props.sm} className={this.props.className + " jofgen-item jofgen-color"} style={this.props.style}>
                    <FormGroup row>
                        <Col sm="6">
                            <Label size={this.props.size} style={{ width: "calc(100% - 22px)" }} >
                                {
                                    (!this.props.name || this.props.name.length === 0)
                                        ? (
                                            (this.props.uid.length > 0) ? this.props.uid : this.state.gId
                                        )
                                        : this.props.name
                                }
                            </Label>
                            <span id={this.state.gId} style={{ float: "right" }} onMouseOver={this.showInfoPopUp} onMouseOut={this.hideInfoPopUp} >{this.props.icon}</span>
                            <Popover target={this.state.gId} isOpen={this.state.popUp} >
                                <PopoverBody>
                                    {this.props.tip}
                                </PopoverBody>
                            </Popover>
                        </Col>
                        <Col sm="6">
                            {this.props.children}
                        </Col>
                    </FormGroup>
                </Col>
            );
        }
        else {
            return (
                <Col sm={this.props.sm} className={this.props.className + " jofgen-item jofgen-color"} style={this.props.style}>
                    <FormGroup row>
                        <Label sm={6} size={this.props.size} className="jofgen-inputLabel" >
                            {
                                (!this.props.name || this.props.name.length === 0)
                                    ? (
                                        (this.props.uid.length > 0) ? this.props.uid : this.state.gId
                                    )
                                    : this.props.name
                            }
                        </Label>
                        <Col sm={6} className="jofgen-input-col">
                            {this.props.children}
                        </Col>
                    </FormGroup>
                </Col>
            );
        }
    }
}

Container.propTypes = {
    uid: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: PropTypes.bool,

    size: PropTypes.string,
    onChange: PropTypes.func,
    isValid: PropTypes.func,
    translation: PropTypes.shape(translationUid),

    /* aditional */
    jkey: PropTypes.shape(keyPropType),
    icon: PropTypes.any
}

Container.defaultProps = {
    uid: "",
    required: false,
    value: false,

    className: "",
    size: "sm",
    jkey: Default_keyPropType,
    translation: Default_translationUid,
    icon: infoIcon
}