import styles from "./QATask.module.scss";
import React, { useState } from "react";

import TextArea from "../../TextArea/TextArea";

import errorIcon from "../../../helpers/icons/error-icon";
import { useDispatch, useSelector } from "react-redux";

import { setTextAreaAnswer } from "../../../../../redux/actions/resultActions";

const classNames = require("classnames");

function QATask(props) {
	const dispatch = useDispatch();

	const { data, responseLimitation, index, resultIndex, itemsRef } = props;
	const { question, description } = data;
	// console.log(itemsRef);
	const [localAnswer, setLocalAnswer] = useState("");

	const isNextBtnClicked = useSelector(
		(state) => state.testStorage.isNextBtnClicked
	);

	const answer = useSelector(
		(state) => state.resultStorage.results[resultIndex]?.data[index].answer
	);

	const saveAnswer = (localAnswer) => {
		if (answer === localAnswer) return;
		dispatch(setTextAreaAnswer(localAnswer, resultIndex, index));
	};

	const validationAnswer = () => {
		if (!isNextBtnClicked) return true;

		if (localAnswer == null) return false;
		if (localAnswer.length < responseLimitation.from) return false;
		return true;
	};

	const container = classNames(styles.container, {
		[styles.error]: !validationAnswer(),
	});

	return (
		<div ref={(el) => (itemsRef.current[index] = el)} className={container}>
			<p className={styles.container__question}>{question}</p>
			<p className={styles.container__description}>{description}</p>

			<TextArea
				defaultValue={answer}
				text={localAnswer}
				setText={setLocalAnswer}
				onBlur={saveAnswer}
				maxLength={responseLimitation.to}
				defaultHeight={"2.6rem"}
				placeholder={"Текст..."}
				error={!validationAnswer()}
			/>
			{!validationAnswer() ? (
				<div className={styles.errorWrapper}>
					<div className={styles.errorWrapper__errorMessage}>
						<i>{errorIcon}</i>
						<span>{`Минимальное кол-во символов ${responseLimitation.from}`}</span>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default QATask;
