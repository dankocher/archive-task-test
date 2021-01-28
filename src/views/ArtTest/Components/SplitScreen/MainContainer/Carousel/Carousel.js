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

  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [isImgVisible, setIsImgVisible] = useState(true);
  const [imageList, setImageList] = useState([]);

  const currentImageIndex = useSelector(
    (state) => state.caruselReducer.current
  );
  const isHiddenPhotoModal = useSelector(
    (state) => state.caruselReducer.isHiddenPhotoModal
  );

  const currentTestId = useSelector((state) => state.testStorage.currentTestId);
  const currentTaskIndex = useSelector(
    (state) => state?.testStorage?.[currentTestId]?.currentTaskIndex
  );

  const task = useSelector(
    (state) => state.testStorage[currentTestId]?.taskList?.[currentTaskIndex]
  );
  const taskId = task._id;
  const imgGrid = task.data.imgGrid;
  const currentSubTaskIndex = useSelector(
    (state) => state.testStorage[currentTestId].currentSubTaskIndex
  );
  const radioButtonTaskList = task.data.radioButtonTaskList;

  useEffect(() => {
    setImageList(imgGrid[currentSubTaskIndex]?.imgColumnList);

    if (!isImgLoaded) return;
    setIsImgVisible(false);
  }, [currentSubTaskIndex]);

  useEffect(() => {
    if (isImgVisible) return;

    setIsImgVisible(true);
    setIsImgLoaded(false);
  }, [isImgVisible]);

  useEffect(() => {
    if (radioButtonTaskList == null) {
      dispatch(startTaskThunk(taskId, resultIndex, imgGrid));
    } else {
      dispatch(
        startTaskThunk(taskId, resultIndex, imgGrid, radioButtonTaskList)
      );
    }
  }, [task]);

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

  const currentImgUrl =
    imageList == null || imageList.length === 0
      ? require("../../../../utils/img/noImgBig.png")
      : getImgPath(imageList[currentImageIndex]?.name);

  return (
    <>
      {!isHiddenPhotoModal ? (
        <PhotoModal
          currentImgUrl={currentImgUrl}
          isLeftArrowVisible={isLeftArrowVisible}
          isRightArrowVisible={isRightArrowVisible}
        />
      ) : null}

      {isHiddenPhotoModal ? (
        <div className={styles.container}>
          {isLeftArrowVisible() ? null : (
            <div className={styles.container__leftArrow}>
              <Arrow isToLeft={true} />
            </div>
          )}

          {/* {isImgLoaded ? null : <div />} */}
          <img
            onClick={handleImgOnClick}
            style={isImgLoaded ? {} : { display: "none" }}
            src={isImgVisible ? currentImgUrl : ""}
            onLoad={() => setIsImgLoaded(true)}
          />
          {isRightArrowVisible() ? null : (
            <div className={styles.container__rightArrow}>
              <Arrow />
            </div>
          )}

          {isOneImg() ? null : (
            <Bullets
              arrOfImages={imageList}
              currentImageIndex={currentImageIndex}
            />
          )}
        </div>
      ) : null}
    </>
  );
}

export default Carousel;
