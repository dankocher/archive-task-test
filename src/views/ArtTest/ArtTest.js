import "./index.scss";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWindowSize } from "./helpers/customHooks/getWindowSize";

import { deleteResult } from "../../redux/actions/resultActions";
import { setCurrentTime, deleteTest } from "../../redux/actions/testActions";

import { getCurrentTime } from "./helpers/workWithApi";

import Loader from "./Components/Loader";
import DeviceError from "./Components/DeviceError/DeviceError";

const MAX_TEST_DURATION = 172800000; //24 hours

function ArtTest() {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  const currentTestId = useSelector((state) => state.testStorage.currentTestId);
  const currentTaskIndex = useSelector(
    (state) => state?.testStorage?.[currentTestId]?.currentTaskIndex
  );

  const currentTime = useSelector((state) => state.testStorage.currentTime);
  const testStart = useSelector(
    (state) => state.resultStorage?.[currentTestId]?.start_date
  );

  useEffect(() => {
    if (currentTime != null) {
      dispatch(setCurrentTime(undefined));
    }

    getCurrentTime().then((time) => {
      //If the test runs for more than 200 hours, then it is deleted
      if (testStart != null && time - testStart >= MAX_TEST_DURATION) {
        dispatch(deleteTest(currentTestId));
        dispatch(deleteResult(currentTestId));
      }

      dispatch(setCurrentTime(time));
    });
  }, [currentTaskIndex]);

  const isRehydrated = useSelector(
    (state) => state.rehydrateStorage.isRehydrated
  );

  // useEffect(() => {
  //   console.log("LODERcurrentTime: " + currentTime);
  // }, [currentTime]);

  const checkWindowSize = () => {
    if (windowSize.width < 1366 || windowSize.height < 625) {
      return <DeviceError />;
    } else {
      return (
        <div className="mainContainer">
          {currentTime != null && isRehydrated ? <Loader /> : null}
        </div>
      );
    }
  };

  return <>{checkWindowSize()}</>;
}

export default ArtTest;
