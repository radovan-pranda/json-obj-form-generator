import {
    BoolTranslationPropType,
    StringTranslationPropType,
    ListStringTranslationPropType,
    ListFloatTranslationPropType,
    ListIntegerTranslationPropType,
    CustomTranslationPropType,
    ParagraphTranslationPropType,
    IntegerTranslationPropType,
    FloatTranslationPropType,
    ListCustomTranslationPropType
} from './components/designer/propTypes';

export const GeneratorTranslationSet = {
    bool: BoolTranslationPropType,
    str: StringTranslationPropType,
    str_ilist: ListStringTranslationPropType,
    float_list: ListFloatTranslationPropType,
    int_ilist: ListIntegerTranslationPropType,
    rgx: CustomTranslationPropType,
    p: ParagraphTranslationPropType,
    int: IntegerTranslationPropType,
    float: FloatTranslationPropType,
    rgx_ilist: ListCustomTranslationPropType
}