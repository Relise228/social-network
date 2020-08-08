import React from 'react';
import styles from './Loader.module.css';

const Loader = (props) => {
  return (
    <div class={styles.lds_ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
