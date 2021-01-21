import React from 'react';
import styles from './Header.module.css';
import {NavLink} from 'react-router-dom';

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header: React.FC<PropsType> = ({isAuth, login, logout}) => {
    return (
        <header className={styles.header}>
            <img
                src='https://hugeturtle.com/wp-content/uploads/2019/08/1_VeM-5lsAtrrJ4jXH96h5kg.png'
                alt=''
            />

            <div className={styles.loginBlock}>
                {isAuth ? (
                    <div>
                        {login}
                        <button onClick={logout} className={styles.button}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <NavLink to='/login' className={styles.button}>
                        Login
                    </NavLink>
                )}
            </div>
        </header>
    );
};

export default Header;
