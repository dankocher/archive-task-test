import styles from "./authorization.module.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { goToNextTask } from "../../../../redux/actions/testActions";
import { login } from "../../../../redux/actions/resultActions";
import { getCurrentTime } from "../../helpers/workWithApi";

import { isEmail } from "../../utils/validators/isEmail";
import { isName } from "../../utils/validators/isName";

import Button from "../Button/Button";
import labels from "../../utils/labelText/lable.json";
import errorIcon from "../../helpers/icons/error-icon";

function Authorization() {
  const dispatch = useDispatch();

  const [onBlured, setOnBlured] = useState("");
  const [name, setLocalName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [email, setLocalEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const currentTestId = useSelector((state) => state.testStorage.currentTestId);
  const testName = useSelector(
    (state) => state.testStorage?.[currentTestId].testName
  );

  const startTestHandler = () => {
    if (!onBlured) {
      setOnBlured(true);
      const _isNameValid = isName(name);
      const _isEmailValid = isEmail(email);

      setIsNameValid(_isNameValid);
      setIsEmailValid(_isEmailValid);

      if (!_isNameValid || !_isEmailValid) return;
    } else if (!isEmailValid || !isNameValid) return;

    getCurrentTime().then((startDate) => {
      dispatch(login(name, email, currentTestId, startDate));
      dispatch(goToNextTask(0));
    });
  };

  const onChangeNameHandler = (event) => {
    const value = event.target.value;

    if (value.length > 100) return;
    if (onBlured) setIsNameValid(isName(value));

    setLocalName(value);
  };

  const onChangeEmailHandler = (event) => {
    const value = event.target.value;

    if (value.length > 50) return;
    if (onBlured) setIsEmailValid(isEmail(value));

    setLocalEmail(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.contentContainer__imgContainer}>
          <img src={require("../../../../assets/img/testStart.png")} />
        </div>
        <div className={styles.contentContainer__centeredContainer}>
          <div className={styles.contentContainer__centeredContainer__header}>
            {testName}
          </div>
          <div className={styles.wrapper}>
            <div className={styles.wrapper__field}>
              <label>{labels.nameLabel}</label>

              <input
                className={!isNameValid ? styles.error : null}
                value={name}
                onChange={onChangeNameHandler}
              />
              {!isNameValid ? (
                <div className={styles.wrapper__field__errorMessage}>
                  <i>{errorIcon}</i>
                  <span>Неверое имя</span>
                </div>
              ) : null}
            </div>
            <div className={styles.wrapper__field}>
              <label>{labels.mailLabel}</label>

              <input
                className={!isEmailValid ? styles.error : null}
                value={email}
                onChange={onChangeEmailHandler}
              />
              {!isEmailValid ? (
                <div className={styles.wrapper__field__errorMessage}>
                  <i>{errorIcon}</i>
                  <span>Неверная почта</span>
                </div>
              ) : null}
            </div>

            <Button
              label={labels.buttonLabelStart}
              onClick={startTestHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authorization;
