import "./ZoomController.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setScaleCounter } from "../../../../../redux/actions/caruselActions";

import resetZoomIcon from "../../../helpers/icons/rezet-zoom-icon";
import zoomOutIcon from "../../../helpers/icons/zoom-out-icon";
import zoomInIcon from "../../../helpers/icons/zoom-in-icon";

const classNames = require("classnames");

function ZoomController({
	resetTransform,
	zoomOut,
	zoomIn,
	maxScaleCounter = 3,
}) {
	const dispatch = useDispatch();
	const scaleCounter = useSelector(
		(state) => state.caruselReducer.scaleCounter
	);
	const getIsZoomed = () => scaleCounter !== 0;
	const getIsMaxZoomed = () => scaleCounter === maxScaleCounter;

	const zoomOutClass = classNames({
		activeColor: getIsZoomed(),
	});

	const resetZoomClass = classNames({
		activeColor: getIsZoomed(),
	});

	const zoomInClass = classNames({
		activeColor: !getIsMaxZoomed(),
	});

	const handlerZoomOutButton = (event) => {
		event.stopPropagation();
		if (!getIsZoomed()) {
			return;
		}

		dispatch(setScaleCounter(scaleCounter - 1));
		zoomOut(event);
	};

	const handlerResetZoomButton = (event) => {
		event.stopPropagation();
		if (!getIsZoomed()) {
			return;
		}

		dispatch(setScaleCounter(0));
		resetTransform();
	};

	const handlerZoomInButton = (event) => {
		event.stopPropagation();
		if (getIsMaxZoomed()) {
			return;
		}

		dispatch(setScaleCounter(scaleCounter + 1));
		zoomIn(event);
	};

	return (
		<>
			<button
				disabled={!getIsZoomed()}
				onClick={handlerZoomOutButton}
				className="hidden-button zoom-controller-button"
			>
				<i className={zoomOutClass}>{zoomOutIcon}</i>
			</button>
			<button
				disabled={!getIsZoomed()}
				onClick={handlerResetZoomButton}
				className="hidden-button zoom-controller-button"
			>
				<i className={resetZoomClass}>{resetZoomIcon}</i>
			</button>
			<button
				disabled={getIsMaxZoomed()}
				onClick={handlerZoomInButton}
				className="hidden-button zoom-controller-button"
			>
				<i className={zoomInClass}>{zoomInIcon}</i>
			</button>
		</>
	);
}

export default ZoomController;
