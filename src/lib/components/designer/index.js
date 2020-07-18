import Container from './Container';
import Extensor from './Extensor';
import { InputBoolean } from './InputBoolean';
import { InputColor } from './InputColor';
import { InputCustom } from './InputCustom';
import { InputFloat } from './InputFloat';
import { InputInteger } from './InputInteger';
import { InputString } from './InputString';
import { InputListCustom } from './InputListCustom';
import { InputListFloat } from './InputListFloat';
import { InputListInteger } from './InputListInteger';
import { InputListString } from './InputListString';
import { Paragraph } from './Paragraph';
import { Section } from './Section';
import { SectionPackage } from './SectionPackage';

import { designer_aliases } from './../shared';

const uidsCheck_Tree = function (uids) {
    var arr = []
    if (Array.isArray(uids)) {
        for (var i = 0; i < uids.length; i++) {
            if (Array.isArray(uids[i])) {
                arr.push(uids[i][0]);
                var subcheck = uidsCheck_Tree(uids[i][1]);
                if (!subcheck) {
                    return false;
                }
            }
            else {
                arr.push(uids[i]);
            }
        }
    }
    for (var j = 0; j < arr.length; j++) {
        if (arr.includes(arr[j], j + 1) && arr[j] !== null && arr[j] !== undefined) {
            return false;
        }
    }

    return true;
}

const uidsGetArr_Tree = function (uids) {
    var valid = [];
    var arr = [];
    var i;
    if (Array.isArray(uids)) {
        for (i = 0; i < uids.length; i++) {
            if (Array.isArray(uids[i])) {
                arr.push(uids[i][0]);
            }
            else {
                arr.push(uids[i]);
            }
        }

        for (i = 0; i < uids.length; i++) {
            if (Array.isArray(uids[i])) {
                valid.push([(uids[i][0] !== null && uids[i][0] !== undefined && (arr.indexOf(uids[i][0]) < i || arr.lastIndexOf(uids[i][0]) > i)), uidsGetArr_Tree(uids[i][1])]);
            }
            else {
                valid.push(uids[i] !== null && uids[i] !== undefined && (arr.indexOf(uids[i]) < i || arr.lastIndexOf(uids[i]) > i));
            }
        }
    }

    return valid;
}


const uidsGetArr_LinearMerge = function (uids) {
    var valid = [];
    var arr = [];
    var i;
    if (Array.isArray(uids)) {
        for (i = 0; i < uids.length; i++) {
            if (Array.isArray(uids[i])) {
                arr.push(uids[i][0]);
            }
            else {
                arr.push(uids[i]);
            }
        }

        for (i = 0; i < uids.length; i++) {
            if (Array.isArray(uids[i])) {
                valid.push([uids[i][0] !== null && uids[i][0] !== undefined && (arr.indexOf(uids[i][0]) < i || arr.lastIndexOf(uids[i][0]) > i), uidsGetArr_LinearMerge(uids[i][1])]);
            }
            else {
                valid.push(uids[i] !== null && uids[i] !== undefined && (arr.indexOf(uids[i]) < i || arr.lastIndexOf(uids[i]) > i));
            }
        }
    }

    return valid;
}

const uidsGetArrmetafunc_Linear = function (uids, arr) {
    var valid = [];
    var i;
    if (Array.isArray(uids)) {
        for (i = 0; i < uids.length; i++) {
            if (Array.isArray(uids[i])) {
                valid.push([uids[i][0] !== null && uids[i][0] !== undefined && (arr.indexOf(uids[i][0]) !== arr.lastIndexOf(uids[i][0])), uidsGetArrmetafunc_Linear(uids[i][1], arr)]);
            }
            else {
                valid.push(uids[i] !== null && uids[i] !== undefined && (arr.indexOf(uids[i]) !== arr.lastIndexOf(uids[i])));
            }
        }
    }

    return valid;
}


const uidsGetArr_Linear = function (uids) {
    var arr = uidsCheck_LinearmetaFunc(uids);
    return uidsGetArrmetafunc_Linear(uids, arr);
}

const uidsCheck_LinearMerge = function (uids) {
    var arr = []
    if (Array.isArray(uids)) {
        for (var i = 0; i < uids.length; i++) {
            if (Array.isArray(uids[i])) {
                arr.push(uids[i][0]);
                var subcheck = uidsCheck_LinearMerge(uids[i][1]);
                if (!subcheck) {
                    return false;
                }
            }
            else {
                arr.push(uids[i]);
            }
        }
    }

    for (var j = 0; j < arr.length; j++) {
        if (arr.includes(arr[j], j + 1) && arr[j] !== null && arr[j] !== undefined) {
            return false;
        }
    }

    return true;
}

