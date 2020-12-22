import styles from "./WelcomeScreen.module.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getImgPath } from "../../helpers/getImgPath";
import { useGetResultIndex } from "../../helpers/customHooks/getResultIndex";
import setNextTaskId from "../../thunks/setNextTaskId";
import { addWelcomePage } from "../../../../redux/actions/resultActions";

import staticText from "../../utils/labelText/lable.json";

import Button from "../Button/Button";

const classNames = require("classnames");

function WelcomeScreen() {
	const dispatch = useDispatch();

	const resultIndex = useGetResultIndex();

	const task = useSelector((state) => state.testStorage.currentTask);
	const taskId = task._id;
	const isTimeConsidered = task.isTimeConsidered;

	const header = task?.name;
	const description = task?.description;
	const img = task?.data?.imgUrl;
	const imgUrl = getImgPath(img);

	useEffect(() => {
		if (resultIndex !== -1) return;

		const startDate = isTimeConsidered ? new Date().getTime() : undefined;
		dispatch(addWelcomePage(taskId, startDate));
	}, []);

	const contentContainer = classNames(styles.contentContainer, {
		[styles.containerOneContent]: img == null || img === "",
	});

	const content = classNames(styles.contentContainer__sideContainer, {
		[styles.oneContentArea]: img == null || img === "",
	});

	const nextTaskHandler = () => {
		dispatch(setNextTaskId(resultIndex));
	};

	return (
		<div className={styles.container}>
			<div className={contentContainer}>
				<div className={content}>
					<h1>{header}</h1>
					<p>{description}</p>

					<Button
						label={staticText.buttonLabelNext}
						onClick={nextTaskHandler}
					/>
				</div>
				{img != null ? (
					<div className={styles.contentContainer__imgContainer}>
						<img src={imgUrl} />
					</div>
				) : null}
			</div>
		</div>
	);
}

export default WelcomeScreen;
