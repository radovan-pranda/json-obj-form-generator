import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CardTitle, Col, FormGroup, Input, CardBody, Label, Button, Collapse, FormFeedback } from 'reactstrap';
import { SecTranslationPropType, Default_SecTranslation, Default_keyPropType, keyPropType } from './propTypes';
import { idGenerator } from './utils';
import { section as icon, invalid_section as invalid_icon, error as errorsIcon, errorAlert as errorsAlertIcon } from './icons';
import Extensor from './Extensor';
import Container from './Container';

export class Section extends Component {
  state = {
    isOpenMain: true,
    gId: idGenerator(this.props.jkey.prefix + "sec" + this.props.jkey.sufix)
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
    sub_items.sub[idx] = this.props.designer_aliases[value.type].clean(value);

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

  addChildren = function (position, type_idx) {
    var props = this.props.value;
    var validation = this.props.valid;
    var uids = this.props.uids;
    var sub_items = this.props.sub_items;

    props.sub.splice(position, 0, { ...this.props.designer_aliases[type_idx].prototype() });  
    sub_items.sub.splice(position, 0, { ...this.props.designer_aliases[type_idx].clean({...this.props.designer_aliases[type_idx].prototype()}) });  
    uids[1].splice(position, 0, this.props.designer_aliases[type_idx].defaultUid());
    validation[1].splice(position, 0, this.props.designer_aliases[type_idx].defaultValid());


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
      <div className={"jofgen-D-card jofgen-D-sec" + ((invalid || this.props.invalid[0]) ? " invalid" : "")} style={this.props.style} >
        <CardBody className={"jofgen-D-card-body"}>
          <CardTitle>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td className="jofgen-D-children" >
                    {(invalid || this.props.invalid[0]) ? this.props.icons.invalid_icon : this.props.icons.icon}
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
                    invalid={this.props.value.uid.length === 0 || this.props.invalid[0]}
                    bsSize={this.props.size}
                  />
                  <FormFeedback valid={false} >{this.props.translation.messages.uid}</FormFeedback>
                </Col>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup row>
                <Label size={this.props.size} sm={1} className="jofgen-D-inputLabel" >{this.props.translation.name}</Label>
                <Col className="jofgen-D-input-col">
                  <Input
                    name="name"
                    type="text"
                    value={this.props.value.name} onChange={this.onChange}
                    bsSize={this.props.size}
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col sm={12}>
              <FormGroup row>
                <Label size={this.props.size} sm={1} className="jofgen-D-inputLabel" >{this.props.translation.desc}</Label>
                <Col className="jofgen-D-input-col">
                  <Input
                    name="desc"
                    type="textarea"
                    value={this.props.value.desc} onChange={this.onChange}
                    bsSize={this.props.size}
                  />
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>
        <Collapse isOpen={this.state.isOpenMain} className="jofgen-D-sec-sub" >
              <FormGroup row>
                <Label size={this.props.size} className="jofgen-D-inputLabel" >{this.props.translation.sub}</Label>
                <Col sm={12} className="jofgen-D-input-col">

                  <Extensor
                    size={this.props.size}
                    style={{ paddingBottom: "10px" }}
                    names={this.props.translations.types}
                    values={this.props.designer_aliases}
                    translation={this.props.translation}
                    onSubmit={(e) => { this.addChildren(0, e); }}
                  />

                  {this.props.value.sub.map(
                    (item, idx) => {
                      var Tag;
                      if (this.props.designer_aliases[item.type] !== undefined) {
                        Tag = this.props.designer_aliases[item.type].tag;
                        return (
                          <Fragment key={idx}>
                            <Container
                              size={this.props.size}
                              onUpButtonClick={(idx > 0) ? (() => this.changePosition(idx, -1)) : undefined}
                              onDownButtonClick={(idx < no_of_elements) ? (() => this.changePosition(idx, 1)) : undefined}
                              onRemoveButtonClick={() => this.removeChildren(idx)}
                              hideDissabled={false}
                              icons={this.props.icons_set.container}
                              extras={this.props.sub_items.sub[idx]}
                              extended={this.props.extended} > 
                              <Tag
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
                            <Extensor
                              size={this.props.size}
                              key={this.state.gId + "-e-" + idx}
                              style={{ paddingBottom: "10px" }}
                              names={this.props.translations.types}
                              translation={this.props.translation}
                              values={this.props.designer_aliases}
                              onSubmit={(e) => { this.addChildren(idx + 1, e); }}
                            />
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

Section.propTypes = {
  /* properties */
  value: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    sub: PropTypes.arrayOf(PropTypes.object)
  }),

  translation: PropTypes.shape(SecTranslationPropType),

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
  size: PropTypes.string
}

Section.defaultProps = {
  className: "",
  translation: Default_SecTranslation,
  invalid: [true, []],
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
  return Object.assign({},
    { uid: e.uid },
    (e.name.length > 0) ? { name: e.name } : null,
    (e.desc.length > 0) ? { desc: e.desc } : null,
    { type: "sec" },
    { sub: e.sub }
  )
}

export const valid = function (e) {
  return (e.uid.length > 0);
}

export const prototype = function() {
  return {
    uid: "",
    name: "",
    desc: "",
    type: "sec",
    sub: []
  }
}

export const rebuild = function (e) {
  return {
    uid: (e.uid !== undefined && e.uid !== null) ? String(e.uid) : "",
    name: (e.name !== undefined && e.name !== null) ? String(e.name) : "",
    desc: (e.desc !== undefined && e.desc !== null) ? String(e.desc) : "",
    sub: (e.sub !== undefined && e.sub !== null && Array.isArray(e.sub)) ? e.sub : [],
    type: "sec"
  }
}