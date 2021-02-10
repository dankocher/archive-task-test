import styles from "./button.module.scss";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { isFunction } from "../../utils/validators/isFunction";
import { useNetwork } from "../../helpers/customHooks/getIsOnline";

import errorIcon from "../../helpers/icons/error-icon";

function Button({ onClick, label }) {
  const isOnline = useNetwork();

  const [isNextBtnClicked, setIsNextBtnClicked] = useState(false);

  const isLoading = useSelector((state) => state.testStorage.isLoading);

  const currentTestId = useSelector((state) => state.testStorage.currentTestId);

  const currentSubTaskIndex = useSelector(
    (state) => state.testStorage?.[currentTestId]?.currentSubTaskIndex
  );

  const onClickHandler = isFunction(onClick)
    ? () => {
        setIsNextBtnClicked(true);

        if (!isOnline || isLoading) return;
        onClick();
      }
    : () => console.log("Is not a function");

  useEffect(() => {
    setIsNextBtnClicked(false);
  }, [currentSubTaskIndex]);

  return (
    <div className={styles.container}>
      <button
        onClick={() => onClickHandler()}
        disabled={!isOnline && isNextBtnClicked}
      >
        {label}
      </button>

      {!isOnline && isNextBtnClicked ? (
        <div className={styles.errorMessage}>
          <i>{errorIcon}</i>
          <span>Возникла проблема с интернетом.</span>
        </div>
      ) : null}
    </div>
  );
}

export default Button;
