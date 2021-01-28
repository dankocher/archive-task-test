import styles from "./photoModal.module.scss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  setIsHiddenPhotoModal,
  setScaleCounter,
} from "../../../../redux/actions/caruselActions";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Arrow from "../SplitScreen/MainContainer/Carousel/Arrow/Arrow";
import ZoomController from "./ZoomController/ZoomController";
import closeIcon from "../../helpers/icons/close-icon";

const MAX_SCALE_COUNTER = 3;

function PhotoModal({
  currentImgUrl,
  isLeftArrowVisible,
  isRightArrowVisible,
}) {
  const dispatch = useDispatch();

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const handlerCloseButton = (event) => {
    event.stopPropagation();

    dispatch(setScaleCounter(0));
    dispatch(setIsHiddenPhotoModal());
  };

  return (
    <TransformWrapper
      wheel={{ disabled: true }}
      doubleClick={{ disabled: true }}
      defaultScale={1}
      zoomIn={{ step: 6 }}
      zoomOut={{ step: 7.5 }}
      defaultPositionX={0}
      defaultPositionY={0}
    >
      {({
        setScale,
        resetTransform,
        setDefaultState,
        zoomIn,
        zoomOut,
        ...rest
      }) => (
        <React.Fragment>
          <div className={styles.container}>
            <button
              onClick={(event) => handlerCloseButton(event, resetTransform)}
              className={`hidden-button ${styles.container__closeBtn}`}
            >
              <i>{closeIcon}</i>
            </button>

            {isLeftArrowVisible() ? null : (
              <div className={styles.container__leftArrow}>
                <Arrow isToLeft={true} resetTransform={setDefaultState} />
              </div>
            )}

            <div className={styles.container__imgContainer}>
              <TransformComponent>
                {isImgLoaded ? null : <div />}
                <img
                  src={currentImgUrl}
                  style={isImgLoaded ? {} : { display: "none" }}
                  onLoad={() => setIsImgLoaded(true)}
                />
              </TransformComponent>
            </div>

            {isRightArrowVisible() ? null : (
              <div className={styles.container__rightArrow}>
                <Arrow resetTransform={setDefaultState} />
              </div>
            )}

            <div className={styles.container__zoomContainer}>
              <ZoomController
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                resetTransform={resetTransform}
                maxScaleCounter={MAX_SCALE_COUNTER}
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
}

export default PhotoModal;
