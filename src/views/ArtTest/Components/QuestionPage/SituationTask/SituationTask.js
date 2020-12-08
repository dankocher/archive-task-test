import React from "react";
import "./SituationTask.css";

const exportText = {
	givenHeading: "Дано:",
	taskHeading: "Задача:",
};

function SituationTask(props) {
	return (
		<div className="container--SituationTask">
			<div>
				<h3 className="heading-font--SituationTask">
					{exportText.givenHeading}
				</h3>
				<p className="description-font--SituationTask">{props.givenTask}</p>
			</div>
			<div>
				<h3 className="heading-font--SituationTask">
					{exportText.taskHeading}
				</h3>
				<p className="description-font--SituationTask">
					{props.descriptionTask}
				</p>
			</div>
		</div>
	);
}

export default SituationTask;
