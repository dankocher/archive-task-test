import styles from "./RadioButton.module.scss";
import React, { useState } from "react";

import { isFunction } from "../../utils/validators/isFunction";

function RadioButton(props) {
  const color = props.color ? props.color : "#000000";

  const [isHovered, setIsHovered] = useState(true);

  const onChange = isFunction(props.onChange)
    ? props.onChange
    : () => {
        console.log("is not a function");
      };

  const isChecked = () => {
    return props.checkedValue === props.value;
  };

  return (
    <div
      className={`${styles.hoverWrapper} ${isHovered ? styles.hovered : ""}`}
    >
      <label
        className={styles.container}
        htmlFor={props.id}
        onMouseEnter={() => setIsHovered(false)}
        onMouseLeave={() => setIsHovered(true)}
      >
        <div className={styles.hoveredContainer}>
          <label
            style={{ borderColor: color }}
            htmlFor={props.id}
            className={styles.container__radioButton}
          >
            {isChecked() ? (
              <label
                style={{ backgroundColor: color }}
                htmlFor={props.id}
                className={styles.container__radioButton__checked}
              ></label>
            ) : null}
          </label>
        </div>
        <label style={{ color: color }} htmlFor={props.id}>
          {props.label}
        </label>
        <input
          id={props.id}
          name={props.name}
          type="radio"
          checked={isChecked()}
          value={props.value}
          onChange={(event) => onChange(event)}
        />
      </label>
    </div>
  );
}

export default RadioButton;
