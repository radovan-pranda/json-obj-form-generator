import {
  InputBoolean,
  clean as b_clean,
  prototype as b_prototype,
  valid as b_valid,
  rebuild as b_rebuild
} from './designer/InputBoolean'
import {
  InputColor,
  clean as color_clean,
  prototype as color_prototype,
  valid as color_valid,
  rebuild as color_rebuild
} from './designer/InputColor'
import {
  InputCustom,
  clean as rgx_clean,
  prototype as rgx_prototype,
  valid as rgx_valid,
  rebuild as rgx_rebuild
} from './designer/InputCustom'
import {
  InputFloat,
  clean as f_clean,
  prototype as f_prototype,
  valid as f_valid,
  rebuild as f_rebuild
} from './designer/InputFloat'
import {
  InputInteger,
  clean as i_clean,
  prototype as i_prototype,
  valid as i_valid,
  rebuild as i_rebuild
} from './designer/InputInteger'
import {
  InputString,
  clean as str_clean,
  prototype as str_prototype,
  valid as str_valid,
  rebuild as str_rebuild
} from './designer/InputString'
import {
  InputListCustom,
  clean as rgx_il_clean,
  prototype as rgx_il_prototype,
  valid as rgx_il_valid,
  rebuild as rgx_il_rebuild
} from './designer/InputListCustom'
import {
  InputListFloat,
  clean as float_il_clean,
  prototype as float_il_prototype,
  valid as float_il_valid,
  rebuild as float_il_rebuild
} from './designer/InputListFloat'
import {
  InputListInteger,
  clean as int_il_clean,
  prototype as int_il_prototype,
  valid as int_il_valid,
  rebuild as int_il_rebuild
} from './designer/InputListInteger'
import {
  InputListString,
  clean as str_il_clean,
  prototype as str_il_prototype,
  valid as str_il_valid,
  rebuild as str_il_rebuild
} from './designer/InputListString'
import {
  Paragraph,
  clean as p_clean,
  prototype as p_prototype,
  valid as p_valid,
  rebuild as p_rebuild
} from './designer/Paragraph'
import {
  Section,
  clean as sec_clean,
  prototype as sec_prototype,
  valid as sec_valid,
  rebuild as sec_rebuild
} from './designer/Section'
import {
  SectionPackage,
  clean as pack_clean,
  prototype as pack_prototype,
  valid as pack_valid,
  rebuild as pack_rebuild
} from './designer/SectionPackage'

import {
  InputBoolean as Generator_InputBoolean,
  InputColor as Generator_InputColor,
  InputCustom as Generator_InputCustom,
  InputFloat as Generator_InputFloat,
  InputInteger as Generator_InputInteger,
  InputString as Generator_InputString,
  InputListCustom as Generator_InputList_Custom,
  InputListFloat as Generator_InputList_Float,
  InputListInteger as Generator_InputList_Integer,
  InputListString as Generator_InputList_String,
  Paragraph as Generator_Paragraph,
  Section as Generator_Section,
  SectionPackage as Generator_SectionPackage,
  Error as Generator_Error
} from './generator'

export const generator_aliases = {
  //primitives
  bool: { tag: Generator_InputBoolean, useContainer: true },
  color: { tag: Generator_InputColor, useContainer: true },
  rgx: { tag: Generator_InputCustom, useContainer: true },
  float: { tag: Generator_InputFloat, useContainer: true },
  int: { tag: Generator_InputInteger, useContainer: true },
  p: { tag: Generator_Paragraph, useContainer: false },
  str: { tag: Generator_InputString, useContainer: true },

  // input lists
  float_il: { tag: Generator_InputList_Float, useContainer: true },
  int_il: { tag: Generator_InputList_Integer, useContainer: true },
  rgx_il: { tag: Generator_InputList_Custom, useContainer: true },
  str_il: { tag: Generator_InputList_String, useContainer: true },
  sec: { tag: Generator_Section, useContainer: false },
  pack: { tag: Generator_SectionPackage, useContainer: false },

  err: { tag: Generator_Error, useContainer: false }
}

