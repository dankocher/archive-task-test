import React from "react";
import styles from "./deviceError.module.scss";

function DeviceError() {
	return (
		<div className={styles.container}>
			<div>
				<h1>Oops!</h1>
				<p>
					Сайт не поддерживает ваше устройство. Попробуйте зайти с другого
					устройства.
				</p>
			</div>
		</div>
	);
}

export default DeviceError;
