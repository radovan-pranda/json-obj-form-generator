import Error from './Error';
import { InputBoolean, getErrors as b_valid } from './InputBoolean';
import { InputCustom, getErrors as rgx_valid } from './InputCustom';
import { InputColor, getErrors as color_valid } from './InputColor';
import { InputFloat, getErrors as f_valid } from './InputFloat';
import { InputInteger, getErrors as i_valid } from './InputInteger';
import { InputString, getErrors as str_valid } from './InputString';
import { InputListString, getErrors as str_il_valid } from './InputListString';
import { InputListCustom, getErrors as rgx_il_valid } from './InputListCustom';
import { InputListInteger, getErrors as int_il_valid } from './InputListInteger';
import { InputListFloat, getErrors as float_il_valid } from './InputListFloat';
import { Paragraph, getErrors as p_valid } from './Paragraph';
import { Section, getErrors as sec_valid } from './Section';
import { SectionPackage, getErrors as pack_valid } from './SectionPackage';
import Container from './Container';
import { isValidDesignJSON } from './../designer';

const aliases = {
    bool: { value: false, getErrors: b_valid, mustHaveValue: true },
    color: { value: "", getErrors: color_valid, mustHaveValue: true },
    rgx: { value: "", getErrors: rgx_valid, mustHaveValue: true },
    float: { value: "", getErrors: f_valid, mustHaveValue: true },
    int: { value: "", getErrors: i_valid, mustHaveValue: true },
    p: { value: null, getErrors: p_valid, mustHaveValue: false },
    str: { value: "", getErrors: str_valid, mustHaveValue: true },

    // input lists
    float_il: { value: [], getErrors: float_il_valid, mustHaveValue: true },
    int_il: { value: [], getErrors: int_il_valid, mustHaveValue: true },
    rgx_il: { value: [], getErrors: rgx_il_valid, mustHaveValue: true },
    str_il: { value: [], getErrors: str_il_valid, mustHaveValue: true },

    // sections
    sec: { value: null, getErrors: sec_valid, mustHaveValue: false },
    pack: { value: null, getErrors: pack_valid, mustHaveValue: false }
}

/* meta to value */
export const metaValueToTree = function (obj, def, req, errs) {
    var result = {};
    if (typeof obj === "object") {
        var keys = Object.keys(obj);
        var len = keys.length;
        var key;
        for (var i = 0; i < len; i++) {
            key = keys[i];
            if (typeof obj[key] === "object" && !Array.isArray(obj[key]) && obj[key] !== null) {
                result[key] = metaValueToTree(obj[key], def[key], req[key], errs[key]);
            }
            else {
                if (def[key] !== null && req[key] && !errs[key].warn_def) {
                    result[key] = def[key];
                    continue;
                }

                if (obj[key] !== null) {
                    result[key] = obj[key];
                    continue;
                }
            }
        }
    }

    return result;
}

export const metaValueToLinearMerge = function (obj, def, req, errs, sub_sep, parent) {
    var prefix = (parent === undefined) ? "" : parent + sub_sep;
    var result = {};
    if (typeof obj === "object") {
        var keys = Object.keys(obj);
        var len = keys.length;
        var key;
        for (var i = 0; i < len; i++) {
            key = keys[i];
            if (typeof obj[key] === "object" && !Array.isArray(obj[key]) && obj[key] !== null) {
                result = { ...result, ...metaValueToLinearMerge(obj[key], def[key], req[key], errs[key], sub_sep, prefix + key) };
            }
            else {
                if (def[key] !== null && req[key] && !errs[key].warn_def) {
                    result[prefix + key] = def[key];
                    continue;
                }

                if (obj[key] !== null) {
                    result[prefix + key] = obj[key];
                    continue;
                }
            }
        }
    }

    return result;
}

export const metaValueToLinear = function (obj, def, req, errs) {
    var result = {};
    if (typeof obj === "object") {
        var keys = Object.keys(obj);
        var len = keys.length;
        var key;
        for (var i = 0; i < len; i++) {
            key = keys[i];
            if (typeof obj[key] === "object" && !Array.isArray(obj[key]) && obj[key] !== null) {
                result = { ...result, ...metaValueToLinear(obj[key], def[key], req[key], errs[key]) };
            }
            else {
                if (def[key] !== null && req[key] && !errs[key].warn_def) {
                    result[key] = def[key];
                    continue;
                }

                if (obj[key] !== null) {
                    result[key] = obj[key];
                    continue;
                }
            }
        }
    }

    return result;
}

