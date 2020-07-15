import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CardTitle, Col, FormGroup, Input, CardBody, Label, Button, Collapse, FormFeedback, CustomInput, Row } from 'reactstrap';
import { PackTranslationPropType, Default_PackTranslation, Default_keyPropType, keyPropType } from './propTypes';
import { idGenerator } from './utils';
import { section as icon, invalid_section as invalid_icon, error as errorsIcon, errorAlert as errorsAlertIcon } from './icons';
import Container from './Container';

export class SectionPackage extends Component {
  state = {
    isOpenMain: true,
    gId: idGenerator(this.props.jkey.prefix + "secpack" + this.props.jkey.sufix)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var nextState = {}
    if (nextProps.value && nextProps.isValid) {
      nextProps.isValid(valid(nextState.value));
    }

    return nextState;
  }

  onChange = function (e) {
    var props = this.props.value;

    props[e.target.name] = e.target.value;
    props.uid = props.uid.replace(" ", "_");

    var isvalid = valid(props);
    var validation = this.props.valid;
    validation[0] = isvalid;

    var uids = this.props.uids;
    uids[0] = props.uid;

    var sub_items = this.props.designer_aliases[props.type].clean(props);
    sub_items.sub = [...this.props.sub_items.sub];

    if (this.props.onChangeSub) {
      this.props.onChangeSub(props, validation, uids, sub_items);
    }

    if (this.props.isValid) {
      this.props.isValid(validation);
    }
  }.bind(this)

  onChangeChildren = function (value, sub_validation, idx) {
    var props = this.props.value;
    props.sub[idx] = value;

    var sub_items = this.props.sub_items;
    sub_items.sub[idx] = this.props.package_designer_aliases[value.type].clean(value);

    var validation = this.props.valid;
    validation[1][idx] = sub_validation;

    var uids = this.props.uids;
    uids[1][idx] = (value.uid !== undefined && value.uid !== null)?value.uid:null;

    if (this.props.onChangeSub) {
      this.props.onChangeSub(props, validation, uids, sub_items);
    }

    if (this.props.isValid) {
      this.props.isValid(validation);
    }
  }.bind(this)

  onChangeSub = function (value, sub_validation, uid, subs, idx) {
    var props = this.props.value;
    var sub_items = this.props.sub_items;
    var uids = this.props.uids;
    var validation = this.props.valid;

    props.sub[idx] = value;
    sub_items.sub[idx] = subs;
    uids[1][idx] = uid;
    validation[1][idx] = sub_validation;

    if (this.props.onChangeSub) {
      this.props.onChangeSub(props, validation, uids, sub_items);
    }

    if (this.props.isValid) {
      this.props.isValid(validation);
    }
  }.bind(this)

  addChildren = function (position) {
    var props = this.props.value;
    var validation = this.props.valid;
    var uids = this.props.uids;
    var sub_items = this.props.sub_items;

    props.sub.splice(position, 0, { ...this.props.package_designer_aliases.sec.prototype() });  
    sub_items.sub.splice(position, 0, { ...this.props.package_designer_aliases.sec.clean({...this.props.designer_aliases.sec.prototype()}) });  
    uids[1].splice(position, 0, this.props.package_designer_aliases.sec.defaultUid());
    validation[1].splice(position, 0, this.props.package_designer_aliases.sec.defaultValid());


    if (this.props.onChangeSub) {
      this.props.onChangeSub(props, validation, uids, sub_items);
    }

    if (this.props.isValid) {
      this.props.isValid(validation);
    }
  }.bind(this)

  removeChildren = function (idx) {
    var props = this.props.value;
    var sub_items = this.props.sub_items;
    var validation = this.props.valid;
    var uids = this.props.uids;

    /* adding new element */
    props.sub.splice(idx, 1);
    sub_items.sub.splice(idx, 1);
    validation[1].splice(idx, 1);
    uids[1].splice(idx, 1);

    if (this.props.onChangeSub) {
      this.props.onChangeSub(props, validation, uids, sub_items);
    }

    if (this.props.isValid) {
      this.props.isValid(validation);
    }
  }.bind(this)

