import React from "react";
import styles from "./Navigation.module.css";
import {  NavLink } from "react-router-dom";
import Starplus from "../../images/Starplus.svg?react";
import Sun from "../../images/Sun.svg?react";
import Calendar from "../../images/calendar.svg?react";

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <ul className={styles.links}>
        <li>
          <NavLink to="/home" className={styles.navli}>
            <Sun /> My Day
          </NavLink>
        </li>
        <li>
          <NavLink to="/important" className={`${styles.navli} ${styles.star}`}>
            <Starplus /> Importants
          </NavLink>
        </li>
        <li>
          <NavLink to="/myweek" className={`${styles.navli} ${styles.star}`}>
            <Calendar /> My Week
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