/* JSON to value */
export const jsonToMeta_Tree = function (obj) {
    var result = {};
    var errors = {};
    var defaultV = {};
    var req = {};
    if (Array.isArray(obj)) {
        var len = obj.length;
        var uid;
        for (var i = 0; i < len; i++) {
            uid = obj[i].uid;
            if (obj[i].sub !== undefined) {
                var subresult = jsonToMeta_Tree(obj[i].sub);
                result[uid] = subresult[0];
                errors[uid] = subresult[1];
                defaultV[uid] = subresult[2];
                req[uid] = subresult[3];
            }
            else {
                if (obj[i].value !== undefined) {
                    result[uid] = obj[i].value;
                    errors[uid] = aliases[obj[i].type].getErrors(obj[i].value, obj[i]);
                    defaultV[uid] = (obj[i].default !== undefined) ? obj[i].default : null;
                    req[uid] = (obj[i].required) ? true : false;
                }
                else {
                    var type = obj[i].type;
                    result[uid] = (obj[i].required) ? aliases[type].value : null;
                    errors[uid] = aliases[type].getErrors(result[uid], obj[i]);
                    defaultV[uid] = (obj[i].default !== undefined && obj[i].required) ? obj[i].default : null;
                    req[uid] = (obj[i].required) ? true : false;
                }
            }
        }
    }

    return [result, errors, defaultV, req];
}

export const getMetaValue = function (obj, value) {
    if (obj.type === undefined || !Object.keys(aliases).includes(obj.type)) {
        return null;
    }

    if (value !== undefined && value !== null && aliases[obj.type].valid(value, obj)) {
        return value;
    }

    if (obj.value !== undefined && obj.value !== null && aliases[obj.type].valid(obj.value, obj)) {
        return obj.value;
    }
}

/* JSON and value merge */
export const valueToMeta_Tree = function (obj, val) {
    var result = {};
    var errors = {};
    var defaultV = {};
    var req = {};

    if (Array.isArray(obj)) {
        var len = obj.length;
        var uid;
        for (var i = 0; i < len; i++) {
            uid = obj[i].uid;
            if (obj[i].sub !== undefined) {
                var subresult = valueToMeta_Tree(obj[i].sub, val[uid]);
                result[uid] = subresult[0];
                errors[uid] = subresult[1];
                defaultV[uid] = subresult[2];
                req[uid] = subresult[3];
            }
            else {
                if (val[uid] !== undefined && val[uid] !== null) {
                    result[uid] = val[uid];
                    errors[uid] = aliases[obj[i].type].getErrors(val[uid], obj[i]);
                    req[uid] = (obj[i].required) ? true : false;
                    defaultV[uid] = (obj[i].default !== undefined && obj[i].default !== null && req[uid]) ? obj[i].default : null;
                }
                else {
                    var type = obj[i].type;
                    result[uid] = (obj[i].required) ? aliases[type].value : null;
                    errors[uid] = aliases[type].getErrors(result[uid], obj[i]);
                    req[uid] = (obj[i].required) ? true : false;
                    defaultV[uid] = (obj[i].default !== undefined && obj[i].default !== null && req[uid]) ? obj[i].default : null;
                }
            }
        }
    }

    return [result, errors, defaultV, req];
}

export const valueToMeta_LinearMerge = function (obj, val, sub_sep, parent) {
    var prefix = (parent === undefined) ? "" : parent + sub_sep;
    var result = {};
    var errors = {};
    var defaultV = {};
    var req = {};

    if (Array.isArray(obj)) {
        var len = obj.length;
        var uid;
        for (var i = 0; i < len; i++) {
            uid = obj[i].uid;
            if (obj[i].sub !== undefined) {
                var subresult = valueToMeta_LinearMerge(obj[i].sub, val, sub_sep, parent);
                result[uid] = subresult[0];
                errors[uid] = subresult[1];
                defaultV[uid] = subresult[2];
                req[uid] = subresult[3];
            }
            else {
                if (val[prefix + uid] !== undefined && val[prefix + uid] !== null) {
                    result[uid] = val[prefix + uid];
                    errors[uid] = aliases[obj[i].type].getErrors(val[prefix + uid], obj[i]);
                    req[uid] = (obj[i].required) ? true : false;
                    defaultV[uid] = (obj[i].default !== undefined && obj[i].default !== null && req[uid]) ? obj[i].default : null;
                }
                else {
                    var type = obj[i].type;
                    result[uid] = (obj[i].required) ? aliases[type].value : null;
                    errors[uid] = aliases[type].getErrors(result[uid], obj[i]);
                    req[uid] = (obj[i].required) ? true : false;
                    defaultV[uid] = (obj[i].default !== undefined && obj[i].default !== null && req[uid]) ? obj[i].default : null;
                }
            }
        }
    }

    return [result, errors, defaultV, req];
}

