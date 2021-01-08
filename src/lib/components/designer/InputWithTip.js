import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Label, Input, Popover, PopoverBody } from 'reactstrap';
import { idGenerator } from './utils';
import { info as infoIcon } from './icons';
import { Default_keyPropType, keyPropType } from './propTypes';

export default class InputWithTip extends Component {
  state = {
    popUp: false,
    gId: idGenerator(this.props.jkey.prefix + "tI" + this.props.jkey.sufix)
  }

  render() {
    var infoPopOver = <></>;
    var infopopstyle = {};
    
    if (this.props.desc !== undefined && this.props.desc.length > 0) {
      infoPopOver = <Fragment>
        <span id={this.state.gId} style={{ float: "right" }} onMouseOver={()=>{ this.setState({ popUp: true }); }} onMouseOut={()=>{ this.setState({ popUp: false }); }} >{this.props.icon}</span>
        <Popover target={this.state.gId} isOpen={this.state.popUp} >
          <PopoverBody>
            {this.props.desc}
          </PopoverBody>
        </Popover>
      </Fragment>;

      infopopstyle = {
        width: "calc(100% - 22px)"
      };
    }

    return (
      <FormGroup row className={this.props.className} style={this.props.style}>
        <Col sm={this.props.smTitle}>
          <Label size={this.props.size} style={infopopstyle} >
            {this.props.title}
          </Label>
          {infoPopOver}
        </Col>
        <Col sm={this.props.smInput}>
          <Input
            type={this.props.type} 
            placeholder={this.props.placeholder}
            min={this.props.min}
            bsSize={this.props.size}
            max={this.props.max}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
            value={this.props.value}
            onChange={(e) => { if (this.props.onChange !== undefined) { this.props.onChange(e.target.value); } }}
          />
        </Col>
      </FormGroup>
    );
  }
}

InputWithTip.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  desc: PropTypes.string,
  jkey: PropTypes.shape(keyPropType),
  placeholder: PropTypes.string,
  smTitle: PropTypes.number,
  smInput: PropTypes.number,
  size: PropTypes.string,
  icon: PropTypes.any,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(["textarea", "text", "number", "password"]),
  min: PropTypes.string,
  max: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.string
};

InputWithTip.defaultProps = {
  title: "",
  desc: "",
  placeholder: "",
  size: "sm",
  smTitle: 6,
  smInput: 6,
  jkey: Default_keyPropType,
  icon: infoIcon, 
  type: "text"
}