import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetResultIndex } from "../../../../helpers/customHooks/getResultIndex";
import { useGetResponseLimitation } from "../../../../helpers/customHooks/getResponseLimitation";

import { setTextAreaAnswer } from "../../../../../../redux/actions/resultActions";

import TextArea from "../../../TextArea/TextArea";

function TextAreaSettings() {
	const dispatch = useDispatch();

	const resultIndex = useGetResultIndex();

	const [localAnswer, setLocalAnswer] = useState("");

	const responseLimitation = useGetResponseLimitation();

	const currentSubTaskIndex = useSelector(
		(state) => state.testStorage.currentSubTaskIndex
	);

	const answer = useSelector(
		(state) =>
			state.resultStorage.results[resultIndex]?.data[currentSubTaskIndex].answer
	);

	const isNextBtnClicked = useSelector(
		(state) => state.testStorage.isNextBtnClicked
	);

	const saveAnswer = (localAnswer) => {
		if (answer === localAnswer) return;
		dispatch(setTextAreaAnswer(localAnswer, resultIndex, currentSubTaskIndex));
	};

	const validationAnswer = () => {
		if (!isNextBtnClicked) return true;

		if (localAnswer == null) return false;
		if (localAnswer.length < responseLimitation.from) return false;
		return true;
	};

	return (
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
	);
}

export default TextAreaSettings;
