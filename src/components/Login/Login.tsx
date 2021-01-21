import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {CreateField, GetStringKeys, Input} from '../../common/FormsControls/FormsControls';
import {requiredField} from '../../utils/validators/validators';
import {connect} from 'react-redux';
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

type MapStatePropsType = {
    isAuth: boolean
}

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}


type LoginFormValuesTypeKeys = GetStringKeys<FormDataType>


type MapDispatchPropsType = {
    login: (login: string, password: string, rememberMe: boolean) => void
}

type LoginType = MapStatePropsType & MapDispatchPropsType


const Login: React.FC<LoginType> = (props) => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData);
        props.login(formData.login, formData.password, formData.rememberMe);
    };
    if (props.isAuth) {
        return <Redirect to='/profile'/>;
    }

    return (
        <div>
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={onSubmit}/>
        </div>
    );
};
const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
    };
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {login})(Login);
