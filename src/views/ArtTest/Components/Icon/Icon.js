import React from "react";

import IcomoonReact from "icomoon-react";
import iconSet from "../../helpers/icons/fontIcons.json";

function Icon({ color, size = "100%", icon, className = "" }) {
  return (
    <IcomoonReact
      className={className}
      iconSet={iconSet}
      color={color}
      size={size}
      icon={icon}
    />
  );
}

export default Icon;
