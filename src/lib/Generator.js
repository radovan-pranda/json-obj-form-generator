import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Default_GkeyPropType, keyPropType, unique_id_test } from './utils';

import {
  Container,
  metaValueToTree, metaValueToLinear, metaValueToLinearMerge,
  valueToMeta_Tree, valueToMeta_LinearMerge, valueToMeta_Linear,
  jsonToMeta_Tree,
  invalidCheck
} from './components/generator';
import { isValid, getUids, jsonValid, jsonToMeta } from './components/designer';
import { generator_aliases } from './components/shared';
import { fatal_error } from './components/generator/icons';

const metaTo = {
  tree: metaValueToTree,
  linear_merge: metaValueToLinearMerge,
  linear: metaValueToLinear
}

const toMeta = {
  tree: valueToMeta_Tree,
  linear_merge: valueToMeta_LinearMerge,
  linear: valueToMeta_Linear
}

export default class Generator extends Component {
  state = {
    errors: [],
    meta: {},
    defaults: {},
    req: {},
    json: [],
    valid: [],
    flag: false,
    fatal_error: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (!prevState.flag) {
      if (typeof nextProps.json !== "object" || !Array.isArray(nextProps.json)) {
        console.error("Parameter JSON must be array"); 
        return { fatal_error: true }
      }

      var uids = getUids(nextProps.json);
      var meta = jsonToMeta(nextProps.json);
      var valid = jsonValid(meta);

      try {
        if (!isValid(uids, valid, nextProps.mode)) {
          return { fatal_error: true };
        }

        var nextState = { fatal_error: false };
        var meta;

        if (nextProps.value !== undefined) {
          meta = toMeta[nextProps.mode](nextProps.json, nextProps.value, nextProps.sep);
          nextState.meta = meta[0];
          nextState.errors = meta[1];
          nextState.defaults = meta[2];
          nextState.req = meta[3];
          nextState.json = nextProps.json;
        }
        else {
          meta = jsonToMeta_Tree(nextProps.json);
          nextState.meta = meta[0];
          nextState.errors = meta[1];
          nextState.defaults = meta[2];
          nextState.req = meta[3];
          nextState.json = nextProps.json;
        }

        return nextState;
      }
      catch
      {
        return { fatal_error: true }
      }
    }
    else {
      return {
        flag: false
      };
    }
  }

  onChange = function (unique_id, value, valid, idx) {
    var prevVal = this.state.meta;
    var prevErr = this.state.errors;

    if (value === null || value === undefined) {
      delete prevVal[unique_id];
      prevErr[unique_id] = { invalid: false };
    }
    else {
      prevVal[unique_id] = value["value"];
      prevErr[unique_id] = value["errors"];
    }

    this.setState({ meta: prevVal, errors: prevErr, flag: true });

    var invalid = invalidCheck(prevErr);
    var val = metaTo[this.props.mode](prevVal, this.state.defaults, this.state.req, prevErr, this.props.sep);

    if (this.props.onChange) {
      this.props.onChange(val, !invalid)
    }

    if (this.props.isValid) {
      this.props.isValid(!invalid)
    }
  }.bind(this)

  render() {
    if (this.state.fatal_error) {
      return (
        <div className={(this.props.className !== undefined) ? (this.props.className) : "" + " jofgen-fatal-error"} style={this.props.style} >
          {this.props.fatal_error.icon}
          <div className="jofgen-text-fatal-error">
            {this.props.fatal_error.text}
          </div>
        </div>
      )
    }

    var genaliaseskeys = Object.keys(generator_aliases);
    return <div className={this.props.className} style={this.props.style} >
      {this.state.json.map(
        (item, idx) => {
          var Tag;
          var gen;

          if (genaliaseskeys.includes(item.type)) {
            gen = generator_aliases[item.type];
          }
          else {
            gen = generator_aliases.err;
          }

          Tag = gen.tag;

          if (gen.useContainer) {
            return (
              <Fragment key={idx}>
                <Container {...item} >
                  <Tag {...item}
                    mode={this.props.mode}
                    errors={this.state.errors[item.uid]}
                    value={this.state.meta[item.uid]}
                    className={this.props.className}
                    size={this.props.size}
                    jkey={this.props.jkey}
                    invalid={false}
                    sm={this.props.sm}
                    onChange={(id, val, valid) => { this.onChange(id, val, valid, idx) }}
                    isValid={() => { }}
                    invalidCheck={invalidCheck}
                    generator_aliases={generator_aliases}
                  />
                </Container>
              </Fragment>
            );
          }
          else {
            return (
              <Fragment>
                <Tag {...item}
                  mode={this.props.mode}
                  errors={this.state.errors[item.uid]}
                  value={this.state.meta[item.uid]}
                  className={this.props.className}
                  size={this.props.size}
                  jkey={this.props.jkey}
                  invalid={false}
                  sm={this.props.sm}
                  onChange={(id, val, valid) => { this.onChange(id, val, valid, idx) }}
                  isValid={() => { }}
                  invalidCheck={invalidCheck}
                  generator_aliases={generator_aliases}
                />
              </Fragment>
            );
          }
        }
      )}
    </div>
  }
}

Generator.propTypes = {
  onChange: PropTypes.func,
  isValid: PropTypes.func,
  json: function (props, propName, componentName) {
    if (props[propName] === undefined) {
      return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value is required, otherwise there is nothing to generate here.');
    }

    if (!Array.isArray(props[propName])) {
      return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be object or array of objects.');
    }


    var uids = getUids(props[propName]);
    var meta = jsonToMeta(props[propName]);
    var valid = jsonValid(meta);

    if (!isValid(uids, valid, props["mode"])) {
      return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. JSON object is not valid - some IDs are not unique.');
    }

  },
  value: PropTypes.object,
  mode: PropTypes.oneOf(["tree", "linear", "linear_merge"]),
  sep: PropTypes.string,
  size: PropTypes.string,
  jkey: PropTypes.shape(keyPropType),
  sm: PropTypes.oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]),
  fatal_error: PropTypes.shape({
    icon: PropTypes.any,
    text: PropTypes.string
  })
};

Generator.defaultProps = {
  mode: "linear",
  jkey: Default_GkeyPropType,
  json: [],
  sep: ".",
  sm: "12",
  size: "sm",
  fatal_error: {
    icon: fatal_error,
    text: "Ooops... Something went wrong. Unable to render form."
  }
};