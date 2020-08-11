import React from 'react';
import styles from './FormsControls.module.css';

export const FormControl = ({input, meta, Element, ...props}) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      <div>
        <Element {...input} {...props} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Textarea = (props) => {
  return <FormControl {...props} Element='textarea' />;
};

export const Input = (props) => {
  return <FormControl {...props} Element='input' />;
};
