import styles from "./endScreen.module.scss";
import React from "react";

function EndScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.contantContainer}>
        <p>Спасибо за выполнение теста!</p>
        <span>Мы свяжемся с вами после его проверки.</span>
        <div className={styles.contantContainer__imgContainer}>
          <img src={require("../../../../assets/img/testEnd.jpg")} />
        </div>
      </div>
    </div>
  );
}

export default EndScreen;
