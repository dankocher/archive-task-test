import styles from "./authorization.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentTaskId } from "../../../../redux/actions/testActions";
import { login } from "../../../../redux/actions/resultActions";

import { isEmail } from "../../utils/validators/isEmail";

import Button from "../Button/Button";
import labels from "../../utils/labelText/lable.json";
import errorIcon from "../../helpers/icons/error-icon";

function Authorization() {
	const dispatch = useDispatch();

	const [onBlured, setOnBlured] = useState("");
	const [name, setLocalName] = useState("");
	const [isNameValid, setIsNameValid] = useState(true);
	const [email, setLocalEmail] = useState("");
	const [isEmailValid, setIsEmailValid] = useState(true);

	const taskList = useSelector((state) => state.testStorage.taskList);
	const currentTestId = useSelector((state) => state.testStorage.currentTestId);

	const startTestHandler = () => {
		if (name === "") {
			setIsNameValid(false);
			if (!onBlured) {
				setOnBlured(true);
				setIsEmailValid(isEmail(email));
			}
			return;
		} else if (!isEmailValid) return;
		dispatch(login(name, email, currentTestId));
		dispatch(setCurrentTaskId(taskList[0]));
	};

	const onChangeNameHandler = (event) => {
		const value = event.target.validity.valid ? event.target.value : name;
		if (value.length > 100) return;
		if (!isNameValid) setIsNameValid(true);
		setLocalName(value);
	};

	const onChangeEmailHandler = (event) => {
		const value = event.target.value;
		if (value.length > 50) return;
		if (onBlured) setIsEmailValid(isEmail(value));

		setLocalEmail(value);
	};

	const onBlureEmailHandler = () => {
		if (!onBlured) {
			setOnBlured(true);
			setIsEmailValid(isEmail(email));
		}
		if (!isEmail(email)) return;
		console.log("SOHRANILSIA");
	};

	return (
		<div className={styles.container}>
			<div className={styles.container__imgContainer}>
				<img src={require("../../utils/img/rectangle.png")} />
			</div>
			<div className={styles.container__centeredContainer}>
				<div className={styles.wrapper}>
					<div className={styles.wrapper__field}>
						<label>{labels.nameLabel}</label>

						<input
							className={!isNameValid ? styles.error : null}
							value={name}
							onChange={onChangeNameHandler}
							pattern="^[a-zA-Z\s]*$"
						/>
						{!isNameValid ? (
							<div className={styles.wrapper__field__errorMessage}>
								<i>{errorIcon}</i>
								<span>Please enter name</span>
							</div>
						) : null}
					</div>
					<div className={styles.wrapper__field}>
						<label>{labels.mailLabel}</label>

						<input
							className={!isEmailValid ? styles.error : null}
							value={email}
							onChange={onChangeEmailHandler}
							onBlur={onBlureEmailHandler}
						/>
						{!isEmailValid ? (
							<div className={styles.wrapper__field__errorMessage}>
								<i>{errorIcon}</i>
								<span>Invalid mail</span>
							</div>
						) : null}
					</div>

					<Button label={labels.buttonLabelStart} onClick={startTestHandler} />
				</div>
			</div>
		</div>
	);
}

export default Authorization;
