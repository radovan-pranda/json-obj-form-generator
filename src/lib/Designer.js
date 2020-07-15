import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody, Input } from 'reactstrap';

import { Container as DesignerContainer, Extensor, isValid, recursive_get_unique_valid, getUids, jsonValid, jsonToMeta } from './components/designer';
import { keyPropType, Default_DkeyPropType } from './utils';
import { copy, close as closeIcon, copy_success, copy_failed } from './icons';
import {
  boolean as bool_icon, invalid_boolean as bool_invalid_icon,
  color as color_icon, invalid_color as color_invalid_icon,
  custom as rgx_icon, invalid_custom as rgx_invalid_icon,
  float as float_icon, invalid_float as float_invalid_icon,
  integer as int_icon, invalid_integer as int_invalid_icon,
  string as str_icon, invalid_string as str_invalid_icon,
  inputlist as float_il_icon, invalid_inputlist as float_il_invalid_icon,
  inputlist as int_il_icon, invalid_inputlist as int_il_invalid_icon,
  inputlist as rgx_il_icon, invalid_inputlist as rgx_il_invalid_icon,
  inputlist as str_il_icon, invalid_inputlist as str_il_invalid_icon,
  paragraph as p_icon, invalid_paragraph as p_invalid_icon,
  section as sec_icon, invalid_section as sec_invalid_icon,
  section as pack_icon, invalid_section as pack_invalid_icon,
  error as errorsIcon,
  errorAlert as errorsAlertIcon,
  alert as alertIcon,
  warnings as warningsIcon,
  warningAlert as warningsAlertIcon,
  fatal_error,
  up, down, view, unview, dropIco as drop,
  preview, designer, exportIco
} from './components/designer/icons';

import { designer_aliases, package_designer_aliases } from './components/shared';

import {
  BoolTranslationPropType, BasicTypeTranslationPropType, CustomTranslationPropType, FloatTranslationPropType, IntegerTranslationPropType, ParagraphTranslationPropType, StringTranslationPropType, ListFloatTranslationPropType, ListIntegerTranslationPropType, ListCustomTranslationPropType, ListStringTranslationPropType, SecTranslationPropType, PackTranslationPropType,
  Default_BoolTranslation, Default_ColorTranslation, Default_CustomTranslation, Default_FloatTranslation, Default_IntTranslation, Default_ParagraphTranslation, Default_StringTranslation, Default_ListFloatTranslation, Default_ListIntegerTranslation, Default_ListCustomTranslation, Default_ListStringTranslation, Default_SecTranslation, Default_PackTranslation
} from './components/designer/propTypes';
import Generator from './Generator';

export default class Designer extends Component {
  state = {
    uids: [],
    valid: [],
    sub_items: [],
    meta: [],
    flag: false,
    fatal_error: false,
    view: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    try {
      if (!prevState.flag) {
        var nextState = {};

        if (nextProps.json !== undefined) {
          nextState.uids = getUids(nextProps.json);
          nextState.meta = jsonToMeta(nextProps.json);
          nextState.sub_items = nextProps.json;
          nextState.valid = jsonValid(nextState.meta);
          nextState.invalid = recursive_get_unique_valid[nextProps.mode](nextState.uids);
        }

        nextState.fatal_error = false;
        return nextState;
      }
      else {
        return {
          flag: false
        };
      }
    }
    catch
    {
      return { fatal_error: true }
    }
  }

  onChange = function (value, valid, idx) {
    var meta = this.state.meta;
    var sub_items = this.state.sub_items;
    var uids = this.state.uids;
    var validx = this.state.valid;

    /* edit element */
    meta[idx] = value;
    sub_items[idx] = designer_aliases[value.type].clean(value);
    uids[idx] = value.uid;
    validx[idx] = valid;

    this.setState({
      sub_items: sub_items,
      uids: uids,
      valid: validx,
      invalid: recursive_get_unique_valid[this.props.mode](uids),
      flag: true
    })

    if (this.props.onChange) {
      this.props.onChange(sub_items, isValid(uids, validx, this.props.mode))
    }
  }.bind(this)

