import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {CreateField, GetStringKeys, Input} from '../../common/FormsControls/FormsControls';
import {requiredField} from '../../utils/validators/validators';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import styles from '../../common/FormsControls/FormsControls.module.css';
import {AppStateType} from "../../redux/redux-store";

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {CreateField<LoginFormValuesTypeKeys>('Email', "login", [requiredField], Input)}
            {CreateField<LoginFormValuesTypeKeys>('Password', 'password', [requiredField], Input, {
                type: 'password',
            })}
            {CreateField<LoginFormValuesTypeKeys>(
                null,
                'rememberMe',
                [],
                Input,
                {
                    type: 'checkbox',
                },
                'remember me'
            )}

            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const ReduxLoginForm = reduxForm<FormDataType>({
    form: 'login',
})(LoginForm);


type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}


type LoginFormValuesTypeKeys = GetStringKeys<FormDataType>


type LoginType = {}

const Login: React.FC<LoginType> = (props) => {
    const isAuth = useSelector<AppStateType>((state) => state.auth.isAuth)
    const dispatch = useDispatch()

    const onSubmit = (formData: FormDataType) => {
        dispatch(login(formData.login, formData.password, formData.rememberMe));
    };

    if (isAuth) {
        return <Redirect to='/profile'/>;
    }

    return (
        <div>
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={onSubmit}/>
        </div>
    );
};


export default Login;
