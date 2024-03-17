import React from "react";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";
import Starplus from "../../images/Starplus.svg?react";
import Sun from "../../images/Sun.svg?react";
const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <ul className={styles.links}>
        <li>
          <Link to="/home" className={styles.navli}>
            <Sun /> My Day
          </Link>
        </li>
        <li>
          <Link to="/important" className={`${styles.navli} ${styles.star}`}>
           <Starplus /> Importants
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
