import React from "react";
import styles from "./StartPage.module.css";
import Boy from "../../images/boy.svg?react";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <div className={styles.welcome}>
      <h1 className={styles.title}>Dont know how to improve your day?</h1>
      <Boy />
      <h2 className={styles.minititle}>Use our new App!</h2>
      <Link to="/home">
        <button className={styles.foryou}>Start now</button>
      </Link>
    </div>
  );
};

export default StartPage;
