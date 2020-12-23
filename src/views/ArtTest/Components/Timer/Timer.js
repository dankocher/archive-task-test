import "./timer.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useGetResultIndex } from "../../helpers/customHooks/getResultIndex";
import { getCurrentTime } from "../../helpers/workWithApi";

function Timer({ type }) {
	const resultIndex = useGetResultIndex();

	// const [startTime, setStartTime] = useState(undefined);
	const [currentTimerMS, setCurrentTimerMS] = useState(undefined);
	const [currentTimer, setCurrentTimer] = useState(undefined);
	const testStart = useSelector((state) => state.resultStorage.start_date);
	const taskStart = useSelector(
		(state) => state.resultStorage.results[resultIndex]?.start_date
	);

	const isTimeConsidered = useSelector(
		(state) => state.testStorage.currentTask.isTimeConsidered
	);

	useEffect(() => {
		const startDate = type === "test" ? testStart : taskStart;

		getCurrentTime().then((time) => {
			setCurrentTimerMS(time - startDate);
		});
	}, []);

	const tick = () => {
		if (currentTimerMS == null) return;

		setCurrentTimerMS((timer) => timer + 1000);

		// if (currentTimerMS < 0) return;

		const timerInSeconds = currentTimerMS / 1000;
		const seconds = Math.floor(timerInSeconds % 60);

		const timerInMinutes = timerInSeconds / 60;
		const minutes = Math.floor(timerInMinutes % 60);

		const hours = Math.floor((timerInMinutes / 60) % 24);

		// const days = Math.floor(hours / 24);

		let parsedTimer;

		if (hours >= 1) {
			parsedTimer =
				hours.toString().padStart(2, 0) +
				":" +
				minutes.toString().padStart(2, 0) +
				":" +
				seconds.toString().padStart(2, 0);
		} else {
			parsedTimer =
				minutes.toString().padStart(2, 0) +
				":" +
				seconds.toString().padStart(2, 0);
		}

		setCurrentTimer(parsedTimer);
	};

	useEffect(() => {
		if (type !== "test" && !isTimeConsidered) return;

		const interval = setInterval(tick, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [taskStart, isTimeConsidered, currentTimerMS]);

	return (
		<>
			<span className="font-timer">{currentTimer || ""}</span>
		</>
	);
}

export default Timer;
