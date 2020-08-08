import React from 'react';
import styles from './Nav.module.css';
import {NavLink} from 'react-router-dom';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.item}>
        <NavLink
          to='/profile'
          className={styles.item}
          activeClassName={styles.active}
        >
          Profile
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink
          to='/dialogs'
          className={styles.item}
          activeClassName={styles.active}
        >
          Messages
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink
          to='/users'
          className={styles.item}
          activeClassName={styles.active}
        >
          Users
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink
          to='/news'
          className={styles.item}
          activeClassName={styles.active}
        >
          News
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink
          to='/music'
          className={styles.item}
          activeClassName={styles.active}
        >
          Music
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink
          to='/settings'
          className={styles.item}
          activeClassName={styles.active}
        >
          Settings
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
