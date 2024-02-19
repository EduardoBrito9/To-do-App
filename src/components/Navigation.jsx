import React from 'react';
import styles from './Navigation.module.css'
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className={styles.navigation}>
    <ul className={styles.links}>
    <li><Link to='/home' className={styles.navli}>Home</Link></li>
      <li><Link to="/important" className={styles.navli}>Importants</Link></li>
    </ul>
  </div>
  )
}

export default Navigation