export const valueToMeta_Linear = function (obj, val) {
    var result = {};
    var errors = {};
    var defaultV = {};
    var req = {};

    if (Array.isArray(obj)) {
        var len = obj.length;
        var uid;
        for (var i = 0; i < len; i++) {
            uid = obj[i].uid;
            if (obj[i].sub !== undefined) {
                var subresult = valueToMeta_Linear(obj[i].sub, val);
                result[uid] = subresult[0];
                errors[uid] = subresult[1];
                defaultV[uid] = subresult[2];
                req[uid] = subresult[3];
            }
            else {
                if (val[uid] !== undefined && val[uid] !== null) {
                    result[uid] = val[uid];
                    errors[uid] = aliases[obj[i].type].getErrors(val[uid], obj[i]);
                    req[uid] = (obj[i].required) ? true : false;
                    defaultV[uid] = (obj[i].default !== undefined && obj[i].default !== null && req[uid]) ? obj[i].default : null;
                }
                else {
                    var type = obj[i].type;
                    result[uid] = (obj[i].required) ? aliases[type].value : null;
                    errors[uid] = aliases[type].getErrors(result[uid], obj[i]);
                    req[uid] = (obj[i].required) ? true : false;
                    defaultV[uid] = (obj[i].default !== undefined && obj[i].default !== null && req[uid]) ? obj[i].default : null;
                }
            }
        }
    }

    return [result, errors, defaultV, req];
}


/* error check */
export const invalidCheck = function (obj) {
    var subresult = false;

    if (typeof obj === "object") {
        if (obj.invalid !== undefined && typeof obj.invalid === "boolean") {
            return obj.invalid;
        }

        var keys = Object.keys(obj);
        var len = keys.length;
        var i;
        for (i = 0; i < len; i++) {
            var key = keys[i];
            if (typeof obj[key] === "object") {
                subresult = subresult || invalidCheck(obj[key]);
            }
            else {
                subresult = subresult || obj[key].invalid;
            }
        }
    }

    return subresult;
}

export const metaTo = {
    tree: metaValueToTree,
    linear_merge: metaValueToLinearMerge,
    linear: metaValueToLinear
}

export const toMeta = {
    tree: valueToMeta_Tree,
    linear_merge: valueToMeta_LinearMerge,
    linear: valueToMeta_Linear
}

export const getValue = function (json, value, mode, sep) {
    try {
        var nextState = {};
        var meta;
        if (value !== undefined) {
            meta = toMeta[mode](json, value, sep);
            nextState.meta = meta[0];
            nextState.errors = meta[1];
            nextState.defaults = meta[2];
            nextState.req = meta[3];
            nextState.json = json;
        }
        else {
            meta = jsonToMeta_Tree(json);
            nextState.meta = meta[0];
            nextState.errors = meta[1];
            nextState.defaults = meta[2];
            nextState.req = meta[3];
            nextState.json = json;
        }
        var value = metaTo[mode](nextState.meta, nextState.defaults, nextState.req, nextState.errors, nextState.sep);
        return [value, isValidValueJSON(json, value, mode, sep)];
    }
    catch
    {
        return [undefined, false];
    }
}

export const isValidValueJSON = function (json, value, mode, sep) {
    try {
        var serial_mode = (mode && ["tree", "linear", "linear_merge"].includes(mode)) ? mode : "tree";
        var separator = (sep) ? sep : ".";

        if (!isValidDesignJSON(json, serial_mode)) {
            return false;
        }

        var meta;
        if (value !== undefined) {
            meta = toMeta[serial_mode](json, value, separator);
        }
        else {
            meta = jsonToMeta_Tree(json);
        }

        return !invalidCheck(meta[1]);
    }
    catch
    {
        return false;
    }
}

export {
    Container,
    Error,
    InputBoolean,
    InputColor,
    InputCustom,
    InputFloat,
    InputInteger,
    InputString,
    InputListCustom,
    InputListFloat,
    InputListInteger,
    InputListString,
    Paragraph,
    Section,
    SectionPackage
};