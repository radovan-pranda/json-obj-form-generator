import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CardTitle } from 'reactstrap';

export class Paragraph extends Component {
  render() {
    return (
      <Fragment>
        {(this.props.title !== undefined) ? <CardTitle><b>{this.props.title}</b></CardTitle> : null}
        {this.props.text}
      </Fragment>);
  }
}

Paragraph.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string
};

export const getErrors = function (e, props) {
  return { invalid: false }
}

export const getValue = function (e, props) {
  return null;
}