import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import persistedReducer from "../../../../redux/reducer/rootReducer";
import { setIsRehydrate } from "../../../../redux/actions/rehydrateActions";

// export { store, persistor };

export default () => {
	const store = createStore(
		persistedReducer,
		compose(
			applyMiddleware(thunk)
			// window.location.port === "5000" || window.location.port === "3000"
			// 	? window.__REDUX_DEVTOOLS_EXTENSION__ &&
			// 			window.__REDUX_DEVTOOLS_EXTENSION__()
			// 	: undefined
		)
	);

	const persistor = persistStore(store, null, () => {
		store.dispatch(setIsRehydrate());
	});
	return { store, persistor };
};
