import PropTypes from 'prop-types';

export const InputWithPopUpPropType = {
    name: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    placeHolder: PropTypes.string.isRequired
}

export const keyPropType = {
    prefix: PropTypes.string.isRequired,
    sufix: PropTypes.string.isRequired
}

export const Default_keyPropType =
{
    prefix: "jofgen-D-",
    sufix: ""
}
/* 
   ------------------------------------------------------
   ------- Designer error prop types definition ---------
   ------------------------------------------------------
    - uid - unique id
    - min - variable < min
    - max - variable > max
    - range - variable out of range
    - inf - variable is infinite
    - type - variable type is invalid 
    - prec - invalid precision
*/

export const NumericErrPropType = {
    uid: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    inf: PropTypes.string.isRequired
}

export const FNumericErrPropType = {
    uid: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    inf: PropTypes.string.isRequired,
    prec: PropTypes.string.isRequired,
    int: PropTypes.string.isRequired
}

/* 
   ------------------------------------------------------
   ----- Designer translation prop types definition -----
   ------------------------------------------------------
*/
export const BasicTypeTranslationPropType = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    messages: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired,
    errors: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        err_req: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_type: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired,
    warnings: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        warn_def: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired
}

export const BoolTranslationPropType = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    messages: PropTypes.shape({
        uid: PropTypes.string.isRequired
    }).isRequired,
    errors: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        err_default: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired
}

export const StringTranslationPropType = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    minLength: PropTypes.string.isRequired,
    is_password: PropTypes.string.isRequired,
    maxLength: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    messages: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        minLength: PropTypes.string.isRequired,
        maxLength: PropTypes.string.isRequired,
        zeroLength: PropTypes.string.isRequired,
        shortLength: PropTypes.string.isRequired,
        longLength: PropTypes.string.isRequired
    }).isRequired,
    errors: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        err_req: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_minlength: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_maxlength: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired,
    warnings: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        warn_def: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired
}

export const ListStringTranslationPropType = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    minLength: PropTypes.string.isRequired,
    maxLength: PropTypes.string.isRequired,
    minNo: PropTypes.string.isRequired,
    maxNo: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    messages: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        minLength: PropTypes.string.isRequired,
        maxLength: PropTypes.string.isRequired,
        minNo: PropTypes.string.isRequired,
        maxNo: PropTypes.string.isRequired,
        zeroLength: PropTypes.string.isRequired,
        shortLength: PropTypes.string.isRequired,
        longLength: PropTypes.string.isRequired
    }).isRequired,
    errors: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        err_req: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_minlength: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_maxlength: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_minNo: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_maxNo: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired,
    warnings: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        warn_def: PropTypes.shape(InputWithPopUpPropType).isRequired,
        empty: PropTypes.shape(InputWithPopUpPropType).isRequired,
    }).isRequired
}

export const ListFloatTranslationPropType = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    minNo: PropTypes.string.isRequired,
    maxNo: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    messages: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        min: PropTypes.string.isRequired,
        max: PropTypes.string.isRequired,
        zeroNo: PropTypes.string.isRequired,
        minNo: PropTypes.string.isRequired,
        maxNo: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,    
        typeNo: PropTypes.string.isRequired,        
        v_min: PropTypes.string.isRequired,
        v_max: PropTypes.string.isRequired,
        v_minNo: PropTypes.string.isRequired,
        v_maxNo: PropTypes.string.isRequired,
        v_type: PropTypes.string.isRequired
    }).isRequired,
    errors: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        err_req: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_min: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_max: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_minNo: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_maxNo: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired,
    warnings: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        warn_def: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired
}

export const ListIntegerTranslationPropType = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    minNo: PropTypes.string.isRequired,
    maxNo: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    messages: PropTypes.shape({        
        uid: PropTypes.string.isRequired,
        min: PropTypes.string.isRequired,
        max: PropTypes.string.isRequired,
        zeroNo: PropTypes.string.isRequired,
        minNo: PropTypes.string.isRequired,
        maxNo: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,    
        typeNo: PropTypes.string.isRequired,        
        v_min: PropTypes.string.isRequired,
        v_max: PropTypes.string.isRequired,
        v_minNo: PropTypes.string.isRequired,
        v_maxNo: PropTypes.string.isRequired,
        v_type: PropTypes.string.isRequired
    }).isRequired,
    errors: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        err_req: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_min: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_max: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_minNo: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_maxNo: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired,
    warnings: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        warn_def: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired
}

