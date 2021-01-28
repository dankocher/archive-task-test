import "./Arrow.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  positiveIterateImageIndex,
  negativeIterateImageIndex,
  setScaleCounter,
} from "../../../../../../../redux/actions/caruselActions";

const classNames = require("classnames");

function Arrow({ isToLeft = false, resetTransform }) {
  const dispatch = useDispatch();

  const scaleCounter = useSelector(
    (state) => state.caruselReducer.scaleCounter
  );

  const handlerLeftArrow = (event) => {
    event.stopPropagation();

    dispatch(negativeIterateImageIndex());

    if (scaleCounter !== 0) {
      dispatch(setScaleCounter(0));
      resetTransform();
    }
  };
  const handlerRightArrow = (event) => {
    event.stopPropagation();

    dispatch(positiveIterateImageIndex());

    if (scaleCounter !== 0) {
      dispatch(setScaleCounter(0));
      resetTransform();
    }
  };

  const arrowClass = classNames("hidden-button", {
    "carouselArrow-left": isToLeft,
    "carouselArrow-right": !isToLeft,
  });

  return (
    <>
      <button
        className={arrowClass}
        onClick={isToLeft ? handlerLeftArrow : handlerRightArrow}
      >
        <i className={"icon-arrowBtnIcon"}></i>
      </button>
    </>
  );
}

export default Arrow;
