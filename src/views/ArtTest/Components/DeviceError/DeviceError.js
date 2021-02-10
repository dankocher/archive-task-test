import React from "react";
import styles from "./deviceError.module.scss";

function DeviceError() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Oops!</h1>
        <p>
          У вашего устройства слишком маленькой разрешение, воспользуйтесь
          ноутбуком или компьютером с разрешением выше 1365 PX
        </p>
      </div>
    </div>
  );
}

export default DeviceError;
