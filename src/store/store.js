import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import usersReducer from "./reducers/usersReducer";

const rootReducers = combineReducers({
  usersReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)))

export default store;
