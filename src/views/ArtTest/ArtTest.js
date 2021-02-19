import "./index.scss";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWindowSize } from "./helpers/customHooks/getWindowSize";

import { deleteResult } from "../../redux/actions/resultActions";
import { setCurrentTime, deleteTest } from "../../redux/actions/testActions";

import { getCurrentTime } from "./helpers/workWithApi";

import Loader from "./Components/Loader";
import DeviceError from "./Components/DeviceError/DeviceError";

const MAX_TEST_DURATION = 345600000; //96 hours

function ArtTest() {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  const [isTestEnded, setIsTestEnded] = useState(false);

  const currentTestId = useSelector((state) => state.testStorage.currentTestId);
  const currentTaskIndex = useSelector(
    (state) => state?.testStorage?.[currentTestId]?.currentTaskIndex
  );

  const currentTime = useSelector((state) => state.testStorage.currentTime);
  const testStart = useSelector(
    (state) => state.resultStorage?.[currentTestId]?.start_date
  );

  useEffect(() => {
    getCurrentTime().then((time) => {
      //If the test runs for more than N hours, then it is deleted
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

  const checkWindowSize = () => {
    if (windowSize.width < 1366 || windowSize.height < 625) {
      return <DeviceError />;
    } else {
      return (
        <div className="mainContainer">
          {currentTime != null && isRehydrated ? (
            <Loader setIsTestEnded={setIsTestEnded} isTestEnded={isTestEnded} />
          ) : null}
        </div>
      );
    }
  };

  return <>{checkWindowSize()}</>;
}

export default ArtTest;
