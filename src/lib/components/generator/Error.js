import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardBody, Label } from 'reactstrap';
import { alert as icon } from './icons';

export default class Error extends Component {
  render() {    
    return (<div className={this.props.className + " jofgen-card jofgen-error"} style={this.props.style} >
      <CardBody className="jofgen-card-body">
        <Label size={this.props.size} sm={this.props.sm}>
          <table>
            <tbody>
              <tr>
                <td>
                  {this.props.icons.icon}
                </td>
                <td>
                  {this.props.translation.error}
                </td>
              </tr>
            </tbody>
          </table>
        </Label>
      </CardBody>
    </div>);
  }
}

Error.propTypes = {
  /* icons */  
  icons: PropTypes.shape({
    icon: PropTypes.any.isRequired
  }),
  
  /* aditional */
  translation: PropTypes.shape({
    error: PropTypes.string.isRequired
  }),
  size: PropTypes.string,
  sm: PropTypes.string
}

Error.defaultProps = {
  className: "",

  /* icons */  
  icons: {
    icon: icon
  },

  /* aditional */
  translation: {
    error: "Invalid JSON object."
  },
  size: "sm",
  sm: "12"
}
