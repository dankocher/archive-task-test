import styles from "./bullets.module.scss";
import React from "react";

import Bullet from "./Bullet/Bullet";

function Bullets({ currentImageIndex, arrOfImages }) {
  return (
    <div className={styles.container}>
      {arrOfImages.map((_, key) => {
        return (
          <Bullet active={key === currentImageIndex} key={key} index={key} />
        );
      })}
    </div>
  );
}

export default Bullets;
