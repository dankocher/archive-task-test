import styles from "./QuestionPage.module.scss";
import React, { useEffect, useRef, createRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Timer from "../Timer/Timer";
import TaskInformation from "../TaskInformation/TaskInformation";
import Button from "../Button/Button";
import QATask from "./QATask/QATask";

import { getCurrentTime } from "../../helpers/workWithApi";
import { startTask } from "../../../../redux/actions/resultActions";
import { setIsNextBtnClicked } from "../../../../redux/actions/testActions";
import setNextTaskId from "../../thunks/setNextTaskId";
import { useGetResultIndex } from "../../helpers/customHooks/getResultIndex";

const FROM = 1;
const TO = 2000;

function QuestionPage() {
	const dispatch = useDispatch();
	const itemsRef = useRef([]);

	const currentTestId = useSelector((state) => state.testStorage.currentTestId);

	const [localResponseLimitation, setLocalResponseLimitation] = useState({
		from: FROM,
		to: TO,
	});

	const task = useSelector((state) => state.testStorage.currentTask);
	const taskId = task._id;
	const description = task.description;
	const isAnswerSizeLimited = task.data.isAnswerSizeLimited;
	const QAList = task.data.questionAnswerList;
	const responseLimitation = task.data.responseLimitation;

	const resultIndex = useGetResultIndex();

	const results = useSelector(
		(state) => state.resultStorage[currentTestId].results[resultIndex]?.data
	);

	useEffect(() => {
		Array(QAList.length)
			.fill()
			.map((_, i) => itemsRef[i] || createRef());
	}, []);

	useEffect(() => {
		if (resultIndex !== -1) return;

		// const startDate = task.isTimeConsidered ? new Date().getTime() : undefined;

		if (task.isTimeConsidered) {
			getCurrentTime().then((startDate) => {
				dispatch(startTask(currentTestId, taskId, startDate, QAList, task));
			});
		} else {
			dispatch(startTask(currentTestId, taskId, undefined, QAList, task));
		}

		if (!isAnswerSizeLimited) return;
		setLocalResponseLimitation({
			from: responseLimitation?.from || FROM,
			to: responseLimitation?.to || TO,
		});
	}, []);

	const toNextTask = () => {
		dispatch(setIsNextBtnClicked(true));
		for (const [index, result] of results.entries()) {
			// if (result.answer == null || result.answer == "") return;
			if (
				result.answer?.length < localResponseLimitation.from ||
				result.answer == null
			) {
				itemsRef.current[index].children[2].focus({
					preventScroll: true,
				});

				itemsRef.current[index].scrollIntoView({
					behavior: "smooth",
					// block: "center",
					inline: "center",
				});

				return;
			}
		}

		dispatch(setIsNextBtnClicked(false));
		dispatch(setNextTaskId(resultIndex));
	};

	return (
		<>
			<div className={styles.header}>
				<Timer type={"test"} />
				<TaskInformation />
			</div>
			<div className={styles.centredWrapper}>
				<div className={styles.centredWrapper__container}>
					<h2>{description}</h2>
					<div className={styles.centredWrapper__container__body}>
						{QAList.map((element, key) => {
							return (
								<QATask
									// ref={itemsRef[key]}
									key={key}
									index={key}
									itemsRef={itemsRef}
									data={element}
									resultIndex={resultIndex}
									responseLimitation={localResponseLimitation}
								/>
							);
						})}
					</div>

					<Button color="white" label="Продолжить" onClick={toNextTask} />
				</div>
			</div>
		</>
	);
}

export default QuestionPage;