  onChangeSub = function (value, valid, uid, subs, idx) {
    var meta = this.state.meta;
    var sub_items = this.state.sub_items;
    var uids = this.state.uids;
    var validx = this.state.valid;

    /* edit element */
    meta[idx] = value;
    sub_items[idx] = subs;
    uids[idx] = uid;
    validx[idx] = valid;

    this.setState({
      sub_items: sub_items,
      uids: uids,
      valid: validx,
      invalid: recursive_get_unique_valid[this.props.mode](uids),
      flag: true
    })

    if (this.props.onChange) {
      this.props.onChange(sub_items, isValid(uids, validx, this.props.mode))
    }
  }.bind(this)

  addChildren = function (position, type_idx) {
    var sub_items = this.state.sub_items;
    var meta = this.state.meta;
    var uids = this.state.uids;
    var valid = this.state.valid;

    /* adding new element */
    meta.splice(position, 0, { ...designer_aliases[type_idx].prototype() });
    sub_items.splice(position, 0, { ...designer_aliases[type_idx].clean(designer_aliases[type_idx].prototype()) });
    uids.splice(position, 0, designer_aliases[type_idx].defaultUid());
    valid.splice(position, 0, designer_aliases[type_idx].defaultValid());

    this.setState({
      sub_items: sub_items,
      meta: meta,
      uids: uids,
      valid: valid,
      invalid: recursive_get_unique_valid[this.props.mode](uids),
      flag: true
    })

    if (this.props.onChange) {
      this.props.onChange(sub_items, isValid(uids, valid, this.props.mode))
    }
  }.bind(this)

  removeChildren = function (idx) {
    var sub_items = this.state.sub_items;
    var meta = this.state.meta;
    var uids = this.state.uids;
    var valid = this.state.valid;

    /* adding new element */
    meta.splice(idx, 1);
    sub_items.splice(idx, 1);
    uids.splice(idx, 1);
    valid.splice(idx, 1);

    this.setState({
      sub_items: sub_items,
      meta: meta,
      uids: uids,
      valid: valid,
      invalid: recursive_get_unique_valid[this.props.mode](uids),
      flag: true
    })

    if (this.props.onChange) {
      this.props.onChange(sub_items, isValid(uids, valid, this.props.mode))
    }
  }.bind(this)

  changePosition = function (idx, move) {
    var sub_items = this.state.sub_items;
    var meta = this.state.meta;
    var uids = this.state.uids;
    var valid = this.state.valid;

    var sub_idx_move = sub_items[idx];
    var meta_idx_move = meta[idx];
    var uids_idx_move = uids[idx];
    var valid_idx_move = valid[idx];

    sub_items[idx] = sub_items[idx + move];
    meta[idx] = meta[idx + move];
    uids[idx] = uids[idx + move];
    valid[idx] = valid[idx + move];

    sub_items[idx + move] = sub_idx_move;
    meta[idx + move] = meta_idx_move;
    uids[idx + move] = uids_idx_move;
    valid[idx + move] = valid_idx_move;

    this.setState({
      sub_items: sub_items,
      meta: meta,
      uids: uids,
      valid: valid,
      invalid: recursive_get_unique_valid[this.props.mode](uids),
      flag: true
    });

    if (this.props.onChange) {
      this.props.onChange(sub_items, isValid(uids, valid, this.props.mode))
    }
  }.bind(this)

  exportJSON = function () {
    this.setState({ exportOpen: !this.state.exportOpen })
  }.bind(this)

  preview = function () {
    this.setState({ view: !this.state.view })
  }.bind(this)

  copyToClipboard = function () {
    try {
      navigator.clipboard.writeText(JSON.stringify(this.state.sub_items));
      this.setState({
        copy_notification_message: this.props.translation.copy_success,
        copy_notification: true,
        copy_notification_icon: this.props.icons.copy_success,
        copy_notification_color: "jofgen-D-copy-success",
        exportOpen: false
      });
      setTimeout(() => { this.setState({ copy_notification: false }) }, 2000);
    }
    catch
    {
      this.setState({
        copy_notification_message: this.props.translation.copy_fail,
        copy_notification: true,
        copy_notification_icon: this.props.icons.copy_failed,
        copy_notification_color: "jofgen-D-copy-failed",
        exportOpen: false
      });

      setTimeout(() => { this.setState({ copy_notification: false }) }, 2000);
    }
  }.bind(this)