export const designer_aliases = {
  //primitives
  bool: {
    value: false,
    tag: InputBoolean,
    clean: b_clean,
    prototype: b_prototype,
    valid: b_valid,
    rebuild: b_rebuild,
    mustHaveUid: true,
    defaultValid: () => { return false; },
    defaultUid: () => { return ''; }
  },
  color: {
    value: '',
    tag: InputColor,
    clean: color_clean,
    prototype: color_prototype,
    valid: color_valid,
    rebuild: color_rebuild,
    mustHaveUid: true,
    defaultValid: () => { return false; },
    defaultUid: () => { return ''; }
  },
  rgx: {
    value: '',
    tag: InputCustom,
    clean: rgx_clean,
    prototype: rgx_prototype,
    valid: rgx_valid,
    rebuild: rgx_rebuild,
    mustHaveUid: true,
    defaultValid: () => { return false; },
    defaultUid: () => { return ''; }
  },
  float: {
    value: '',
    tag: InputFloat,
    clean: f_clean,
    prototype: f_prototype,
    valid: f_valid,
    rebuild: f_rebuild,
    mustHaveUid: true,
    defaultValid: () => { return false; },
    defaultUid: () => { return ''; }
  },
  int: {
    value: '',
    tag: InputInteger,
    clean: i_clean,
    prototype: i_prototype,
    valid: i_valid,
    rebuild: i_rebuild,
    mustHaveUid: true,
    defaultValid: () => { return false; },
    defaultUid: () => { return ''; }
  },
  p: {
    value: null,
    tag: Paragraph,
    clean: p_clean,
    prototype: p_prototype,
    valid: p_valid,
    rebuild: p_rebuild,
    mustHaveUid: false,
    defaultValid: () => { return false; },
    defaultUid: () => { return null; }
  },
  str: {
    value: '',
    tag: InputString,
    clean: str_clean,
    prototype: str_prototype,
    valid: str_valid,
    rebuild: str_rebuild,
    mustHaveUid: true,
    defaultValid: () => { return false; },
    defaultUid: () => { return ''; }
  },

  // input lists
  float_il: {
    value: [],
    tag: InputListFloat,
    clean: float_il_clean,
    prototype: float_il_prototype,
    valid: float_il_valid,
    rebuild: float_il_rebuild,
    mustHaveUid: true,
    defaultValid: () => { return false; },
    defaultUid: () => { return ''; }
  },
  int_il: {
    value: [],
    tag: InputListInteger,
    clean: int_il_clean,
    prototype: int_il_prototype,
    valid: int_il_valid,
    rebuild: int_il_rebuild,
    mustHaveUid: true,
    defaultValid: () => { return false; },
    defaultUid: () => { return ''; },

    
  },
  rgx_il: {
    value: [],
    tag: InputListCustom,
    clean: rgx_il_clean,
    prototype: rgx_il_prototype,
    valid: rgx_il_valid,
    rebuild: rgx_il_rebuild,
    mustHaveUid: true,
    defaultValid: () => { return false; },
    defaultUid: () => { return ''; }
  },
  str_il: {
    value: [],
    tag: InputListString,
    clean: str_il_clean,
    prototype: str_il_prototype,
    valid: str_il_valid,
    rebuild: str_il_rebuild,
    mustHaveUid: true,
    defaultValid: () => { return false; },
    defaultUid: () => { return ''; }
  },
  // sections
  sec: {
    value: null,
    tag: Section,
    clean: sec_clean,
    prototype: sec_prototype,
    valid: sec_valid,
    rebuild: sec_rebuild,
    mustHaveUid: true,
    defaultValid: () => { return [false, []]; },
    defaultUid: () => { return ['', []]; }
  },
  pack: {
    value: null,
    tag: SectionPackage,
    clean: pack_clean,
    prototype: pack_prototype,
    valid: pack_valid,
    rebuild: pack_rebuild,
    mustHaveUid: true,
    defaultValid: () => { return [false, []]; },
    defaultUid: () => { return ['', []]; }
  }
}

export const package_designer_aliases = {
  sec: {
    value: null,
    tag: Section,
    clean: sec_clean,
    prototype: sec_prototype,
    valid: sec_valid,
    rebuild: sec_rebuild,
    mustHaveUid: true,
    defaultValid: () => { return [false, []]; },
    defaultUid: () => { return ['', []]; }
  }
}
