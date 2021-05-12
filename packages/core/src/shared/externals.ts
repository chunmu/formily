import { FormPath } from '../../../shared/src'
import { Form } from '../models'
import { IFormProps } from '../types'
import {
  setValidateLanguage,
  registerValidateFormats,
  registerValidateLocale,
  registerValidateMessageTemplateEnigne,
  registerValidateRules,
} from '../../../validator/src'
import {
  createEffectHook,
  createEffectContext,
  useEffectForm,
} from './effectbox'
import {
  isArrayField,
  isArrayFieldState,
  isDataField,
  isDataFieldState,
  isField,
  isFieldState,
  isForm,
  isFormState,
  isGeneralField,
  isGeneralFieldState,
  isObjectField,
  isObjectFieldState,
  isQuery,
  isVoidField,
  isVoidFieldState,
} from './checkers'

const createForm = (options?: IFormProps) => {
  return new Form(options)
}

export {
  FormPath,
  createForm,
  isArrayField,
  isArrayFieldState,
  isDataField,
  isDataFieldState,
  isField,
  isFieldState,
  isForm,
  isFormState,
  isGeneralField,
  isGeneralFieldState,
  isObjectField,
  isObjectFieldState,
  isQuery,
  isVoidField,
  isVoidFieldState,
  setValidateLanguage,
  registerValidateFormats,
  registerValidateLocale,
  registerValidateMessageTemplateEnigne,
  registerValidateRules,
  createEffectHook,
  createEffectContext,
  useEffectForm,
}
