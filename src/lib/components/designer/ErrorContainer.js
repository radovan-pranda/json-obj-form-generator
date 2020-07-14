import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, CardFooter, CardTitle, Popover, PopoverBody, Collapse, Col, FormGroup } from 'reactstrap';
import { error as errorsIcon, errorAlert as errorsAlertIcon } from './icons';
import { Default_keyPropType, keyPropType } from './propTypes';
import { idGenerator } from './utils';
import InputWithTip from './InputWithTip';

export default class ErrorContainer extends Component {
  state = {
    isOpenErrors: false,
    gId: idGenerator(this.props.jkey.prefix + "err-" + this.props.jkey.sufix)
  }

  render() {
    var filled = true;
    var keys = Object.keys(this.props.values);
    var show = (keys.length > 0);

    for (var i = 0; i < keys.length; i++) {
      if (this.props.errors[keys[i]] === undefined) {
        show = false;
        break;
      }
      else {
        if (this.props.values[keys[i]].length === 0) {
          filled = false;
        }
      }
    }

    if (show) {
      return (<CardFooter className={"jofgen-D-error-collapse" + ((!filled) ? "-alert ": " ") + this.props.className} style={this.props.style} >
        <CardTitle style={{ marginBottom: ((this.state.isOpenErrors) ? undefined : "0") }}>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td className="jofgen-D-children" >
                  {(filled) ?
                    this.props.icons.icon :
                    (
                      <Fragment>
                        <div id={this.state.gId + "-alert-errors"} style={{ display: "initial" }} onMouseOver={() => { this.setState({ infoShow: true }) }} onMouseOut={() => { this.setState({ infoShow: false }) }} >
                          {this.props.icons.invalid_icon}
                        </div>
                        <Popover target={this.state.gId + "-alert-errors"} isOpen={this.state.infoShow}>
                          <PopoverBody>
                            {this.props.translation.alert}
                          </PopoverBody>
                        </Popover>
                      </Fragment>)}
                  {this.props.translation.title}
                </td>
                <td style={{ width: "50px", textAlign: "right" }}>
                  <Button size={this.props.size} color="link" onClick={() => { this.setState({ isOpenErrors: !this.state.isOpenErrors }); }} >
                    <svg className="jofgen-D-collapse-icon" style={{ transform: ((this.state.isOpenErrors) ? "rotate(180deg)" : "rotate(0deg)") }} viewBox="0 0 24 24"><path fill="#000" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardTitle>
        <Collapse isOpen={this.state.isOpenErrors} >
          <FormGroup row className="mb-0">
            <Col sm={12}>
              {
                Object.keys(this.props.values).map((item, idx) => {
                  return (<InputWithTip key={idx} jkey={{ prefix: this.state.gId, sufix: "-" + item }} size={this.props.size} type="textarea" title={this.props.errors[item].name} desc={this.props.errors[item].tip} value={this.props.values[item]} placeholder={this.props.errors[item].placeHolder} onChange={(e) => { this.props.onChange(item, e) }} />);
                })
              }
            </Col>
          </FormGroup>
        </Collapse>
      </CardFooter>);
    }

    return null;
  }
}

ErrorContainer.propTypes = {
  errors: PropTypes.object,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  translation: PropTypes.shape({
    title: PropTypes.string.isRequired,
    alert: PropTypes.string.isRequired
  }),
  icons: PropTypes.shape({
    icon: PropTypes.any.isRequired,
    invalid_icon: PropTypes.any.isRequired
  }),
  jkey: PropTypes.shape(keyPropType),
  size: PropTypes.string
}

ErrorContainer.defaultProps = {
  jkey: Default_keyPropType,
  className: "",
  size: "sm",
  errors: [],
  values: [],
  icons: {
    icon: errorsIcon,
    invalid_icon: errorsAlertIcon
  },
  translation: {
    title: "Errors",
    errors: "Some errors are not defined"
  },
}