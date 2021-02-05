import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CustomInput, Popover, PopoverBody, CardBody, FormFeedback, Col, FormGroup, Label, Input, CardTitle, Row } from 'reactstrap';
import { idGenerator } from './utils';
import { paragraph as icon, invalid_paragraph as invalid_icon, alert as alertIcon } from './icons';
import { ParagraphTranslationPropType, Default_ParagraphTranslation, Default_keyPropType, keyPropType } from './propTypes';


export class Paragraph extends Component {

  state = {
    gId: idGenerator(this.props.jkey.prefix + "p" + this.props.jkey.sufix),
    warningShow: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var nextState = {}

    if (nextProps.value);
    {
      nextState = { warningShow: (nextProps.value.sm !== undefined && +nextProps.value.sm <= 4) };

      if (nextProps.isValid) {
        nextProps.isValid(valid(nextProps.value));
      }
    }

    return nextState;
  }

  onChange = function (e) {
    var props = this.props.value;

    props[e.target.name] = e.target.value;
    this.setState({ warningShow: (+props.sm <= 4) });

    var validation = valid(props);

    if (this.props.onChange !== undefined) {
      this.props.onChange(props, validation);
    }

    if (this.props.isValid) {
      this.props.isValid(validation);
    }
  }.bind(this)


  render() {
    var invalid = !valid(this.props.value);

    return (<div className={`${this.props.className}  jofgen-D-card jofgen-D-p ${((invalid) ? " invalid" : "")}`} style={this.props.style} >
      <CardBody className="jofgen-D-card-body">
        <CardTitle>
          {(invalid) ? this.props.icons.invalid_icon : this.props.icons.icon}
          <b>{this.props.translation.title}</b>
        </CardTitle>
        <Row>
          <Col sm="6">
            <FormGroup row className="jofgen-D-form-group" >
              <Label size={this.props.size} sm={2} className="jofgen-D-inputLabel" >{this.props.translation.name}</Label>
              <Col className="jofgen-D-input-col">
                <Input
                  name="title"
                  type="text"
                  value={this.props.value.title} onChange={this.onChange}
                  invalid={invalid}
                  bsSize={this.props.size}
                />
                <FormFeedback valid={false} >{this.props.translation.messages.empty}</FormFeedback>
              </Col>
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup row className="jofgen-D-form-group">
              <Col sm={2} className="jofgen-D-inputLabel jofgen-D-inputLabelWithpopUp" >
                <Label className="jofgen-D-col-form-label-sm" size={this.props.size} >
                  {this.props.translations.width}
                </Label>
                {
                  (["1","2","3","4","5"].includes(this.props.value.sm))
                    ? (
                      <Fragment>
                        <span id={this.state.gId + "popup"} style={{ float: "right" }} onMouseOver={() => { this.setState({ alertShow: true }) }} onMouseOut={() => { this.setState({ alertShow: false }) }} >
                          {this.props.icons_set.alert}
                        </span>
                        <Popover target={this.state.gId + "popup"} isOpen={this.state.alertShow}>
                          <PopoverBody>
                            {this.props.translations.smallWidthAlert}
                          </PopoverBody>
                        </Popover>
                      </Fragment>
                    )
                    : null
                }
              </Col>
              <Col className="jofgen-D-input-col">
                <CustomInput
                  name="sm"
                  type="select"
                  value={this.props.value.sm} onChange={this.onChange}
                  id={this.state.gId + "dropdown"}
                  bsSize={this.props.size}
                >
                  <option value={1}>1 (12 {this.props.translations.columns})</option>
                  <option value={2}>2 (6 {this.props.translations.columns})</option>
                  <option value={3}>3 (4 {this.props.translations.columns})</option>
                  <option value={4}>4 (3 {this.props.translations.columns})</option>
                  <option value={5}>5</option>
                  <option value={6}>6 (2 {this.props.translations.columns})</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                  <option value={12}>12 (1 {this.props.translations.columns})</option>
                </CustomInput>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup row className="jofgen-D-form-group">
          <Label size={this.props.size} className="jofgen-D-inputLabel" sm={1}>{this.props.translation.text}</Label>
          <Col className="jofgen-D-input-col" >
            <Input
              name="text"
              type="textarea"
              value={this.props.value.text} onChange={this.onChange}
              invalid={invalid}
              bsSize={this.props.size}
            />
            <FormFeedback valid={false} >{this.props.translation.messages.empty}</FormFeedback>
          </Col>
        </FormGroup>
      </CardBody>
    </div>);
  }
}

Paragraph.propTypes = {
  value: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    sm: PropTypes.oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"])
  }).isRequired,

  /* functions */
  onChange: PropTypes.func.isRequired,
  isValid: PropTypes.func,

  /* icons */
  icons: PropTypes.shape({
    icon: PropTypes.any.isRequired,
    invalid_icon: PropTypes.any.isRequired,
    alert: PropTypes.any.isRequired
  }),

  /* aditional */
  translation: PropTypes.shape(ParagraphTranslationPropType),
  jkey: PropTypes.shape(keyPropType),
  size: PropTypes.string
}

Paragraph.defaultProps = {
  value: {
    title: "",
    text: "",
    sm: "12"
  },

  className: "",

  /* icons */
  icons: {
    icon: icon,
    invalid_icon: invalid_icon,
    alert: alertIcon
  },

  /* aditional */
  translation: Default_ParagraphTranslation,
  jkey: Default_keyPropType,
  size: "sm"
}

export const clean = function (e) {
  return Object.assign({},
    ((e.title) ? { title: e.title } : null),
    ((e.text) ? { text: e.text } : null),
    { type: "p" },
    (e.sm !== undefined && e.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"].includes(e.sm)) ? { sm: e.sm } : null
  );
}

export const valid = function (e) {
  return ((e.title !== undefined && e.title.length > 0) || (e.text !== undefined && e.text.length > 0)) && e.sm !== undefined && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(e.sm);
}

export const prototype = function () {
  return {
    title: "",
    text: "",
    type: "p",
    sm: "12"
  }
}

export const rebuild = function (e) {
  return {
    title: (e.title !== undefined && e.title !== null) ? String(e.title) : "",
    text: (e.text !== undefined && e.text !== null) ? String(e.text) : "",
    type: "p",
    sm: (e.sm !== undefined && e.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(e.sm)) ? String(e.sm) : "12"
  }
}