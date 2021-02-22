import "./index.scss";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUrlId } from "../../helpers/getUrlId";

import {
  WELCOME_SCREEN,
  ILLUSTRATION_RADIO_BUTTONS,
  QUSETION_ANSWER,
  WORDS_RADIO_BUTTONS,
  ILLUSTRATIONS_ANSWERS,
} from "../../helpers/taskTypes";

import Authorization from "../Authorization/Authorization";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";
import QuestionPage from "../QuestionPage/QuestionPage";
import SplitScreen from "../SplitScreen/SplitScreen";
import BigTextMainContainer from "../SplitScreen/MainContainer/BigText/BigText";
import Carousel from "../SplitScreen/MainContainer/Carousel/Carousel";
import EndScreen from "../EndScreen/EndScreen";

import integrityCheckThunk from "../../thunks/integrityCheckThunk";

import { deleteResult } from "../../../../redux/actions/resultActions";
import {
  deleteTest,
  setIsLoading,
} from "../../../../redux/actions/testActions";

import {
  getTaskIdListFromServer,
  saveResults,
} from "../../helpers/workWithApi";

const getPage = (taskType) => {
  switch (taskType) {
    case WELCOME_SCREEN:
      return <WelcomeScreen />;
    case QUSETION_ANSWER:
      return <QuestionPage />;
    case WORDS_RADIO_BUTTONS:
      return <SplitScreen mainContainer={<BigTextMainContainer />} />;
    case ILLUSTRATIONS_ANSWERS:
      return <SplitScreen mainContainer={<Carousel />} />;
    case ILLUSTRATION_RADIO_BUTTONS:
      return <SplitScreen mainContainer={<Carousel />} />;

    default:
      break;
  }
};

function Loader({ setIsTestEnded, isTestEnded }) {
  const dispatch = useDispatch();
  // const state = useSelector((state) => state);

  const currentTestId = useSelector((state) => state.testStorage.currentTestId);
  const currentTaskIndex = useSelector(
    (state) => state?.testStorage?.[currentTestId]?.currentTaskIndex
  );

  const task = useSelector(
    (state) => state.testStorage?.[currentTestId]?.taskList?.[currentTaskIndex]
  );
  const taskType = task?.type;

  const resultStorage = useSelector(
    (state) => state.resultStorage[currentTestId]
  );

  const endDate = resultStorage?.end_date;

  useEffect(() => {
    const testId = getUrlId();

    if (testId === currentTestId && currentTaskIndex != null) return;

    getTaskIdListFromServer().then((res) => {
      //{ tasksCounter, currentTestId, taskList, testName }

      dispatch(
        integrityCheckThunk(
          res.ttask.tasksCounter,
          res.ttask._id,
          res.tasks,
          res.ttask.name
        )
      );
    });
  }, [currentTestId]);

  //End task
  useEffect(() => {
    if (endDate == null) return;

    saveResults(resultStorage).then((res) => {
      if (!res.ok) return;

      // debugger;
      dispatch(deleteTest(currentTestId));
      dispatch(deleteResult(currentTestId));
      setIsTestEnded(true);
      dispatch(setIsLoading(false));
    });
  }, [endDate]);

  return (
    <>
      {currentTaskIndex != null ? (
        getPage(taskType)
      ) : isTestEnded ? (
        <EndScreen />
      ) : (
        <Authorization />
      )}
    </>
  );
}

export default Loader;