export const CustomTranslationPropType = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    regex: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    messages: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        rgx: PropTypes.string.isRequired,
        norgx: PropTypes.string.isRequired,
        rgxv: PropTypes.string.isRequired
    }).isRequired,
    errors: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        err_req: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_type: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired,
    warnings: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        warn_def: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired
}

export const ParagraphTranslationPropType =
{
    name: PropTypes.string.isRequired,
    columns: PropTypes.string.isRequired,
    smallWidthAlert: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    messages: PropTypes.shape({
        empty: PropTypes.string.isRequired
    }).isRequired
}

export const SecTranslationPropType =
{
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    columns: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    smallWidthAlert: PropTypes.string.isRequired,
    sub: PropTypes.string.isRequired,
    messages: PropTypes.shape({
        uid: PropTypes.string.isRequired
    }),
    sections: PropTypes.string.isRequired
}

export const PackTranslationPropType =
{
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    columns: PropTypes.string.isRequired,
    smallWidthAlert: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    mode_list: PropTypes.string.isRequired,
    mode_stack: PropTypes.string.isRequired,
    mode_unlisted: PropTypes.string.isRequired,
    sub: PropTypes.string.isRequired,
    messages: PropTypes.shape({
        uid: PropTypes.string.isRequired
    }),
    addSection: PropTypes.string.isRequired,
    sections: PropTypes.string.isRequired
}

export const IntegerTranslationPropType = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    messages: PropTypes.shape(NumericErrPropType).isRequired,
    errors: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        err_min: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_max: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_req: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_type: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_inf: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired,
    warnings: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        warn_def: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired
}

export const IntegerListTranslationPropType = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    minNo: PropTypes.string.isRequired,
    maxNo: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    messages: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        min: PropTypes.string.isRequired,
        max: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        inf: PropTypes.string.isRequired,
        minNo: PropTypes.string.isRequired,
        maxNo: PropTypes.string.isRequired
    }).isRequired,
    errors: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        err_min: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_max: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_minNo: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_maxNo: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_req: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_type: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_inf: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired,
    warnings: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        warn_def: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired
}

export const FloatTranslationPropType = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    precision: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    messages: PropTypes.shape(FNumericErrPropType).isRequired,
    errors: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        err_min: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_max: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_req: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_type: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_inf: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_prec: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired,
    warnings: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        warn_def: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired
}


export const ListCustomTranslationPropType = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    minLength: PropTypes.string.isRequired,
    maxLength: PropTypes.string.isRequired,
    regex: PropTypes.string.isRequired,
    minNo: PropTypes.string.isRequired,
    maxNo: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    messages: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        minLength: PropTypes.string.isRequired,
        maxLength: PropTypes.string.isRequired,
        minNo: PropTypes.string.isRequired,
        maxNo: PropTypes.string.isRequired,
        zeroLength: PropTypes.string.isRequired,
        shortLength: PropTypes.string.isRequired,
        longLength: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        rgx: PropTypes.string.isRequired,
        noregex: PropTypes.string.isRequired,
        rgxv: PropTypes.string.isRequired
    }).isRequired,
    errors: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        err_type: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_req: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_minlength: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_maxlength: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_minNo: PropTypes.shape(InputWithPopUpPropType).isRequired,
        err_maxNo: PropTypes.shape(InputWithPopUpPropType).isRequired
    }).isRequired,
    warnings: PropTypes.shape({
        title: PropTypes.string.isRequired,
        alert: PropTypes.string.isRequired,
        warn_def: PropTypes.shape(InputWithPopUpPropType).isRequired,
        empty: PropTypes.shape(InputWithPopUpPropType).isRequired,
    }).isRequired
}


