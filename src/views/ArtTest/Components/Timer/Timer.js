import "./timer.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Timer({ type }) {
  const [currentTimerMS, setCurrentTimerMS] = useState(undefined);
  const [currentTimer, setCurrentTimer] = useState(undefined);

  const currentTime = useSelector((state) => state.testStorage.currentTime);
  const currentTestId = useSelector((state) => state.testStorage.currentTestId);
  const currentTaskIndex = useSelector(
    (state) => state.testStorage?.[currentTestId]?.currentTaskIndex
  );

  const testStart = useSelector(
    (state) => state.resultStorage[currentTestId].start_date
  );
  const taskStart = useSelector(
    (state) =>
      state.resultStorage[currentTestId].results[currentTaskIndex]?.start_date
  );

  const task = useSelector(
    (state) => state.testStorage[currentTestId]?.taskList?.[currentTaskIndex]
  );

  const isTimeDisplay = task.isTimeDisplayForUser;

  useEffect(() => {
    let startDate;
    if (type === "test") {
      if (testStart == null || currentTimerMS != null) return;
      startDate = testStart;
    } else if (taskStart == null) return;
    else startDate = taskStart;

    if (currentTime < startDate) return;

    setCurrentTimerMS(currentTime - startDate);
  }, [currentTime, taskStart]);

  const tick = () => {
    if (currentTimerMS == null) return;

    setCurrentTimerMS((timer) => timer + 1000);

    const timerInSeconds = currentTimerMS / 1000;
    const seconds = Math.floor(timerInSeconds % 60);

    const timerInMinutes = timerInSeconds / 60;
    const minutes = Math.floor(timerInMinutes % 60);

    const hours = Math.floor(timerInMinutes / 60);

    let parsedTimer;

    if (hours >= 1) {
      parsedTimer =
        hours.toString().padStart(2, 0) +
        ":" +
        minutes.toString().padStart(2, 0) +
        ":" +
        seconds.toString().padStart(2, 0);
    } else {
      parsedTimer =
        minutes.toString().padStart(2, 0) +
        ":" +
        seconds.toString().padStart(2, 0);
    }

    setCurrentTimer(parsedTimer);
  };

  useEffect(() => {
    if (!isTimeDisplay) return;

    if (currentTimer == null) {
      tick();
    }

    const interval = setInterval(tick, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [taskStart, isTimeDisplay, currentTimerMS, currentTime]);

  return (
    <>
      <span className="font-timer">{currentTimer}</span>
    </>
  );
}

export default Timer;
