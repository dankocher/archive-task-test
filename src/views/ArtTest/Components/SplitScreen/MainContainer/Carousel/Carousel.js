import styles from "./carousel.module.scss";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setImageLength,
  setIsHiddenPhotoModal,
  setImageIndex,
} from "../../../../../../redux/actions/caruselActions";

import { getImgPath } from "../../../../helpers/getImgPath";
import startTaskThunk from "../../../../thunks/startTaskThunk";
import { useGetResultIndex } from "../../../../helpers/customHooks/getResultIndex";

import Arrow from "./Arrow/Arrow";
import Bullets from "./Bullets/Bullets";
import PhotoModal from "../../../PhotoModal/PhotoModal";

function Carousel() {
  const dispatch = useDispatch();

  const resultIndex = useGetResultIndex();

  const currentTestId = useSelector((state) => state.testStorage.currentTestId);

  const currentImageIndex = useSelector(
    (state) => state.caruselReducer.current
  );
  const isHiddenPhotoModal = useSelector(
    (state) => state.caruselReducer.isHiddenPhotoModal
  );

  const task = useSelector((state) => state.testStorage.currentTask);
  const taskId = task._id;
  const imgGrid = task.data.imgGrid;
  const currentSubTaskIndex = useSelector(
    (state) => state.testStorage[currentTestId].currentSubTaskIndex
  );
  const radioButtonTaskList = task.data.radioButtonTaskList;

  const currentTask = useSelector((state) => state.testStorage.currentTask);

  const imageList = imgGrid[currentSubTaskIndex]?.imgColumnList;

  const currentImgUrl =
    imageList == null || imageList.length === 0
      ? require("../../../../utils/img/noImgBig.png")
      : getImgPath(imageList[currentImageIndex]?.name);

  useEffect(() => {
    if (radioButtonTaskList == null) {
      dispatch(startTaskThunk(currentTestId, taskId, resultIndex, imgGrid));
    } else {
      dispatch(
        startTaskThunk(
          currentTestId,
          taskId,
          resultIndex,
          imgGrid,
          radioButtonTaskList
        )
      );
    }
    // setImageList(currentImageList);
  }, [currentTask]);

  useEffect(() => {
    if (imageList == null) return;
    dispatch(setImageLength(imageList.length));
    dispatch(setImageIndex(0));
  }, [imageList?.length]);

  const handleImgOnClick = () => {
    dispatch(setIsHiddenPhotoModal());
  };

  const isOneImg = () => {
    return imageList === undefined || imageList.length <= 1;
  };

  const isLeftArrowVisible = () => {
    return isOneImg() || currentImageIndex === 0;
  };

  const isRightArrowVisible = () => {
    return isOneImg() || currentImageIndex >= imageList.length - 1;
  };

  return (
    <>
      {!isHiddenPhotoModal ? (
        <PhotoModal
          currentImgUrl={currentImgUrl}
          isOneImg={isOneImg}
          isLeftArrowVisible={isLeftArrowVisible}
          isRightArrowVisible={isRightArrowVisible}
        />
      ) : null}

      <div className={styles.container}>
        {isLeftArrowVisible() ? null : (
          <div className={styles.container__leftArrow}>
            <Arrow isToLeft={true} isDark={true} />
          </div>
        )}
        <img
          onClick={handleImgOnClick}
          style={isHiddenPhotoModal ? {} : { visibility: "hidden" }}
          src={currentImgUrl}
          alt={""}
        />
        {isRightArrowVisible() ? null : (
          <div className={styles.container__rightArrow}>
            <Arrow isDark={true} />
          </div>
        )}

        {isOneImg() ? null : (
          <Bullets arrOfImages={imageList} currentImageIndex={currentImageIndex} />
        )}
      </div>
    </>
  );
}

export default Carousel;