/*export const CustomTranslationPropType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    mandatory: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired
})


/* 
   ------------------------------------------------------
   -------- Designer translation default props ----------
   ------------------------------------------------------
*/
export const Default_ColorTranslation = {
    uid: "Unique Id",
    title: "Input: Color",
    name: "Name",
    required: "Mandatory",
    value: "Value",
    default: "Default value",
    placeholder: "Placeholder",
    tip: "Tip",
    messages: {
        uid: "Unique id is required",
        type: "Invalid value type"
    },
    errors: {
        title: "Errors",
        alert: "Some error messages are not set.",
        err_req: {
            name: "Required value",
            tip: "This error will be shown when variable is marked as mandatory and value was not set.",
            placeHolder: ""
        },
        err_type: {
            name: "Invalid value",
            tip: "This error will be shown when value of input will be invalid - f.x. 1..2, 1.2, pink fluffy unicorn, etc.",
            placeHolder: ""
        }
    },
    warnings: {
        title: "Warnings",
        alert: "Some warning messages are not set.",
        warn_def: {
            name: "Default value used",
            tip: "This warning will be shown when default value is used.",
            placeHolder: ""
        }
    }
}

export const Default_BoolTranslation = {
    uid: "Unique Id",
    title: "Input: Boolean",
    name: "Name",
    required: "Mandatory",
    value: "Value",
    default: "Require check",
    placeholder: "Placeholder",
    tip: "Tip",
    messages: {
        uid: "Unique id is required"
    },
    errors: {
        title: "Errors",
        alert: "Some error messages are not set.",
        err_default: {
            name: "Required and value is False",
            tip: "This error will be shown when parameter is required and value is not equal true.",
            placeHolder: ""
        }
    }
}


export const Default_CustomTranslation = {
    uid: "Unique Id",
    title: "Input: Custom validation",
    name: "Name",
    required: "Mandatory",
    value: "Value",
    default: "Default value",
    regex: "Validation expresion",
    placeholder: "Placeholder",
    tip: "Tip",
    messages: {
        uid: "Unique id is required",        
        type: "Invalid value type",
        rgx: "Invalid regular expression (validation expression)",
        norgx: "Regular expression (validation expression) is undefined. In this case is input validated exactly like string.\n For better performance we recommend you to use string.",
        rgxv: "Invalid validation expression. Value cannot be validated."
    },
    errors: {
        title: "Errors",
        alert: "Some error messages are not set.",
        err_req: {
            name: "Required value",
            tip: "This error will be shown when variable is marked as mandatory and value was not set.",
            placeHolder: ""
        },
        err_type: {
            name: "Invalid value",
            tip: "This error will be shown when value of input will be invalid - f.x. 1..2, 1.2, pink fluffy unicorn, etc.",
            placeHolder: ""
        }
    },
    warnings: {
        title: "Warnings",
        alert: "Some warning messages are not set.",
        warn_def: {
            name: "Default value used",
            tip: "This warning will be shown when default value is used.",
            placeHolder: ""
        }
    }
}

export const Default_StringTranslation = {
    uid: "Unique Id",
    title: "Input: String",
    name: "Name",
    required: "Mandatory",
    value: "Value",
    default: "Default value",
    is_password: "Is password",
    minLength: "Min. input length",
    maxLength: "Max. input length",
    placeholder: "Placeholder",
    tip: "Tip",
    messages: {
        uid: "Unique id is required",
        minLength: "Minimal length must be lower than maximal length and higher than zero.",
        maxLength: "Maximal length must be higher than minimal length and zero.",
        zeroLength: "Value must be higher than zero.",
        shortLength: "Value is shorter than min. length",
        longLength: "Value is longer than max. length"
    },
    errors: {
        title: "Errors",
        alert: "Some error messages are not set.",
        err_minlength: {
            name: "Min. length",
            tip: "This error will be shown when value length is lower than mininimal length.",
            placeHolder: ""
        },
        err_maxlength: {
            name: "Max. length",
            tip: "This error will be shown when value length is higher than maximal length.",
            placeHolder: ""
        },
        err_req: {
            name: "Required value",
            tip: "This error will be shown when variable is marked as mandatory and value was not set.",
            placeHolder: ""
        }
    },
    warnings: {
        title: "Warnings",
        alert: "Some warning messages are not set.",
        warn_def: {
            name: "Default value used",
            tip: "This warning will be shown when default value is used.",
            placeHolder: ""
        }
    }
}