  render() {
    var exportBtn;
    if (this.state.fatal_error) {
      return (
        <div className={(this.props.className !== undefined)?(this.props.className):"" + " jofgen-D-fatal-error"} style={this.props.style} >
          {this.props.fatal_error.icon}
          <div className="jofgen-D-text-fatal-error">
            {this.props.fatal_error.text}
          </div>
        </div>
      )
    }

    var extendedBtn; 
    if (this.props.extended)
    {
      extendedBtn = <Fragment>
        <Button onClick={this.preview} color="success" size={this.props.size} active={this.state.view} >{(this.state.view)?(<>{this.props.icons.designer}{this.props.translation.backToDesigner}</>):(<>{this.props.icons.preview}{this.props.translation.formPreview}</>)}</Button>
      </Fragment>; 
    }

    if (this.props.export) {
      exportBtn = <Fragment>
        <Button className="ml-1" onClick={this.exportJSON} color="primary" size={this.props.size} >{this.props.icons.export}{this.props.translation.export}</Button>
        <Modal isOpen={this.state.exportOpen} size="lg" centered={true} >
          <ModalBody>
            <table className="jofgen-D-title" style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td><h5>{this.props.translation.export}</h5></td>
                  <td style={{ fontWeight: "bold", textAlign: "right" }}>
                    <Button onClick={this.copyToClipboard} size={this.props.size} >{this.props.icons.copy} {this.props.translation.copyToClipboard}</Button>
                    <Button color="link" onClick={this.exportJSON} size={this.props.size} >{this.props.icons.close}</Button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <Input type="textarea" value={JSON.stringify(this.state.sub_items)} bsSize={this.props.size} />
            </div>
          </ModalBody>
        </Modal>
      </Fragment>;
    }

    var no_of_elements = this.state.meta.length - 1;


    if (this.state.view)
    {
      return (
        <div>
          <Modal isOpen={this.state.copy_notification} size="sm" centered={true} >
            <ModalBody className={this.state.copy_notification_color}>
              {this.state.copy_notification_icon}
              {this.state.copy_notification_message}
            </ModalBody>
          </Modal>
          <table className="jofgen-D-title" style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td><h5>{this.props.title}</h5></td>
                <td style={{ fontWeight: "bold", textAlign: "right" }}>
                  {extendedBtn}
                  {exportBtn}
                </td>
              </tr>
            </tbody>
          </table>

          <Generator json={this.state.sub_items} />
        </div>
      );
    }

    return (
      <div>
        <Modal isOpen={this.state.copy_notification} size="sm" centered={true} >
          <ModalBody className={this.state.copy_notification_color}>
            {this.state.copy_notification_icon}
            {this.state.copy_notification_message}
          </ModalBody>
        </Modal>
        <table className="jofgen-D-title" style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td><h5>{this.props.title}</h5></td>
              <td style={{ fontWeight: "bold", textAlign: "right" }}>
                {extendedBtn}
                {exportBtn}
              </td>
            </tr>
          </tbody>
        </table>

        <Extensor
          style={{ paddingBottom: "10px" }}
          names={this.props.translation.types}
          values={designer_aliases}
          size={this.props.size}
          onSubmit={(e) => { this.addChildren(0, e); }}
        />
        {this.state.meta.map(
          (item, idx) => {
            var Tag;
            if (designer_aliases[item.type] !== undefined) {
              Tag = designer_aliases[item.type].tag;
              return (
                <Fragment key={idx}>
                  <DesignerContainer
                    onUpButtonClick={(idx > 0) ? (() => this.changePosition(idx, -1)) : undefined}
                    onDownButtonClick={(idx < no_of_elements) ? (() => this.changePosition(idx, 1)) : undefined}
                    onRemoveButtonClick={() => this.removeChildren(idx)}
                    hideDissabled={false}
                    extras={this.state.sub_items[idx]}
                    size={this.props.size}
                    icons={this.props.icons.container}
                    extended={this.props.extended} >
                    <Tag
                      uids={this.state.uids[idx]}
                      invalid={this.state.invalid[idx]}
                      valid={this.state.valid[idx]}
                      key={idx}
                      extended={this.props.extended}
                      value={item}
                      sub_items={this.state.sub_items[idx]}
                      mode={this.props.mode}
                      className={this.props.className}
                      size={this.props.size}
                      jkey={this.props.jkey}
                      icons_set={this.props.icons}
                      icons={this.props.icons.types[item.type]}
                      sm={this.props.sm}
                      onChange={(value, valid) => { this.onChange(value, valid, idx) }}
                      onChangeSub={(value, valid, uids, subs) => { this.onChangeSub(value, valid, uids, subs, idx) }}
                      translation={this.props.translation.types[item.type]}
                      translations={this.props.translation}
                      designer_aliases={designer_aliases}
                      package_designer_aliases={package_designer_aliases} />
                  </DesignerContainer>
                  <Extensor
                    key={"e-" + idx}
                    style={{ paddingBottom: "10px" }}
                    names={this.props.translation.types}
                    values={designer_aliases}
                    size={this.props.size}
                    onSubmit={(e) => { this.addChildren(idx + 1, e); }}
                  />
                </Fragment>);
            }

            return null;
          }
        )}

      </div>);
  }
}

