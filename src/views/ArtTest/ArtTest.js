import "./index.scss";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useWindowSize } from "./helpers/customHooks/getWindowSize";

import Loader from "./Components/Loader";
import DeviceError from "./Components/DeviceError/DeviceError";

function ArtTest() {
  const windowSize = useWindowSize();

  const isRehydrated = useSelector(
    (state) => state.rehydrateStorage.isRehydrated
  );

  const checkWindowSize = () => {
    // if (windowSize.width < 1366 || windowSize.height < 625) {
    //   return <DeviceError />;
    // } else {
      return (
        <div className="mainContainer">{isRehydrated ? <Loader /> : null}</div>
      );
    // }
  };

  return <>{checkWindowSize()}</>;
}

export default ArtTest;
