import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Input, Button } from 'reactstrap';
import { idGenerator } from './../utils';
import { plus as addIcon, trashCan as dropIcon } from './../icons';
import { Default_keyPropType, keyPropType } from './../propTypes';
import { intValid } from './../validators';

export default class ListDefType extends Component {
  state = { 
    values: [],
    new_name: '',
    new_value: '',
    new_tip: '',
    popUp: false,
    gId: idGenerator(this.props.jkey.prefix + "tdeflst" + this.props.jkey.sufix)
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    var nextState = {};
    if (!prevState.flag) {
      if (nextProps.values && nextProps.values !== prevState.values)
      {
        nextState.values = nextProps.values;
      }
    }
    else
    {
      nextState.flag = false;
    }

    return nextState;
  }

  onChange = function (e) {
    var type = e.target.name.split('-');

    if (type[1] === "new")
    {
      switch (type[0])
      {
        case "name":
          this.setState({ new_name: e.target.value });
          break;

        case "value":
          this.setState({ new_value: e.target.value });
          break;

        case "tip":
          this.setState({ new_tip: e.target.value });
          break;
          
        default:
          break;
      }
    }
    else
    {      
      var props = this.state.values;
      var idx = parseInt(type[1]);
      props[idx][type[0]] = e.target.value;
      this.setState({ values: props });

      if (this.props.onChange !== undefined)
      {
          this.props.onChange(this.props.uid, props, (!this.props.minNo || (this.props.minNo && this.props.minNo.length <= props.length)));
      }
    }
  }.bind(this)

  drop = function (idx) {
    var props = this.state.values;
    props.splice(idx, 1);

    if (this.props.values === undefined) {
      this.setState({ values: props });
    }  

    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.uid, props, (!this.props.minNo || (this.props.minNo && this.props.minNo.length <= props.length)));
    }
  }.bind(this)

  add = function () {
    var props = this.state.values;
    props.push({ name: this.state.new_name, value: this.state.new_value, tip: this.state.new_tip });

    if (this.props.values === undefined) {
      this.setState({ values: props, new_name: '', new_tip: '', new_value: '' });
    }  

    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.uid, props, (!this.props.minNo || (this.props.minNo && this.props.minNo.length <= props.length)));
    }
  }.bind(this)

  render() {
    return (
      <div className={this.props.className + "jofgen-D-card-chcklstdef"} style={this.props.style}>
          <FormGroup row className={"jofgen-D-card-chcklstdef-row"}>
                <Col>
                  <table className="jofgen-D-card-chcklstdef-table">
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            type="text"
                            name="name-new"
                            bsSize={this.props.size}
                            placeholder={this.props.translation.name}
                            value={this.state.new_name}
                            onChange={this.onChange}
                          />
                        </td>
                        <td>
                          <Input
                            type="text" 
                            name="value-new"
                            bsSize={this.props.size}
                            placeholder={this.props.translation.value}
                            value={this.state.new_value}
                            onChange={this.onChange}
                          />
                        </td>
                        <td>
                          <Input
                            type="text" 
                            name="tip-new"
                            bsSize={this.props.size}
                            placeholder={this.props.translation.tip}
                            value={this.state.new_tip}
                            onChange={this.onChange}
                          />
                        </td>

                        <td className="btns" >
                          <Button className="btn-add" color="light" size="sm" onClick={this.add}  >
                            {this.props.icons.add}
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </FormGroup>

        {
          this.state.values.map((item, idx) => {
            return (
              <FormGroup key={this.state.gId + "-" + idx} row className={"jofgen-D-card-chcklstdef-row"}>
                <Col>
                  <table className="jofgen-D-card-chcklstdef-table">
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            type="text"
                            name={"name-"+idx}
                            bsSize={this.props.size}
                            placeholder={this.props.translation.name}
                            value={item.name}
                            onChange={this.onChange}
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            name={"value-"+idx}
                            bsSize={this.props.size}
                            placeholder={this.props.translation.value}
                            value={item.value}
                            onChange={this.onChange}
                          />
                          
                        </td>
                        <td>
                          <Input
                            type="text"
                            name={"tip-"+idx}
                            bsSize={this.props.size}
                            placeholder={this.props.translation.tip}
                            value={item.tip}
                            onChange={this.onChange}
                          />
                        </td>

                        <td className="btns" >
                          <Button className="btn-remove" color="light" size="sm" onClick={() => { this.drop(idx); }} >
                            {this.props.icons.drop}
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </FormGroup>
            );
          })
        }
      </div>
    );
  }
}

ListDefType.propTypes = {
  minNo: function(props, propName, componentName) {
    if (props[propName] !== undefined)
    {
      if (!intValid(String(props[propName]))) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be integer.');
      }

      if (props[propName] < 0)
      {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than zero or equal to zero.');
      }

      if (props["maxNo"] !== undefined && props["maxNo"] < props[propName])
      {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be lower than maxNo.');
      }
    }
  },
  maxNo: function(props, propName, componentName) {
    if (props[propName] !== undefined)
    {
      if (!intValid(String(props[propName]))) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be integer.');
      }

      if (props[propName] < 0)
      {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than zero or equal to zero.');
      }

      if (props["minNo"] !== undefined && props["minNo"] > props[propName])
      {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Value must be greater than minNo.');
      }
    }
  },
  values: PropTypes.arrayOf(
    PropTypes.shape(
      {
        name: PropTypes.string,
        value: PropTypes.string,
        tip: PropTypes.string
      }
    )
  ),
  jkey: PropTypes.shape(keyPropType),
  size: PropTypes.string,
  icons: PropTypes.shape(
    {
      add: PropTypes.any.isRequired,
      drop: PropTypes.any.isRequired
    }
  ),

  translation: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired
  }),

  onChange: PropTypes.func
};


ListDefType.defaultProps = {
  className: "",
  size: "sm",
  translation: {
    name: "Name",
    value: "Value",
    tip: "Tip - popup text"
  },
  jkey: Default_keyPropType,
  icons: {
    add: addIcon,
    drop: dropIcon
  }
};