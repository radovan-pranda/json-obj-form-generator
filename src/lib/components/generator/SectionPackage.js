import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, CardBody, Card, ButtonGroup, Row, Col } from 'reactstrap';
import { Default_keyPropType, keyPropType, translationUid, Default_translationUid } from './propTypes';
import { error as invalidIcon } from './icons';
import Container from './Container';

export class SectionPackage extends Component {
    state = {
        stack_opened: 0,
        list_opened: [],
        flag: false
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.flag) {
            if (nextProps.sub !== undefined && nextProps.sub.length !== prevState.list_opened.length) {
                var i;
                var next_list_opened = [];
                for (i = 0; i < nextProps.sub.length; i++) {
                    next_list_opened.push(false);
                }

                return { list_opened: next_list_opened };
            }
            else {
                return {};
            }
        }
        else {
            return { flag: false };
        }
    }

    onSubChange = function (unique_id, value, valid, idx, section_uid, section_idx) {
        var prevVal = this.props.value;
        var prevErr = this.props.errors;
        var invalid = this.props.invalidCheck(prevErr);

        if (value === null || value === undefined) {
            delete prevVal[section_uid][unique_id];
            prevErr[section_uid][unique_id] = { invalid: false };
        }
        else {
            prevVal[section_uid][unique_id] = value["value"];
            prevErr[section_uid][unique_id] = value["errors"];
        }

        if (this.props.onChange) {
            this.props.onChange(this.props.uid, { value: prevVal, errors: prevErr }, !invalid);
        }

        if (this.props.isValid) {
            this.props.isValid(!invalid);
        }
    }.bind(this)

    onClickStack = function (e) {
        this.setState({ stack_opened: e, flag: true });
    }.bind(this)

    onClickList = function (e) {
        var lst = this.state.list_opened;
        lst[e] = !lst[e];
        this.setState({ list_opened: lst, flag: true });
    }.bind(this)

    isSubValid = function()
    {
    }.bind(this)

    render() {
        var genaliaseskeys = Object.keys(this.props.generator_aliases);
        if (this.props.sub !== undefined) {
            switch (this.props.design) {
                case "list":
                    return (
                        <ListGroup className="jofgen-sec-list">
                            {
                                this.props.sub.map((item, idx) => {
                                    return (
                                        <ListGroupItem key={idx}>
                                            <ListGroupItemHeading onClick={() => { this.onClickList(idx); }}>
                                                <table style={{ width: "100%" }}>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <b className="jofgen-sec-list-title">{(item.name === undefined) ? item.uid : item.name}</b>
                                                                {(item.desc !== undefined) ? <div className="jofgen-sec-list-desc text-muted">{item.desc}</div> : <></>}
                                                            </td>
                                                            <td style={{ width: "50px", textAlign: "right" }}>
                                                                <Button size={this.props.size} color="link" >
                                                                    <svg className="jofgen-collapse-icon" style={{ transform: ((this.state.list_opened[idx]) ? "rotate(180deg)" : "rotate(0deg)") }} viewBox="0 0 24 24"><path fill="#000" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </ListGroupItemHeading>
                                            <Collapse isOpen={this.state.list_opened[idx]}>
                                                <ListGroupItemText>
                                                    <Row>
                                                    {
                                                        (item.sub !== undefined) ?
                                                            item.sub.map(
                                                                (sub_item, sub_idx) => {
                                                                    var Tag;
                                                                    var gen;

                                                                    if (genaliaseskeys.includes(sub_item.type)) {
                                                                        gen = this.props.generator_aliases[sub_item.type];
                                                                    }
                                                                    else {
                                                                        gen = this.props.generator_aliases.err;
                                                                    }

                                                                    Tag = gen.tag;

                                                                    if (gen.useContainer) {
                                                                        return (
                                                                            <Fragment>
                                                                                <Container key={sub_idx} 
                                                                                    {...sub_item} 
                                                                                    sm={
                                                                                        (
                                                                                          (sub_item.sm !== undefined && sub_item.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(sub_item.sm))
                                                                                            ? sub_item.sm
                                                                                            : (
                                                                                              (this.props.sm !== undefined && this.props.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(this.props.sm))
                                                                                                ? this.props.sm
                                                                                                : "12"
                                                                                            )
                                                                                        )
                                                                                    }
                                                                                    req_indicator={this.props.req_indicator} >
                                                                                    <Tag {...sub_item}
                                                                                        mode={this.props.mode}
                                                                                        errors={this.props.errors[item.uid][sub_item.uid]}
                                                                                        value={this.props.value[item.uid][sub_item.uid]}
                                                                                        className={this.props.className}
                                                                                        size={this.props.size}
                                                                                        req_indicator={this.props.req_indicator}
                                                                                        jkey={this.props.jkey}
                                                                                        invalid={false}
                                                                                        sm={this.props.sm}
                                                                                        onChange={(id, val, valid) => { this.onSubChange(id, val, valid, sub_idx, item.uid, idx) }}
                                                                                        isValid={(valid) => { this.isSubValid(valid, sub_idx, item.uid, idx) }}
                                                                                        invalidCheck={this.props.invalidCheck}
                                                                                        generator_aliases={this.props.generator_aliases}
                                                                                    />
                                                                                </Container>
                                                                            </Fragment>
                                                                        );
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <Fragment>
                                                                                <Col sm={
                                                                                    (
                                                                                        (sub_item.sm !== undefined && sub_item.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(sub_item.sm))
                                                                                        ? sub_item.sm
                                                                                        : (     
                                                                                            (this.props.sm !== undefined && this.props.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(this.props.sm))
                                                                                            ? this.props.sm
                                                                                            : "12"
                                                                                        )
                                                                                    )
                                                                                }
                                                                                >
                                                                                <Tag {...sub_item}
                                                                                    mode={this.props.mode}
                                                                                    errors={this.props.errors[item.uid][sub_item.uid]}
                                                                                    value={this.props.value[item.uid][sub_item.uid]}
                                                                                    className={this.props.className}
                                                                                    size={this.props.size}
                                                                                    req_indicator={this.props.req_indicator}
                                                                                    jkey={this.props.jkey}
                                                                                    invalid={false}
                                                                                    sm={this.props.sm}
                                                                                    onChange={(id, val, valid) => { this.onSubChange(id, val, valid, sub_idx, item.uid, idx) }}
                                                                                    isValid={(valid) => { this.isSubValid(valid, sub_idx, item.uid, idx) }}
                                                                                    invalidCheck={this.props.invalidCheck}
                                                                                    generator_aliases={this.props.generator_aliases}
                                                                                />
                                                                                </Col>
                                                                            </Fragment>
                                                                        );
                                                                    }
                                                                }
                                                            )
                                                            : <></>
                                                    }
                                                    </Row>
                                                </ListGroupItemText>
                                            </Collapse>
                                        </ListGroupItem>
                                    );
                                })
                            }
                        </ListGroup>
                    );

                case "stack":
                    return (
                        <div className="jofgen-sec-stack">
                            <ButtonGroup className="jofgen-sec-stack-btns" >
                                {
                                    this.props.sub.map((item, idx) => {
                                        var invalid = this.props.invalidCheck(this.props.errors[item.uid]);
                                        return (
                                            <Button color="jofgen-theme" className={(invalid && this.state.stack_opened === idx) ? "invalid-active" : ""} active={(this.state.stack_opened === idx)} onClick={() => { this.onClickStack(idx); }}>
                                                {(invalid) ? invalidIcon : null}
                                                {(item.name === undefined) ? item.uid : item.name}
                                            </Button>
                                        );
                                    })
                                }
                            </ButtonGroup>
                            <div className="jofgen-sec-stack-body">
                                {
                                    this.props.sub.map((item, idx) => {
                                        if (idx !== this.state.stack_opened) {
                                            return (<></>);
                                        }

                                        return (
                                            <Fragment key={"sec-pack-" + idx}>
                                                <Row>
                                                {
                                                    (item.sub !== undefined) ? <>
                                                        {(item.desc !== undefined) ? <div className="jofgen-sec-stack-desc  text-muted">{item.desc}</div> : null}
                                                        {item.sub.map(
                                                            (sub_item, sub_idx) => {
                                                                var Tag;
                                                                var gen;

                                                                if (genaliaseskeys.includes(sub_item.type)) {
                                                                    gen = this.props.generator_aliases[sub_item.type];
                                                                }
                                                                else {
                                                                    gen = this.props.generator_aliases.err;
                                                                }

                                                                Tag = gen.tag;

                                                                if (gen.useContainer) {
                                                                    return (
                                                                        <Fragment>
                                                                            <Container 
                                                                                key={"sec-" + sub_idx}
                                                                                {...sub_item} 
                                                                                sm={
                                                                                    (
                                                                                      (sub_item.sm !== undefined && sub_item.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(sub_item.sm))
                                                                                        ? sub_item.sm
                                                                                        : (
                                                                                          (this.props.sm !== undefined && this.props.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(this.props.sm))
                                                                                            ? this.props.sm
                                                                                            : "12"
                                                                                        )
                                                                                    )
                                                                                }
                                                                                req_indicator={this.props.req_indicator} >
                                                                                <Tag {...sub_item}
                                                                                    mode={this.props.mode}
                                                                                    errors={this.props.errors[item.uid][sub_item.uid]}
                                                                                    value={this.props.value[item.uid][sub_item.uid]}
                                                                                    className={this.props.className}
                                                                                    size={this.props.size}
                                                                                    req_indicator={this.props.req_indicator}
                                                                                    jkey={this.props.jkey}
                                                                                    invalid={false}
                                                                                    sm={this.props.sm}
                                                                                    onChange={(id, val, valid) => { this.onSubChange(id, val, valid, sub_idx, item.uid, idx) }}
                                                                                    isValid={(valid) => { this.isSubValid(valid, sub_idx, item.uid, idx) }}
                                                                                    invalidCheck={this.props.invalidCheck}
                                                                                    generator_aliases={this.props.generator_aliases}
                                                                                />
                                                                            </Container>
                                                                        </Fragment>
                                                                    );
                                                                }
                                                                else {
                                                                    return (
                                                                        <Fragment>
                                                                            <Col sm={
                                                                                    (
                                                                                        (sub_item.sm !== undefined && sub_item.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(sub_item.sm))
                                                                                        ? sub_item.sm
                                                                                        : (     
                                                                                            (this.props.sm !== undefined && this.props.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(this.props.sm))
                                                                                            ? this.props.sm
                                                                                            : "12"
                                                                                        )
                                                                                    )
                                                                                }
                                                                                >
                                                                            <Tag {...sub_item}
                                                                                mode={this.props.mode}
                                                                                req_indicator={this.props.req_indicator}
                                                                                errors={this.props.errors[item.uid][sub_item.uid]}
                                                                                value={this.props.value[item.uid][sub_item.uid]}
                                                                                className={this.props.className}
                                                                                size={this.props.size}
                                                                                jkey={this.props.jkey}
                                                                                invalid={false}
                                                                                sm={this.props.sm}
                                                                                onChange={(id, val, valid) => { this.onSubChange(id, val, valid, sub_idx, item.uid, idx) }}
                                                                                isValid={(valid) => { this.isSubValid(valid, sub_idx, item.uid, idx) }}
                                                                                invalidCheck={this.props.invalidCheck}
                                                                                generator_aliases={this.props.generator_aliases}
                                                                            />
                                                                            </Col>
                                                                        </Fragment>
                                                                    );
                                                                }
                                                            }
                                                        )
                                                        }
                                                    </> : <></>
                                                }
                                                </Row>
                                            </Fragment>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    );

                default:
                    return (
                        <div className="jofgen-sec-unlist">
                            {
                                this.props.sub.map((item, idx) => {
                                    return (
                                        <Card className="jofgen-sec-unlist-card" key={idx}>
                                            <CardBody onClick={() => { this.onClickList(idx); }}>
                                                <b className="jofgen-sec-unlist-title">{(item.name === undefined) ? item.uid : item.name}</b>
                                                {(item.desc !== undefined) ? <div className="jofgen-sec-unlist-desc text-muted">{item.desc}</div> : <></>}

                                                <div className="jofgen-sec-unlist-body">
                                                    <Row>
                                                    {
                                                        (item.sub !== undefined) ?
                                                            item.sub.map(
                                                                (sub_item, sub_idx) => {
                                                                    var Tag;
                                                                    var gen;

                                                                    if (genaliaseskeys.includes(sub_item.type)) {
                                                                        gen = this.props.generator_aliases[sub_item.type];
                                                                    }
                                                                    else {
                                                                        gen = this.props.generator_aliases.err;
                                                                    }

                                                                    Tag = gen.tag;

                                                                    if (gen.useContainer) {
                                                                        return (
                                                                            <Fragment>
                                                                                <Container 
                                                                                    key={sub_idx} 
                                                                                    {...sub_item} 
                                                                                    sm={
                                                                                        (
                                                                                          (sub_item.sm !== undefined && sub_item.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(sub_item.sm))
                                                                                            ? sub_item.sm
                                                                                            : (
                                                                                              (this.props.sm !== undefined && this.props.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(this.props.sm))
                                                                                                ? this.props.sm
                                                                                                : "12"
                                                                                            )
                                                                                        )
                                                                                    }
                                                                                    req_indicator={this.props.req_indicator} >
                                                                                    <Tag {...sub_item}
                                                                                        mode={this.props.mode}
                                                                                        errors={this.props.errors[item.uid][sub_item.uid]}
                                                                                        value={this.props.value[item.uid][sub_item.uid]}
                                                                                        req_indicator={this.props.req_indicator}
                                                                                        className={this.props.className}
                                                                                        size={this.props.size}
                                                                                        jkey={this.props.jkey}
                                                                                        invalid={false}
                                                                                        sm={this.props.sm}
                                                                                        onChange={(id, val, valid) => { this.onSubChange(id, val, valid, sub_idx, item.uid, idx) }}
                                                                                        isValid={(valid) => { this.isSubValid(valid, sub_idx, item.uid, idx) }}
                                                                                        invalidCheck={this.props.invalidCheck}
                                                                                        generator_aliases={this.props.generator_aliases}
                                                                                    />
                                                                                </Container>
                                                                            </Fragment>
                                                                        );
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <Fragment>
                                                                                <Col sm={
                                                                                    (
                                                                                        (sub_item.sm !== undefined && sub_item.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(sub_item.sm))
                                                                                        ? sub_item.sm
                                                                                        : (     
                                                                                            (this.props.sm !== undefined && this.props.sm !== null && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(this.props.sm))
                                                                                            ? this.props.sm
                                                                                            : "12"
                                                                                        )
                                                                                    )
                                                                                }
                                                                                >
                                                                                <Tag {...sub_item}
                                                                                    mode={this.props.mode}
                                                                                    errors={this.props.errors[item.uid][sub_item.uid]}
                                                                                    value={this.props.value[item.uid][sub_item.uid]}
                                                                                    className={this.props.className}
                                                                                    size={this.props.size}
                                                                                    jkey={this.props.jkey}
                                                                                    req_indicator={this.props.req_indicator}
                                                                                    invalid={false}
                                                                                    sm={this.props.sm}
                                                                                    onChange={(id, val, valid) => { this.onSubChange(id, val, valid, sub_idx, item.uid, idx) }}
                                                                                    isValid={(valid) => { this.isSubValid(valid, sub_idx, item.uid, idx) }}
                                                                                    invalidCheck={this.props.invalidCheck}
                                                                                    generator_aliases={this.props.generator_aliases}
                                                                                />
                                                                                </Col>
                                                                            </Fragment>
                                                                        );
                                                                    }

                                                                }
                                                            )
                                                            : <></>
                                                    }
                                                    </Row>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    );
                                })
                            }

                        </div>
                    );
            }
        }
        else {
            return <span />;
        }
    }
}

SectionPackage.propTypes = {
    uid: PropTypes.string.isRequired,
    design: PropTypes.bool,
    sub: PropTypes.bool,
    translation: PropTypes.shape(translationUid),

    /* aditional */
    jkey: PropTypes.shape(keyPropType),
    icon: PropTypes.any,
    invalidIcon: PropTypes.any
}

SectionPackage.defaultProps = {
    uid: "",
    className: "",
    size: "sm",
    jkey: Default_keyPropType,
    translation: Default_translationUid,
    invalidIcon: invalidIcon
}

export const getErrors = function () {
    return {
        invalid: false
    }
}

export const getValue = function (e) {
    return e;
}