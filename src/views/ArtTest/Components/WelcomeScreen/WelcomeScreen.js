import styles from "./WelcomeScreen.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getImgPath } from "../../helpers/getImgPath";
import { useGetResultIndex } from "../../helpers/customHooks/getResultIndex";
import setNextTaskId from "../../thunks/setNextTaskId";
import { addWelcomePage } from "../../../../redux/actions/resultActions";

import { getCurrentTime } from "../../helpers/workWithApi";

import staticText from "../../utils/labelText/lable.json";

import Button from "../Button/Button";

const classNames = require("classnames");

function WelcomeScreen() {
  const dispatch = useDispatch();

  const resultIndex = useGetResultIndex();

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const currentTestId = useSelector((state) => state.testStorage.currentTestId);
  const currentTaskIndex = useSelector(
    (state) => state.testStorage?.[currentTestId]?.currentTaskIndex
  );

  const task = useSelector(
    (state) => state.testStorage[currentTestId]?.taskList?.[currentTaskIndex]
  );
  const taskId = task._id;
  const isTimeConsidered = task.isTimeConsidered;

  const header = task?.name;
  const description = task?.description;
  const img = task?.data?.imgUrl;
  const imgUrl = getImgPath(img);

  useEffect(() => {
    if (resultIndex !== -1) return;

    if (isTimeConsidered) {
      getCurrentTime().then((startDate) => {
        dispatch(addWelcomePage(currentTestId, taskId, startDate));
      });
    } else {
      dispatch(addWelcomePage(currentTestId, taskId, undefined));
    }
  }, []);

  const contentContainer = classNames(styles.contentContainer, {
    [styles.containerOneContent]: img == null || img === "",
  });

  const content = classNames(styles.contentContainer__sideContainer, {
    [styles.oneContentArea]: img == null || img === "",
  });

  const nextTaskHandler = () => {
    dispatch(setNextTaskId(resultIndex));
  };

  return (
    <div className={styles.container}>
      <div className={contentContainer}>
        <div className={content}>
          <h1>{header}</h1>
          <p>{description}</p>

          <Button
            label={staticText.buttonLabelNext}
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
