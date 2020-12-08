import React from "react";
import { useSelector } from "react-redux";

import Loader from "./Components/Loader";

function ArtTest() {
    const isRehydrated = useSelector(
        (state) => state.rehydrateStorage.isRehydrated
    );

    return <>{isRehydrated ? <Loader /> : null}</>;
}

export default ArtTest;
