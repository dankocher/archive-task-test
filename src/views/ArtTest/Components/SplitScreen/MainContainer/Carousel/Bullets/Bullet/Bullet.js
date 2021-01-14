import styles from "./bullet.module.scss";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import bigBulletIcon from "../../../../../../helpers/icons/big-bullet-icon";
import smallBulletIcon from "../../../../../../helpers/icons/small-bullet-icon";

import { setImageIndex } from "../../../../../../../../redux/actions/caruselActions";

const classNames = require("classnames");

function Bullet({ active, index }) {
  const dispatch = useDispatch();
  const currentImageIndex = useSelector((state) => state.current);

  const handleSetImageIndex = () => {
    if (currentImageIndex === index) {
      return;
    } else {
      dispatch(setImageIndex(index));
    }
  };

  const bullet = classNames("hidden-button", {
    [styles.active]: active,
    [styles.default]: !active,
  });

  return (
    <>
      <div className={styles.container}>
        <button className={bullet} onClick={handleSetImageIndex}>
          {/* <i>{active ? bigBulletIcon : smallBulletIcon}</i> */}
        </button>
      </div>
    </>
  );
}

export default Bullet;
