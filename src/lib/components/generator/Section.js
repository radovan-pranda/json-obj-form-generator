import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CardBody, Card, Col, Row } from 'reactstrap';
import Container from './Container';

export class Section extends Component {
    onSubChange = function (unique_id, value) {
        var prevVal = this.props.value;
        var prevErr = this.props.errors;
        var invalid = this.props.invalidCheck(prevErr);

        if (value === null || value === undefined) {
            delete prevVal[unique_id];
            prevErr[unique_id] = { invalid: false };
        }
        else {
            prevVal[unique_id] = value["value"];
            prevErr[unique_id] = value["errors"];
        }

        if (this.props.onChange) {
            this.props.onChange(this.props.uid, { value: prevVal, errors: prevErr }, !invalid);
        }

        if (this.props.isValid) {
            this.props.isValid(!invalid);
        }
    }.bind(this)

    render() {
        var genaliaseskeys = Object.keys(this.props.generator_aliases);
        return (
            <Card className="jofgen-sec-card" >
                <CardBody>
                    <b className="jofgen-sec-title">{(this.props.name === undefined) ? this.props.uid : this.props.name}</b>
                    {(this.props.desc !== undefined) ? <div className="jofgen-sec-desc text-muted">{this.props.desc}</div> : <></>}
                    <div className="jofgen-sec-body">
                        <Row>
                        {
                            (this.props.sub !== undefined) ?
                                this.props.sub.map(
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
                                                <Fragment key={sub_idx}>
                                                    <Container 
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
                                                            errors={this.props.errors[sub_item.uid]}
                                                            value={this.props.value[sub_item.uid]}
                                                            req_indicator={this.props.req_indicator}
                                                            className={this.props.className}
                                                            size={this.props.size}
                                                            jkey={this.props.jkey}
                                                            invalid={false}
                                                            sm={this.props.sm}
                                                            onChange={this.onSubChange}
                                                            isValid={() => { }}
                                                            invalidCheck={this.props.invalidCheck}
                                                            generator_aliases={this.props.generator_aliases}
                                                        />
                                                    </Container>
                                                </Fragment>
                                            );
                                        }
                                        else {
                                            return (
                                                <Fragment key={sub_idx}>
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
                                                        errors={this.props.errors[sub_item.uid]}
                                                        value={this.props.value[sub_item.uid]}
                                                        className={this.props.className}
                                                        req_indicator={this.props.req_indicator}
                                                        size={this.props.size}
                                                        jkey={this.props.jkey}
                                                        invalid={false}
                                                        sm={this.props.sm}
                                                        onChange={this.onSubChange}
                                                        isValid={() => { }}
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
    }
}

Section.propTypes = {
    uid: PropTypes.string.isRequired,
    design: PropTypes.bool,
    sub: PropTypes.bool
}

Section.defaultProps = {
    uid: "",
    className: "",
    size: "sm",
}

export const getErrors = function () {
    return {
        invalid: false
    }
}

export const getValue = function (e) {
    return e;
}