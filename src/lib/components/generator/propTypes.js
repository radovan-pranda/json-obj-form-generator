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
    prefix: "jofgen-",
    sufix: ""
}

export const translationUid = {
    invalidUid: PropTypes.string.isRequired,
    noUid: PropTypes.string.isRequired
}

export const Default_translationUid = {
    invalidUid: "Id is invalid or not unique.",
    noUid: "Unique id is not defined. Generic id will be used."
}