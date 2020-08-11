import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Input} from '../../common/FormsControls/FormsControls';
import {requiredField} from '../../utils/validators/validators';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          type='login'
          placeholder='login'
          name='login'
          component={Input}
          validate={[requiredField]}
        />
      </div>
      <div>
        <Field
          type='password'
          placeholder='password'
          name='password'
          component={Input}
          validate={[requiredField]}
        />
      </div>
      <div>
        <Field type='checkbox' name='rememberMe' component={Input} />
        remember me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const ReduxLoginForm = reduxForm({
  form: 'login',
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div>
      <h1>Login</h1>
      <ReduxLoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
