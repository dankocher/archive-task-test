import "./index.scss";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
	setTaskList,
	setCurrentTask,
	setCurrentTestId,
	setLastTaskNumber,
} from "../../../../redux/actions/testActions";

import { logout } from "../../../../redux/actions/rootActions";

import {
	getTaskIdListFromServer,
	getTaskFromServer,
	saveResults,
} from "../../helpers/workWithApi";

const [__empty__, test_id] = window.location.pathname.split('/');

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

	const currentTaskId = useSelector(
		(state) => state?.testStorage?.currentTaskId
	);
	const taskType = useSelector((state) => state.testStorage.currentTask?.type);
	const resultStorage = useSelector((state) => state.resultStorage[test_id]);
	//const resultStorage = useSelector((state) => state.resultStorage);
	const endDate = resultStorage.end_date;

	useEffect(() => {
		// if (currentTaskId != null) return;
		getTaskIdListFromServer().then((res) => {
			dispatch(setLastTaskNumber(res.ttask.tasksCounter));
			dispatch(setTaskList(res.tasks));
			dispatch(setCurrentTestId(res.ttask._id));
			// console.log(res);
		});
	}, []);

	// useEffect(() => {
	// 	console.log(state);
	// }, [state]);

	useEffect(() => {
		console.log(currentTaskId);
		if (currentTaskId == null) return;
		getTaskFromServer(currentTaskId).then((res) => {
			// console.log(res.task);
			dispatch(setCurrentTask(res.task));
		});
	}, [currentTaskId]);

	//End task
	useEffect(() => {
		if (endDate == null) return;
		saveResults(resultStorage).then((res) => {
			if (!res.ok) return;
			dispatch(logout());
		});
	}, [endDate]);

	return <>{currentTaskId != null ? getPage(taskType) : <Authorization />}</>;
}

export default Loader;
