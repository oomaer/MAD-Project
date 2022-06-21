import { combineReducers, createStore } from "redux";
import userReducer from "../Reducers/userReducer";

const rootReducer = combineReducers({
    user: userReducer,
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;

