import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { idGenerator } from './utils';
import { Button, Card, CardBody, CustomInput, Row, Col, FormGroup } from 'reactstrap';
import { extensor as extensorIcon, plus as plusIcon, trashCan as trashCanIcon} from './icons';
import { Default_keyPropType, keyPropType } from './propTypes';

export default class Extensor extends Component {
  state = {
    cardShow: false,
    addElementShow: true,
    value: (this.props.values !== undefined && Object.keys(this.props.values).length > 0) ? Object.keys(this.props.values)[0] : undefined,
    flag: false,    
    gId: idGenerator(this.props.jkey.prefix + "extensor" + this.props.jkey.sufix)
  };

  onChange(value) {
    this.setState({ value: value, flag: true });

    if (this.props.onChange !== undefined) {
      this.props.onChange(value);
    }
  }

  onSubmit = function () {
    if (this.props.onSubmit !== undefined && this.state.value !== undefined) {
      this.props.onSubmit(this.state.value);
      this.setState({ cardShow: false, addElementShow: true });
    }
  }

  render() {
    var card;

    if (this.state.cardShow) {
      card = (
        <Card>
          <CardBody>
              <FormGroup row className="mb-0" >
                <Col sm={12}>
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "40px" }}>
                          {this.props.icons.icon}
                        </td>
                        <td>
                          <CustomInput bsSize={this.props.size} id={this.state.gId} className="dropdown" type="select" value={this.props.value} onChange={(e) => { this.onChange(e.target.value) }} >
                            {Object.keys(this.props.values).map((item,idx) => {
                              if (this.props.names[item] !== undefined) {
                                return (<option key={idx} value={item} >{this.props.names[item].title}</option>);
                              }
                              else {
                                return (<option key={idx} value={item} >{item}</option>);
                              }
                            })}
                          </CustomInput>
                        </td>
                        <td className="jofgen-D-ext--btns-container" >
                          <Button size={this.props.size} color="jofgen-D-theme" className="jofgen-D-ext--btn-add btn-primary" disabled={this.props.onSubmit === undefined} onClick={() => { this.onSubmit(); }} >
                            {this.props.translation.add}
                          </Button>
                          <Button size={this.props.size} color="jofgen-D-theme" className="jofgen-D-ext--btn-drop btn-danger" onClick={() => { this.setState({ cardShow: false, addElementShow: true }); }} >
                            {this.props.icons.drop}
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </FormGroup>
          </CardBody>
        </Card>
      );
    }

    return (
      <div className={"jofgen-D-ext " + this.props.className} style={this.props.style} >
        <Row style={{ opacity: ((this.state.addElementShow && !this.state.cardShow) ? "1" : "0"), height: ((this.state.addElementShow && !this.state.cardShow) ? "1.8rem" : "0") }}>
          <Col>
            <div className="hr"></div>
            <Button color="light" className="btn-add-element" onClick={() => { this.setState({ cardShow: true, addElementShow: false }); }} size={this.props.size} >
              {this.props.icons.addComponent} {this.props.translation.addComponent}
            </Button>
          </Col>
        </Row>
        <Fragment>{card}</Fragment>
      </div>
    );
  }
}

Extensor.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  values: PropTypes.object,
  style: PropTypes.object,
  icons: PropTypes.shape(
    {
      drop: PropTypes.any.isRequired,
      icon: PropTypes.any.isRequired,
      addComponent: PropTypes.any.isRequired
    }
  ),
  translation: PropTypes.shape(
    {
      add: PropTypes.string.isRequired,
      addComponent: PropTypes.string.isRequired
    }
  ),
  jkey: PropTypes.shape(keyPropType)
};

Extensor.defaultProps = {
  className: "",
  values: {},
  icons: {
    icon: extensorIcon,
    drop: trashCanIcon,
    addComponent: plusIcon
  },
  translation: {
    add: "Add",
    addComponent: "Add component"
  },  
  jkey: Default_keyPropType
}