Designer.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  export: PropTypes.bool,
  json: PropTypes.arrayOf(PropTypes.object),
  json_compression: PropTypes.oneOf(["min", "max"]),
  mode: PropTypes.oneOf(["tree", "linear", "linear_merge"]),
  hideDissabled: PropTypes.bool,
  jkey: PropTypes.shape(keyPropType),
  size: PropTypes.string,
  translation: PropTypes.shape({
    export: PropTypes.string.isRequired,
    formPreview: PropTypes.string.isRequired,
    backToDesigner: PropTypes.string.isRequired,
    copy_success: PropTypes.string.isRequired,
    copy_fail: PropTypes.string.isRequired,
    copyToClipboard: PropTypes.string.isRequired,
    types: PropTypes.exact({
      // primitives     
      bool: PropTypes.shape(BoolTranslationPropType),
      color: PropTypes.shape(BasicTypeTranslationPropType),
      rgx: PropTypes.shape(CustomTranslationPropType),
      float: PropTypes.shape(FloatTranslationPropType),
      int: PropTypes.shape(IntegerTranslationPropType),
      p: PropTypes.shape(ParagraphTranslationPropType),
      str: PropTypes.shape(StringTranslationPropType),

      // input lists      
      float_il: PropTypes.shape(ListFloatTranslationPropType),
      int_il: PropTypes.shape(ListIntegerTranslationPropType),
      rgx_il: PropTypes.shape(ListCustomTranslationPropType),
      str_il: PropTypes.shape(ListStringTranslationPropType),

      // sections
      sec: PropTypes.shape(SecTranslationPropType),
      pack: PropTypes.shape(PackTranslationPropType)
    })
  }),
  icons: PropTypes.shape({
    close: PropTypes.any.isRequired,
    copy: PropTypes.any.isRequired,
    designer: PropTypes.any.isRequired,
    preview: PropTypes.any.isRequired,
    copy_success: PropTypes.any.isRequired,
    export: PropTypes.any.isRequired,
    copy_failed: PropTypes.any.isRequired,
    container: PropTypes.exact({
      view: PropTypes.any.isRequired,
      unview: PropTypes.any.isRequired,
      drop: PropTypes.any.isRequired,
      arrowDown: PropTypes.any.isRequired,
      arrowUp: PropTypes.any.isRequired
    }),
    types: PropTypes.exact({
      // primitives     
      bool: PropTypes.shape({
        icon: PropTypes.any.isRequired,
        invalid_icon: PropTypes.any.isRequired,
        errors: PropTypes.any.isRequired,
        errorsAlert: PropTypes.any.isRequired
      }).isRequired,
      color: PropTypes.shape({
        icon: PropTypes.any.isRequired,
        invalid_icon: PropTypes.any.isRequired,
        errors: PropTypes.any.isRequired,
        errorsAlert: PropTypes.any.isRequired,
        warnings: PropTypes.any.isRequired,
        warningsAlert: PropTypes.any.isRequired
      }).isRequired,
      rgx: PropTypes.shape({
        icon: PropTypes.any.isRequired,
        invalid_icon: PropTypes.any.isRequired,
        errors: PropTypes.any.isRequired,
        errorsAlert: PropTypes.any.isRequired
      }).isRequired,
      float: PropTypes.shape({
        icon: PropTypes.any.isRequired,
        invalid_icon: PropTypes.any.isRequired,
        errors: PropTypes.any.isRequired,
        errorsAlert: PropTypes.any.isRequired,
        warnings: PropTypes.any.isRequired,
        warningsAlert: PropTypes.any.isRequired
      }).isRequired,
      int: PropTypes.shape({
        icon: PropTypes.any.isRequired,
        invalid_icon: PropTypes.any.isRequired,
        errors: PropTypes.any.isRequired,
        errorsAlert: PropTypes.any.isRequired,
        warnings: PropTypes.any.isRequired,
        warningsAlert: PropTypes.any.isRequired
      }).isRequired,
      p: PropTypes.shape({
        icon: PropTypes.any.isRequired,
        invalid_icon: PropTypes.any.isRequired,
        alert: PropTypes.any.isRequired
      }).isRequired,
      str: PropTypes.shape({
        icon: PropTypes.any.isRequired,
        invalid_icon: PropTypes.any.isRequired,
        errors: PropTypes.any.isRequired,
        errorsAlert: PropTypes.any.isRequired,
        warnings: PropTypes.any.isRequired,
        warningsAlert: PropTypes.any.isRequired
      }).isRequired,

      // input lists      
      float_il: PropTypes.shape({
        icon: PropTypes.any.isRequired,
        invalid_icon: PropTypes.any.isRequired,
        errors: PropTypes.any.isRequired,
        errorsAlert: PropTypes.any.isRequired,
        warnings: PropTypes.any.isRequired,
        warningsAlert: PropTypes.any.isRequired
      }).isRequired,
      int_il: PropTypes.shape({
        icon: PropTypes.any.isRequired,
        invalid_icon: PropTypes.any.isRequired,
        errors: PropTypes.any.isRequired,
        errorsAlert: PropTypes.any.isRequired,
        warnings: PropTypes.any.isRequired,
        warningsAlert: PropTypes.any.isRequired
      }).isRequired,
      rgx_il: PropTypes.shape({
        icon: PropTypes.any.isRequired,
        invalid_icon: PropTypes.any.isRequired,
        errors: PropTypes.any.isRequired,
        errorsAlert: PropTypes.any.isRequired,
        warnings: PropTypes.any.isRequired,
        warningsAlert: PropTypes.any.isRequired
      }).isRequired,
      str_il: PropTypes.shape({
        icon: PropTypes.any.isRequired,
        invalid_icon: PropTypes.any.isRequired,
        errors: PropTypes.any.isRequired,
        errorsAlert: PropTypes.any.isRequired,
        warnings: PropTypes.any.isRequired,
        warningsAlert: PropTypes.any.isRequired
      }).isRequired,

      // sections
      sec: PropTypes.shape({
        icon: PropTypes.any.isRequired,
        invalid_icon: PropTypes.any.isRequired,
        errors: PropTypes.any.isRequired,
        errorsAlert: PropTypes.any.isRequired
      }).isRequired,
      pack: PropTypes.shape({
        icon: PropTypes.any.isRequired,
        invalid_icon: PropTypes.any.isRequired,
        errors: PropTypes.any.isRequired,
        errorsAlert: PropTypes.any.isRequired
      }).isRequired
    })
  }),
  fatal_error: PropTypes.shape({
    icon: PropTypes.any,
    text: PropTypes.string
  }),
  extended: PropTypes.bool
};

