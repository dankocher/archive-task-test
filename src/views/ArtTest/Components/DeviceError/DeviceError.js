import React from "react";
import "./DeviceError.css"

function DeviceError() {
	return (
		<div className="centered-container--deviceError">
			<div>
				<h1 className="header--deviceError">Oops!</h1>
				<p className="error--deviceError">
					Сайт не поддерживает ваше устройство. Попробуйте зайти с другого
					устройства.
				</p>
			</div>
		</div>
	);
}

export default DeviceError;
