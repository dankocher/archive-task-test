import "./index.scss";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUrlId } from "../../helpers/getUrlId";

import {
	WELCOME_SCREEN,
	ILLUSTRATION_RADIO_BUTTONS,
	QUSETION_ANSWER,
	WORDS_RADIO_BUTTONS,
	ILLUSTRATIONS_ANSWERS,
} from "../../helpers/taskTypes";

import Authorization from "../Authorization/Authorization";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";
import QuestionPage from "../QuestionPage/QuestionPage";
import SplitScreen from "../SplitScreen/SplitScreen";
import BigTextMainContainer from "../SplitScreen/MainContainer/BigText/BigText";
import Carousel from "../SplitScreen/MainContainer/Carousel/Carousel";

import {
	setCurrentTask,
	sesionStart,
} from "../../../../redux/actions/testActions";

import { deleteResult } from "../../../../redux/actions/resultActions";
import { deleteTest } from "../../../../redux/actions/testActions";

import {
	getTaskIdListFromServer,
	getTaskFromServer,
	saveResults,
} from "../../helpers/workWithApi";

const getPage = (taskType) => {
	switch (taskType) {
		case WELCOME_SCREEN:
			return <WelcomeScreen />;
		case QUSETION_ANSWER:
			return <QuestionPage />;
		case WORDS_RADIO_BUTTONS:
			return <SplitScreen mainContainer={<BigTextMainContainer />} />;
		case ILLUSTRATIONS_ANSWERS:
			return <SplitScreen mainContainer={<Carousel />} />;
		case ILLUSTRATION_RADIO_BUTTONS:
			return <SplitScreen mainContainer={<Carousel />} />;

		default:
			break;
	}
};

function Loader() {
	const dispatch = useDispatch();
	const state = useSelector((state) => state);

	const currentTestId = useSelector((state) => state.testStorage.currentTestId);

	const currentTaskId = useSelector(
		(state) => state?.testStorage?.[currentTestId]?.currentTaskId
	);
	const taskType = useSelector((state) => state.testStorage.currentTask?.type);
	const resultStorage = useSelector(
		(state) => state.resultStorage[currentTestId]
	);
	const endDate = resultStorage?.end_date;

	useEffect(() => {
		const testId = getUrlId();

		if (testId === currentTaskId || currentTaskId != null) return;

		getTaskIdListFromServer().then((res) => {
			dispatch(sesionStart(res.ttask.tasksCounter, res.ttask._id, res.tasks));
		});
	}, [currentTestId]);

	useEffect(() => {
		if (currentTaskId == null) return;

		getTaskFromServer(currentTaskId).then((res) => {
			dispatch(setCurrentTask(res.task));
		});
	}, [currentTaskId]);

	//End task
	useEffect(() => {
		if (endDate == null) return;

		saveResults(resultStorage).then((res) => {
			if (!res.ok) return;
			dispatch(deleteTest(currentTestId));
			dispatch(deleteResult(currentTestId));
		});
	}, [endDate]);

	return <>{currentTaskId != null ? getPage(taskType) : <Authorization />}</>;
}

export default Loader;
