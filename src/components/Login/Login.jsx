import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Input} from '../../common/FormsControls/FormsControls';
import {requiredField} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer.js';
import {Redirect} from 'react-router-dom';
import styles from '../../common/FormsControls/FormsControls.module.css';

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
      {props.error && (
        <div className={styles.formSummaryError}>{props.error}</div>
      )}
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
    props.login(formData.login, formData.password, formData.rememberMe);
  };
  if (props.isAuth) {
    return <Redirect to='/profile' />;
  }

  return (
    <div>
      <h1>Login</h1>
      <ReduxLoginForm onSubmit={onSubmit} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, {login})(Login);