const uidsCheck_LinearmetaFunc = function (uids) {
    var arr = []
    if (Array.isArray(uids)) {
        for (var i = 0; i < uids.length; i++) {
            if (Array.isArray(uids[i])) {
                arr.push(uids[i][0]);
                arr = [...arr, ...uidsCheck_LinearmetaFunc(uids[i][1])];
            }
            else {
                arr.push(uids[i]);
            }
        }
    }

    return arr;
}

const uidsCheck_Linear = function (uids) {
    var arr = uidsCheck_LinearmetaFunc(uids);

    for (var j = 0; j < arr.length; j++) {
        if (arr.includes(arr[j], j + 1) && arr[j] !== null && arr[j] !== undefined) {
            return false;
        }
    }

    return true;
}

export const recursive_check_unique = {
    tree: uidsCheck_Tree,
    linear_merge: uidsCheck_LinearMerge,
    linear: uidsCheck_Linear
}

export const recursive_get_unique_valid = {
    tree: uidsGetArr_Tree,
    linear_merge: uidsGetArr_LinearMerge,
    linear: uidsGetArr_Linear
}

export const recursive_check_valid = function (valids) {
    if (Array.isArray(valids)) {
        for (var i = 0; i < valids.length; i++) {
            if (Array.isArray(valids[i])) {
                if (!valids[i][0]) {
                    return false;
                }
                else {
                    if (!recursive_check_valid(valids[i][1])) {
                        return false;
                    }
                }
            }
            else {
                if (!valids[i]) {
                    return false;
                }
            }
        }
    }

    return true;
}


export const isValid = function (ids, valids, mode) {
    if (!recursive_check_valid(valids)) {
        return false;
    }

    if (!recursive_check_unique[mode](ids)) {
        return false;
    }

    return true;
}

export const getUids = function (e) {
    var result = [];
    var i;
    var len = e.length;
    if (Array.isArray(e)) {
        for (i = 0; i < len; i++) {
            if (e[i].sub === undefined) {
                if (designer_aliases[e[i].type].mustHaveUid) {
                    result.push((e[i].uid === undefined || e[i].uid === null) ? "" : e[i].uid);
                }
                else {
                    result.push(null);
                }
            }
            else {
                if (designer_aliases[e[i].type].mustHaveUid) {
                    result.push([((e[i].uid === undefined || e[i].uid === null) ? null : e[i].uid), getUids(e[i].sub)]);
                }
                else {
                    result.push([getUids(e[i].sub)]);
                }
            }
        }
    }

    return result;
}

export const jsonValid = function (e) {
    var result = [];
    var i;
    var len = e.length;
    if (Array.isArray(e)) {
        for (i = 0; i < len; i++) {
            if (e[i].sub === undefined) {
                result.push(designer_aliases[e[i].type].valid(e[i]));
            }
            else {
                result.push([designer_aliases[e[i].type].valid(e[i]), jsonValid(e[i].sub)]);
            }
        }
    }

    return result;
}

export const jsonToMeta = function (e) {
    var result = [];
    var i;
    var len = e.length;
    if (Array.isArray(e)) {
        for (i = 0; i < len; i++) {
            if (e[i].sub === undefined) {
                result.push(designer_aliases[e[i].type].rebuild(e[i]));
            }
            else {
                var metaObj = designer_aliases[e[i].type].rebuild(e[i]);
                var sub = jsonToMeta(e[i].sub);
                metaObj.sub = sub;
                result.push(metaObj);
            }
        }
    }

    return result;
}

export const isValidDesignJSON = function (json, mode) {
    try {
        return isValid(getUids(json), jsonValid(jsonToMeta(json)), ( mode && ["tree", "linear", "linear_merge"].includes(mode))?mode:"tree");
    }
    catch
    {
        return false;
    }
}

export {
    Container,
    Extensor,
    InputBoolean,
    InputColor,
    InputCustom,
    InputFloat,
    InputInteger,
    InputString,
    InputListString,
    InputListFloat,
    InputListCustom,
    InputListInteger,
    Paragraph,
    Section,
    SectionPackage
};