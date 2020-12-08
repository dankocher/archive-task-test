import React, { useState, useEffect, useRef } from "react";

import styles from "./textArea.module.scss";

import { isFunction } from "../../utils/validators/isFunction";

const classNames = require("classnames");

function TextArea(props) {
	const {
		rows,
		defaultValue = "",
		text,
		setText = () => {},
		defaultHeight,
		error,
		...args
	} = props;

	const textAreaRef = useRef(null);
	// const [text, setText] = useState("");
	const [textAreaHeight, setTextAreaHeight] = useState("auto");

	const maxLength = props.maxLength ? props.maxLength : 240;
	const onBlur = isFunction(props.onBlur)
		? props.onBlur
		: () => console.log("Is not a function");

	useEffect(() => {
		if (defaultValue === text) return;
		setTextAreaHeight("auto");
		setText(defaultValue);
	}, [defaultValue]);

	useEffect(() => {
		// console.log(textAreaRef.current.scrollHeight);
		setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
	}, [text]);

	const onChangeHandler = (event) => {
		const text = event.target.value;
		if (text.length >= maxLength) {
			return;
		}
		setTextAreaHeight("auto");
		setText(event.target.value);
	};

	const defaultStyles = classNames(styles.textField, {
		[styles.error]: error,
	});

	return (
		<textarea
			{...args}
			ref={textAreaRef}
			rows={rows ? rows : 1}
			style={{
				height: textAreaHeight,
				overflow: "hidden",
			}}
			value={text}
			className={props.className != null ? props.className : defaultStyles}
			onChange={onChangeHandler}
			onBlur={() => onBlur(text)}
		/>
	);
}

export default TextArea;