export const Default_ListStringTranslation = {
    uid: "Unique Id",
    title: "Input list: String",
    name: "Name",
    required: "Mandatory",
    value: "Value",
    default: "Default value",
    minLength: "Min. input length",
    maxLength: "Max. input length",
    minNo: "Min. number of input values",
    maxNo: "Max. number of input values",
    placeholder: "Placeholder",
    tip: "Tip",
    messages: {
        uid: "Unique id is required",
        minLength: "Minimal length must be lower than maximal length and higher than zero.",
        maxLength: "Maximal length must be higher than minimal length and zero.",
        minNo: "Minimal number of input must be lower than maximal length and higher than zero.",
        maxNo: "Maximal number of input must be higher than minimal length and zero.",
        zeroLength: "Value must be higher than zero.",
        shortLength: "Value is shorter than min. length",
        longLength: "Value is longer than max. length"
    },
    errors: {
        title: "Errors",
        alert: "Some error messages are not set.",
        err_minlength: {
            name: "Min. length",
            tip: "This error will be shown when value length is lower than mininimal length.",
            placeHolder: ""
        },
        err_maxlength: {
            name: "Max. length",
            tip: "This error will be shown when value length is higher than maximal length.",
            placeHolder: ""
        },
        err_minNo: {
            name: "Min. number of input values",
            tip: "This error will be shown when number of values is lower than minimum.",
            placeHolder: ""
        },
        err_maxNo: {
            name: "Max. number of input values",
            tip: "This error will be shown when number of values is higher than maximum.",
            placeHolder: ""
        },
        err_req: {
            name: "Required value",
            tip: "This error will be shown when variable is marked as mandatory and value was not set.",
            placeHolder: ""
        }
    },
    warnings: {
        title: "Warnings",
        alert: "Some warning messages are not set.",
        warn_def: {
            name: "Default value used",
            tip: "This warning will be shown when default value is used.",
            placeHolder: ""
        },
        empty: {
            name: "Clear value",
            tip: "Clear value description",
            placeHolder: ""
        }
    }
}

export const Default_SecTranslation =
{
    uid: "Unique Id",
    title: "Section",
    name: "Name",
    columns: "columns",
    smallWidthAlert: "Text may be unreadable for users with lower screen resolution",
    desc: "Description",
    sub: "Children",
    messages: {
        uid: "Unique id is required"
    },
    sections: "Sections in package:"
}

export const Default_PackTranslation =
{
    uid: "Unique Id",
    title: "Section package",
    columns: "columns",
    smallWidthAlert: "Text may be unreadable for users with lower screen resolution",
    mode: "Design",
    mode_list: "List",
    mode_stack: "Stack",
    mode_unlisted: "Unlisted",
    sub: "Sections",
    messages: {
        uid: "Unique id is required"
    },
    addSection: "Add section",
    sections: "Sections in package:"
}

export const Default_ParagraphTranslation =
{
    name: "Title",
    columns: "columns",
    smallWidthAlert: "Text may be unreadable for users with lower screen resolution",
    title: "Paragraph",
    text: "Text",
    width: "Width",
    messages: {
        empty: "Title or text must be filled."
    }
}

export const Default_FloatTranslation = {
    uid: "Unique Id",
    title: "Input: Float",
    name: "Name",
    required: "Mandatory",
    value: "Value",
    default: "Default value",
    precision: "Precision (in range 0 - 100)",
    min: "Minimum",
    max: "Maximum",
    placeholder: "Placeholder",
    tip: "Tip",
    messages: {
        uid: "Unique id is required",
        min: "Value is lower than enabled minimum",
        max: "Value is higher than enabled maximum",
        type: "Invalid value type",
        inf: "Value cannot be infinite",
        prec: "Invalid precision of value",
        int: "Precision is equal to zero. In this case is float validated exactly like integer.\n For better performance we recommend you to use integer."
    },
    errors: {
        title: "Errors",
        alert: "Some error messages are not set.",
        err_min: {
            name: "Lower than min",
            tip: "This error will be shown when value of input will be lower than minimal value.",
            placeHolder: ""
        },
        err_max: {
            name: "Higher than max",
            tip: "This error will be shown when value of input will be higher than maximal value.",
            placeHolder: ""
        },
        err_req: {
            name: "Required value",
            tip: "This error will be shown when value is required and not filled.",
            placeHolder: ""
        },
        err_type: {
            name: "Invalid value",
            tip: "This error will be shown when value of input will be invalid - f.x. 1..2, 1.2, pink fluffy unicorn, etc.",
            placeHolder: ""
        },
        err_inf: {
            name: "Infinite value",
            tip: "This error will be shown when value is set to Infinite or -Infinite.",
            placeHolder: ""
        },

        err_prec: {
            name: "Invalid precision",
            tip: "This error will be shown if precision of value is invalid.",
            placeHolder: ""
        }
    },
    warnings: {
        title: "Warnings",
        alert: "Some warning messages are not set.",
        warn_def: {
            name: "Default value used",
            tip: "This warning will be shown when default value is used.",
            placeHolder: ""
        }
    }
}