  changePosition = function (idx, move) {    
    var props = this.props.value;
    var validation = this.props.valid;
    var uids = this.props.uids;
    var sub_items = this.props.sub_items;

    var val_idx_move = props.sub[idx];
    var sub_idx_move = sub_items.sub[idx];
    var uids_idx_move = uids[1][idx];
    var valid_idx_move = validation[1][idx];

    props.sub[idx] = props.sub[idx + move];
    sub_items.sub[idx] = sub_items.sub[idx + move];
    uids[1][idx] = uids[1][idx + move];
    validation[1][idx] = validation[1][idx + move];

    props.sub[idx + move] = val_idx_move;
    sub_items.sub[idx + move] = sub_idx_move;
    uids[1][idx + move] = uids_idx_move;
    validation[1][idx + move] = valid_idx_move;

    if (this.props.onChangeSub) {
      this.props.onChangeSub(props, validation, uids, sub_items);
    }

    if (this.props.isValid) {
      this.props.isValid(validation);
    }
  }.bind(this)

  collapseMain = function () { this.setState({ isOpenMain: !this.state.isOpenMain }); }.bind(this)

  render() {
    var invalid = !valid(this.props.value);
    var no_of_elements = this.props.value.sub.length - 1;

    return (
      <div className={"jofgen-D-card jofgen-D-secpack" + ((invalid || this.props.invalid[0]) ? " invalid" : "")} style={this.props.style} >
        <CardBody className={"jofgen-D-card-body"}>
          <CardTitle>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td className="jofgen-D-children" >
                    {(invalid || this.props.invalid) ? this.props.icons.invalid_icon : this.props.icons.icon}
                    <b>{this.props.translation.title}</b>
                  </td>
                  <td style={{ width: "50px", textAlign: "right" }}>
                    <Button size={this.props.size} color="link" onClick={this.collapseMain} >
                      <svg className="jofgen-D-collapse-icon" style={{ transform: ((this.state.isOpenMain) ? "rotate(180deg)" : "rotate(0deg)") }} viewBox="0 0 24 24"><path fill="#000" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardTitle>
          <FormGroup row>
            <Col sm={6}>
              <FormGroup row>
                <Label sm={2} size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.uid}</Label>
                <Col className="jofgen-D-input-col">
                  <Input
                    name="uid"
                    type="text"
                    value={this.props.value.uid} onChange={this.onChange}
                    invalid={this.props.value.uid.length === 0 || this.props.invalid}
                    bsSize={this.props.size}
                  />
                  <FormFeedback valid={false} >{this.props.translation.messages.uid}</FormFeedback>
                </Col>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup row>
                <Label sm={2} size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.mode}</Label>
                <Col className="jofgen-D-input-col">
                  <CustomInput
                    id={this.state.gId}
                    name="design"
                    type="select"
                    className="dropdown"
                    value={this.props.design}
                    bsSize={this.props.size}
                    onChange={this.onChange}
                  >
                    <option value="list" >{this.props.translation.mode_list}</option>
                    <option value="stack" >{this.props.translation.mode_stack}</option>
                    <option value="unlisted" >{this.props.translation.mode_unlisted}</option>
                  </CustomInput>
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>

