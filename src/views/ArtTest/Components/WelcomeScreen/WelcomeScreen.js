import styles from "./WelcomeScreen.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getImgPath } from "../../helpers/getImgPath";
import startTaskThunk from "../../thunks/startTaskThunk";

import setNextTaskId from "../../thunks/setNextTaskId";

import staticText from "../../utils/labelText/lable.json";

import Button from "../Button/Button";

const classNames = require("classnames");

function WelcomeScreen() {
  const dispatch = useDispatch();

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const currentTestId = useSelector((state) => state.testStorage.currentTestId);
  const currentTaskIndex = useSelector(
    (state) => state.testStorage?.[currentTestId]?.currentTaskIndex
  );

  const task = useSelector(
    (state) => state.testStorage[currentTestId]?.taskList?.[currentTaskIndex]
  );
  const taskId = task._id;

  const header = task?.name;
  const description = task?.description;
  const img = task?.data?.imgUrl;
  const imgUrl = getImgPath(img);

  useEffect(() => {
    dispatch(startTaskThunk(taskId));
  }, [currentTaskIndex]);

  const contentContainer = classNames(styles.contentContainer, {
    [styles.containerOneContent]: img == null || img === "",
  });

  const content = classNames(styles.contentContainer__sideContainer, {
    [styles.oneContentArea]: img == null || img === "",
  });

  const nextTaskHandler = () => {
    dispatch(setNextTaskId(currentTaskIndex));
  };

  return (
    <div className={styles.container}>
      <div className={contentContainer}>
        <div className={content}>
          <h1>{header}</h1>
          <p>{description}</p>

          <Button
            label={staticText.buttonLabelNext}
            isDisabled={true}
            onClick={nextTaskHandler}
          />
        </div>
        {img != null ? (
          <div className={styles.contentContainer__imgContainer}>
            {isImgLoaded ? null : <div />}
            <img
              src={imgUrl}
              style={isImgLoaded ? {} : { display: "none" }}
              onLoad={() => setIsImgLoaded(true)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default WelcomeScreen;