export const Default_IntTranslation = {
    uid: "Unique Id",
    title: "Input: Integer",
    name: "Name",
    required: "Mandatory",
    value: "Value",
    default: "Default value",
    min: "Minimum",
    max: "Maximum",
    placeholder: "Placeholder",
    tip: "Tip",
    messages: {
        uid: "Unique id is required",
        min: "Value is lower than enabled minimum",
        max: "Value is higher than enabled maximum",
        type: "Invalid value type",
        inf: "Value cannot be infinite"
    },
    errors: {
        title: "Errors",
        alert: "Some error messages are not set.",
        err_min: {
            name: "Lower than min",
            tip: "This error will be shown when value of input will be lower than minimal value.",
            placeHolder: ""
        },
        err_max: {
            name: "Higher than max",
            tip: "This error will be shown when value of input will be higher than maximal value.",
            placeHolder: ""
        },
        err_req: {
            name: "Required value",
            tip: "This error will be shown when value is required and not filled.",
            placeHolder: ""
        },
        err_type: {
            name: "Invalid value",
            tip: "This error will be shown when value of input will be invalid - f.x. 1..2, 1.2, pink fluffy unicorn, etc.",
            placeHolder: ""
        },
        err_inf: {
            name: "Infinite value",
            tip: "This error will be shown when value is set to Infinite or -Infinite.",
            placeHolder: ""
        }
    },
    warnings: {
        title: "Warnings",
        alert: "Some warning messages are not set.",
        warn_def: {
            name: "Default value used",
            tip: "This warning will be shown when default value is used.",
            placeHolder: ""
        }
    }
}

export const Default_ListIntegerTranslation = {
    uid: "Unique Id",
    title: "Input list: Integer",
    name: "Name",
    required: "Mandatory",
    value: "Value",
    default: "Default value",
    min: "Minimum",
    max: "Maximum",
    minNo: "Minimal no. of inputs",
    maxNo: "Maximal no. of inputs",
    placeholder: "Placeholder",
    tip: "Tip",
    messages: {
        uid: "Unique id is required",
        min: "Value is lower than enabled minimum",
        max: "Value is higher than enabled maximum",
        zeroNo: "Number of input values must be higher than zero",
        minNo: "Number of input values must be lower than minimum number of input",
        maxNo: "Number of input values must be higher than maximum number of input",
        type: "Invalid value type. Value must be float.",
        typeNo: "Invalid value type. Value must be integer.",        
        v_min: "Value is lower than enabled minimum",
        v_max: "Value is higher than enabled maximum",
        v_minNo: "Number of input values is lower than minimum",
        v_maxNo: "Number of input values is higher than maximum",
        v_type: "Invalid value type. Value must be float."
    },
    errors: {
        title: "Errors",
        alert: "Some error messages are not set.",
        err_min: {
            name: "Lower than min",
            tip: "This error will be shown when value of input will be lower than minimal value.",
            placeHolder: ""
        },
        err_max: {
            name: "Higher than max",
            tip: "This error will be shown when value of input will be higher than maximal value.",
            placeHolder: ""
        },
        err_req: {
            name: "Required value",
            tip: "This error will be shown when value is required and not filled.",
            placeHolder: ""
        },
        err_type: {
            name: "Invalid value",
            tip: "This error will be shown when value of input will be invalid - f.x. 1..2, 1.2, pink fluffy unicorn, etc.",
            placeHolder: ""
        },
        err_maxNo: {
            name: "More than max. no. of values",
            tip: "This error will be shown when number of input values is more than maximum.",
            placeHolder: ""
        },
        err_minNo: {
            name: "Less than min. no. of values",
            tip: "This error will be shown when number of input values is less than minimum.",
            placeHolder: ""
        }
    },
    warnings: {
        title: "Warnings",
        alert: "Some warning messages are not set.",
        warn_def: {
            name: "Default value used",
            tip: "This warning will be shown when default value is used.",
            placeHolder: ""
        }
    }
}