Designer.defaultProps = {
  title: "Designer",
  extended: true,
  jkey: Default_DkeyPropType,
  mode: "tree",
  hideDissabled: true,
  export: false,
  size: "sm",
  json_compression: "max",
  fatal_error: {
    icon: fatal_error,
    text: "Ooops... Something went wrong. Unable to render designer."
  },
  translation: {
    export: "Export JSON",
    formPreview: "Form preview",
    copyToClipboard: "Copy to clipboard",
    backToDesigner: "Back to designer",
    copy_success: "Successfully copied to clipboard",
    copy_fail: "Oops .. Something went wrong. Copying to clipboard failed",
    types: {
      bool: Default_BoolTranslation,
      color: Default_ColorTranslation,
      rgx: Default_CustomTranslation,
      float: Default_FloatTranslation,
      int: Default_IntTranslation,
      p: Default_ParagraphTranslation,
      str: Default_StringTranslation,
      float_il: Default_ListFloatTranslation,
      int_il: Default_ListIntegerTranslation,
      rgx_il: Default_ListCustomTranslation,
      str_il: Default_ListStringTranslation,
      sec: Default_SecTranslation,
      pack: Default_PackTranslation
    }
  },
  icons: {
    close: closeIcon,
    copy: copy,
    export: exportIco,
    copy_success: copy_success,
    designer: designer,
    preview: preview,
    copy_failed: copy_failed,
    container: {
      view: view,
      unview: unview,
      drop: drop,
      arrowDown: down,
      arrowUp: up
    },
    types: {
      bool: {
        icon: bool_icon,
        invalid_icon: bool_invalid_icon,
        errors: errorsIcon,
        errorsAlert: errorsAlertIcon
      },
      color: {
        icon: color_icon,
        invalid_icon: color_invalid_icon,
        errors: errorsIcon,
        errorsAlert: errorsAlertIcon,
        warnings: warningsIcon,
        warningsAlert: warningsAlertIcon
      },
      rgx: {
        icon: rgx_icon,
        invalid_icon: rgx_invalid_icon,
        errors: errorsIcon,
        errorsAlert: errorsAlertIcon,
        warnings: warningsIcon,
        warningsAlert: warningsAlertIcon
      },
      float: {
        icon: float_icon,
        invalid_icon: float_invalid_icon,
        errors: errorsIcon,
        errorsAlert: errorsAlertIcon,
        warnings: warningsIcon,
        warningsAlert: warningsAlertIcon
      },
      int: {
        icon: int_icon,
        invalid_icon: int_invalid_icon,
        errors: errorsIcon,
        errorsAlert: errorsAlertIcon,
        warnings: warningsIcon,
        warningsAlert: warningsAlertIcon
      },
      p: {
        icon: p_icon,
        invalid_icon: p_invalid_icon,
        alert: alertIcon
      },
      str: {
        icon: str_icon,
        invalid_icon: str_invalid_icon,
        errors: errorsIcon,
        errorsAlert: errorsAlertIcon,
        warnings: warningsIcon,
        warningsAlert: warningsAlertIcon
      },
      float_il: {
        icon: float_il_icon,
        invalid_icon: float_il_invalid_icon,
        errors: errorsIcon,
        errorsAlert: errorsAlertIcon,
        warnings: warningsIcon,
        warningsAlert: warningsAlertIcon
      },
      int_il: {
        icon: int_il_icon,
        invalid_icon: int_il_invalid_icon,
        errors: errorsIcon,
        errorsAlert: errorsAlertIcon,
        warnings: warningsIcon,
        warningsAlert: warningsAlertIcon
      },
      rgx_il: {
        icon: rgx_il_icon,
        invalid_icon: rgx_il_invalid_icon,
        errors: errorsIcon,
        errorsAlert: errorsAlertIcon,
        warnings: warningsIcon,
        warningsAlert: warningsAlertIcon
      },
      str_il: {
        icon: str_il_icon,
        invalid_icon: str_il_invalid_icon,
        errors: errorsIcon,
        errorsAlert: errorsAlertIcon,
        warnings: warningsIcon,
        warningsAlert: warningsAlertIcon
      },
      sec: {
        icon: sec_icon,
        invalid_icon: sec_invalid_icon,
        errors: errorsIcon,
        errorsAlert: errorsAlertIcon
      },
      pack: {
        icon: pack_icon,
        invalid_icon: pack_invalid_icon,
        errors: errorsIcon,
        errorsAlert: errorsAlertIcon
      }
    }
  }
};