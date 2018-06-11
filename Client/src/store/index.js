import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "../reducers";
import { loadState, saveState } from "../utils/localStorage";

const middleWares = [];
// const persistedState = loadState();

// Thunk Middleware
middleWares.push(thunk);

// Logging Middleware
const logger = createLogger({
  level: "info",
  collapsed: true
});
middleWares.push(logger);

const store = createStore(
  reducer,
  // persistedState,
  compose(applyMiddleware(...middleWares))
);
// window.DEBUGstore = store;
// store.subscribe(() => {
//   saveState([{
//     key: store.getState().event.id,
//     value: store.getState().event.title
//   }]);
// });

export default store;