export const Default_ListFloatTranslation = {
    uid: "Unique Id",
    title: "Input list: Float",
    name: "Name",
    required: "Mandatory",
    value: "Value",
    default: "Default value",
    min: "Minimum",
    max: "Maximum",
    minNo: "Minimal no. of inputs",
    maxNo: "Maximal no. of inputs",
    placeholder: "Placeholder",
    tip: "Tip",
    messages: {
        uid: "Unique id is required",
        min: "Value is lower than enabled minimum",
        max: "Value is higher than enabled maximum",
        zeroNo: "Number of input values must be higher than zero",
        minNo: "Number of input values must be lower than minimum number of input",
        maxNo: "Number of input values must be higher than maximum number of input",
        type: "Invalid value type. Value must be float.",
        typeNo: "Invalid value type. Value must be integer.",        
        v_min: "Value is lower than enabled minimum",
        v_max: "Value is higher than enabled maximum",
        v_minNo: "Number of input values is lower than minimum",
        v_maxNo: "Number of input values is higher than maximum",
        v_type: "Invalid value type. Value must be float."
    },
    errors: {
        title: "Errors",
        alert: "Some error messages are not set.",
        err_min: {
            name: "Lower than min",
            tip: "This error will be shown when value of input will be lower than minimal value.",
            placeHolder: ""
        },
        err_max: {
            name: "Higher than max",
            tip: "This error will be shown when value of input will be higher than maximal value.",
            placeHolder: ""
        },
        err_req: {
            name: "Required value",
            tip: "This error will be shown when value is required and not filled.",
            placeHolder: ""
        },
        err_type: {
            name: "Invalid value",
            tip: "This error will be shown when value of input will be invalid - f.x. 1..2, 1.2, pink fluffy unicorn, etc.",
            placeHolder: ""
        },
        err_maxNo: {
            name: "More than max. no. of values",
            tip: "This error will be shown when number of input values is more than maximum.",
            placeHolder: ""
        },
        err_minNo: {
            name: "Less than min. no. of values",
            tip: "This error will be shown when number of input values is less than minimum.",
            placeHolder: ""
        }
    },
    warnings: {
        title: "Warnings",
        alert: "Some warning messages are not set.",
        warn_def: {
            name: "Default value used",
            tip: "This warning will be shown when default value is used.",
            placeHolder: ""
        }
    }
}


export const Default_ListTranslation = {
    uid: "Unique Id",
    title: "Input list",
    name: "Name",
    required: "Mandatory",
    value: "Value",
    default: "Default value",
    min: "Minimal value",
    max: "Maximal value",
    minNo: "Minimal no. of inputs",
    maxNo: "Maximal no. of inputs",
    minLength: "Min. input length",
    maxLength: "Max. input length",
    regex: "Validation expresion",
    precision: "Precision",
    type: "Type",
    tip: "Tip",
    messages: {
        uid: "Unique id is required",
        min: "Value is lower than enabled minimum",
        max: "Value is higher than enabled maximum",
        type: "Invalid value type",
        many: "Number of input values is higher than maximum",
        less: "Number of input values is lower than minimum",
        minLength: "Minimal length must be lower than maximal length and higher than zero.",
        maxLength: "Maximal length must be higher than minimal length and zero.",
        rgx: "Invalid regular expression (validation expression)",
        norgx: "Regular expression (validation expression) is undefined. In this case is input validated exactly like string.\n For better performance we recommend you to use string.",
        rgxv: "Invalid validation expression. Value cannot be validated.",
        inf: "Value cannot be infinite"
    },
    errors: {
        title: "Errors",
        alert: "Some error messages are not set.",
        err_min: {
            name: "Lower than min",
            tip: "This error will be shown when number of selected values will be lower than minimal value.",
            placeHolder: ""
        },
        err_max: {
            name: "Higher than max",
            tip: "This error will be shown when number of selected values will be higher than maximal value.",
            placeHolder: ""
        },
        err_minlength: {
            name: "Min. length",
            tip: "This error will be shown when value length is lower than mininimal length.",
            placeHolder: ""
        },
        err_maxlength: {
            name: "Max. length",
            tip: "This error will be shown when value length is higher than maximal length.",
            placeHolder: ""
        },
        err_req: {
            name: "Required value",
            tip: "This error will be shown when value is required and not filled.",
            placeHolder: ""
        },
        err_type: {
            name: "Invalid value",
            tip: "This error will be shown when value of input will be invalid - f.x. 1..2, 1.2, pink fluffy unicorn, etc.",
            placeHolder: ""
        },
        err_noMax: {
            name: "More than max. no. of values",
            tip: "This error will be shown when number of input values is more than maximum.",
            placeHolder: ""
        },
        err_noMin: {
            name: "Less than min. no. of values",
            tip: "This error will be shown when number of input values is less than minimum.",
            placeHolder: ""
        },
        err_inf: {
            name: "Infinite value",
            tip: "This error will be shown when value is set to Infinite or -Infinite.",
            placeHolder: ""
        },
        err_prec: {
            name: "Invalid precision",
            tip: "This error will be shown if precision of value is invalid.",
            placeHolder: ""
        }
    },
    warnings: {
        title: "Warnings",
        alert: "Some warning messages are not set.",
        warn_def: {
            name: "Default value used",
            tip: "This warning will be shown when default value is used.",
            placeHolder: ""
        }
    }
}