          <Collapse isOpen={this.state.isOpenMain} className="jofgen-D-pack-sub">
            <FormGroup row>
              <Label sm={2} size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.sections}</Label>
              <Col sm={12}>
                <div className={"jofgen-D-ext " + this.props.className} style={this.props.style} >
                  <Row style={{ opacity: "1", height: "1.8rem" }}>
                    <Col>
                      <div className="hr"></div>
                      <Button size={this.props.size} color="light" className="btn-add-element" onClick={(e) => { this.addChildren(0); }} >
                        {this.props.translation.addSection}
                      </Button>
                    </Col>
                  </Row>
                </div>

                {this.props.value.sub.map(
                  (item, idx) => {
                    var Tag;
                    if (this.props.package_designer_aliases[item.type] !== undefined) {
                      Tag = this.props.package_designer_aliases[item.type].tag;
                      return (
                        <Fragment key={idx}>
                          <Container
                            size={this.props.size}
                            onUpButtonClick={(idx > 0) ? (() => this.changePosition(idx, -1)) : undefined}
                            onDownButtonClick={(idx < no_of_elements) ? (() => this.changePosition(idx, 1)) : undefined}
                            onRemoveButtonClick={() => this.removeChildren(idx)}
                            hideDissabled={false}
                            extras={this.props.sub_items.sub[idx]}
                            icons={this.props.icons_set.container}
                            extended={this.props.extended}
                          >
                            <Tag 
                              size={this.props.size}
                              invalid={this.props.invalid[1][idx]}
                              uids={this.props.uids[1][idx]}
                              valid={this.props.valid[1][idx]}
                              value={item}
                              mode={this.props.mode}
                              sub_items={this.props.sub_items.sub[idx]}
                              className={this.props.className}
                              size={this.props.size}
                              jkey={this.props.jkey}
                              sm={this.props.sm}                                                    
                              icons_set={this.props.icons_set}
                              icons={this.props.icons_set.types[item.type]}
                              onChange={(value, validation) => { this.onChangeChildren(value, validation, idx) }}                                
                              onChangeSub={(value, validation, uids, sub_items) => { this.onChangeSub(value, validation, uids, sub_items, idx) }}
                              
                              translation={this.props.translations.types[item.type]}
                              translations={this.props.translations}
                              
                              designer_aliases={this.props.designer_aliases}
                              package_designer_aliases={this.props.package_designer_aliases}
                              extended={this.props.extended}
                            />
                          </Container>
                          <div className={"jofgen-D-ext " + this.props.className} style={this.props.style} >
                            <Row style={{ opacity: "1", height: "1.8rem" }}>
                              <Col>
                                <div className="hr"></div>
                                <Button size={this.props.size} color="light" className="btn-add-element" onClick={(e) => { this.addChildren(idx + 1); }} >
                                  {this.props.translation.addSection}
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        </Fragment>);
                    }

                    return null;
                  }
                )}
              </Col>
            </FormGroup>
          </Collapse>
        </CardBody>
      </div>);
  }
}

SectionPackage.propTypes = {
  /* properties */
  value: PropTypes.shape({
    uid: PropTypes.string,
    design: PropTypes.oneOf(["unlisted", "list", "stack"]),
    sub: PropTypes.arrayOf(PropTypes.object)
  }),

  translation: PropTypes.shape(PackTranslationPropType),

  /* functions */
  onChange: PropTypes.func,
  isValid: PropTypes.func,
  invalid: PropTypes.array,

  /* icons */
  icons: PropTypes.shape({
    icon: PropTypes.any.isRequired,
    invalid_icon: PropTypes.any.isRequired,
    errors: PropTypes.any.isRequired,
    errorsAlert: PropTypes.any.isRequired
  }),

  /* aditional */
  jkey: PropTypes.shape(keyPropType),
  size: PropTypes.string,
  uids: PropTypes.array
}

SectionPackage.defaultProps = {
  className: "",
  translation: Default_PackTranslation,
  invalid: true,
  uids: [],
  icons: {
    icon: icon,
    invalid_icon: invalid_icon,
    errors: errorsIcon,
    errorsAlert: errorsAlertIcon
  },
  jkey: Default_keyPropType,
  size: "sm"
}


export const clean = function (e) {
  return {
    uid: e.uid,
    design: e.design,
    type: "pack",
    sub: e.sub
  }
}

export const valid = function (e) {
  return (e.uid.length > 0);
}

export const prototype = function () {
  return {
    uid: "",
    design: "list",
    type: "pack",
    sub: []
  }
}

export const rebuild = function (e) {
  return {
    uid: (e.uid !== undefined && e.uid !== null) ? String(e.uid) : "",
    design: (e.mode !== undefined && e.mode !== null && ["unlisted", "list", "stack"].includes(e.mode)) ? String(e.mode) : "list",
    type: "pack",
    sub: []
  }
}

