import "./index.scss";
import React from "react";
import { useSelector } from "react-redux";

import Loader from "./Components/Loader";

function ArtTest() {
  const isRehydrated = useSelector(
    (state) => state.rehydrateStorage.isRehydrated
  );

  return (
    <div className="mainContainer">{isRehydrated ? <Loader /> : null}</div>
  );
}

export default ArtTest;