/*PropTypes.arrayOf(
        PropTypes.any(
            [
                PropTypes.shape({ name: PropTypes.string.isRequired, value: PropTypes.string, tip: PropTypes.string }),
                PropTypes.shape({ name: PropTypes.string, value: PropTypes.string.isRequired, tip: PropTypes.string }),
            ]
        )
      )*/

export const Default_ListCustomTranslation = {
    uid: "Unique Id",
    title: "Input list: Custom",
    name: "Name",
    required: "Mandatory",
    value: "Value",
    default: "Default value",
    regex: "Regular expression",
    minLength: "Min. input length",
    maxLength: "Max. input length",
    minNo: "Min. number of input values",
    maxNo: "Max. number of input values",
    placeholder: "Placeholder",
    tip: "Tip",
    messages: {
        uid: "Unique id is required",
        minLength: "Minimal length must be lower than maximal length and higher than zero.",
        maxLength: "Maximal length must be higher than minimal length and zero.",
        minNo: "Minimal number of input must be lower than maximal length and higher than zero.",
        maxNo: "Maximal number of input must be higher than minimal length and zero.",
        zeroLength: "Value must be higher than zero.",
        shortLength: "Value is shorter than min. length",
        longLength: "Value is longer than max. length",
        type: "Invalid value type",
        rgx: "Invalid regular expression (validation expression)",
        noregex: "Regular expression (validation expression) is undefined. In this case is input validated exactly like string.\n For better performance we recommend you to use string.",
        rgxv: "Invalid validation expression. Value cannot be validated."
    },
    errors: {
        title: "Errors",
        alert: "Some error messages are not set.",
        err_type: {
            name: "Invalid value",
            tip: "This error will be shown when value of input will be invalid - f.x. 1..2, 1.2, pink fluffy unicorn, etc.",
            placeHolder: ""
        },
        err_minlength: {
            name: "Min. length",
            tip: "This error will be shown when value length is lower than mininimal length.",
            placeHolder: ""
        },
        err_maxlength: {
            name: "Max. length",
            tip: "This error will be shown when value length is higher than maximal length.",
            placeHolder: ""
        },
        err_minNo: {
            name: "Min. number of input values",
            tip: "This error will be shown when number of values is lower than minimum.",
            placeHolder: ""
        },
        err_maxNo: {
            name: "Max. number of input values",
            tip: "This error will be shown when number of values is higher than maximum.",
            placeHolder: ""
        },
        err_req: {
            name: "Required value",
            tip: "This error will be shown when variable is marked as mandatory and value was not set.",
            placeHolder: ""
        }
    },
    warnings: {
        title: "Warnings",
        alert: "Some warning messages are not set.",
        warn_def: {
            name: "Default value used",
            tip: "This warning will be shown when default value is used.",
            placeHolder: ""
        },
        empty: {
            name: "Clear value",
            tip: "Clear value description",
            placeHolder: ""
        }
    }
}