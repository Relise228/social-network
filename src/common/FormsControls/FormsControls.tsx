import React, {FunctionComponent} from 'react';
import {Field, WrappedFieldInputProps, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form';
import styles from './FormsControls.module.css';
import {FieldValidatorType} from "../../utils/validators/validators";

type FormControlParamsType = {
    Element: 'textarea' | 'input',
    meta: WrappedFieldMetaProps
    input: WrappedFieldInputProps
}

export const FormControl: React.FC<FormControlParamsType> = ({
  input,
  meta: {touched, error},
  Element,
  ...props
}) => {
  const hasError = touched && error;
  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      <div>
        <Element {...input} {...props} />
      </div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {

  return <FormControl {...props} Element='textarea' />;
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
    console.log(props)
  return <FormControl {...props} Element='input' />;
};


export function CreateField<FormKeysType extends string> (
  placeholder : string | null,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: FunctionComponent<WrappedFieldProps>,
  props = {},
  text = ''
)  {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        component={component}
        validate={validators}
        {...props}
      />
      {text}
    </div>
  );
};

export type  GetStringKeys<T> = Extract<keyof T, string>
