import React from 'react';
import styles from './Loader.module.css';

const Loader: React.FC<{}> = (props) => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
