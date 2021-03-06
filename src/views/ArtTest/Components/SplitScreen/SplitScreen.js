import styles from "./splitScreen.module.scss";
import React from "react";

import MainContainer from "./MainContainer/MainContainer";

import SideContainer from "./SideContainer/SideContainer";

function SplitScreen({ mainContainer }) {
  return (
    <div className={styles.container}>
      <MainContainer mainContainerBody={mainContainer} />
      <SideContainer />
    </div>
  );
}

export default SplitScreen;
