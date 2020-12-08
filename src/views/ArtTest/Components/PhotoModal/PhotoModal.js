import styles from "./photoModal.module.scss";
import React from "react";
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

function PhotoModal({ currentImgUrl, isOneImg }) {
	const dispatch = useDispatch();

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
						<div className={styles.container__wrapperRelative}>
							<button
								onClick={(event) => handlerCloseButton(event, resetTransform)}
								className={`hidden-button ${styles.container__wrapperRelative__closeBtn}`}
							>
								<i>{closeIcon}</i>
							</button>
						</div>

						{isOneImg() ? null : (
							<div className={styles.container__leftArrow}>
								<Arrow
									isDark={true}
									isToLeft={true}
									resetTransform={setDefaultState}
								/>
							</div>
						)}

						<div className={styles.container__imgContainer}>
							<TransformComponent>
								<img
									style={{ maxWidth: "100%", maxHeight: "100%" }}
									src={currentImgUrl}
									alt={""}
								/>
							</TransformComponent>
						</div>

						{isOneImg() ? null : (
							<div className={styles.container__rightArrow}>
								<Arrow isDark={true} resetTransform={setDefaultState} />
							</div>
						)}

						<div className={styles.container__zoomWrapper}>
							<div className={styles.container__zoomWrapper__zoomContainer}>
								<ZoomController
									zoomIn={zoomIn}
									zoomOut={zoomOut}
									resetTransform={resetTransform}
									maxScaleCounter={MAX_SCALE_COUNTER}
								/>
							</div>
						</div>
					</div>
				</React.Fragment>
			)}
		</TransformWrapper>
	);
}

export default PhotoModal;
