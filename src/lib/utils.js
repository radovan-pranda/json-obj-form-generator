import PropTypes from 'prop-types';

let sufix = {};

export function idGenerator(prefix = 'id') {
  if (sufix[prefix] === undefined) {
    sufix[prefix] = 0;
  }

  sufix[prefix]++;
  return `${prefix}${sufix[prefix]}`;
}

export const keyPropType = {
  prefix: PropTypes.string.isRequired,
  sufix: PropTypes.string.isRequired
}

export const Default_GkeyPropType =
{
  prefix: "jofgenGEN-",
  sufix: ""
}

export const Default_DkeyPropType =
{
  prefix: "jofgenDES-",
  sufix: ""
}

export const Default_EXDkeyPropType =
{
  prefix: "jofgenEXD-",
  sufix: ""
}



export const unique_id_test_linear = function (obj) {
  var uq = [];
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      uq.push(obj[i].uid);
      if (obj[i].sub && Array.isArray(obj[i].sub)) {
        uq.concat(unique_id_test_linear(obj[i].sub));
      }
    }
  }
  else {
    uq.concat(obj.uid);
    if (obj.sub && Array.isArray(obj.sub)) {
      uq.concat(unique_id_test_linear(obj.sub));
    }
  }

  return uq;
}

export const unique_id_test_tree = function (obj, parent, sep) {
  var uq = [];
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      uq.push(parent + obj[i].uid);
      if (obj[i].sub && Array.isArray(obj[i].sub)) {
        uq.concat(unique_id_test_tree(obj[i].sub, parent + obj[i].uid + sep));
      }
    }
  }
  else {
    uq.concat(parent + obj.uid);
    if (obj.sub && Array.isArray(obj.sub)) {
      uq.concat(unique_id_test_tree(obj.sub, parent + obj.uid + sep));
    }
  }

  return uq;
}

export const unique_id_test = function (obj, mode, sep) {
  var list = [];
  var i;
  list = unique_id_test_linear(obj);
  for (i = 0; i < list.length; i++) {
    if (list.indexOf(list[i], i)) {
      return false;
    }
  }
  return true;
}
